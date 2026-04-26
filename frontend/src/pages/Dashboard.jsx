import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import SummaryCard from "../components/SummaryCard";
import ProfileBox from "../components/ProfileBox";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const userName = localStorage.getItem("user_name") || "User";

  const fetchSummary = async () => {
    try {
      const response = await api.get("/summary");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await api.get("/suggestions");
      setSuggestions(response.data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {userName}</h1>
          <p>Track your income and expenses easily.</p>
        </div>

        <ProfileBox name={userName} />
      </div>

      <div className="summary-grid">
        <SummaryCard title="Total Income" value={summary.total_income} />
        <SummaryCard title="Total Expense" value={summary.total_expense} />
        <SummaryCard title="Balance" value={summary.balance} />
      </div>

      <div className="dashboard-actions">
        <Link to="/transactions">
          <button>Add Income / Expense</button>
        </Link>

        <Link to="/transactions">
          <button>View Transactions</button>
        </Link>

        <button onClick={fetchSuggestions}>AI Suggestion</button>
      </div>

      {showSuggestions && (
        <div className="card suggestion-box">
          <h3>Smart Suggestions</h3>

          <ul>
            {suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;