import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { JSX } from "react/jsx-runtime";

// Tree Node Structure
interface TreeNode {
  value: number | string;
  left: TreeNode | null;
  right: TreeNode | null;
  height?: number;
  children?: TreeNode[];
}

interface TreeVisualizerProps {
  setCode: (code: string) => void;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ setCode }) => {
  const [treeType, setTreeType] = useState<"BST" | "AVL" | "Heap" | "Trie">("BST");
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [highlighted, setHighlighted] = useState<(number | string)[]>([]);
  const [insertValue, setInsertValue] = useState<string>("");
  const [deleteValue, setDeleteValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [updateTarget, setUpdateTarget] = useState<string>("");
  const [updateValue, setUpdateValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [sortResult, setSortResult] = useState<(number | string)[]>([]);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Set initial tree based on tree type
  useEffect(() => {
    switch (treeType) {
      case "BST":
        setRoot({
          value: 5,
          left: { value: 3, left: { value: 2, left: null, right: null }, right: null },
          right: { value: 7, left: null, right: { value: 10, left: null, right: null } },
        });
        break;
      case "AVL":
        setRoot({
          value: 5,
          left: { value: 3, left: { value: 2, left: null, right: null }, right: null, height: 2 },
          right: { value: 7, left: null, right: { value: 10, left: null, right: null }, height: 2 },
          height: 3,
        });
        break;
      case "Heap":
        setRoot({
          value: 10,
          left: { value: 7, left: null, right: null },
          right: { value: 5, left: { value: 3, left: null, right: null }, right: null },
        });
        break;
      case "Trie":
        setRoot({
          value: "",
          left: null,
          right: null,
          children: [
            {
              value: "c",
              left: null,
              right: null,
              children: [{ value: "a", left: null, right: null, children: [{ value: "t", left: null, right: null }] }],
            },
          ],
        });
        break;
    }
    setSortResult([]);
    setSearchResult("");
  }, [treeType]);

  // AVL Helpers
  const getHeight = (node: TreeNode | null): number => (node && node.height ? node.height : 0);
  const updateHeight = (node: TreeNode): void => {
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  };
  const getBalance = (node: TreeNode | null): number =>
    node ? getHeight(node.left) - getHeight(node.right) : 0;

  const rotateRight = (y: TreeNode): TreeNode => {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    if (y.height !== undefined) updateHeight(y);
    if (x.height !== undefined) updateHeight(x);
    return x;
  };

  const rotateLeft = (x: TreeNode): TreeNode => {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    if (x.height !== undefined) updateHeight(x);
    if (y.height !== undefined) updateHeight(y);
    return y;
  };

  // Insert Functions
  const insertBST = async (node: TreeNode | null, value: number, isAVL: boolean = false): Promise<TreeNode> => {
    if (!node) return { value, left: null, right: null, ...(isAVL && { height: 1 }) };
    setHighlighted([node.value]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (value < (node.value as number)) {
      node.left = await insertBST(node.left, value, isAVL);
    } else {
      node.right = await insertBST(node.right, value, isAVL);
    }
    if (isAVL) {
      updateHeight(node);
      const balance = getBalance(node);
      if (balance > 1 && value < (node.left!.value as number)) return rotateRight(node);
      if (balance < -1 && value > (node.right!.value as number)) return rotateLeft(node);
      if (balance > 1 && value > (node.left!.value as number)) {
        node.left = rotateLeft(node.left!);
        return rotateRight(node);
      }
      if (balance < -1 && value < (node.right!.value as number)) {
        node.right = rotateRight(node.right!);
        return rotateLeft(node);
      }
    }
    return node;
  };

  const insertHeap = async (node: TreeNode | null, value: number): Promise<TreeNode> => {
    const heapifyUp = async (arr: TreeNode[]): Promise<void> => {
      let idx = arr.length - 1;
      while (idx > 0) {
        const parentIdx = Math.floor((idx - 1) / 2);
        setHighlighted([arr[parentIdx].value, arr[idx].value]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if ((arr[idx].value as number) > (arr[parentIdx].value as number)) {
          [arr[idx], arr[parentIdx]] = [arr[parentIdx], arr[idx]];
          idx = parentIdx;
        } else break;
      }
    };
    const flatArray = node ? bfsToArray(node) : [];
    flatArray.push({ value, left: null, right: null });
    await heapifyUp(flatArray);
    return arrayToHeap(flatArray)!;
  };

  const insertTrie = async (node: TreeNode | null, word: string): Promise<TreeNode> => {
    if (!node) node = { value: "", left: null, right: null, children: [] };
    let current = node;
    for (const char of word) {
      setHighlighted([current.value]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!current.children) current.children = [];
      const found: TreeNode | undefined = current.children.find((child) => child.value === char);
      if (!found) {
        const newNode: TreeNode = { value: char, left: null, right: null, children: [] };
        current.children.push(newNode);
        current = newNode;
      } else {
        current = found;
      }
    }
    return node;
  };

  const insertNode = async (): Promise<void> => {
    const value = treeType === "Trie" ? insertValue : Number(insertValue);
    if (!value || (treeType !== "Trie" && isNaN(value as number))) return;
    setHighlighted([]);
    let newRoot: TreeNode | null = root;
    switch (treeType) {
      case "BST":
        setCode(`// BST Insert\ninsertBST(root, ${value});`);
        newRoot = await insertBST(root, value as number);
        break;
      case "AVL":
        setCode(`// AVL Insert\ninsertAVL(root, ${value});`);
        newRoot = await insertBST(root, value as number, true);
        break;
      case "Heap":
        setCode(`// Heap Insert\ninsertHeap(root, ${value});`);
        newRoot = await insertHeap(root, value as number);
        break;
      case "Trie":
        setCode(`// Trie Insert\ninsertTrie(root, "${value}");`);
        newRoot = await insertTrie(root, value as string);
        break;
    }
    setRoot(newRoot);
    setHighlighted([]);
    setInsertValue("");
  };

  // Delete Functions
  const deleteBST = async (node: TreeNode | null, value: number, isAVL: boolean = false): Promise<TreeNode | null> => {
    if (!node) return null;
    setHighlighted([node.value]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (value < (node.value as number)) {
      node.left = await deleteBST(node.left, value, isAVL);
    } else if (value > (node.value as number)) {
      node.right = await deleteBST(node.right, value, isAVL);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const minNode = findMin(node.right);
      node.value = minNode.value;
      node.right = await deleteBST(node.right, minNode.value as number, isAVL);
    }
    if (isAVL) {
      updateHeight(node);
      const balance = getBalance(node);
      if (balance > 1 && getBalance(node.left) >= 0) return rotateRight(node);
      if (balance > 1 && getBalance(node.left) < 0) {
        node.left = rotateLeft(node.left!);
        return rotateRight(node);
      }
      if (balance < -1 && getBalance(node.right) <= 0) return rotateLeft(node);
      if (balance < -1 && getBalance(node.right) > 0) {
        node.right = rotateRight(node.right!);
        return rotateLeft(node);
      }
    }
    return node;
  };

  const findMin = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left) current = current.left;
    return current;
  };

  const deleteHeap = async (node: TreeNode | null, value: number): Promise<TreeNode | null> => {
    if (!node) return null;
    const flatArray = bfsToArray(node);
    if ((flatArray[0].value as number) !== value) return node;
    flatArray[0] = flatArray.pop()!;
    const heapifyDown = async (arr: TreeNode[]): Promise<void> => {
      let idx = 0;
      while (true) {
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        let largest = idx;
        if (left < arr.length && (arr[left].value as number) > (arr[largest].value as number)) largest = left;
        if (right < arr.length && (arr[right].value as number) > (arr[largest].value as number)) largest = right;
        if (largest === idx) break;
        setHighlighted([arr[idx].value, arr[largest].value]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        [arr[idx], arr[largest]] = [arr[largest], arr[idx]];
        idx = largest;
      }
    };
    await heapifyDown(flatArray);
    return arrayToHeap(flatArray);
  };

  const deleteNode = async (): Promise<void> => {
    const value = Number(deleteValue);
    if (isNaN(value)) return;
    setHighlighted([]);
    let newRoot: TreeNode | null = root;
    switch (treeType) {
      case "BST":
        setCode(`// BST Delete\ndeleteBST(root, ${value});`);
        newRoot = await deleteBST(root, value);
        break;
      case "AVL":
        setCode(`// AVL Delete\ndeleteAVL(root, ${value});`);
        newRoot = await deleteBST(root, value, true);
        break;
      case "Heap":
        setCode(`// Heap Delete\ndeleteHeap(root, ${value});`);
        newRoot = await deleteHeap(root, value);
        break;
      case "Trie":
        setCode(`// Trie deletion not implemented yet`);
        return;
    }
    setRoot(newRoot);
    setHighlighted([]);
    setDeleteValue("");
  };

  // Search Functions
  const searchNode = async (): Promise<void> => {
    const value = treeType === "Trie" ? searchValue : Number(searchValue);
    if (!value || (treeType !== "Trie" && isNaN(value as number))) return;

    if (treeType === "BST" || treeType === "AVL") {
      let current = root;
      while (current) {
        setHighlighted([current.value]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (current.value === value) {
          setSearchResult(`Found ${value}`);
          setCode(`// ${treeType} Search\nsearch${treeType}(root, ${value});`);
          setHighlighted([]);
          return;
        }
        current = (value as number) < (current.value as number) ? current.left : current.right;
      }
      setSearchResult(`${value} not found`);
    } else if (treeType === "Heap") {
      const flatArray = bfsToArray(root);
      for (const node of flatArray) {
        setHighlighted([node.value]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (node.value === value) {
          setSearchResult(`Found ${value}`);
          setCode(`// Heap Search\nsearchHeap(root, ${value});`);
          setHighlighted([]);
          return;
        }
      }
      setSearchResult(`${value} not found`);
    } else if (treeType === "Trie") {
      let current = root;
      if (!current) {
        setSearchResult(`${value} not found`);
        setCode(`// Trie Search\nsearchTrie(root, "${value}");`);
        setHighlighted([]);
        return;
      }
      for (const char of value as string) {
        if (!current) {
          setSearchResult(`${value} not found`);
          setCode(`// Trie Search\nsearchTrie(root, "${value}");`);
          setHighlighted([]);
          return;
        }
        setHighlighted([current.value]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (!current.children) {
          setSearchResult(`${value} not found`);
          setCode(`// Trie Search\nsearchTrie(root, "${value}");`);
          setHighlighted([]);
          return;
        }
        const found: TreeNode | undefined = current.children.find((child) => child.value === char);
        if (!found) {
          setSearchResult(`${value} not found`);
          setCode(`// Trie Search\nsearchTrie(root, "${value}");`);
          setHighlighted([]);
          return;
        }
        current = found;
      }
      setSearchResult(`Found ${value}`);
      setCode(`// Trie Search\nsearchTrie(root, "${value}");`);
    }
    setHighlighted([]);
  };

  // Update Function
  const updateNode = async (): Promise<void> => {
    const target = Number(updateTarget);
    const newValue = Number(updateValue);
    if (isNaN(target) || isNaN(newValue)) return;
    let newRoot = root;
    if (treeType === "BST" || treeType === "AVL") {
      newRoot = await deleteBST(root, target, treeType === "AVL");
      newRoot = await insertBST(newRoot, newValue, treeType === "AVL");
      setCode(`// ${treeType} Update\nupdate${treeType}(root, ${target}, ${newValue});`);
    } else if (treeType === "Heap") {
      newRoot = await deleteHeap(root, target);
      newRoot = await insertHeap(newRoot, newValue);
      setCode(`// Heap Update\nupdateHeap(root, ${target}, ${newValue});`);
    }
    setRoot(newRoot);
    setHighlighted([]);
    setUpdateTarget("");
    setUpdateValue("");
  };

  // Sort Function
  const sortTree = async (): Promise<void> => {
    if (!root) return;
    if (treeType === "BST" || treeType === "AVL") {
      const result: number[] = [];
      const inorder = async (node: TreeNode | null): Promise<void> => {
        if (!node) return;
        await inorder(node.left);
        setHighlighted([node.value]);
        result.push(node.value as number);
        await new Promise((resolve) => setTimeout(resolve, 500));
        await inorder(node.right);
      };
      await inorder(root);
      setSortResult(result);
      setCode(`// ${treeType} Sort\nsort${treeType}(root); // Result: [${result}]`);
    } else if (treeType === "Heap") {
      let flatArray = bfsToArray(root);
      const result: number[] = [];
      while (flatArray.length > 0) {
        result.push(flatArray[0].value as number);
        flatArray = bfsToArray(await deleteHeap(arrayToHeap(flatArray), flatArray[0].value as number));
      }
      setSortResult(result);
      setCode(`// Heap Sort\nsortHeap(root); // Result: [${result}]`);
    }
    setHighlighted([]);
  };

  // BFS Helper for Heap
  const bfsToArray = (node: TreeNode | null): TreeNode[] => {
    if (!node) return [];
    const result: TreeNode[] = [];
    const queue: TreeNode[] = [node];
    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return result;
  };

  const arrayToHeap = (arr: TreeNode[]): TreeNode | null => {
    if (arr.length === 0) return null;
    for (let i = 0; i < arr.length; i++) {
      arr[i].left = arr[2 * i + 1] || null;
      arr[i].right = arr[2 * i + 2] || null;
    }
    return arr[0];
  };

  // Render Tree
  const renderTree = (node: TreeNode | null, depth = 0, x = 0): JSX.Element[] => {
    if (!node) return [];
    const nodeSize = 48;
    const verticalSpacing = 100;
    const horizontalSpacing = treeType === "Trie" ? 40 : 60;
    const parentBottomX = containerWidth / 2 + x;
    const parentBottomY = depth * verticalSpacing + nodeSize;

    const edges: JSX.Element[] = [];
    if (treeType === "BST" || treeType === "AVL" || treeType === "Heap") {
      if (node.left) {
        const leftTopX = containerWidth / 2 + (x - horizontalSpacing);
        const leftTopY = (depth + 1) * verticalSpacing;
        edges.push(
          <line
            key={`edge-left-${node.value}-${depth}-${x}`}
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
        const rightTopX = containerWidth / 2 + (x + horizontalSpacing);
        const rightTopY = (depth + 1) * verticalSpacing;
        edges.push(
          <line
            key={`edge-right-${node.value}-${depth}-${x}`}
            x1={parentBottomX}
            y1={parentBottomY}
            x2={rightTopX}
            y2={rightTopY}
            stroke="black"
            strokeWidth="2"
          />
        );
      }
    } else if (treeType === "Trie" && node.children) {
      node.children.forEach((child, idx) => {
        const childX = x + (idx - node.children!.length / 2) * horizontalSpacing;
        const childTopX = containerWidth / 2 + childX;
        const childTopY = (depth + 1) * verticalSpacing;
        edges.push(
          <line
            key={`edge-${node.value}-${child.value}-${depth}-${x}`}
            x1={parentBottomX}
            y1={parentBottomY}
            x2={childTopX}
            y2={childTopY}
            stroke="black"
            strokeWidth="2"
          />
        );
      });
    }

    const childrenElements =
      treeType === "Trie" && node.children
        ? node.children.flatMap((child, idx) =>
            renderTree(child, depth + 1, x + (idx - node.children!.length / 2) * horizontalSpacing)
          )
        : [
            ...renderTree(node.left, depth + 1, x - horizontalSpacing),
            ...renderTree(node.right, depth + 1, x + horizontalSpacing),
          ];

    return [
      ...edges,
      <motion.div
        key={`${node.value}-${depth}-${x}`}
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
      ...childrenElements,
    ];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Tree Visualizer</h2>

      {/* Tree Type Selection */}
      <div className="mb-6">
        <label className="text-black font-medium mr-2">Select Tree Type:</label>
        <select
          value={treeType}
          onChange={(e) => setTreeType(e.target.value as "BST" | "AVL" | "Heap" | "Trie")}
          className="p-2 border rounded text-black"
        >
          <option value="BST">Binary Search Tree (BST)</option>
          <option value="AVL">AVL Tree</option>
          <option value="Heap">Max Heap</option>
          <option value="Trie">Trie</option>
        </select>
      </div>

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
          <label className="text-black font-medium">Insert {treeType === "Trie" ? "Word" : "Node"}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder={treeType === "Trie" ? "Word" : "Value"}
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
        {treeType !== "Trie" && (
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
        )}

        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Search {treeType === "Trie" ? "Word" : "Value"}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={treeType === "Trie" ? "Word" : "Value"}
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

        {/* Update */}
        {treeType !== "Trie" && (
          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Update Node</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={updateTarget}
                onChange={(e) => setUpdateTarget(e.target.value)}
                placeholder="Target"
                className="p-2 border rounded w-20 text-black"
              />
              <input
                type="text"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
                placeholder="New Value"
                className="p-2 border rounded w-20 text-black"
              />
              <button
                onClick={updateNode}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {/* Sort */}
        {(treeType === "BST" || treeType === "AVL" || treeType === "Heap") && (
          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Sort Tree</label>
            <button
              onClick={sortTree}
              className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
            >
              Sort
            </button>
            {sortResult.length > 0 && (
              <p className="text-black font-semibold">Sorted: [{sortResult.join(", ")}]</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeVisualizer;