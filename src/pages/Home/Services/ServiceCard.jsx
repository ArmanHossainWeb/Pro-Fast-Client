import React from "react";

const ServiceCard = ({ service }) => {
  const { title, description, icon } = service;

  return (
    <div className="max-w-sm bg-white hover:bg-primary rounded-2xl shadow-md p-6 space-y-4 border flex flex-col items-center text-center hover:bg-main transition duration-300">
      <div className="flex justify-center items-center w-12 h-12 bg-black p-2 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
