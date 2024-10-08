// src/components/LoanForm.jsx
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "../styles/form.css";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Gender: "Male", // Default to Male
    Married: "No", // Default to No
    Dependents: "0", // Default to 0
    Education: "Graduate", // Default to Graduate
    Self_Employed: "No", // Default to No
    Property_Area: "Urban", // Default to Urban
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [fadeInProps, setFadeInProps] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(50px)",
    config: { duration: 1000 },
  }));

  const handleScroll = () => {
    const formPosition = document
      .getElementById("loan-form")
      .getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (formPosition < screenPosition) {
      setFadeInProps({ opacity: 1, transform: "translateY(0)" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null); // Reset previous result
    setError(null); // Reset previous error

    try {
      const predictionResult = await submitLoanPrediction(formData);
      setResult(predictionResult.result);
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <animated.div
      id="loan-form"
      style={fadeInProps}
      className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Loan Approval Prediction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="ApplicantIncome"
          value={formData.ApplicantIncome}
          onChange={handleChange}
          placeholder="Applicant Income"
          className="input"
          required
        />
        <input
          type="number"
          name="CoapplicantIncome"
          value={formData.CoapplicantIncome}
          onChange={handleChange}
          placeholder="Coapplicant Income"
          className="input"
          required
        />
        <input
          type="number"
          name="LoanAmount"
          value={formData.LoanAmount}
          onChange={handleChange}
          placeholder="Loan Amount"
          className="input"
          required
        />
        <input
          type="number"
          name="Loan_Amount_Term"
          value={formData.Loan_Amount_Term}
          onChange={handleChange}
          placeholder="Loan Amount Term (months)"
          className="input"
          required
        />
        <input
          type="text"
          name="Credit_History"
          value={formData.Credit_History}
          onChange={handleChange}
          placeholder="Credit History (0 or 1)"
          className="input"
          required
        />

        <select
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          className="input"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          name="Married"
          value={formData.Married}
          onChange={handleChange}
          className="input"
        >
          <option value="No">Not Married</option>
          <option value="Yes">Married</option>
        </select>

        <select
          name="Dependents"
          value={formData.Dependents}
          onChange={handleChange}
          className="input"
        >
          <option value="0">No Dependents</option>
          <option value="1">1 Dependent</option>
          <option value="2">2 Dependents</option>
          <option value="3">3 or More Dependents</option>
        </select>

        <select
          name="Education"
          value={formData.Education}
          onChange={handleChange}
          className="input"
        >
          <option value="Graduate">Graduate</option>
          <option value="NotGraduate">Not Graduate</option>
        </select>

        <select
          name="Self_Employed"
          value={formData.Self_Employed}
          onChange={handleChange}
          className="input"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <select
          name="Property_Area"
          value={formData.Property_Area}
          onChange={handleChange}
          className="input"
        >
          <option value="Urban">Urban</option>
          <option value="Semiurban">Semiurban</option>
          <option value="Rural">Rural</option>
        </select>

        <animated.button type="submit" className="btn">
          Predict
        </animated.button>

        {result && (
          <p className="mt-4 text-lg font-bold text-center">{`Prediction Result: ${result}`}</p>
        )}
        {error && (
          <p className="mt-4 text-lg font-bold text-red-600 text-center">
            {error}
          </p>
        )}
      </form>
    </animated.div>
  );
};

export default LoanForm;
