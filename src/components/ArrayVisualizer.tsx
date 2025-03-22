import React, { useState } from "react";
import { motion } from "framer-motion";

interface ArrayVisualizerProps {
  array: number[];
  setArray: (array: number[]) => void;
  setCode: (code: string) => void;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array, setArray, setCode }) => {
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [sum, setSum] = useState<number | null>(null);
  const [insertValue, setInsertValue] = useState<string>("");
  const [deleteIndex, setDeleteIndex] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<"bubble" | "insertion">("bubble");

  // Bubble Sort
  const bubbleSort = async (): Promise<void> => {
    const arr: number[] = [...array]; // Fixed: let to const
    let codeSteps: string = `function bubbleSort(arr: number[]) {\n`;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setHighlighted([j, j + 1]);
        codeSteps += `  if (arr[${j}] > arr[${j + 1}]) {\n    [arr[${j}], arr[${j + 1}]] = [arr[${j + 1}], arr[${j}]];\n  }\n`;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }
    codeSteps += `}\nbubbleSort([${array}]);`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // Insertion Sort
  const insertionSort = async (): Promise<void> => {
    const arr: number[] = [...array]; // Fixed: let to const
    let codeSteps: string = `function insertionSort(arr: number[]) {\n`;
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i]; // Fixed: let to const
      let j = i - 1;
      codeSteps += `  let key = arr[${i}];\n`;
      setHighlighted([i]);
      while (j >= 0 && arr[j] > key) {
        setHighlighted([j, j + 1]);
        arr[j + 1] = arr[j];
        codeSteps += `  if (arr[${j}] > key) arr[${j + 1}] = arr[${j}];\n`;
        j--;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      arr[j + 1] = key;
      setArray([...arr]);
      codeSteps += `  arr[${j + 1}] = key;\n`;
    }
    codeSteps += `}\ninsertionSort([${array}]);`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // Sort Handler
  const handleSort = () => {
    if (sortMethod === "bubble") bubbleSort();
    else if (sortMethod === "insertion") insertionSort();
  };

  // Calculate Sum
  const calculateSum = (): void => {
    const total: number = array.reduce((a, b) => a + b, 0);
    setSum(total);
    setCode(`const sum = arr.reduce((a: number, b: number) => a + b, 0);\n// Sum of [${array}] = ${total}`);
  };

  // Rotate Array
  const rotateArray = (): void => {
    const arr: number[] = [...array]; // Fixed: let to const
    arr.push(arr.shift() as number);
    setArray(arr);
    setCode(`arr.push(arr.shift()!);\n// Rotated: [${arr}]`);
  };

  // Insert Element
  const insertElement = (): void => {
    const numValue: number = Number(insertValue);
    if (!isNaN(numValue)) {
      setArray([...array, numValue]);
      setCode(`arr.push(${numValue});\n// New array: [${[...array, numValue]}]`);
      setInsertValue("");
    }
  };

  // Delete Element
  const deleteElement = (): void => {
    const index: number = Number(deleteIndex);
    if (!isNaN(index) && index >= 0 && index < array.length) {
      const arr: number[] = [...array]; // Fixed: let to const
      arr.splice(index, 1);
      setArray(arr);
      setCode(`arr.splice(${index}, 1);\n// New array: [${arr}]`);
      setDeleteIndex("");
    }
  };

  // Linear Search
  const linearSearch = async (): Promise<void> => {
    const value: number = Number(searchValue);
    let codeSteps: string = `function linearSearch(arr: number[], value: number) {\n`;
    for (let i = 0; i < array.length; i++) {
      setHighlighted([i]);
      codeSteps += `  if (arr[${i}] === ${value}) return ${i};\n`;
      if (array[i] === value) {
        setSearchResult(`Found ${value} at index ${i}`);
        setCode(codeSteps + `}\nlinearSearch([${array}], ${value});`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setHighlighted([]);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setSearchResult(`${value} not found`);
    codeSteps += `  return -1;\n}\nlinearSearch([${array}], ${value});`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  // Binary Search
  const binarySearch = async (): Promise<void> => {
    const arr: number[] = [...array].sort((a, b) => a - b); // Fixed: let to const
    setArray(arr);
    const value: number = Number(searchValue);
    let codeSteps: string = `function binarySearch(arr: number[], value: number) {\n  let left = 0;\n  let right = arr.length - 1;\n`;
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setHighlighted([mid]);
      codeSteps += `  let mid = Math.floor((${left} + ${right}) / 2);\n  if (arr[${mid}] === ${value}) return ${mid};\n`;
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (arr[mid] === value) {
        setSearchResult(`Found ${value} at index ${mid}`);
        setCode(codeSteps + `}\nbinarySearch([${arr}], ${value});`);
        setHighlighted([]);
        return;
      }
      if (arr[mid] < value) {
        left = mid + 1;
        codeSteps += `  if (arr[${mid}] < ${value}) left = ${mid} + 1;\n`;
      } else {
        right = mid - 1;
        codeSteps += `  else right = ${mid} - 1;\n`;
      }
    }
    setSearchResult(`${value} not found`);
    codeSteps += `  return -1;\n}\nbinarySearch([${arr}], ${value});`;
    setCode(codeSteps);
    setHighlighted([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Array </h2>

      {/* Visual Representation */}
      <div className="flex gap-3 mb-6">
        {array.map((num: number, idx: number) => (
          <motion.div
            key={idx}
            initial={{ y: 0, scale: 1 }}
            animate={{
              y: highlighted.includes(idx) ? -15 : 0,
              scale: highlighted.includes(idx) ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg shadow-sm text-lg font-semibold text-black ${
              highlighted.includes(idx) ? "bg-yellow-400 border-yellow-500" : "bg-blue-300 border-blue-400"
            }`}
          >
            {num}
          </motion.div>
        ))}
      </div>

      {/* Operations - Organized Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sorting */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Sort Array</label>
          <div className="flex gap-2">
            <select
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value as "bubble" | "insertion")}
              className="p-2 border rounded bg-gray-100 text-black"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>
            <button
              onClick={handleSort}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
            >
              Sort
            </button>
          </div>
        </div>

        {/* Sum */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Calculate Sum</label>
          <button
            onClick={calculateSum}
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
          >
            Sum
          </button>
          {sum !== null && <p className="text-black font-semibold">Sum: {sum}</p>}
        </div>

        {/* Insert */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Insert Element</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder="Value"
              className="p-2 border rounded w-24 text-black"
            />
            <button
              onClick={insertElement}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Insert
            </button>
          </div>
        </div>

        {/* Delete */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Delete Element</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={deleteIndex}
              onChange={(e) => setDeleteIndex(e.target.value)}
              placeholder="Index"
              className="p-2 border rounded w-24 text-black"
            />
            <button
              onClick={deleteElement}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Rotate */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Rotate Array</label>
          <button
            onClick={rotateArray}
            className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
          >
            Rotate
          </button>
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
              onClick={linearSearch}
              className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
            >
              Linear
            </button>
            <button
              onClick={binarySearch}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
            >
              Binary
            </button>
          </div>
          {searchResult && <p className="text-black font-semibold">{searchResult}</p>}
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;