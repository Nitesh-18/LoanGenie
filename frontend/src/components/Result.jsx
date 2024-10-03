import React from "react";

const Result = ({ result }) => {
  return (
    <div className="mt-6 bg-white p-4 shadow rounded-md">
      <h2 className="text-lg font-bold">Prediction Result:</h2>
      <p>{result ? "Loan Approved" : "Loan Not Approved"}</p>
    </div>
  );
};

export default Result;
