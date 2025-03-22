"use client";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-12 text-black">DSA Visualizer</h1>

      {/* Cards */}
      <div className="flex gap-8">
        {/* Array Card */}
        <Link href="/array">
          <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-black mb-4">Array Visualizer</h2>
            <p className="text-black text-center">
              Explore array operations like sorting, searching, and more.
            </p>
          </div>
        </Link>

        {/* Stack Card */}
        <Link href="/stack">
          <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-black mb-4">Stack Visualizer</h2>
            <p className="text-black text-center">
              Visualize stack operations like push, pop, and peek.
            </p>
          </div>
        </Link>

        {/* Tree Card */}
        <Link href="/tree">
          <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-black mb-4">Tree Visualizer</h2>
            <p className="text-black text-center">
              Visualize binary tree operations like insert, delete, and search.
            </p>
          </div>
        </Link>
          <Link href="/graph">
          <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-black mb-4">Tree Visualizer</h2>
            <p className="text-black text-center">
              Visualize binary tree operations like insert, delete, and search.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
