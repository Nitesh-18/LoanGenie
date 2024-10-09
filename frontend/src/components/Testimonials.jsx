// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  { id: 1, name: "John Doe", feedback: "LoanGenie helped me get a loan quickly when I needed it the most." },
  { id: 2, name: "Jane Smith", feedback: "The process was seamless and the personalized offers were a game-changer!" }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="flex justify-center gap-8">
          {testimonials.map(({ id, name, feedback }) => (
            <div key={id} className="w-1/3 p-4 bg-white rounded-lg shadow-md">
              <p className="italic">"{feedback}"</p>
              <p className="mt-4 text-right font-semibold">- {name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
