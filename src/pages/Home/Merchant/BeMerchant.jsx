import React from "react";
import merchant from "../../../assets/merchant/location-merchant.png";

const BeMerchant = () => {
  return (
    <section className="bg-secondary bg-[url('assets/merchant/be-a-merchant-bg.png')] bg-no-repeat rounded-2xl my-8">
      <div className="container  p-6  space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6  text-white space-y-5">
            <h3 className="text-4xl font-bold">
              Merchant and Customer Satisfaction is Our First Priority
            </h3>
            <p>
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex gap-3">
              <button className="btn btn-outline   hover:bg-primary hover:text-black  text-primary rounded-full">
                Become a Merchant
              </button>
              <button className="btn btn-outline  hover:bg-primary hover:text-black  text-primary rounded-full">
                Earn with Profast Courier
              </button>
            </div>
          </div>
          <img src={merchant} alt="" className="" />
        </div>
      </div>
    </section>
  );
};

export default BeMerchant;
