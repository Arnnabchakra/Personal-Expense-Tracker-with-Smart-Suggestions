import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-page">
      <TransactionForm onTransactionAdded={fetchTransactions} />
      <TransactionList
        transactions={transactions}
        onDelete={fetchTransactions}
      />
    </div>
  );
};

export default Transactions;