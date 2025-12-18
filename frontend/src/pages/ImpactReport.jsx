import React, { useMemo } from "react";
import { BarChart } from "lucide-react";
import { useUserInput } from "../context/UserInputContext";
import { createSimplePdfBlob } from "../utils/simplePdf";
import "./BinaCalculator.css";

const formatNumber = (value, decimals = 0) => {
  if (!Number.isFinite(value)) return "-";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const ImpactReport = ({ setActiveSection }) => {
  const { userData } = useUserInput();
  const calculator = userData.calculator || {};

  const inputs = {
    currentPowerSource: calculator.currentPowerSource || "ice",
    numberOfUnits: Number(calculator.numberOfUnits ?? 50) || 50,
    dailyOperationHours: Number(calculator.dailyOperationHours ?? 16) || 16,
    operationalDaysPerYear: Number(calculator.operationalDaysPerYear ?? 300) || 300,
    comparisonTarget: calculator.comparisonTarget || "komatsu_lithium",
  };

  const results = useMemo(() => {
    const BASE = {
      units: 50,
      hours: 16,
      days: 300,
      savingsTons10y: 7425,
      leadWasteKg10y: 15000,
      reductionPercentVsICE: 28,
    };

    const targetFactor = inputs.comparisonTarget === "komatsu_hydrogen" ? 1.15 : 1.0;
    const utilizationFactor =
      (inputs.numberOfUnits / BASE.units) *
      (inputs.dailyOperationHours / BASE.hours) *
      (inputs.operationalDaysPerYear / BASE.days);

    const savingsTons10y = BASE.savingsTons10y * utilizationFactor * targetFactor;
    const reductionPercentVsICE = BASE.reductionPercentVsICE;
    const currentFleetTons10y = savingsTons10y / (reductionPercentVsICE / 100);
    const komatsuTons10y = Math.max(0, currentFleetTons10y - savingsTons10y);

    const leadWasteBaselineKg10y =
      BASE.leadWasteKg10y * (inputs.numberOfUnits / BASE.units);

    const carsEquivalent = savingsTons10y / 4.6;

    return {
      savingsTons10y,
      reductionPercentVsICE,
      currentFleetTons10y,
      komatsuTons10y,
      leadWasteBaselineKg10y,
      carsEquivalent,
    };
  }, [
    inputs.comparisonTarget,
    inputs.dailyOperationHours,
    inputs.numberOfUnits,
    inputs.operationalDaysPerYear,
  ]);

  const handleDownload = () => {
    const powerLabel =
      inputs.currentPowerSource === "lead_acid"
        ? "Lead-Acid Battery (Electric Traditional)"
        : "Internal Combustion Engine (Diesel/LPG)";

    const targetLabel =
      inputs.comparisonTarget === "komatsu_hydrogen"
        ? "Komatsu Hydrogen"
        : "Komatsu Lithium-ion";

    const lines = [
      `Client Inputs`,
      `- Current Power Source: ${powerLabel}`,
      `- Number of Units: ${formatNumber(inputs.numberOfUnits)}`,
      `- Daily Operation Hours: ${formatNumber(inputs.dailyOperationHours)}`,
      `- Operational Days per Year: ${formatNumber(inputs.operationalDaysPerYear)}`,
      `- Comparison Target: ${targetLabel}`,
      ``,
      `Estimated Impact (10 years)`,
      `- CO2 savings: ${formatNumber(results.savingsTons10y)} tons`,
      `- Carbon reduction vs ICE baseline: ${formatNumber(results.reductionPercentVsICE)}%`,
      `- Hazardous lead waste avoided: ${formatNumber(results.leadWasteBaselineKg10y)} kg (Komatsu: 0 kg)`,
      `- Equivalent to removing ~${formatNumber(results.carsEquivalent)} cars from the road (1-year equivalent)`,
      ``,
      `Note: This is a simplified simulation for early-stage awareness and tender preparation.`,
    ];

    const blob = createSimplePdfBlob({
      title: "ESG Tender Support Document (Simulation)",
      lines,
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Bina-Pertiwi-ESG-Tender-Support-Simulation.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleConsult = () => {
    const subject = encodeURIComponent("Consultation Request: Green Fleet Transition Simulation");
    const body = encodeURIComponent(
      [
        "Hi Astra Green Fleet Expert,",
        "",
        "We would like to discuss our green transition options based on this simulation:",
        `- Current Power Source: ${inputs.currentPowerSource}`,
        `- Units: ${inputs.numberOfUnits}`,
        `- Daily Hours: ${inputs.dailyOperationHours}`,
        `- Days/Year: ${inputs.operationalDaysPerYear}`,
        `- Target: ${inputs.comparisonTarget}`,
        "",
        "Please advise next steps and required data for a formal tender support document.",
      ].join("\n")
    );

    window.location.href = `mailto:greenfleet@astra.co.id?subject=${subject}&body=${body}`;
  };

  const maxForBars = Math.max(results.currentFleetTons10y, results.komatsuTons10y, 1);
  const currentPct = (results.currentFleetTons10y / maxForBars) * 100;
  const komatsuPct = (results.komatsuTons10y / maxForBars) * 100;

  return (
    <div className="bina-container">
      <div className="bina-header">
        <BarChart size={36} className="bina-icon" />
        <div>
          <h2 className="bina-title">Impact Report</h2>
          <p className="bina-subtitle">
            Immediate summary for GHG reduction (Issue B1) and hazardous waste elimination (Issue B2).
          </p>
        </div>
      </div>

      <hr className="bina-divider" />

      <div className="bina-card">
        <div className="bina-kpi">
          You could save {formatNumber(results.savingsTons10y)} Tons of CO2 over 10 years!
        </div>
        <p className="bina-kpi-sub">
          Scaled by units, operating hours, and operational days; benchmarked vs ICE baseline.
        </p>

        <div className="bina-metrics">
          <div className="bina-card">
            <p className="bina-metric-title">Carbon Footprint Reduction</p>
            <div className="bina-bars">
              <div className="bina-bar-wrap">
                <div className="bina-bar-label">Current Fleet</div>
                <div className="bina-bar" style={{ height: `${Math.max(14, (currentPct / 100) * 140)}px` }}>
                  {formatNumber(results.currentFleetTons10y)}t
                </div>
              </div>
              <div className="bina-bar-wrap">
                <div className="bina-bar-label">
                  {inputs.comparisonTarget === "komatsu_hydrogen" ? "Komatsu Hydrogen" : "Komatsu Lithium"}
                </div>
                <div
                  className="bina-bar secondary"
                  style={{ height: `${Math.max(14, (komatsuPct / 100) * 140)}px` }}
                >
                  {formatNumber(results.komatsuTons10y)}t
                </div>
              </div>
            </div>
            <p className="bina-metric-body">
              Achieves {formatNumber(results.reductionPercentVsICE)}% reduction vs ICE baseline immediately.
            </p>
          </div>

          <div className="bina-card">
            <p className="bina-metric-title">Hazardous Waste Elimination</p>
            <p className="bina-metric-body">
              0 kg hazardous lead waste generated vs{" "}
              {formatNumber(results.leadWasteBaselineKg10y)} kg with Lead-Acid batteries.
            </p>
            <div className="bina-note">
              Key differentiator for Safety/Toxic (lead elimination) in tender documentation.
            </div>
          </div>

          <div className="bina-card">
            <p className="bina-metric-title">Real World Equivalent</p>
            <p className="bina-metric-body">
              Equivalent to removing {formatNumber(results.carsEquivalent)} cars from the road.
            </p>
            <div className="bina-note">Using ~4.6 tons CO2 per car per year.</div>
          </div>
        </div>

        <div className="bina-cta">
          <button className="bina-btn bina-primary" onClick={handleDownload}>
            Download ESG Tender Support Document (PDF)
          </button>
          <button className="bina-btn bina-secondary" onClick={handleConsult}>
            Consult with Astra Green Fleet Expert
          </button>
        </div>

        <div className="bina-actions" style={{ marginTop: 14 }}>
          <button
            className="bina-btn bina-secondary"
            onClick={() => setActiveSection("ComparisonTarget")}
          >
            Previous
          </button>
          <div />
        </div>
      </div>
    </div>
  );
};

export default ImpactReport;
