// src/components/LoanForm.jsx
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring"; // Import React Spring
import "../styles/form.css"; // Import custom styles

const LoanForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Gender_Male: false,
    Married_Yes: false,
    Dependents_1: false,
    Dependents_2: false,
    Dependents_3: false,
    Education_NotGraduate: false,
    Self_Employed_Yes: false,
    Property_Area_Semiurban: false,
    Property_Area_Urban: false,
  });

  // Scroll-triggered animation for Loan Form
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
        />
        <input
          type="number"
          name="CoapplicantIncome"
          value={formData.CoapplicantIncome}
          onChange={handleChange}
          placeholder="Coapplicant Income"
          className="input"
        />
        <input
          type="number"
          name="LoanAmount"
          value={formData.LoanAmount}
          onChange={handleChange}
          placeholder="Loan Amount"
          className="input"
        />
        <input
          type="number"
          name="Loan_Amount_Term"
          value={formData.Loan_Amount_Term}
          onChange={handleChange}
          placeholder="Loan Amount Term"
          className="input"
        />
        <input
          type="text"
          name="Credit_History"
          value={formData.Credit_History}
          onChange={handleChange}
          placeholder="Credit History (0 or 1)"
          className="input"
        />

        <div className="flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              name="Gender_Male"
              checked={formData.Gender_Male}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="checkbox"
              name="Married_Yes"
              checked={formData.Married_Yes}
              onChange={handleChange}
            />
            Married
          </label>
        </div>

        <animated.button type="submit" className="btn">
          Predict
        </animated.button>
      </form>
    </animated.div>
  );
};

export default LoanForm;
