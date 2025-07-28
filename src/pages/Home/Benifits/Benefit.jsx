import React from "react";
import BenefitCard from "./BenefitCard";
import liveTracking from "../../../assets/benefit/live-tracking.png"
import safeDelivery from "../../../assets/benefit/safe-delivery.png"
import fullSupport from "../../../assets/benefit/24-7.png"

const benefitsData = [
  {
    id: 1,
    image: liveTracking,
    title: "Fast & Reliable Delivery",
    description:
      "Experience swift delivery service with accurate timelines. We ensure your package gets delivered exactly when expected, with no delays.",
  },
  {
    id: 2,
    image: safeDelivery,
    title: "Secure Packaging",
    description:
      "Your items are packed with strong, secure materials to prevent damage. Our safety-first approach keeps your parcels safe during transit.",
  },
  {
    id: 3,
    image: fullSupport,
    title: "Global Customer Support",
    description:
      "No matter where you are, our support team is ready to help. We provide multilingual assistance and localized guidance for smooth deliveries.",
  },
];

const Benefit = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center my-5">Why Chouse Us</h1>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-5"  >
        {benefitsData.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </section>
  );
};

export default Benefit;
