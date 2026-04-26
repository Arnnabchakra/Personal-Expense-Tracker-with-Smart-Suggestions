import React, { useState } from "react";
import api from "../api/axios";

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    note: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/transactions", {
        ...formData,
        amount: Number(formData.amount),
      });

      setFormData({
        type: "expense",
        amount: "",
        category: "",
        note: "",
        date: "",
      });

      onTransactionAdded();
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to add transaction");
    }
  };

  return (
    <form className="card transaction-form" onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>

      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="note"
        placeholder="Note"
        value={formData.note}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default TransactionForm;