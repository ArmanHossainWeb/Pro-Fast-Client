import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure"; // for authorized requests
import UseAuth from "../../Hooks/useAuth";

const BeARider = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [formData, setFormData] = useState({
    age: "",
    region: "",
    district: "",
    phone: "",
    nid: "",
    bikeNumber: "",
    licenseNumber: "",
  });

  // Load region data from your services API
  useEffect(() => {
    axiosSecure.get("/services").then((res) => {
      const uniqueRegions = [...new Set(res.data.map((item) => item.region))];
      setRegions(uniqueRegions);
    });
  }, [axiosSecure]);

  // When region changes, set districts for that region
  useEffect(() => {
    if (selectedRegion) {
      axiosSecure.get("/services").then((res) => {
        const regionDistricts = [
          ...new Set(
            res.data
              .filter((item) => item.region === selectedRegion)
              .map((i) => i.district)
          ),
        ];
        setDistricts(regionDistricts);
      });
    }
  }, [selectedRegion, axiosSecure]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const riderInfo = {
      name: user?.displayName,
      email: user?.email,
      ...formData,
      status: "pending",
      appliedAt: new Date(),
    };

    try {
      await axiosSecure.post("/riderApplications", riderInfo);
      alert("Your rider application has been submitted successfully!");
      setFormData({
        age: "",
        region: "",
        district: "",
        phone: "",
        nid: "",
        bikeNumber: "",
        licenseNumber: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Be a Rider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block mb-1 font-medium">Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              handleChange(e);
            }}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* NID */}
        <div>
          <label className="block mb-1 font-medium">National ID</label>
          <input
            type="text"
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            required
            placeholder="Enter NID number"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Bike Registration */}
        <div>
          <label className="block mb-1 font-medium">
            Bike Registration Number
          </label>
          <input
            type="text"
            name="bikeNumber"
            value={formData.bikeNumber}
            onChange={handleChange}
            required
            placeholder="Enter registration number"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* License Number */}
        <div>
          <label className="block mb-1 font-medium">
            Driving License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="Enter license number"
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
