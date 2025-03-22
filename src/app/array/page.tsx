// ArrayPage.tsx
"use client";
import { useState } from "react";
import ArrayVisualizer from "../../components/array/ArrayVisualizer";
import CodeDisplay from "../../components/array/CodeDisplay";
import arrayData from "../../data/array.json";

interface Section {
  subtitle: string;
  types: string;
  text: string;
  code?: string;
  examples?: Record<string, string | undefined>;
  example?: string;
}




type TopicKey = keyof typeof arrayData.topics;

const ArrayPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([5, 2, 9, 1, 7]);
  const [code, setCode] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>("introduction");
  const [activeTab, setActiveTab] = useState<string>("javascript");

  const topics = Object.keys(arrayData.topics) as TopicKey[];
  const languages = ["javascript", "cpp", "java", "python"];

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

      {/* Lower Section: Sidebar + Dynamic Content */}
      <div className="w-full flex h-3/4">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4 overflow-auto h-full">
          <h3 className="text-lg font-semibold text-black mb-4">Array Topics</h3>
          <ul className="space-y-2">
            {topics.map((topic) => (
              <li key={topic}>
                <button
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left p-2 rounded ${
                    selectedTopic === topic ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
                  } hover:bg-blue-500 hover:text-white`}
                >
                  {arrayData.topics[topic].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Content */}
        <div className="w-3/4 p-4 overflow-auto bg-gray-100 h-full">
          <h2 className="text-2xl font-bold mb-4 text-black">{arrayData.topics[selectedTopic].title}</h2>
          {arrayData.topics[selectedTopic].content.map((section: Section, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-black mb-2">{section.subtitle}</h3>
              <p className="text-black mb-2">
                <strong>Type:</strong> {section.types}
              </p>
              <p className="text-black mb-2" dangerouslySetInnerHTML={{ __html: section.text }} />
              {section.code && <pre className="bg-gray-800 text-white p-2 rounded mb-2">{section.code}</pre>}
              {section.examples && (
                <>
                  <h4 className="text-md font-medium text-black mb-1">Examples:</h4>
                  <div className="flex space-x-2 mb-2">
                    {languages.map(
                      (lang) =>
                        section.examples![lang] && (
                          <button
                            key={lang}
                            onClick={() => setActiveTab(lang)}
                            className={`px-3 py-1 rounded ${
                              activeTab === lang
                                ? "bg-blue-600 text-white"
                                : "bg-gray-300 text-black hover:bg-blue-500 hover:text-white"
                            }`}
                          >
                            {lang.toUpperCase()}
                          </button>
                        )
                    )}
                  </div>
                  {section.examples[activeTab] && (
                    <pre className="bg-gray-800 text-white p-2 rounded mb-2">{section.examples[activeTab]}</pre>
                  )}
                </>
              )}
              {section.example && <pre className="bg-gray-800 text-white p-2 rounded">{section.example}</pre>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrayPage;
