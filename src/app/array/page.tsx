"use client";
import { useState } from "react";
import ArrayVisualizer from "../../components/ArrayVisualizer";
import CodeDisplay from "../../components/CodeDisplay"; // Correct path assuming components folder

const ArrayPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([5, 2, 9, 1, 7]);
  const [code, setCode] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Visualizer and Code Side-by-Side */}
      <div className="flex w-full max-w-6xl gap-6">
        <div className="w-2/3">
          <ArrayVisualizer array={array} setArray={setArray} setCode={setCode} />
        </div>
        <div className="w-1/3">
          <CodeDisplay code={code} />
        </div>
      </div>
    </div>
  );
};

export default ArrayPage;