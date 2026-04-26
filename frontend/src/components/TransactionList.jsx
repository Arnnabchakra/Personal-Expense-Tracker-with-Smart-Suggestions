import React from "react";
import api from "../api/axios";

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      onDelete();
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to delete transaction");
    }
  };

  return (
    <div className="card">
      <h3>View Transactions</h3>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Note</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>₹ {item.amount}</td>
              <td>{item.category}</td>
              <td>{item.note}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;