"use client";
import { useState } from "react";
import StackVisualizer from "../../components/stack/StackVisualizer";
import CodeDisplay from "../../components/stack/CodeDisplay"; // Correct path assuming components folder

const StackPage: React.FC = () => {
  const [stack, setStack] = useState<number[]>([5, 2, 9]);
  const [code, setCode] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Visualizer and Code Side-by-Side */}
      <div className="flex w-full max-w-6xl gap-6">
        <div className="w-2/3">
          <StackVisualizer stack={stack} setStack={setStack} setCode={setCode} />
        </div>
        <div className="w-1/3">
          <CodeDisplay code={code} />
        </div>
      </div>
    </div>
  );
};

export default StackPage;
