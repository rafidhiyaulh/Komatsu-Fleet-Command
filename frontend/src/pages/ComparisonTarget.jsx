import React from "react";
import { Bolt } from "lucide-react";
import { useUserInput } from "../context/UserInputContext";
import "./BinaCalculator.css";

const ComparisonTarget = ({ setActiveSection }) => {
  const { userData, updateUserData } = useUserInput();
  const calculator = userData.calculator || {};
  const comparisonTarget = calculator.comparisonTarget || "komatsu_lithium";

  const setField = (data) => updateUserData("calculator", data);

  return (
    <div className="bina-container">
      <div className="bina-header">
        <Bolt size={36} className="bina-icon" />
        <div>
          <h2 className="bina-title">Comparison Target</h2>
          <p className="bina-subtitle">
            Select the Komatsu solution you want to benchmark against your current fleet.
          </p>
        </div>
      </div>

      <hr className="bina-divider" />

      <div className="bina-card">
        <div className="bina-field">
          <div className="bina-label">Preferred Green Solution</div>
          <div className="bina-radio-group">
            <label className="bina-radio">
              <input
                type="radio"
                name="comparisonTarget"
                value="komatsu_lithium"
                checked={comparisonTarget === "komatsu_lithium"}
                onChange={(e) => setField({ comparisonTarget: e.target.value })}
              />
              Komatsu Lithium-ion
            </label>
            <label className="bina-radio">
              <input
                type="radio"
                name="comparisonTarget"
                value="komatsu_hydrogen"
                checked={comparisonTarget === "komatsu_hydrogen"}
                onChange={(e) => setField({ comparisonTarget: e.target.value })}
              />
              Komatsu Hydrogen
            </label>
          </div>
        </div>

        <div className="bina-actions">
          <button
            className="bina-btn bina-secondary"
            onClick={() => setActiveSection("UsageIntensity")}
          >
            Previous
          </button>
          <button
            className="bina-btn bina-primary"
            onClick={() => setActiveSection("ImpactReport")}
          >
            Calculate ESG Impact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTarget;

