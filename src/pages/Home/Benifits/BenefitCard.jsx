import React from "react";

const BenefitCard = ({benefit}) => {
    const {image, title, description } = benefit;
  return (
    <div className="card card-side bg-base-100 shadow-lg flex-grow sm:flex flex-col md:flex-row" data-aos="fade-up"
data-aos-duration="1000"
>
      <figure className="p-4">
        <img src={image} alt={title} className="" />
      </figure>

      <div className="divider divider-horizontal"></div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
