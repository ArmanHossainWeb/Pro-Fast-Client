import React from "react";
import AccordionCard from "./AccordionCard";

const Accordion = () => {
  const accordionData = [
    {
      question: "How do I create an account?",
      answer:
        'Click the "Sign Up" button in the top right corner and follow the registration process.',
    },
    {
      question: "How can I reset my password?",
      answer:
        'Go to the login page, click "Forgot Password?" and follow the instructions to reset your password.',
    },
    {
      question: "How do I book a tutor?",
      answer:
        'Browse available tutors, click on a profile, and press the "Book Now" button to schedule a session.',
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer:
        "Yes, go to your bookings section and choose the cancel or reschedule option at least 24 hours before the session.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        'Use the "Contact Us" form in the footer or email us directly at support@example.com.',
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption and security protocols to protect your data.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, mobile payments, and select digital wallets for your convenience.",
    },
  ];
  return (
    <div className="space-y-3 my-8">
      <div className="text-center space-y-2 w-9/12 mx-auto">
        <h1 className="text-4xl font-bold">Frequently Asked Question (FAQ)</h1>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div>
        {accordionData.map((accordion, index) => (
          <AccordionCard key={accordion.id || index} accordion={accordion} />
        ))}
      </div>
    </div>
  );
};

export default Accordion;
