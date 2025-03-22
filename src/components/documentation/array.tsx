// components/ArrayDocumentation.tsx
import React, { useState } from "react";

const ArrayDocumentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"javascript" | "cpp" | "java" | "python">("javascript");

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Array Operations Documentation</h2>

      {/* Introduction to Arrays */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-black mb-2">What is an Array?</h3>
        <p className="text-black mb-2">
          An array is a data structure that stores a collection of elements (like numbers, strings, etc.) of the same
          type in a contiguous block of memory. It allows you to access elements using an index, starting from 0.
          Arrays are widely used for organizing data, performing operations like sorting, searching, and more.
        </p>
        <h3 className="text-lg font-semibold text-black mb-2">Why Use Arrays?</h3>
        <ul className="list-disc list-inside text-black mb-2">
          <li>Fast access to elements using indices (O(1) time).</li>
          <li>Efficient for storing and processing multiple items.</li>
          <li>Foundation for many algorithms (sorting, searching, etc.).</li>
        </ul>
        <h3 className="text-lg font-semibold text-black mb-2">How Arrays Are Implemented?</h3>
        <p className="text-black mb-2">
          Arrays are implemented as a fixed-size or dynamic-size collection, depending on the language. In languages
          like C++ and Java, you can use static arrays (fixed size) or dynamic arrays (like `vector` or `ArrayList`).
          In Python and JavaScript, arrays are inherently dynamic.
        </p>
      </div>

      {/* Tabs */}
      <h3 className="text-lg font-semibold text-black mb-2">Language-Specific Examples</h3>
      <p className="text-black mb-4">
        Below are examples of array declaration, initialization, and operations in different languages. Use the tabs
        to switch between languages and copy-paste code into the "Try Your Code" section above.
      </p>
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
          <h3 className="text-lg font-semibold text-black mb-2">JavaScript Arrays</h3>
          <p className="text-black mb-2">
            In JavaScript, arrays are dynamic and can hold mixed data types. They are declared using square brackets or
            the `Array` constructor.
          </p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Declaration and Initialization
let arr = [1, 2, 3, 4, 5] // Simple array
let arr2 = new Array(5) // Array with 5 empty slots
arr2[0] = 10 // Assign value
`}
          </pre>
          <p className="text-black mb-2">Basic array declaration and initialization in JavaScript.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Add Element
async function customOperation(arr, setHighlighted, delay) {
  arr.push(15) // Adds 15 to the end
  return arr
}`}
          </pre>
          <p className="text-black mb-2">Adds an element to the end of the array.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Delete Element
async function customOperation(arr, setHighlighted, delay) {
  arr.splice(0, 1) // Removes element at index 0
  return arr
}`}
          </pre>
          <p className="text-black mb-2">Deletes an element at the specified index.</p>
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
          <p className="text-black mb-2">Sorts the array with animation for each swap.</p>
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
          <p className="text-black mb-2">Searches for a value with animation.</p>
        </div>
      )}

      {activeTab === "cpp" && (
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">C++ Arrays</h3>
          <p className="text-black mb-2">
            In C++, arrays can be static (fixed size) or dynamic (using `vector`). Static arrays are declared with a
            size, while `vector` grows dynamically.
          </p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Static Array Declaration
int arr[5] = {1, 2, 3, 4, 5} // Fixed size array

// Dynamic Array (vector)
#include <vector>
vector<int> vec = {1, 2, 3, 4, 5} // Dynamic size
`}
          </pre>
          <p className="text-black mb-2">Static and dynamic array declaration in C++.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Add Element (vector)
vector<int> customOperation(vector<int> arr) {
  arr.push_back(15)
  return arr
}`}
          </pre>
          <p className="text-black mb-2">Adds an element to the end of a vector.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Delete Element (vector)
vector<int> customOperation(vector<int> arr) {
  arr.erase(arr.begin() + 0) // Remove at index 0
  return arr
}`}
          </pre>
          <p className="text-black mb-2">Deletes an element at index 0 from a vector.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Bubble Sort (vector)
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
          <p className="text-black mb-2">Sorts a vector with animation.</p>
          <pre className="bg-gray-800 text-white p-2 rounded">
{`// Linear Search (vector)
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
          <p className="text-black mb-2">Searches for 9 in a vector with animation.</p>
        </div>
      )}

      {activeTab === "java" && (
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">Java Arrays</h3>
          <p className="text-black mb-2">
            In Java, arrays are static (fixed size), but `ArrayList` provides dynamic resizing. Arrays are declared
            with a type and size, while `ArrayList` uses generics.
          </p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Static Array Declaration
int[] arr = {1, 2, 3, 4, 5} // Fixed size array

// Dynamic Array (ArrayList)
import java.util.ArrayList;
ArrayList<Integer> list = new ArrayList<>();
list.add(1); list.add(2); list.add(3); // Initial elements
`}
          </pre>
          <p className="text-black mb-2">Static and dynamic array declaration in Java.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Add Element (ArrayList)
ArrayList<Integer> customOperation(ArrayList<Integer> arr) {
  arr.add(15)
  return arr
}`}
          </pre>
          <p className="text-black mb-2">Adds 15 to an ArrayList.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Delete Element (ArrayList)
ArrayList<Integer> customOperation(ArrayList<Integer> arr) {
  arr.remove(0) // Remove at index 0
  return arr
}`}
          </pre>
          <p className="text-black mb-2">Removes element at index 0 from an ArrayList.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`// Bubble Sort (ArrayList)
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
          <p className="text-black mb-2">Sorts an ArrayList (no animation).</p>
          <pre className="bg-gray-800 text-white p-2 rounded">
{`// Linear Search (ArrayList)
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
          <p className="text-black mb-2">Searches for 9 in an ArrayList (no animation).</p>
        </div>
      )}

      {activeTab === "python" && (
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">Python Arrays</h3>
          <p className="text-black mb-2">
            In Python, "arrays" are typically implemented as dynamic lists. Python also has a separate `array` module
            for fixed-type arrays, but lists are more common.
          </p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`# List Declaration
arr = [1, 2, 3, 4, 5] # Dynamic list

# Using array module (less common)
import array
arr2 = array.array('i', [1, 2, 3, 4, 5]) # 'i' for integer
`}
          </pre>
          <p className="text-black mb-2">Dynamic list and array module declaration in Python.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`# Add Element
def customOperation(arr):
  arr.append(15)
  return arr`}
          </pre>
          <p className="text-black mb-2">Adds 15 to the end of a list.</p>
          <pre className="bg-gray-800 text-white p-2 rounded mb-2">
{`# Delete Element
def customOperation(arr):
  arr.pop(0) # Remove at index 0
  return arr`}
          </pre>
          <p className="text-black mb-2">Removes element at index 0 from a list.</p>
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
          <p className="text-black mb-2">Sorts a list with animation.</p>
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
          <p className="text-black mb-2">Searches for 9 in a list with animation.</p>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-black mb-2">More About Arrays</h3>
        <p className="text-black mb-2">
          Arrays are fundamental in programming. Here are some key points and tips:
        </p>
        <ul className="list-disc list-inside text-black mb-2">
          <li>
            <strong>Time Complexity</strong>:
            <ul className="list-circle list-inside ml-4">
              <li>Access: O(1)</li>
              <li>Insert/Delete (at end): O(1) for dynamic arrays</li>
              <li>Insert/Delete (at start/middle): O(n)</li>
              <li>Bubble Sort: O(n²)</li>
              <li>Linear Search: O(n)</li>
            </ul>
          </li>
          <li>
            Use `setHighlighted([index])` to highlight elements in the visualizer (e.g., `[0]` or `[1, 2]`).
          </li>
          <li>Use `delay(500)` or `await delay(500)` for animation delays (500ms).</li>
          <li>Return the array for operations like add, delete, sort.</li>
          <li>Return an index (or -1) for search operations.</li>
        </ul>
        <h3 className="text-lg font-semibold text-black mb-2">Common Use Cases</h3>
        <p className="text-black mb-2">
          - Storing a list of items (e.g., numbers, names).
          <br />- Implementing stacks and queues.
          <br />- Basis for sorting and searching algorithms.
        </p>
      </div>
    </div>
  );
};

export default ArrayDocumentation;