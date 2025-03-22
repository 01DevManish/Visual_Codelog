import React, { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";
import { codeExamples } from "./codeExamples";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"javascript" | "cpp" | "java" | "python">("javascript");

  const getOperationFromCode = (code: string): keyof typeof codeExamples | null => {
    if (!code) return null;
    if (code.includes("insertElement")) return "insert";
    if (code.includes("deleteElement")) return "delete";
    if (code.includes("updateElement")) return "update";
    if (code.includes("traverseArray")) return "traverse";
    if (code.includes("mergeArrays")) return "merge";
    if (code.includes("splitArray")) return "split";
    if (code.includes("reverseArray")) return "reverse";
    if (code.includes("bubbleSort")) return "bubbleSort";
    if (code.includes("selectionSort")) return "selectionSort";
    if (code.includes("insertionSort")) return "insertionSort";
    if (code.includes("mergeSort")) return "mergeSort";
    if (code.includes("linearSearch")) return "linearSearch";
    if (code.includes("binarySearch")) return "binarySearch";
    return null;
  };

  const operation = getOperationFromCode(code);
  const displayCode = operation && codeExamples[operation] ? codeExamples[operation][activeTab] : code;

  useEffect(() => {
    if (codeRef.current && displayCode) {
      hljs.highlightElement(codeRef.current);
    }
  }, [displayCode, activeTab]);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg h-[500px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">Code Output</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("javascript")}
          className={`px-3 py-1 rounded ${
            activeTab === "javascript" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200 hover:bg-blue-500"
          }`}
        >
          JS
        </button>
        <button
          onClick={() => setActiveTab("cpp")}
          className={`px-3 py-1 rounded ${
            activeTab === "cpp" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200 hover:bg-blue-500"
          }`}
        >
          C++
        </button>
        <button
          onClick={() => setActiveTab("java")}
          className={`px-3 py-1 rounded ${
            activeTab === "java" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200 hover:bg-blue-500"
          }`}
        >
          Java
        </button>
        <button
          onClick={() => setActiveTab("python")}
          className={`px-3 py-1 rounded ${
            activeTab === "python" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200 hover:bg-blue-500"
          }`}
        >
          Python
        </button>
      </div>
      {displayCode ? (
        <div className="bg-white text-black p-4 rounded-lg shadow-md">
          <pre className="m-0 whitespace-pre-wrap overflow-wrap break-word">
            <code ref={codeRef} className={activeTab}>
              {displayCode}
            </code>
          </pre>
        </div>
      ) : (
        <div className="bg-white text-black p-4 rounded-lg shadow-md">
          <pre className="whitespace-pre-wrap m-0">No code executed yet.</pre>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;