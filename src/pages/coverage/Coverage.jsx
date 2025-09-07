import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenters = useLoaderData();

  return (
    <div className="bg-slate-100 rounded-2xl px-4  py-10 my-10">
      <div className=" w-11/12 mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-secondary">
          We are available in 64 districts
        </h1>

        <BangladeshMap serviceCenters={serviceCenters} />
      </div>
    </div>
  );
};

export default Coverage;
