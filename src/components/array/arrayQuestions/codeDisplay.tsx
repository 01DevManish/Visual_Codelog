import React, { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";
import { questionCode } from "./codeQuestions"; // Tumhara questionCode.ts file

// Languages register karo highlight.js ke saath
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);

interface CodeDisplayProps {
  slug: string; // Slug prop jo question identify karega
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ slug }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"javascript" | "cpp" | "python" | "java">("javascript");

  // Slug ke basis pe code fetch karo
  const codeData = questionCode[slug as keyof typeof questionCode];
  const displayCode = codeData ? codeData[activeTab] : "Koi code nahi mila abhi tak.";

  // Jab activeTab ya displayCode change ho, tab highlighting apply karo
  useEffect(() => {
    if (codeRef.current && displayCode) {
      codeRef.current.innerHTML = displayCode; // Raw code set karo
      hljs.highlightElement(codeRef.current); // Highlight karo
    }
  }, [displayCode, activeTab]);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg h-[500px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">{slug.toUpperCase()} - Code Dekho</h2>
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
      {codeData && (
        <p className="mt-4 text-gray-300">{codeData.description}</p> // Description bhi dikhayenge
      )}
    </div>
  );
};

export default CodeDisplay;