// src/services/api.js
export const submitLoanPrediction = async (data) => {
  try {
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting loan prediction:", error);
    throw error; // Propagate the error
  }
};
