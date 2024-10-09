// src/components/CallToAction.jsx
import React from "react";

const CallToAction = () => {
    return (
        <section className="py-8 bg-blue-600 text-white">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to apply for a loan?</h2>
                <p className="mb-6">Get personalized loan options today with LoanGenie. Quick and easy!</p>
                <a href="/contact" className="bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold transition duration-300 hover:bg-blue-100">
                    Contact Us
                </a>
            </div>
        </section>
    );
};

export default CallToAction;
