import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const Company = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <div className="py-8 bg-white space-y-10">
      <h1 className="text-center text-4xl font-bold text-secondary">
        We've helped thousands of sales teams
      </h1>
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`client-logo-${index}`}
            className="h-6 w-auto mx-6 object-contain"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Company;
