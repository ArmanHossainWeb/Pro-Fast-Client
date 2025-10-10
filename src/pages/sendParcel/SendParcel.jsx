import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";


// utils.js or same file
const generateTrackingID = () => {
  const prefix = "TRK"; // You can change to "FRESHO" or "PARCEL"
  const timestamp = Date.now().toString(36).toUpperCase(); // base36 for shorter format
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
};


const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = UseAuth();

  const [pendingData, setPendingData] = useState(null);
  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const getServiceCentersByRegion = (region) =>
    serviceCenters.filter((c) => c.region === region);

  // cost calculation
  const calculateCost = (data) => {
    const weight = parseFloat(data.weight) || 0;
    const isWithInCity = data.location === "within";

    // for document
    if (data.type === "document") {
      return isWithInCity ? 60 : 80;
    }
    // for Non-docuemnt
    if (data.type === "non-document") {
      if (weight <= 3) {
        return isWithInCity ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        if (isWithInCity) {
          return 110 + extraWeight * 40;
        } else {
          return 150 + extraWeight * 40 + 40;
        }
      }
    }
    return 0;
  };

  // after submit
  const onSubmit = (data) => {
    const totalCost = calculateCost(data);
    setPendingData({
      ...data,
      cost: totalCost, 
      crated_by: user.email,
      payment_status: "unpaid", 
      delivery_status: "not-collected",
      creation_date: new Date().toISOString(),
      tracking_id: generateTrackingID(),
    });


    

    // save data to the server 
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-xl shadow-xl border w-80">
        <h3 className="text-lg font-semibold mb-2">Delivery Cost</h3>
        <p className="mb-4">
          Total: <span className="font-bold">{totalCost} BDT</span>
        </p>
        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              console.log("Saving to DB:", pendingData);
              toast.dismiss(t.id);
              toast.success("Parcel Saved Successfully!");
              reset();
            }}
          >
            Confirm
          </button>
          <button className="btn btn-sm" onClick={() => toast.dismiss(t.id)}>
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="shadow-xl bg-white rounded-xl p-4 sm:p-6 md:p-8 lg:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left">
          Add Parcel
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parcel Info */}
          <div className="rounded-xl p-4 bg-gray-100 ">
            <h3 className="text-xl font-semibold mb-4">
              Enter Your Parcel Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <label className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio border-3 checked:border-green-500"
                  />
                  <span>Document</span>
                </label>
                <label className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio border-3 checked:border-green-500"
                  />
                  <span>Non-Document</span>
                </label>
              </div>

              <input
                type="text"
                placeholder="Parcel Name"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />

              {type === "non-document" && (
                <input
                  type="number"
                  step="0.1"
                  placeholder="Parcel Weight (kg)"
                  {...register("weight")}
                  className="input input-bordered w-full"
                />
              )}
            </div>
            {errors.type && (
              <p className="text-red-500 mt-1">Type is required</p>
            )}
            {errors.title && (
              <p className="text-red-500 mt-1">Title is required</p>
            )}
          </div>

          {/* Sender & Receiver Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender */}
            <div className="rounded-xl p-4 bg-gray-100 ">
              <h3 className="text-lg font-semibold mb-4">Sender Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register("senderName", { required: true })}
                  className="input input-bordered w-full"
                />

                <select
                  {...register("senderRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <select
                  {...register("senderServiceCenter", { required: true })}
                  className="select select-bordered w-full"
                  disabled={!senderRegion}
                >
                  <option value="">Select Wire house</option>
                  {getServiceCentersByRegion(senderRegion).map((c) => (
                    <option key={c.district} value={c.type}>
                      {c.district} {c.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Address"
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  placeholder="Sender Contact No"
                  {...register("senderContact", { required: true })}
                  className="input input-bordered w-full"
                />

                <textarea
                  placeholder="Pickup Instruction"
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered w-full col-span-1 sm:col-span-2"
                  rows={3}
                />
              </div>
            </div>

            {/* Receiver */}
            <div className="rounded-xl p-4 bg-gray-100 ">
              <h3 className="text-lg font-semibold mb-4">Receiver Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Receiver Name"
                  {...register("receiverName", { required: true })}
                  className="input input-bordered w-full"
                />

                <select
                  {...register("receiverRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <select
                  {...register("receiverServiceCenter", { required: true })}
                  className="select select-bordered w-full"
                  disabled={!receiverRegion}
                >
                  <option value="">Select Wire house</option>
                  {getServiceCentersByRegion(receiverRegion).map((c) => (
                    <option key={c.district} value={c.type}>
                      {c.district} {c.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Receiver Address"
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  placeholder="Receiver Contact No"
                  {...register("receiverContact", { required: true })}
                  className="input input-bordered w-full"
                />

                <textarea
                  placeholder="Delivery Instruction"
                  {...register("deliveryInstruction")}
                  className="textarea textarea-bordered w-full col-span-1 sm:col-span-2"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-black mt-4"
          >
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default SendParcel;
