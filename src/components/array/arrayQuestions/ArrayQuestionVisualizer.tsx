import React, { useState } from "react";
import { motion } from "framer-motion";
import { arrayElementVariants, containerVariants } from "./animations";
import { questionCode } from "./codeQuestions";
import CodeDisplay from "./codeDisplay";

interface ArrayQuestionVisualizerProps {
  initialArray: number[];
  slug: string;
}

const ArrayQuestionVisualizer: React.FC<ArrayQuestionVisualizerProps> = ({ initialArray, slug }) => {
  const [arrays, setArrays] = useState<number[][]>([initialArray]);
  const [highlighted, setHighlighted] = useState<{ [key: number]: number[] }>({ 0: [] });
  const [operation, setOperation] = useState<string>("");
  const [target, setTarget] = useState<string>(""); // For Two Sum, Rotate Array, etc.
  const [result, setResult] = useState<string>("");

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Question-specific algorithms
  const twoSum = async (arrayIdx: number): Promise<void> => {
    const map = new Map();
    const targetNum = Number(target);
    for (let i = 0; i < arrays[arrayIdx].length; i++) {
      setHighlighted({ ...highlighted, [arrayIdx]: [i] });
      const complement = targetNum - arrays[arrayIdx][i];
      if (map.has(complement)) {
        setHighlighted({ ...highlighted, [arrayIdx]: [map.get(complement), i] });
        setOperation("searched");
        setResult(`Found ${complement} and ${arrays[arrayIdx][i]} at indices ${map.get(complement)} and ${i}`);
        await delay(600);
        setHighlighted({ ...highlighted, [arrayIdx]: [] });
        setOperation("");
        return;
      }
      map.set(arrays[arrayIdx][i], i);
      await delay(500);
    }
    setResult(`${targetNum} ke liye koi pair nahi mila`);
    setHighlighted({ ...highlighted, [arrayIdx]: [] });
  };

  const threeSum = async (arrayIdx: number): Promise<void> => {
    const nums = [...arrays[arrayIdx]].sort((a, b) => a - b);
    setArrays((prev) => {
      const newArrays = [...prev];
      newArrays[arrayIdx] = nums;
      return newArrays;
    });
    setOperation("sorted");
    await delay(500);
    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;
      let left = i + 1;
      let right = nums.length - 1;
      while (left < right) {
        setHighlighted({ ...highlighted, [arrayIdx]: [i, left, right] });
        const sum = nums[i] + nums[left] + nums[right];
        if (sum === 0) {
          setOperation("searched");
          setResult(`Found triplet: ${nums[i]}, ${nums[left]}, ${nums[right]}`);
          await delay(600);
          setHighlighted({ ...highlighted, [arrayIdx]: [] });
          setOperation("");
          return;
        } else if (sum < 0) left++;
        else right--;
        await delay(500);
      }
    }
    setResult("Koi triplet nahi mila jo zero banaye");
    setHighlighted({ ...highlighted, [arrayIdx]: [] });
  };

  const maxSubArray = async (arrayIdx: number): Promise<void> => {
    let maxSum = arrays[arrayIdx][0];
    let currSum = arrays[arrayIdx][0];
    let start = 0;
    let end = 0;
    for (let i = 1; i < arrays[arrayIdx].length; i++) {
      setHighlighted({ ...highlighted, [arrayIdx]: [i] });
      currSum = Math.max(arrays[arrayIdx][i], currSum + arrays[arrayIdx][i]);
      if (currSum === arrays[arrayIdx][i]) start = i;
      if (currSum > maxSum) {
        maxSum = currSum;
        end = i;
      }
      await delay(500);
    }
    setHighlighted({ ...highlighted, [arrayIdx]: Array.from({ length: end - start + 1 }, (_, k) => start + k) });
    setOperation("searched");
    setResult(`Max Subarray Sum: ${maxSum}`);
    await delay(600);
    setHighlighted({ ...highlighted, [arrayIdx]: [] });
    setOperation("");
  };

  const moveZeroes = async (arrayIdx: number): Promise<void> => {
    const nums = [...arrays[arrayIdx]];
    let nonZeroIdx = 0;
    for (let i = 0; i < nums.length; i++) {
      setHighlighted({ ...highlighted, [arrayIdx]: [i] });
      if (nums[i] !== 0) {
        [nums[nonZeroIdx], nums[i]] = [nums[i], nums[nonZeroIdx]];
        nonZeroIdx++;
        setArrays((prev) => {
          const newArrays = [...prev];
          newArrays[arrayIdx] = [...nums];
          return newArrays;
        });
        await delay(500);
      }
    }
    setOperation("sorted");
    setResult("Zeroes end mein move ho gaye");
    await delay(500);
    setHighlighted({ ...highlighted, [arrayIdx]: [] });
    setOperation("");
  };

  const rotateArray = async (arrayIdx: number): Promise<void> => {
    const nums = [...arrays[arrayIdx]];
    const k = Number(target) % nums.length;
    const reverse = async (start: number, end: number) => {
      while (start < end) {
        setHighlighted({ ...highlighted, [arrayIdx]: [start, end] });
        [nums[start], nums[end]] = [nums[end], nums[start]];
        setArrays((prev) => {
          const newArrays = [...prev];
          newArrays[arrayIdx] = [...nums];
          return newArrays;
        });
        await delay(500);
        start++;
        end--;
      }
    };
    await reverse(0, nums.length - 1);
    await reverse(0, k - 1);
    await reverse(k, nums.length - 1);
    setOperation("rotated");
    setResult(`Array ${k} steps se rotate ho gaya`);
    await delay(700);
    setHighlighted({ ...highlighted, [arrayIdx]: [] });
    setOperation("");
  };

  // Slug ke hisaab se function call karo
  const handleRun = (arrayIdx: number) => {
    setResult("");
    switch (slug) {
      case "2sum":
        twoSum(arrayIdx);
        break;
      case "3sum":
        threeSum(arrayIdx);
        break;
      case "maxsubarraysum":
        maxSubArray(arrayIdx);
        break;
      case "movezeroes":
        moveZeroes(arrayIdx);
        break;
      case "rotatearray":
        rotateArray(arrayIdx);
        break;
      default:
        setResult("Ye question support nahi hai abhi");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">{slug.toUpperCase()} Visualizer</h2>

      {/* Array Visualization */}
      {arrays.map((arr, arrayIdx) => (
        <div key={arrayIdx} className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">Array {arrayIdx + 1}</h3>
          <motion.div className="flex gap-3 mb-6" variants={containerVariants} initial="initial" animate="animate">
            {arr.map((num, idx) => (
              <motion.div
                key={idx}
                variants={arrayElementVariants}
                initial="initial"
                animate={
                  highlighted[arrayIdx]?.includes(idx)
                    ? operation === "searched"
                      ? "searched"
                      : "highlighted"
                    : operation === "sorted"
                    ? "sorted"
                    : operation === "rotated"
                    ? "rotated"
                    : "initial"
                }
                className="w-14 h-14 flex items-center justify-center border-2 rounded-lg shadow-sm text-lg font-semibold text-black"
              >
                {num}
              </motion.div>
            ))}
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col gap-4">
            {(slug === "2sum" || slug === "rotatearray") && (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder={slug === "2sum" ? "Target Daalo" : "Steps (k) Daalo"}
                  className="p-2 border rounded w-24 text-black"
                />
              </div>
            )}
            <button
              onClick={() => handleRun(arrayIdx)}
              className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
            >
              {slug.toUpperCase()} Chalao
            </button>
            {result && <p className="text-black font-semibold">{result}</p>}
          </div>
        </div>
      ))}

      {/* Code Display */}
      <CodeDisplay slug={slug} />
    </div>
  );
};

export default ArrayQuestionVisualizer;