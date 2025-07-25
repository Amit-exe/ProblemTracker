import React from "react";

const Header = ({ totalCount, solvedCount }) => {
  const completionPercentage = Math.round((solvedCount / totalCount) * 100);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
      <h1 className="text-3xl font-bold mb-2">LeetCode Problem Tracker</h1>
      <p className="opacity-90">
        Track your progress with {totalCount} problems. Solved {solvedCount} ({completionPercentage}%)
      </p>
    </div>
  );
};

export default Header;