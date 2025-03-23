import React, { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";
import treeCodeExamples from "./treeCodeExamples";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);

interface CodeDisplayProps {
  code: string;
}

interface CodeExamples {
  cpp: string;
  js: string;
  java: string;
  py: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"javascript" | "cpp" | "java" | "python">("javascript");

  const parseCodeString = (code: string): { treeType: string | null; operation: string | null } => {
    if (!code) return { treeType: null, operation: null };
    const match = code.match(/\/\/\s*(\w+)\s+(\w+)/); // e.g., "// BST Insert"
    if (match) {
      const [, treeType, operation] = match;
      return { treeType, operation: operation.toLowerCase() };
    }
    return { treeType: null, operation: null };
  };

  const { treeType, operation } = parseCodeString(code);
  const displayCode: string = (() => {
    if (treeType && operation && treeCodeExamples[treeType]?.[operation]) {
      const examples = treeCodeExamples[treeType][operation] as CodeExamples;
      const languageMap: Record<"javascript" | "cpp" | "java" | "python", keyof CodeExamples> = {
        javascript: "js",
        cpp: "cpp",
        java: "java",
        python: "py",
      };
      return examples[languageMap[activeTab]] || "No code available for this operation";
    }
    return code || "No tree operation executed yet.";
  })();

  useEffect(() => {
    if (codeRef.current && displayCode) {
      hljs.highlightElement(codeRef.current);
    }
  }, [displayCode, activeTab]);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg h-[500px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">Tree Code Output</h2>
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
      <div className="bg-white text-black p-4 rounded-lg shadow-md">
        <pre className="m-0 whitespace-pre-wrap overflow-wrap break-word">
          <code ref={codeRef} className={activeTab}>
            {displayCode}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeDisplay;