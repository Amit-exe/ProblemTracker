import React from "react";
import ProblemCard from "./ProblemCard";
import EmptyState from "./EmptyState";

const ProblemList = ({ problems, filter, searchQuery, toggleSolved, toggleRevisit }) => {
  const filteredProblems = problems
    .filter((p) => filter === "All" || p.difficulty === filter)
    .filter((p) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.link.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="grid gap-4">
      {filteredProblems.length > 0 ? (
        filteredProblems.map((problem, index) => (
          <ProblemCard
            key={index}
            index={index}
            problem={problem}
            toggleSolved={toggleSolved}
            toggleRevisit={toggleRevisit}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ProblemList;