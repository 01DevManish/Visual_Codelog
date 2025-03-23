// ArrayPage.tsx
"use client";
import { useState } from "react";
import ArrayVisualizer from "../../components/array/ArrayVisualizer";
import CodeDisplay from "../../components/array/CodeDisplay";


interface Section {
  subtitle: string;
  types: string;
  text: string;
  code?: string;
  examples?: Record<string, string | undefined>;
  example?: string;
}






const ArrayPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([5, 2, 9, 1, 7]);
  const [code, setCode] = useState<string>("");


 


  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-auto">
      {/* Upper Section: Visualizer and Code Display */}
      <div className="flex flex-1 w-full gap-6">
        <div className="w-2/3 h-full overflow-auto">
          <ArrayVisualizer array={array} setArray={setArray} setCode={setCode} />
        </div>
        <div className="w-1/3 h-full overflow-auto">
          <CodeDisplay code={code} />
        </div>
      </div>
      
    </div>
  );
};

export default ArrayPage;
