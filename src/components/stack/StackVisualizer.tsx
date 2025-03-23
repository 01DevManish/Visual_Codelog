import { useState } from "react";
import { motion } from "framer-motion";

interface StackVisualizerProps {
  stack: number[];
  setStack: (stack: number[]) => void;
  setCode: (code: string) => void;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({ stack, setStack, setCode }) => {
  const [highlighted, setHighlighted] = useState<number>(-1); // Top element highlight karne ke liye
  const [pushValue, setPushValue] = useState<string>("");
  const [peekValue, setPeekValue] = useState<number | null>(null);
  const [isEmptyResult, setIsEmptyResult] = useState<string>("");

  // Push Operation
  const pushElement = (): void => {
    const numValue: number = Number(pushValue);
    if (!isNaN(numValue)) {
      const newStack = [...stack, numValue];
      setStack(newStack);
      setHighlighted(newStack.length - 1); // Highlight top element
      setCode(
        `function push(stack: number[], value: number) {\n  stack.push(${numValue});\n}\npush(stack, ${numValue});\n// Stack: [${newStack}]`
      );
      setPushValue("");
      setTimeout(() => setHighlighted(-1), 1000); // Highlight 1 sec ke liye
    }
  };

  // Pop Operation
  const popElement = async (): Promise<void> => {
    if (stack.length === 0) {
      setCode(`function pop(stack: number[]) {\n  if (stack.length === 0) return;\n}\n// Stack is empty`);
      return;
    }
    const newStack = [...stack];
    const poppedValue = newStack.pop();
    setHighlighted(stack.length - 1); // Highlight top before pop
    setCode(
      `function pop(stack: number[]) {\n  return stack.pop();\n}\nconst popped = pop(stack);\n// Popped: ${poppedValue}, Stack: [${newStack}]`
    );
    await new Promise((resolve) => setTimeout(resolve, 500)); // Animation delay
    setStack(newStack);
    setHighlighted(-1);
  };

  // Peek Operation
  const peekElement = (): void => {
    if (stack.length === 0) {
      setPeekValue(null);
      setCode(`function peek(stack: number[]) {\n  if (stack.length === 0) return null;\n}\n// Stack is empty`);
      return;
    }
    const topValue = stack[stack.length - 1];
    setPeekValue(topValue);
    setHighlighted(stack.length - 1);
    setCode(
      `function peek(stack: number[]) {\n  return stack[stack.length - 1];\n}\nconst top = peek(stack);\n// Top: ${topValue}`
    );
    setTimeout(() => setHighlighted(-1), 1000); // Highlight 1 sec ke liye
  };

  // Check if Empty
  const checkEmpty = (): void => {
    const result = stack.length === 0;
    setIsEmptyResult(result ? "Stack is empty" : "Stack is not empty");
    setCode(
      `function isEmpty(stack: number[]) {\n  return stack.length === 0;\n}\nconst empty = isEmpty(stack);\n// Result: ${result}`
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Stack </h2>

      {/* Visual Representation */}
      <div className="flex flex-col gap-2 mb-6 items-center">
        {stack.length === 0 ? (
          <p className="text-black">Stack is empty</p>
        ) : (
          stack
            .slice()
            .reverse()
            .map((num: number, idx: number) => {
              const originalIdx = stack.length - 1 - idx; // Reverse index for top-to-bottom
              return (
                <motion.div
                  key={originalIdx}
                  initial={{ y: 0, scale: 1 }}
                  animate={{
                    y: highlighted === originalIdx ? -15 : 0,
                    scale: highlighted === originalIdx ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg shadow-sm text-lg font-semibold text-black ${
                    highlighted === originalIdx
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-blue-300 border-blue-400"
                  }`}
                >
                  {num}
                </motion.div>
              );
            })
        )}
      </div>

      {/* Operations - Organized Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Push */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Push Element</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pushValue}
              onChange={(e) => setPushValue(e.target.value)}
              placeholder="Value"
              className="p-2 border rounded w-24 text-black"
            />
            <button
              onClick={pushElement}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Push
            </button>
          </div>
        </div>

        {/* Pop */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Pop Element</label>
          <button
            onClick={popElement}
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
          >
            Pop
          </button>
        </div>

        {/* Peek */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Peek Top</label>
          <button
            onClick={peekElement}
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
          >
            Peek
          </button>
          {peekValue !== null && <p className="text-black font-semibold">Top: {peekValue}</p>}
        </div>

        {/* Is Empty */}
        <div className="flex flex-col gap-2">
          <label className="text-black font-medium">Check Empty</label>
          <button
            onClick={checkEmpty}
            className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
          >
            Is Empty?
          </button>
          {isEmptyResult && <p className="text-black font-semibold">{isEmptyResult}</p>}
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;