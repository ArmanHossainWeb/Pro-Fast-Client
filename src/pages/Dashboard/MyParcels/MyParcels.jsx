import React from "react";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery  } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { data: parcels = [] , refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels);

  // Handlers for actions
  const handleView = (parcel) => {
    alert(JSON.stringify(parcel, null, 2)); // simple view, can replace with modal
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`)
  };

  const handleDelete = async (id) => {
     const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48", // red-600
            cancelButtonColor: "#6b7280",  // gray-500
        });
        if (confirm.isConfirmed) {
            try {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })

            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
    };
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">My Parcels</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>
                  {parcel.type === "document" ? "Document" : "Non-Document"}
                </td>
                <td>
                  {new Date(parcel.creation_date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>${parcel.cost}</td>
                <td>
                  {parcel.payment_status === "paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge badge-warning">Unpaid</span>
                  )}
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleView(parcel)}
                  >
                    View
                  </button>
                  {parcel.payment_status === "unpaid" && (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handlePay(parcel._id)}
                    >
                      Pay
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
