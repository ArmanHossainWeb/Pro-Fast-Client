import React from "react";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) {
    return <p className="text-center py-6">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-xl">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Transaction</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.parcelId}</td>
                <td>${p.amount}</td>
                <td>{p.paymentMethod}</td>
                <td className="font-mono text-sm">{p.transactionId}</td>
                <td>{formatDate(p.paid_at)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-6">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
