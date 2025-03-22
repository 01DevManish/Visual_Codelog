"use client";
import { useState } from "react";
import TreeVisualizer from "../../components/TreeVisualizer";
import CodeDisplay from "../../components/CodeDisplay";

const TreePage: React.FC = () => {
  const [code, setCode] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="flex w-full max-w-6xl gap-6">
        <div className="w-2/3">
          <TreeVisualizer setCode={setCode} />
        </div>
        <div className="w-1/3">
          <CodeDisplay code={code} />
        </div>
      </div>
    </div>
  );
};

export default TreePage;