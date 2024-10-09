// src/components/LoanForm.jsx
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "../styles/form.css"; // Make sure this contains necessary styles

const LoanForm = ({ onSubmit }) => {
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

  // Spring animation effect for form
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
      await onSubmit(formData);
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <animated.div
      id="loan-form"
      style={fadeInProps}
      className="max-w-4xl mx-auto mt-12 p-10 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
        Loan Approval Prediction
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
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
            name="LoanAmount"
            value={formData.LoanAmount}
            onChange={handleChange}
            placeholder="Loan Amount"
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
            name="Self_Employed"
            value={formData.Self_Employed}
            onChange={handleChange}
            className="input"
          >
            <option value="No">Not Self Employed</option>
            <option value="Yes">Self Employed</option>
          </select>
        </div>

        {/* Right Column */}
        <div>
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
            name="Married"
            value={formData.Married}
            onChange={handleChange}
            className="input"
          >
            <option value="No">Not Married</option>
            <option value="Yes">Married</option>
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
            name="Property_Area"
            value={formData.Property_Area}
            onChange={handleChange}
            className="input"
          >
            <option value="Urban">Urban</option>
            <option value="Semiurban">Semiurban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <animated.button type="submit" className="btn w-full">
            Predict
          </animated.button>
        </div>

        {result && (
          <p className="col-span-1 md:col-span-2 mt-4 text-xl font-bold text-center">
            {`Prediction Result: ${result}`}
          </p>
        )}
        {error && (
          <p className="col-span-1 md:col-span-2 mt-4 text-xl font-bold text-red-600 text-center">
            {error}
          </p>
        )}
      </form>
    </animated.div>
  );
};

export default LoanForm;
