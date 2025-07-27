import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import ProblemControls from "../Controller/ProblemControls";
import ProblemList from "./ProblemList";

const ProblemTracker = () => {
  const [problemList, setProblemList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get("/api/problems");
        setProblemList(response.data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const toggleSolved = async (index) => {
    const updated = [...problemList];
    const isNowSolved = !updated[index].solved;
    updated[index].solved = isNowSolved;
    updated[index].solvedDate = isNowSolved ? new Date().toLocaleString() : "";

    try {
      await api.put(`/api/problems/${updated[index]._id}`, updated[index]);
      setProblemList(updated);
    } catch (err) {
      console.error("Error updating problem:", err);
    }
  };

  const toggleRevisit = async (index) => {
    const updated = [...problemList];
    updated[index].revisit = !updated[index].revisit;

    try {
      await axios.put(`/api/problems/${updated[index]._id}`, updated[index]);
      setProblemList(updated);
    } catch (err) {
      console.error("Error updating problem:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header
        totalCount={problemList.length}
        solvedCount={problemList.filter((p) => p.solved).length}
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
