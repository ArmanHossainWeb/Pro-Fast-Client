import React from "react";

const AccordionCard = ({accordion}) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title font-semibold">
        {accordion.question}
      </div>
      <div className="collapse-content text-sm">
        {accordion.answer}
      </div>
    </div>
  );
};

export default AccordionCard;
