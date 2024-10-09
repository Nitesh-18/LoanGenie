// src/components/FAQSection.jsx
import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "How long does the approval process take?", answer: "Our AI-powered approval process typically takes less than 5 minutes." },
    { question: "Is my data secure?", answer: "Yes, we use state-of-the-art encryption and data protection measures." },
    { question: "What loan options are available?", answer: "We offer a range of loan options based on your financial profile." }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-2 px-4 bg-white rounded-lg shadow-lg"
              >
                <span className="font-semibold">{faq.question}</span>
              </button>
              {activeIndex === index && <p className="mt-2 p-4 bg-gray-50">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
