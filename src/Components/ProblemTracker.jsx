import React, { useState } from "react";
import Header from "./Header";
import ProblemControls from "../Controller/ProblemControls";
import ProblemList from "./ProblemList";
import problems from "../data/problems";

const ProblemTracker = () => {
  const [problemList, setProblemList] = useState(
    problems.map((p) => ({
      ...p,
      solved: false,
      revisit: false,
      solvedDate: "",
    }))
  );
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSolved = (index) => {
    const updated = [...problemList];
    const isNowSolved = !updated[index].solved;
    updated[index].solved = isNowSolved;
    updated[index].solvedDate = isNowSolved ? new Date().toLocaleString() : "";
    setProblemList(updated);
  };

  const toggleRevisit = (index) => {
    const updated = [...problemList];
    updated[index].revisit = !updated[index].revisit;
    setProblemList(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header 
        totalCount={problemList.length} 
        solvedCount={problemList.filter(p => p.solved).length} 
      />
      
      <ProblemControls
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <ProblemList
        problems={problemList}
        filter={filter}
        searchQuery={searchQuery}
        toggleSolved={toggleSolved}
        toggleRevisit={toggleRevisit}
      />
    </div>
  );
};

export default ProblemTracker;