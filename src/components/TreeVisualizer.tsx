import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { JSX } from "react/jsx-runtime";

// Binary Tree Node Structure
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface TreeVisualizerProps {
  setCode: (code: string) => void;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ setCode }) => {
  const [root, setRoot] = useState<TreeNode | null>({
    value: 5,
    left: { value: 3, left: { value: 2, left: null, right: null }, right: null },
    right: { value: 7, left: { value: 9, left: null, right: null }, right: { value: 10, left: null, right: null } },
  });
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [insertValue, setInsertValue] = useState<string>("");
  const [deleteValue, setDeleteValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [containerWidth, setContainerWidth] = useState<number>(800); // Default width

  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamically set container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Insert into BST
  const insertNode = async (): Promise<void> => {
    const value: number = Number(insertValue);
    if (isNaN(value)) return;

    let codeSteps: string = `function insertNode(root: TreeNode | null, value: number): TreeNode {\n`;
    const newNode: TreeNode = { value, left: null, right: null };

    if (!root) {
      setRoot(newNode);
      codeSteps += `  if (!root) return { value: ${value}, left: null, right: null };\n`;
      setCode(codeSteps + `}\ninsertNode(root, ${value});`);
      setInsertValue("");
      return;
    }

    let current = root;
    const steps: string[] = []; // Fixed: let to const
    while (true) {
      setHighlighted([current.value]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (value < current.value) {
        steps.push(`  if (${value} < ${current.value}) {\n`);
        if (!current.left) {
          current.left = newNode;
          steps.push(`    current.left = { value: ${value}, left: null, right: null };\n  }`);
          break;
        }
        current = current.left;
        steps.push(`    current = current.left;\n  }`);
      } else {
        steps.push(`  if (${value} >= ${current.value}) {\n`);
        if (!current.right) {
          current.right = newNode;
          steps.push(`    current.right = { value: ${value}, left: null, right: null };\n  }`);
          break;
        }
        current = current.right;
        steps.push(`    current = current.right;\n  }`);
      }
    }
    setRoot({ ...root });
    codeSteps += steps.join("") + `}\ninsertNode(root, ${value});`;
    setCode(codeSteps);
    setHighlighted([]);
    setInsertValue("");
  };

  // Search in BST
  const searchNode = async (): Promise<void> => {
    const value: number = Number(searchValue);
    if (isNaN(value)) return;

    let codeSteps: string = `function searchNode(root: TreeNode | null, value: number): boolean {\n`;
    let current = root;
    const steps: string[] = []; // Fixed: let to const

    while (current) {
      setHighlighted([current.value]);
      steps.push(`  if (root.value === ${value}) return true;\n`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (current.value === value) {
        setSearchResult(`Found ${value}`);
        codeSteps += steps.join("") + `  return true;\n}\nsearchNode(root, ${value});`;
        setCode(codeSteps);
        setHighlighted([]);
        return;
      }
      if (value < current.value) {
        steps.push(`  if (${value} < ${current.value}) root = root.left;\n`);
        current = current.left;
      } else {
        steps.push(`  if (${value} >= ${current.value}) root = root.right;\n`);
        current = current.right;
      }
    }
    setSearchResult(`${value} not found`);
    codeSteps += steps.join("") + `  return false;\n}\nsearchNode(root, ${value});`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // Delete Node
  const deleteNode = async (): Promise<void> => {
    const value: number = Number(deleteValue);
    if (isNaN(value) || !root) return;

    let codeSteps: string = `function deleteNode(root: TreeNode | null, value: number): TreeNode | null {\n`;

    const findMin = (node: TreeNode): number => {
      let min = node.value;
      while (node.left) {
        min = node.left.value;
        node = node.left;
      }
      return min;
    };

    const deleteHelper = async (
      node: TreeNode | null,
      val: number
    ): Promise<TreeNode | null> => {
      if (!node) return null;

      setHighlighted([node.value]);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (val < node.value) {
        node.left = await deleteHelper(node.left, val);
        codeSteps += `  if (${val} < ${node.value}) node.left = deleteNode(node.left, ${val});\n`;
      } else if (val > node.value) {
        node.right = await deleteHelper(node.right, val);
        codeSteps += `  if (${val} > ${node.value}) node.right = deleteNode(node.right, ${val});\n`;
      } else {
        if (!node.left) {
          codeSteps += `  if (!node.left) return node.right;\n`;
          return node.right;
        } else if (!node.right) {
          codeSteps += `  if (!node.right) return node.left;\n`;
          return node.left;
        }
        const minValue = findMin(node.right);
        node.value = minValue;
        codeSteps += `  node.value = findMin(node.right); // ${minValue}\n`;
        node.right = await deleteHelper(node.right, minValue);
        codeSteps += `  node.right = deleteNode(node.right, ${minValue});\n`;
      }
      return node;
    };

    const newRoot = await deleteHelper(root, value);
    setRoot(newRoot);
    codeSteps += `}\ndeleteNode(root, ${value});`;
    setCode(codeSteps);
    setHighlighted([]);
    setDeleteValue("");
  };

  // Breadth-First Search (BFS)
  const bfsTraversal = async (): Promise<void> => {
    if (!root) return;

    let codeSteps: string = `function bfsTraversal(root: TreeNode | null): number[] {\n  if (!root) return [];\n  const result: number[] = [];\n  const queue: TreeNode[] = [root];\n  while (queue.length > 0) {\n`;
    const queue: TreeNode[] = [root];
    const result: number[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      setHighlighted([node.value]);
      result.push(node.value);
      codeSteps += `    const node = queue.shift()!;\n    result.push(node.value); // ${node.value}\n`;

      if (node.left) {
        queue.push(node.left);
        codeSteps += `    if (node.left) queue.push(node.left);\n`;
      }
      if (node.right) {
        queue.push(node.right);
        codeSteps += `    if (node.right) queue.push(node.right);\n`;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    codeSteps += `  }\n  return result;\n}\nbfsTraversal(root); // Result: [${result}]`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // Depth-First Search (DFS) - Pre-order
  const dfsTraversal = async (): Promise<void> => {
    if (!root) return;

    let codeSteps: string = `function dfsTraversal(root: TreeNode | null): number[] {\n  const result: number[] = [];\n  function traverse(node: TreeNode | null) {\n`;
    const result: number[] = [];

    const traverse = async (node: TreeNode | null): Promise<void> => {
      if (!node) return;

      setHighlighted([node.value]);
      result.push(node.value);
      codeSteps += `    if (node) {\n      result.push(node.value); // ${node.value}\n`;
      await new Promise((resolve) => setTimeout(resolve, 500));

      await traverse(node.left);
      codeSteps += `      traverse(node.left);\n`;
      await traverse(node.right);
      codeSteps += `      traverse(node.right);\n    }\n`;
    };

    await traverse(root);
    codeSteps += `  }\n  traverse(root);\n  return result;\n}\ndfsTraversal(root); // Result: [${result}]`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // Render Tree with Edges
  const renderTree = (node: TreeNode | null, depth: number = 0, x: number = 0): JSX.Element[] => {
    if (!node) return [];

    const nodeSize = 48; // w-12 h-12 in pixels
    const verticalSpacing = 100; // Distance between levels
    const horizontalSpacing = 60; // Distance between siblings

    // Calculate absolute positions for SVG
    const parentBottomX = containerWidth / 2 + x; // Absolute X position (center of container + offset)
    const parentBottomY = depth * verticalSpacing + nodeSize; // Bottom Y of parent

    const edges: JSX.Element[] = [];
    if (node.left) {
      const leftTopX = containerWidth / 2 + (x - horizontalSpacing); // Absolute X position of left child
      const leftTopY = (depth + 1) * verticalSpacing; // Top Y of left child
      edges.push(
        <line
          key={`edge-left-${node.value}-${depth}-${x}`} // Unique key
          x1={parentBottomX}
          y1={parentBottomY}
          x2={leftTopX}
          y2={leftTopY}
          stroke="black"
          strokeWidth="2"
        />
      );
    }
    if (node.right) {
      const rightTopX = containerWidth / 2 + (x + horizontalSpacing); // Absolute X position of right child
      const rightTopY = (depth + 1) * verticalSpacing; // Top Y of right child
      edges.push(
        <line
          key={`edge-right-${node.value}-${depth}-${x}`} // Unique key
          x1={parentBottomX}
          y1={parentBottomY}
          x2={rightTopX}
          y2={rightTopY}
          stroke="black"
          strokeWidth="2"
        />
      );
    }

    return [
      ...edges,
      <motion.div
        key={`${node.value}-${depth}-${x}`} // Unique key
        initial={{ y: 0, scale: 1 }}
        animate={{
          y: highlighted.includes(node.value) ? -15 : 0,
          scale: highlighted.includes(node.value) ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`absolute flex items-center justify-center w-12 h-12 border-2 rounded-full shadow-sm text-lg font-semibold text-black ${
          highlighted.includes(node.value) ? "bg-yellow-400 border-yellow-500" : "bg-blue-300 border-blue-400"
        }`}
        style={{ top: `${depth * verticalSpacing}px`, left: `calc(50% + ${x - nodeSize / 2}px)` }}
      >
        {node.value}
      </motion.div>,
      ...renderTree(node.left, depth + 1, x - horizontalSpacing),
      ...renderTree(node.right, depth + 1, x + horizontalSpacing),
    ];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Tree</h2>

      {/* Visual Representation */}
      <div ref={containerRef} className="relative h-[500px] mb-6 overflow-auto">
        <svg className="absolute w-full h-full" style={{ zIndex: 0 }}>
          {root ? renderTree(root).filter((el) => el.type === "line") : null}
        </svg>
        <div className="relative z-10">
          {root ? renderTree(root).filter((el) => el.type !== "line") : <p className="text-black">Tree is empty</p>}
        </div>
      </div>

      {/* Operations */}
      <div className="grid grid-cols-2 gap-6">
        {/* Insert */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Insert Node</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder="Value"
              className="p-2 border rounded w-24 text-black"
            />
            <button
              onClick={insertNode}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Insert
            </button>
          </div>
        </div>

        {/* Delete */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Delete Node</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
              placeholder="Value"
              className="p-2 border rounded w-24 text-black"
            />
            <button
              onClick={deleteNode}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Search Value</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Value"
              className="p-2 border rounded w-24 text-black"
            />
            <button
              onClick={searchNode}
              className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
            >
              Search
            </button>
          </div>
          {searchResult && <p className="text-black font-semibold">{searchResult}</p>}
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

export default TreeVisualizer;