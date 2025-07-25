import React from "react";

const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800",
};

const difficultyIcons = {
  Easy: "😊",
  Medium: "🤔",
  Hard: "🔥",
};

const ProblemCard = ({ index, problem, toggleSolved, toggleRevisit }) => {
  const { name, difficulty, link, solved, revisit, solvedDate } = problem;

  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 ${
        solved ? "bg-green-50 border-green-200" : "bg-white hover:shadow-md"
      } ${revisit ? "ring-2 ring-blue-200" : ""}`}
    >
      <div className="flex items-center space-x-4 mb-3 md:mb-0">
        <div className={`w-3 h-3 rounded-full ${solved ? "bg-green-500" : "bg-gray-300"}`}></div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-medium text-gray-800 hover:text-blue-600 hover:underline"
        >
          {name}
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <DifficultyBadge difficulty={difficulty} />
        <ToggleButton
          active={solved}
          onClick={() => toggleSolved(index)}
          activeText="✅ Solved"
          inactiveText="Mark as Solved"
          activeClass="bg-green-500 hover:bg-green-600"
        />
        <ToggleButton
          active={revisit}
          onClick={() => toggleRevisit(index)}
          activeText="🔁 Revisiting"
          inactiveText="Mark for Revisit"
          activeClass="bg-blue-500 hover:bg-blue-600"
        />
        {solvedDate && (
          <span className="text-xs text-gray-500 whitespace-nowrap">
            Solved: {solvedDate}
          </span>
        )}
      </div>
    </div>
  );
};

const DifficultyBadge = ({ difficulty }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      difficultyColors[difficulty] || "bg-gray-100 text-gray-600"
    }`}
  >
    <span className="mr-2">{difficultyIcons[difficulty] || "📌"}</span>
    {difficulty}
  </span>
);

const ToggleButton = ({ active, onClick, activeText, inactiveText, activeClass }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
      active
        ? `${activeClass} text-white`
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {active ? activeText : inactiveText}
  </button>
);

export default ProblemCard;