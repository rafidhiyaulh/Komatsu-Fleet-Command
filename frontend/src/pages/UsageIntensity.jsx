import React from "react";
import Swal from "sweetalert2";
import { Car } from "lucide-react";
import { useUserInput } from "../context/UserInputContext";
import "./BinaCalculator.css";

const UsageIntensity = ({ setActiveSection }) => {
  const { userData, updateUserData } = useUserInput();
  const calculator = userData.calculator || {};

  const dailyOperationHours = Number(calculator.dailyOperationHours ?? 16);
  const operationalDaysPerYear = Number(calculator.operationalDaysPerYear ?? 300);

  const setField = (data) => updateUserData("calculator", data);

  const handleNext = () => {
    if (
      !Number.isFinite(dailyOperationHours) ||
      dailyOperationHours <= 0 ||
      !Number.isFinite(operationalDaysPerYear) ||
      operationalDaysPerYear <= 0
    ) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "warning",
        title: "⚠️ Please enter valid operational values.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    setActiveSection("ComparisonTarget");
  };

  return (
    <div className="bina-container">
      <div className="bina-header">
        <Car size={36} className="bina-icon" />
        <div>
          <h2 className="bina-title">Usage Intensity</h2>
          <p className="bina-subtitle">
            Provide a quick usage profile so we can scale the estimated impact.
          </p>
        </div>
      </div>

      <hr className="bina-divider" />

      <div className="bina-card">
        <div className="bina-grid">
          <div className="bina-field">
            <div className="bina-label">Daily Operation Hours</div>
            <div className="bina-radio-group">
              <label className="bina-radio">
                <input
                  type="radio"
                  name="dailyOperationHours"
                  value={8}
                  checked={dailyOperationHours === 8}
                  onChange={(e) =>
                    setField({ dailyOperationHours: Number(e.target.value) })
                  }
                />
                Single Shift (8 hours)
              </label>
              <label className="bina-radio">
                <input
                  type="radio"
                  name="dailyOperationHours"
                  value={16}
                  checked={dailyOperationHours === 16}
                  onChange={(e) =>
                    setField({ dailyOperationHours: Number(e.target.value) })
                  }
                />
                Double Shift (16 hours)
              </label>
              <label className="bina-radio">
                <input
                  type="radio"
                  name="dailyOperationHours"
                  value={24}
                  checked={dailyOperationHours === 24}
                  onChange={(e) =>
                    setField({ dailyOperationHours: Number(e.target.value) })
                  }
                />
                24/7 Operation
              </label>
            </div>
          </div>

          <div className="bina-field">
            <div className="bina-label">Operational Days per Year</div>
            <div className="bina-input-row">
              <input
                className="bina-number"
                type="number"
                min={1}
                max={366}
                step={1}
                value={
                  Number.isFinite(operationalDaysPerYear)
                    ? operationalDaysPerYear
                    : 300
                }
                onChange={(e) => setField({ operationalDaysPerYear: e.target.value })}
              />
              <div className="bina-hint">Default: 300 days</div>
            </div>
            <input
              className="bina-range"
              type="range"
              min={1}
              max={366}
              step={1}
              value={
                Number.isFinite(operationalDaysPerYear)
                  ? operationalDaysPerYear
                  : 300
              }
              onChange={(e) => setField({ operationalDaysPerYear: e.target.value })}
            />
          </div>
        </div>

        <div className="bina-actions">
          <button
            className="bina-btn bina-secondary"
            onClick={() => setActiveSection("FleetProfile")}
          >
            Previous
          </button>
          <button className="bina-btn bina-primary" onClick={handleNext}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsageIntensity;

