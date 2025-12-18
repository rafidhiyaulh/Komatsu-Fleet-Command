import React from "react";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./ComingSoon.css";

const ComingSoon = ({ title = "Coming Soon" }) => {
  return (
    <div className="coming-soon">
      <div className="coming-card">
        <div className="coming-icon">
          <Construction size={38} />
        </div>
        <h1 className="coming-title">{title}</h1>
        <p className="coming-text">
          This feature is under development. The UI is being updated to match Komatsu Fleet
          Command: ESG &amp; Safety Monitor.
        </p>
        <Link to="/" className="coming-btn">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;

