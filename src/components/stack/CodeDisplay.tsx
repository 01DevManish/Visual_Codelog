import React, { useEffect, useRef } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Default style import (aur styles available hain)

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  const codeRef = useRef<HTMLElement>(null);

  // Highlight code whenever the code prop changes
  useEffect(() => {
    if (codeRef.current && code) {
      // Highlight the code block
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg h-[500px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">Code Output</h2>
      {code ? (
        <pre>
          <code ref={codeRef} className="javascript">
            {code}
          </code>
        </pre>
      ) : (
        <pre className="whitespace-pre-wrap">No code executed yet.</pre>
      )}
    </div>
  );
};

export default CodeDisplay;