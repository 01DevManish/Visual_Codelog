import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { JSX } from "react/jsx-runtime";

// Graph Node Structure
interface GraphNode {
  id: number;
  x: number; // X position for rendering
  y: number; // Y position for rendering
}

// Graph Edge Structure
interface GraphEdge {
  from: number; // Source node ID
  to: number;   // Target node ID
}

interface GraphVisualizerProps {
  setCode: (code: string) => void;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ setCode }) => {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 1, x: 0, y: 0 },
    { id: 2, x: -100, y: 100 },
    { id: 3, x: 100, y: 100 },
    { id: 4, x: 0, y: 200 },
    { id: 5, x: 200, y: 200 },
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
  ]);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [addNodeValue, setAddNodeValue] = useState<string>("");
  const [addEdgeFrom, setAddEdgeFrom] = useState<string>("");
  const [addEdgeTo, setAddEdgeTo] = useState<string>("");
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [containerHeight, setContainerHeight] = useState<number>(500);

  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamically set container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Add a new node
  const addNode = () => {
    const id = Number(addNodeValue);
    if (isNaN(id) || nodes.find((node) => node.id === id)) return;

    // Place the new node in a circular layout
    const radius = 150;
    const angle = (nodes.length * 2 * Math.PI) / 5; // Distribute nodes in a circle
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    setNodes([...nodes, { id, x, y }]);
    setAddNodeValue("");
    setCode(`Added node ${id} at position (${x.toFixed(2)}, ${y.toFixed(2)})`);
  };

  // Add a new edge
  const addEdge = () => {
    const from = Number(addEdgeFrom);
    const to = Number(addEdgeTo);
    if (
      isNaN(from) ||
      isNaN(to) ||
      !nodes.find((node) => node.id === from) ||
      !nodes.find((node) => node.id === to) ||
      edges.find((edge) => edge.from === from && edge.to === to)
    ) {
      return;
    }

    setEdges([...edges, { from, to }]);
    setAddEdgeFrom("");
    setAddEdgeTo("");
    setCode(`Added edge from ${from} to ${to}`);
  };

  // BFS Traversal
  const bfsTraversal = async () => {
    if (nodes.length === 0) return;

    const startNode = nodes[0].id;
    const visited = new Set<number>();
    const queue: number[] = [startNode];
    const result: number[] = [];
    let codeSteps = `function bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  const result = [];\n`;

    while (queue.length > 0) {
      const node = queue.shift()!;
      if (visited.has(node)) continue;

      visited.add(node);
      result.push(node);
      setHighlighted([node]);
      codeSteps += `  const node = ${node}; result.push(node);\n`;
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Find neighbors
      const neighbors = edges
        .filter((edge) => edge.from === node)
        .map((edge) => edge.to);
      neighbors.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          codeSteps += `  queue.push(${neighbor});\n`;
        }
      });
    }

    codeSteps += `  return result;\n}\nbfs(graph, ${startNode}); // Result: [${result}]`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // DFS Traversal
  const dfsTraversal = async () => {
    if (nodes.length === 0) return;

    const startNode = nodes[0].id;
    const visited = new Set<number>();
    const result: number[] = [];
    let codeSteps = `function dfs(graph, start) {\n  const visited = new Set();\n  const result = [];\n  function traverse(node) {\n`;

    const traverse = async (node: number) => {
      if (visited.has(node)) return;

      visited.add(node);
      result.push(node);
      setHighlighted([node]);
      codeSteps += `    result.push(${node});\n`;
      await new Promise((resolve) => setTimeout(resolve, 500));

      const neighbors = edges
        .filter((edge) => edge.from === node)
        .map((edge) => edge.to);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          await traverse(neighbor);
          codeSteps += `    traverse(${neighbor});\n`;
        }
      }
    };

    await traverse(startNode);
    codeSteps += `  }\n  traverse(start);\n  return result;\n}\ndfs(graph, ${startNode}); // Result: [${result}]`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // Render Graph with Edges
  const renderGraph = (): JSX.Element[] => {
    const nodeSize = 48; // w-12 h-12 in pixels
    const elements: JSX.Element[] = [];

    // Render edges
    edges.forEach((edge) => {
      const fromNode = nodes.find((node) => node.id === edge.from);
      const toNode = nodes.find((node) => node.id === edge.to);
      if (!fromNode || !toNode) return;

      // Calculate positions for edges (from bottom of source to top of target)
      const fromX = containerWidth / 2 + fromNode.x;
      const fromY = containerHeight / 2 + fromNode.y + nodeSize / 2; // Bottom of source
      const toX = containerWidth / 2 + toNode.x;
      const toY = containerHeight / 2 + toNode.y - nodeSize / 2; // Top of target

      elements.push(
        <line
          key={`edge-${edge.from}-${edge.to}`}
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke="black"
          strokeWidth="2"
        />
      );
    });

    // Render nodes
    nodes.forEach((node) => {
      elements.push(
        <motion.div
          key={`node-${node.id}`}
          initial={{ scale: 1 }}
          animate={{
            scale: highlighted.includes(node.id) ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute flex items-center justify-center w-12 h-12 border-2 rounded-full shadow-sm text-lg font-semibold text-black ${
            highlighted.includes(node.id) ? "bg-yellow-400 border-yellow-500" : "bg-blue-300 border-blue-400"
          }`}
          style={{
            top: `${containerHeight / 2 + node.y - nodeSize / 2}px`,
            left: `${containerWidth / 2 + node.x - nodeSize / 2}px`,
          }}
        >
          {node.id}
        </motion.div>
      );
    });

    return elements;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Graph</h2>

      {/* Visual Representation */}
      <div ref={containerRef} className="relative h-[500px] mb-6 overflow-auto">
        <svg className="absolute w-full h-full" style={{ zIndex: 0 }}>
          {renderGraph().filter((el) => el.type === "line")}
        </svg>
        <div className="relative z-10">
          {renderGraph().filter((el) => el.type !== "line")}
        </div>
      </div>

      {/* Operations */}
      <div className="grid grid-cols-2 gap-6">
        {/* Add Node */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Add Node</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={addNodeValue}
              onChange={(e) => setAddNodeValue(e.target.value)}
              placeholder="Node ID"
              className="p-2 border rounded w-24 text-black"
            />
            <button
              onClick={addNode}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Add Node
            </button>
          </div>
        </div>

        {/* Add Edge */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Add Edge</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={addEdgeFrom}
              onChange={(e) => setAddEdgeFrom(e.target.value)}
              placeholder="From"
              className="p-2 border rounded w-16 text-black"
            />
            <input
              type="text"
              value={addEdgeTo}
              onChange={(e) => setAddEdgeTo(e.target.value)}
              placeholder="To"
              className="p-2 border rounded w-16 text-black"
            />
            <button
              onClick={addEdge}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
            >
              Add Edge
            </button>
          </div>
        </div>

        {/* BFS & DFS */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Traversal</label>
          <div className="flex gap-2">
            <button
              onClick={bfsTraversal}
              className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
            >
              BFS
            </button>
            <button
              onClick={dfsTraversal}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
            >
              DFS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;