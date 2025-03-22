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
  const [customCode, setCustomCode] = useState<string>("");
  const [language, setLanguage] = useState<"javascript" | "cpp" | "java" | "python">("javascript");
  const [activeTab, setActiveTab] = useState<"javascript" | "cpp" | "java" | "python">("javascript");

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Improved code conversion to JS
  const convertToJS = (code: string, lang: string): string => {
    let jsCode = "";
    switch (lang) {
      case "javascript":
        jsCode = code;
        break;
      case "cpp":
        jsCode = code
          .replace(/vector<int>\s*customOperation\s*\(vector<int>\s*arr.*?\)\s*{/, "async function customOperation(arr, setHighlighted, delay) {")
          .replace(/arr\.push_back\((.*?)\)/g, "arr.push($1)")
          .replace(/arr\.erase\(arr\.begin\(\)\s*\+\s*(\d+)\)/g, "arr.splice($1, 1)")
          .replace(/int\s+/g, "let ")
          .replace(/arr\.size\(\)/g, "arr.length")
          .replace(/cout\s*<<\s*(.*?)\s*<<\s*endl/g, "console.log($1)")
          .replace(/;/g, "")
          .replace(/return\s+arr\s*$/, "return arr\n}")
          .replace(/delay\((\d+)\)/g, "await delay($1)");
        break;
      case "java":
        jsCode = code
          .replace(/ArrayList<Integer>\s*customOperation\s*\(ArrayList<Integer>\s*arr\)\s*{/, "async function customOperation(arr, setHighlighted, delay) {")
          .replace(/arr\.add\((.*?)\)/g, "arr.push($1)")
          .replace(/arr\.remove\((\d+)\)/g, "arr.splice($1, 1)")
          .replace(/arr\.get\((\d+)\)/g, "arr[$1]")
          .replace(/arr\.set\((\d+),\s*(.*?)\)/g, "arr[$1] = $2")
          .replace(/int\s+/g, "let ")
          .replace(/arr\.size\(\)/g, "arr.length")
          .replace(/System\.out\.println\((.*?)\)/g, "console.log($1)")
          .replace(/;/g, "")
          .replace(/return\s+arr\s*$/, "return arr\n}");
        break;
      case "python":
        jsCode = code
          .replace(/def\s+customOperation\s*\(arr.*?\):/, "async function customOperation(arr, setHighlighted, delay) {")
          .replace(/arr\.append\((.*?)\)/g, "arr.push($1)")
          .replace(/arr\.pop\((\d+)\)/g, "arr.splice($1, 1)")
          .replace(/print\((.*?)\)/g, "console.log($1)")
          .replace(/range\(len\(arr\)\)/g, "0; i < arr.length; i++")
          .replace(/range\((\d+),\s*len\(arr\)\)/g, "$1; i < arr.length; i++")
          .replace(/delay\((\d+)\)/g, "await delay($1)")
          .replace(/return\s+arr\s*$/, "return arr\n}")
          .replace(/^\s+/gm, ""); // Remove leading whitespace
        break;
      default:
        jsCode = code;
    }
    if (!jsCode.includes("async")) {
      jsCode = `async function customOperation(arr, setHighlighted, delay) {\n${jsCode}\nreturn arr;\n}`;
    }
    return jsCode;
  };

  // Execute Custom Code with Animation Support
  const executeCustomCode = async () => {
    try {
      const jsCode = convertToJS(customCode, language);
      const func = new Function("arr", "setHighlighted", "delay", `
        ${jsCode}
        return customOperation(arr, setHighlighted, delay);
      `);
      const result = await func([...array], setHighlighted, delay);
      if (Array.isArray(result)) {
        setArray(result);
      } else if (typeof result === "number") {
        setSearchResult(result >= 0 ? `Found at index ${result}` : "Not found");
      }
      setHighlighted([]);
    } catch (error) {
      console.error("Error executing custom code:", error);
    }
  };

  // Built-in operations (unchanged for brevity)
  const bubbleSort = async (): Promise<void> => {
    const arr: number[] = [...array];
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
    setCode(`
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`);
    setHighlighted([]);
  };

  const insertionSort = async (): Promise<void> => {
    const arr: number[] = [...array];
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
    setCode(`
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`);
    setHighlighted([]);
  };

  const handleSort = () => {
    if (sortMethod === "bubble") bubbleSort();
    else if (sortMethod === "insertion") insertionSort();
  };

  const calculateSum = (): void => {
    const total: number = array.reduce((a, b) => a + b, 0);
    setSum(total);
    setCode(`
function calculateSum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}`);
  };

  const rotateArray = (): void => {
    const arr: number[] = [...array];
    arr.push(arr.shift() as number);
    setArray(arr);
    setCode(`
function rotateArray(arr) {
  arr.push(arr.shift());
  return arr;
}`);
  };

  const insertElement = (): void => {
    const numValue: number = Number(insertValue);
    if (!isNaN(numValue)) {
      setArray([...array, numValue]);
      setCode(`
function insertElement(arr, value) {
  arr.push(value);
  return arr;
}`);
      setInsertValue("");
    }
  };

  const deleteElement = (): void => {
    const index: number = Number(deleteIndex);
    if (!isNaN(index) && index >= 0 && index < array.length) {
      const arr: number[] = [...array];
      arr.splice(index, 1);
      setArray(arr);
      setCode(`
function deleteElement(arr, index) {
  arr.splice(index, 1);
  return arr;
}`);
      setDeleteIndex("");
    }
  };

  const linearSearch = async (): Promise<void> => {
    const value: number = Number(searchValue);
    for (let i = 0; i < array.length; i++) {
      setHighlighted([i]);
      if (array[i] === value) {
        setSearchResult(`Found ${value} at index ${i}`);
        setCode(`
function linearSearch(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}`);
        await delay(500);
        setHighlighted([]);
        return;
      }
      await delay(500);
    }
    setSearchResult(`${value} not found`);
    setCode(`
function linearSearch(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}`);
    setHighlighted([]);
  };

  const binarySearch = async (): Promise<void> => {
    const arr: number[] = [...array].sort((a, b) => a - b);
    setArray(arr);
    const value: number = Number(searchValue);
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setHighlighted([mid]);
      if (arr[mid] === value) {
        setSearchResult(`Found ${value} at index ${mid}`);
        setCode(`
function binarySearch(arr, value) {
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === value) {
      return mid;
    }
    if (arr[mid] < value) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`);
        await delay(500);
        setHighlighted([]);
        return;
      }
      if (arr[mid] < value) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
      await delay(500);
    }
    setSearchResult(`${value} not found`);
    setCode(`
function binarySearch(arr, value) {
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === value) {
      return mid;
    }
    if (arr[mid] < value) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`);
    setHighlighted([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Array Visualizer</h2>

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

      {/* Operations */}
      <div className="grid grid-cols-2 gap-4 mb-6">
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

        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Rotate Array</label>
          <button
            onClick={rotateArray}
            className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
          >
            Rotate
          </button>
        </div>

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

      {/* Custom Code Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Try Your Code</h2>
        <div className="flex gap-2 mb-4">
          <label className="text-black font-medium">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "javascript" | "cpp" | "java" | "python")}
            className="p-2 border rounded bg-gray-100 text-black"
          >
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <textarea
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="w-full h-40 p-4 bg-gray-800 text-white font-mono text-sm rounded-lg mb-4"
          placeholder="Write your custom code here..."
        />
        <button
          onClick={executeCustomCode}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Run Code
        </button>
      </div>

      {/* Documentation Section with Tabs */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-black">Examples</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab("javascript")}
              className={`p-2 ${activeTab === "javascript" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} rounded`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setActiveTab("cpp")}
              className={`p-2 ${activeTab === "cpp" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} rounded`}
            >
              C++
            </button>
            <button
              onClick={() => setActiveTab("java")}
              className={`p-2 ${activeTab === "java" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} rounded`}
            >
              Java
            </button>
            <button
              onClick={() => setActiveTab("python")}
              className={`p-2 ${activeTab === "python" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} rounded`}
            >
              Python
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "javascript" && (
            <div>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Add Element
async function customOperation(arr, setHighlighted, delay) {
  arr.push(15)
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Delete Element
async function customOperation(arr, setHighlighted, delay) {
  arr.splice(0, 1) // Remove at index 0
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Bubble Sort
async function customOperation(arr, setHighlighted, delay) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setHighlighted([j, j + 1])
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
      await delay(500)
    }
  }
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded">
{`// Linear Search
async function customOperation(arr, setHighlighted, delay) {
  let value = 9
  for (let i = 0; i < arr.length; i++) {
    setHighlighted([i])
    if (arr[i] === value) {
      await delay(500)
      return i
    }
    await delay(500)
  }
  return -1
}`}
              </pre>
            </div>
          )}

          {activeTab === "cpp" && (
            <div>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Add Element
vector<int> customOperation(vector<int> arr) {
  arr.push_back(15)
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Delete Element
vector<int> customOperation(vector<int> arr) {
  arr.erase(arr.begin() + 0) // Remove at index 0
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Bubble Sort
vector<int> customOperation(vector<int> arr, function<void(vector<int>)> setHighlighted, function<void(int)> delay) {
  for (int i = 0; i < arr.size(); i++) {
    for (int j = 0; j < arr.size() - i - 1; j++) {
      setHighlighted({j, j + 1})
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
      delay(500)
    }
  }
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded">
{`// Linear Search
int customOperation(vector<int> arr, function<void(vector<int>)> setHighlighted, function<void(int)> delay) {
  int value = 9
  for (int i = 0; i < arr.size(); i++) {
    setHighlighted({i})
    if (arr[i] == value) {
      delay(500)
      return i
    }
    delay(500)
  }
  return -1
}`}
              </pre>
            </div>
          )}

          {activeTab === "java" && (
            <div>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Add Element
ArrayList<Integer> customOperation(ArrayList<Integer> arr) {
  arr.add(15)
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Delete Element
ArrayList<Integer> customOperation(ArrayList<Integer> arr) {
  arr.remove(0) // Remove at index 0
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Bubble Sort
ArrayList<Integer> customOperation(ArrayList<Integer> arr) {
  for (int i = 0; i < arr.size(); i++) {
    for (int j = 0; j < arr.size() - i - 1; j++) {
      if (arr.get(j) > arr.get(j + 1)) {
        int temp = arr.get(j)
        arr.set(j, arr.get(j + 1))
        arr.set(j + 1, temp)
      }
    }
  }
  return arr
}`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded">
{`// Linear Search
int customOperation(ArrayList<Integer> arr) {
  int value = 9
  for (int i = 0; i < arr.size(); i++) {
    if (arr.get(i) == value) {
      return i
    }
  }
  return -1
}`}
              </pre>
            </div>
          )}

          {activeTab === "python" && (
            <div>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`# Add Element
def customOperation(arr):
  arr.append(15)
  return arr`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`# Delete Element
def customOperation(arr):
  arr.pop(0) # Remove at index 0
  return arr`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`# Bubble Sort
def customOperation(arr, setHighlighted, delay):
  for i in range(len(arr)):
    for j in range(len(arr) - i - 1):
      setHighlighted([j, j + 1])
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
      delay(500)
  return arr`}
              </pre>
              <pre className="bg-gray-800 text-white p-2 rounded">
{`# Linear Search
def customOperation(arr, setHighlighted, delay):
  value = 9
  for i in range(len(arr)):
    setHighlighted([i])
    if arr[i] == value:
      delay(500)
      return i
    delay(500)
  return -1`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
