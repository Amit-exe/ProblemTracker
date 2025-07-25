import React from "react";

const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-700">No problems found</h3>
      <p className="text-gray-500 mt-1">Try adjusting your search or filter</p>
    </div>
  );
};

export default EmptyState;