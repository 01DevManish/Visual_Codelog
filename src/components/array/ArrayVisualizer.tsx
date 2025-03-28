// ArrayVisualizer.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { arrayElementVariants, containerVariants } from "./animations";
import { codeExamples } from "./codeExamples";

interface ArrayVisualizerProps {
  array: number[];
  setArray: (array: number[]) => void;
  setCode: (code: string) => void;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array, setArray, setCode }) => {
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [operation, setOperation] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  const [insertValue, setInsertValue] = useState<string>("");
  const [insertIndex, setInsertIndex] = useState<string>("");
  const [updateIndex, setUpdateIndex] = useState<string>("");
  const [updateValue, setUpdateValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [deleteIndex, setDeleteIndex] = useState<string>("");
  const [splitIndex, setSplitIndex] = useState<string>("");
  const [secondArray, setSecondArray] = useState<number[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("bubble");
  const [searchMethod, setSearchMethod] = useState<string>("linear");

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Helper function to check if array is sorted
  const isArraySorted = (arr: number[]): boolean => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  // Basic Operations
  const insertElement = async (): Promise<void> => {
    const numValue = Number(insertValue);
    const index = Number(insertIndex) || array.length;
    if (!isNaN(numValue)) {
      setOperation("inserted");
      const arr = [...array];
      arr.splice(index, 0, numValue);
      setArray(arr);
      setHighlighted([index]);
      setCode(codeExamples.insert.javascript);
      setMessage(`Inserted ${numValue} at index ${index}`);
      await delay(500);
      setOperation("");
      setHighlighted([]);
      setInsertValue("");
      setInsertIndex("");
      await delay(2000);
      setMessage("");
    }
  };

  const updateElement = async (): Promise<void> => {
    const index = Number(updateIndex);
    const value = Number(updateValue);
    if (!isNaN(index) && index >= 0 && index < array.length && !isNaN(value)) {
      setOperation("updated");
      setHighlighted([index]);
      const arr = [...array];
      arr[index] = value;
      setArray(arr);
      setCode(codeExamples.update.javascript);
      setMessage(`Updated index ${index} to value ${value}`);
      await delay(400);
      setHighlighted([]);
      setOperation("");
      setUpdateIndex("");
      setUpdateValue("");
      await delay(2000);
      setMessage("");
    }
  };

  const linearSearch = async (): Promise<void> => {
    const value = Number(searchValue);
    for (let i = 0; i < array.length; i++) {
      setHighlighted([i]);
      setOperation("highlighted");
      if (array[i] === value) {
        setOperation("searched");
        setSearchResult(`Found ${value} at index ${i}`);
        setCode(codeExamples.linearSearch.javascript);
        setMessage(`Found ${value} at index ${i} using Linear Search`);
        await delay(600);
        setHighlighted([]);
        setOperation("");
        await delay(2000);
        setMessage("");
        setSearchValue("");
        return;
      }
      await delay(500);
    }
    setSearchResult(`${value} not found`);
    setCode(codeExamples.linearSearch.javascript);
    setMessage(`${value} not found in array using Linear Search`);
    setHighlighted([]);
    setOperation("");
    await delay(2000);
    setMessage("");
    setSearchValue("");
  };

  const binarySearch = async (): Promise<void> => {
    if (!isArraySorted(array)) {
      setMessage("Sort the array first for applying Binary Search");
      await delay(2000);
      setMessage("");
      return;
    }
    const value = Number(searchValue);
    let left = 0, right = array.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setHighlighted([mid]);
      setOperation("highlighted");
      if (array[mid] === value) {
        setOperation("searched");
        setSearchResult(`Found ${value} at index ${mid}`);
        setCode(codeExamples.binarySearch.javascript);
        setMessage(`Found ${value} at index ${mid} using Binary Search`);
        await delay(600);
        setHighlighted([]);
        setOperation("");
        await delay(2000);
        setMessage("");
        setSearchValue("");
        return;
      }
      if (array[mid] < value) left = mid + 1;
      else right = mid - 1;
      await delay(500);
    }
    setSearchResult(`${value} not found`);
    setCode(codeExamples.binarySearch.javascript);
    setMessage(`${value} not found in array using Binary Search`);
    setHighlighted([]);
    setOperation("");
    await delay(2000);
    setMessage("");
    setSearchValue("");
  };

  const reverseArray = async (): Promise<void> => {
    setOperation("rotated");
    const arr = [...array].reverse();
    setArray(arr);
    setCode(codeExamples.reverse.javascript);
    setMessage("Array reversed");
    await delay(700);
    setOperation("");
    await delay(2000);
    setMessage("");
  };

  const deleteElement = async (): Promise<void> => {
    const index = Number(deleteIndex);
    if (!isNaN(index) && index >= 0 && index < array.length) {
      setOperation("deleted");
      setHighlighted([index]);
      await delay(500);
      const arr = [...array];
      const deletedValue = arr.splice(index, 1)[0];
      setArray(arr);
      setCode(codeExamples.delete.javascript);
      setMessage(`Deleted ${deletedValue} from index ${index}`);
      setHighlighted([]);
      setOperation("");
      setDeleteIndex("");
      await delay(2000);
      setMessage("");
    }
  };

  const splitArray = async (): Promise<void> => {
    const index = Number(splitIndex);
    if (!isNaN(index) && index > 0 && index < array.length) {
      setOperation("split");
      const arr1 = array.slice(0, index);
      const arr2 = array.slice(index);
      setArray(arr1);
      setSecondArray(arr2);
      setCode(codeExamples.split.javascript);
      setMessage(`Array split at index ${index}`);
      await delay(500);
      setOperation("");
      setSplitIndex("");
      await delay(2000);
      setMessage("");
    }
  };

  const mergeArrays = async (): Promise<void> => {
    setOperation("merged");
    const arr = [...array, ...secondArray];
    setArray(arr);
    setCode(codeExamples.merge.javascript);
    setMessage(`Merged array with [${secondArray.join(", ")}]`);
    await delay(500);
    setOperation("");
    setSecondArray([]);
    await delay(2000);
    setMessage("");
  };

  const traverseArray = async (): Promise<void> => {
    for (let i = 0; i < array.length; i++) {
      setHighlighted([i]);
      await delay(300);
    }
    setCode(codeExamples.traverse.javascript);
    setMessage("Array traversed");
    setHighlighted([]);
    await delay(2000);
    setMessage("");
  };

  // Sorting Algorithms
  const bubbleSort = async (): Promise<void> => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setHighlighted([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await delay(500);
        }
      }
    }
    setCode(codeExamples.bubbleSort.javascript);
    setHighlighted([]);
    setOperation("sorted");
    setMessage("Array sorted using Bubble Sort");
    await delay(500);
    setOperation("");
    await delay(2000);
    setMessage("");
  };

  const selectionSort = async (): Promise<void> => {
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        setHighlighted([minIdx, j]);
        if (arr[j] < arr[minIdx]) minIdx = j;
        await delay(300);
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await delay(500);
      }
    }
    setCode(codeExamples.selectionSort.javascript);
    setHighlighted([]);
    setOperation("sorted");
    setMessage("Array sorted using Selection Sort");
    await delay(500);
    setOperation("");
    await delay(2000);
    setMessage("");
  };

  const insertionSort = async (): Promise<void> => {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      setHighlighted([i]);
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await delay(500);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setCode(codeExamples.insertionSort.javascript);
    setHighlighted([]);
    setOperation("sorted");
    setMessage("Array sorted using Insertion Sort");
    await delay(500);
    setOperation("");
    await delay(2000);
    setMessage("");
  };

  const mergeSort = async (arr = [...array], start = 0, end = array.length - 1): Promise<void> => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
    setArray([...arr]);
    setCode(codeExamples.mergeSort.javascript);
    setOperation("sorted");
    setMessage("Array sorted using Merge Sort");
    await delay(500);
    setOperation("");
    await delay(2000);
    setMessage("");
  };

  const merge = async (arr: number[], start: number, mid: number, end: number): Promise<void> => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      setHighlighted([k]);
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
      setArray([...arr]);
      await delay(300);
    }
    while (i < left.length) {
      setHighlighted([k]);
      arr[k++] = left[i++];
      setArray([...arr]);
      await delay(300);
    }
    while (j < right.length) {
      setHighlighted([k]);
      arr[k++] = right[j++];
      setArray([...arr]);
      await delay(300);
    }
  };

  const handleSort = () => {
    switch (sortMethod) {
      case "bubble":
        bubbleSort();
        break;
      case "selection":
        selectionSort();
        break;
      case "insertion":
        insertionSort();
        break;
      case "merge":
        mergeSort();
        break;
    }
  };

  const handleSearch = () => {
    switch (searchMethod) {
      case "linear":
        linearSearch();
        break;
      case "binary":
        binarySearch();
        break;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Array Visualizer</h2>

      {/* Visual Representation */}
      <motion.div className="flex gap-3 mb-6" variants={containerVariants} initial="initial" animate="animate">
        {array.map((num, idx) => (
          <motion.div
            key={idx}
            variants={arrayElementVariants}
            initial="initial"
            animate={
              highlighted.includes(idx)
                ? operation === "searched"
                  ? "searched"
                  : "highlighted"
                : operation === "sorted"
                ? "sorted"
                : operation === "inserted" && idx === Number(insertIndex)
                ? "inserted"
                : operation === "deleted" && idx === Number(deleteIndex)
                ? "deleted"
                : operation === "updated" && idx === Number(updateIndex)
                ? "updated"
                : operation === "rotated"
                ? "rotated"
                : operation === "merged" && idx >= array.length - secondArray.length
                ? "merged"
                : operation === "split" && idx >= Number(splitIndex)
                ? "split"
                : "initial"
            }
            className="w-14 h-14 flex items-center justify-center border-2 rounded-lg shadow-sm text-lg font-semibold text-black"
          >
            {num}
          </motion.div>
        ))}
      </motion.div>
      {secondArray.length > 0 && (
        <motion.div className="flex gap-3 mb-6" variants={containerVariants} initial="initial" animate="animate">
          {secondArray.map((num, idx) => (
            <motion.div
              key={idx}
              variants={arrayElementVariants}
              initial="initial"
              animate={operation === "split" ? "split" : "initial"}
              className="w-14 h-14 flex items-center justify-center border-2 rounded-lg shadow-sm text-lg font-semibold text-black"
            >
              {num}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Message Display */}
      {message && (
        <div className="mb-6 p-2 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}

      {/* Operations - Two Columns */}
      <div className="flex gap-6">
        {/* Left Column: Insert, Update, Search, Reverse */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Insert Element</label>
            <div className="flex gap-2">
              <input type="text" value={insertValue} onChange={(e) => setInsertValue(e.target.value)} placeholder="Value" className="p-2 border rounded w-24 text-black" />
              <input type="text" value={insertIndex} onChange={(e) => setInsertIndex(e.target.value)} placeholder="Index (optional)" className="p-2 border rounded w-24 text-black" />
              <button onClick={insertElement} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Insert</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Update Element</label>
            <div className="flex gap-2">
              <input type="text" value={updateIndex} onChange={(e) => setUpdateIndex(e.target.value)} placeholder="Index" className="p-2 border rounded w-24 text-black" />
              <input type="text" value={updateValue} onChange={(e) => setUpdateValue(e.target.value)} placeholder="Value" className="p-2 border rounded w-24 text-black" />
              <button onClick={updateElement} className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition">Update</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Search Value</label>
            <div className="flex gap-2">
              <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Value" className="p-2 border rounded w-24 text-black" />
              <select value={searchMethod} onChange={(e) => setSearchMethod(e.target.value)} className="p-2 border rounded bg-gray-100 text-black">
                <option value="linear">Linear Search</option>
                <option value="binary">Binary Search</option>
              </select>
              <button onClick={handleSearch} className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition">Search</button>
            </div>
            {searchResult && <p className="text-black font-semibold">{searchResult}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Reverse Array</label>
            <button onClick={reverseArray} className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition w-24">Reverse</button>
          </div>
        </div>

        {/* Right Column: Delete, Split, Merge, Traverse, Sort */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Delete Element</label>
            <div className="flex gap-2">
              <input type="text" value={deleteIndex} onChange={(e) => setDeleteIndex(e.target.value)} placeholder="Index" className="p-2 border rounded w-24 text-black" />
              <button onClick={deleteElement} className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition">Delete</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Split Array</label>
            <div className="flex gap-2">
              <input type="text" value={splitIndex} onChange={(e) => setSplitIndex(e.target.value)} placeholder="Index" className="p-2 border rounded w-24 text-black" />
              <button onClick={splitArray} className="bg-rose-600 text-white p-2 rounded hover:bg-rose-700 transition">Split</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Merge Arrays</label>
            <div className="flex gap-2">
              <input type="text" value={secondArray.join(",")} onChange={(e) => setSecondArray(e.target.value.split(",").map(Number))} placeholder="Second Array (e.g., 1,2,3)" className="p-2 border rounded w-24 text-black" />
              <button onClick={mergeArrays} className="bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition">Merge</button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Sort Array</label>
            <div className="flex gap-2">
              <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)} className="p-2 border rounded bg-gray-100 text-black">
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="merge">Merge Sort</option>
              </select>
              <button onClick={handleSort} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">Sort</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black font-medium">Traverse Array</label>
            <button onClick={traverseArray} className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition w-24">Traverse</button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
