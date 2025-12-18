import React from "react";
import Swal from "sweetalert2";
import { ShoppingBag } from "lucide-react";
import { useUserInput } from "../context/UserInputContext";
import "./BinaCalculator.css";

const FleetProfile = ({ setActiveSection }) => {
  const { userData, updateUserData } = useUserInput();
  const calculator = userData.calculator || {};

  const currentPowerSource = calculator.currentPowerSource || "ice";
  const numberOfUnits = Number(calculator.numberOfUnits ?? 50);

  const setField = (data) => updateUserData("calculator", data);

  const handleNext = () => {
    if (!Number.isFinite(numberOfUnits) || numberOfUnits <= 0) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "warning",
        title: "⚠️ Please enter a valid number of units.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    setActiveSection("UsageIntensity");
  };

  return (
    <div className="bina-container">
      <div className="bina-header">
        <ShoppingBag size={36} className="bina-icon" />
        <div>
          <h2 className="bina-title">Current Fleet Assessment</h2>
          <p className="bina-subtitle">
            Calculate your potential CO2 savings and waste elimination by switching
            to Komatsu Lithium-ion.
          </p>
        </div>
      </div>

      <hr className="bina-divider" />

      <div className="bina-card">
        <div className="bina-grid">
          <div className="bina-field">
            <div className="bina-label">Current Power Source</div>
            <div className="bina-radio-group">
              <label className="bina-radio">
                <input
                  type="radio"
                  name="currentPowerSource"
                  value="ice"
                  checked={currentPowerSource === "ice"}
                  onChange={(e) => setField({ currentPowerSource: e.target.value })}
                />
                Internal Combustion Engine (Diesel/LPG)
              </label>
              <label className="bina-radio">
                <input
                  type="radio"
                  name="currentPowerSource"
                  value="lead_acid"
                  checked={currentPowerSource === "lead_acid"}
                  onChange={(e) => setField({ currentPowerSource: e.target.value })}
                />
                Lead-Acid Battery (Electric Traditional)
              </label>
            </div>
          </div>

          <div className="bina-field">
            <div className="bina-label">Number of Units</div>
            <div className="bina-input-row">
              <input
                className="bina-number"
                type="number"
                min={1}
                step={1}
                value={Number.isFinite(numberOfUnits) ? numberOfUnits : 50}
                onChange={(e) => setField({ numberOfUnits: e.target.value })}
              />
              <div className="bina-hint">Units</div>
            </div>
            <input
              className="bina-range"
              type="range"
              min={1}
              max={300}
              step={1}
              value={Number.isFinite(numberOfUnits) ? numberOfUnits : 50}
              onChange={(e) => setField({ numberOfUnits: e.target.value })}
            />
            <div className="bina-hint">Tip: set a rough fleet size first; fine-tune later.</div>
          </div>
        </div>

        <div className="bina-actions">
          <div />
          <button className="bina-btn bina-primary" onClick={handleNext}>
            Simulate Green Transition
          </button>
        </div>
      </div>
    </div>
  );
};

export default FleetProfile;

