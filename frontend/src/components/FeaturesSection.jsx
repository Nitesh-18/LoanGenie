// src/components/FeaturesSection.jsx
import React from "react";

const FeaturesSection = () => {
  const features = [
    { id: 1, title: "Fast Approval", description: "Get approved in minutes with our advanced AI-driven process." },
    { id: 2, title: "Secure Platform", description: "We use the latest security measures to protect your data." },
    { id: 3, title: "Personalized Offers", description: "Receive loan offers tailored to your financial situation." }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose LoanGenie?</h2>
        <div className="flex justify-center gap-8">
          {features.map(feature => (
            <div key={feature.id} className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
