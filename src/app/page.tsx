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
            <div className="mb-4">{/* SVG for Array */}
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" stroke="black" strokeWidth="2" fill="none"/>
                <line x1="8" y1="4" x2="8" y2="20" stroke="black" strokeWidth="2"/>
                <line x1="16" y1="4" x2="16" y2="20" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-black mb-4">Array Visualizer</h2>
            <p className="text-black text-center">
              Explore array operations like sorting, searching, and more.
            </p>
          </div>
        </Link>

        {/* Stack Card */}
        <Link href="/stack">
          <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
            <div className="mb-4">{/* SVG for Stack */}
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="12" height="12" stroke="black" strokeWidth="2" fill="none"/>
                <line x1="6" y1="12" x2="18" y2="12" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-black mb-4">Stack Visualizer</h2>
            <p className="text-black text-center">
              Visualize stack operations like push, pop, and peek.
            </p>
          </div>
        </Link>

        {/* Tree Card */}
        <Link href="/tree">
          <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
            <div className="mb-4">{/* SVG for Tree */}
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="4" r="2" stroke="black" strokeWidth="2" fill="none"/>
                <circle cx="6" cy="12" r="2" stroke="black" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="12" r="2" stroke="black" strokeWidth="2" fill="none"/>
                <line x1="12" y1="6" x2="6" y2="10" stroke="black" strokeWidth="2"/>
                <line x1="12" y1="6" x2="18" y2="10" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-black mb-4">Tree Visualizer</h2>
            <p className="text-black text-center">
              Visualize binary tree operations like insert, delete, and search.
            </p>
          </div>
        </Link>

        {/* Graph Card */}
        <Link href="/graph">
          <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
            <div className="mb-4">{/* SVG for Graph */}
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="2" stroke="black" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="6" r="2" stroke="black" strokeWidth="2" fill="none"/>
                <circle cx="6" cy="18" r="2" stroke="black" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="18" r="2" stroke="black" strokeWidth="2" fill="none"/>
                <line x1="6" y1="6" x2="18" y2="6" stroke="black" strokeWidth="2"/>
                <line x1="6" y1="6" x2="6" y2="18" stroke="black" strokeWidth="2"/>
                <line x1="18" y1="6" x2="18" y2="18" stroke="black" strokeWidth="2"/>
                <line x1="6" y1="18" x2="18" y2="18" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-black mb-4">Graph Visualizer</h2>
            <p className="text-black text-center">
              Visualize graph operations like BFS, DFS, and shortest path.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
