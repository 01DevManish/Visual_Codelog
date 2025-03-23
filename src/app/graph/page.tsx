"use client";
import { useState } from "react";
import GraphVisualizer from "../../components/graph/GraphVisualizer";
import CodeDisplay from "../../components/graph/CodeDisplay";

const GraphPage: React.FC = () => {
  const [code, setCode] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="flex w-full max-w-6xl gap-6">
        <div className="w-2/3">
          <GraphVisualizer setCode={setCode} />
        </div>
        <div className="w-1/3">
          <CodeDisplay code={code} />
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
