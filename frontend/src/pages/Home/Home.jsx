import React, { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  CheckCircle2,
  Download,
  FileText,
  IdCard,
  LayoutDashboard,
  Leaf,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { createSimplePdfBlob } from "../../utils/simplePdf";
import "./Home.css";

const Home = () => {
  const [activeNav, setActiveNav] = useState("overview");

  const navItems = [
    { key: "overview", label: "Fleet Overview", icon: LayoutDashboard },
    { key: "eco", label: "Eco-Monitor", icon: Leaf },
    { key: "safety", label: "Safety & K3", icon: Shield },
    { key: "compliance", label: "Compliance Center", icon: FileText },
    { key: "training", label: "Operator Training", icon: IdCard },
  ];

  const emissionTracking = useMemo(
    () => [
      { month: "Jan", co2Saved: 42.5 },
      { month: "Feb", co2Saved: 108.2 },
      { month: "Mar", co2Saved: 176.4 },
      { month: "Apr", co2Saved: 258.9 },
      { month: "May", co2Saved: 340.1 },
      { month: "Jun", co2Saved: 421.7 },
      { month: "Jul", co2Saved: 518.8 },
      { month: "Aug", co2Saved: 612.6 },
      { month: "Sep", co2Saved: 742.5 },
    ],
    []
  );

  const downloadGriSasbTemplate = () => {
    const blob = createSimplePdfBlob({
      title: "GRI / SASB Report (Template Export)",
      lines: [
        "Komatsu Fleet Command: ESG & Safety Monitor",
        "",
        "This is a placeholder template export for tender documentation.",
        "",
        "Included sections (example):",
        "- GRI 305: Emissions (Scope 1/2/3 placeholders)",
        "- SASB: Safety incidents / near misses placeholders",
        "- K3 Documentation checklist placeholders",
        "",
        "Replace with official data from Komtrax / EVCloud integrations.",
      ],
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GRI-SASB-Report-Template.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadK3Pack = () => {
    const blob = createSimplePdfBlob({
      title: "K3 Audit Pack (Template Export)",
      lines: [
        "Komatsu Fleet Command: ESG & Safety Monitor",
        "",
        "This is a placeholder K3 template pack export.",
        "",
        "Included sections (example):",
        "- K3 Documentation Checklist",
        "- Operator Certification Log",
        "- Battery Handling SOP acknowledgement (placeholder)",
        "- Incident / Near-miss form template",
      ],
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "K3-Audit-Pack-Template.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const ecoAlerts = [
    { id: 1, severity: "Info", text: "Charging schedule optimized for off-peak hours (simulation)." },
    { id: 2, severity: "Watch", text: "Unit #12: Energy consumption trending +6% vs 7-day average (simulation)." },
    { id: 3, severity: "Info", text: "EVCloud heartbeat stable across all active units (simulation)." },
  ];

  const safetyEvents = [
    { id: 1, type: "Near-miss", unit: "Unit #07", status: "Reviewed", note: "No injury, preventive action logged (simulation)." },
    { id: 2, type: "Inspection", unit: "Unit #03", status: "Pass", note: "Daily checklist completed (simulation)." },
    { id: 3, type: "Alert", unit: "Unit #15", status: "Resolved", note: "Charging bay congestion addressed (simulation)." },
  ];

  const operatorTraining = [
    { id: 1, name: "R. Andika", badge: "Gold", track: "Forklift Operations", progress: 92, next: "Annual refresh • Dec 2025" },
    { id: 2, name: "S. Mahendra", badge: "Silver", track: "Lithium Safety", progress: 78, next: "Battery handling exam • Jan 2026" },
    { id: 3, name: "N. Kartika", badge: "Gold", track: "K3 Compliance", progress: 88, next: "Audit readiness drill • Nov 2025" },
  ];

  return (
    <div className="kfc-page">
      <aside className="kfc-sidebar">
        <div className="kfc-brand">
          <div className="kfc-brand-title">Komatsu Fleet Command</div>
          <div className="kfc-brand-sub">ESG &amp; Safety Monitor</div>
        </div>

        <nav className="kfc-nav" aria-label="Dashboard navigation">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className={`kfc-nav-item ${activeNav === key ? "active" : ""}`}
              onClick={() => setActiveNav(key)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="kfc-content">
        <header className="kfc-header">
          <div>
            <h2 className="kfc-title">Komatsu Fleet Command: ESG &amp; Safety Monitor</h2>
            <p className="kfc-subtitle">
              Real-time fleet performance snapshot, compliance readiness, and
              operator safety status.
            </p>
          </div>
        </header>

        <section className="kfc-hero" aria-label="Hero">
          <div className="kfc-hero-media" aria-hidden="true">
            <video className="kfc-hero-video" autoPlay loop muted playsInline>
              <source src="/assets/earth3.mp4" type="video/mp4" />
            </video>
            <div className="kfc-hero-overlay" />
          </div>
          <div className="kfc-hero-content">
            <div className="kfc-hero-eyebrow">Demo Dashboard</div>
            <h1 className="kfc-hero-title">
              ESG visibility, safety governance, and tender-ready documentation—on one screen.
            </h1>
            <p className="kfc-hero-text">
              This is a concept UI to showcase how Komtrax / EVCloud data can be translated into ESG &amp; K3
              outputs for procurement and audits.
            </p>
            <div className="kfc-hero-actions">
              <Link to="/calculate" className="kfc-btn primary">
                Run Sustainability Calculator
              </Link>
              <button type="button" className="kfc-btn secondary" onClick={downloadGriSasbTemplate}>
                <Download size={16} />
                Download Sample Report
              </button>
            </div>
          </div>
        </section>

        {activeNav === "overview" && (
          <>
            <section className="kfc-kpi-grid" aria-label="Key performance indicators">
              <div className="kfc-kpi-card">
                <div className="kfc-kpi-top">
                  <div className="kfc-kpi-label">Real-Time CO2 Reduction</div>
                  <ArrowUpRight size={16} className="kfc-kpi-icon" />
                </div>
                <div className="kfc-kpi-value">742.5 Tons</div>
                <div className="kfc-kpi-sub">
                  Year to Date • vs ICE Baseline (28% Saving)
                </div>
                <div className="kfc-kpi-source">Data Source: Komtrax Integrated</div>
              </div>

              <div className="kfc-kpi-card">
                <div className="kfc-kpi-top">
                  <div className="kfc-kpi-label">Fleet Safety Score</div>
                  <Shield size={16} className="kfc-kpi-icon" />
                </div>
                <div className="kfc-kpi-value">98/100</div>
                <div className="kfc-kpi-sub">Low Risk Classification</div>
                <div className="kfc-kpi-source">
                  Data Source: Automated Risk Evaluation
                </div>
              </div>

              <div className="kfc-kpi-card">
                <div className="kfc-kpi-top">
                  <div className="kfc-kpi-label">Active Units</div>
                  <BatteryCharging size={16} className="kfc-kpi-icon" />
                </div>
                <div className="kfc-kpi-value">48/50 Units</div>
                <div className="kfc-kpi-sub">2 Charging, 0 Maintenance</div>
                <div className="kfc-kpi-source">Data Source: EVCloud Monitoring</div>
              </div>

              <div className="kfc-kpi-card">
                <div className="kfc-kpi-top">
                  <div className="kfc-kpi-label">Insurance Premium Status</div>
                  <CheckCircle2 size={16} className="kfc-kpi-icon" />
                </div>
                <div className="kfc-kpi-value">Gold Tier Unlocked</div>
                <div className="kfc-kpi-sub">15% Premium Discount Applied</div>
                <div className="kfc-kpi-source">
                  Data Source: Insurance Partnership
                </div>
              </div>
            </section>

            <section className="kfc-main-grid" aria-label="Analytics">
              <div className="kfc-card">
                <div className="kfc-card-header">
                  <div>
                    <h3 className="kfc-card-title">Real-Time Emission Tracking</h3>
                    <p className="kfc-card-sub">Monthly cumulative CO2 savings (YTD)</p>
                  </div>
                  <button
                    type="button"
                    className="kfc-link-btn"
                    onClick={downloadGriSasbTemplate}
                  >
                    <Download size={16} />
                    Download GRI/SASB Report
                  </button>
                </div>

                <div className="kfc-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                      data={emissionTracking}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="kfcArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6b99c8" stopOpacity={0.55} />
                          <stop offset="95%" stopColor="#b7c7f4" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d9e1f2" />
                      <XAxis dataKey="month" stroke="#2b3e68" />
                      <YAxis stroke="#2b3e68" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="co2Saved"
                        stroke="#2b3e68"
                        strokeWidth={2}
                        fill="url(#kfcArea)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="kfc-card">
                <div className="kfc-card-header">
                  <div>
                    <h3 className="kfc-card-title">Safety Compliance &amp; Risk Matrix</h3>
                    <p className="kfc-card-sub">
                      Audit readiness and operational risk indicators
                    </p>
                  </div>
                </div>

                <div className="kfc-progress">
                  <div className="kfc-progress-row">
                    <div className="kfc-progress-label">
                      <span>K3 Documentation</span>
                      <span className="kfc-progress-meta">100% • Ready for Audit</span>
                    </div>
                    <div className="kfc-progress-bar">
                      <div className="kfc-progress-fill" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div className="kfc-progress-row">
                    <div className="kfc-progress-label">
                      <span>Battery Health Check</span>
                      <span className="kfc-progress-meta">Good</span>
                    </div>
                    <div className="kfc-progress-bar">
                      <div className="kfc-progress-fill secondary" style={{ width: "92%" }} />
                    </div>
                  </div>
                </div>

                <div className="kfc-operators">
                  <div className="kfc-operators-title">
                    Certified Operators (Digital Badges)
                  </div>

                  <div className="kfc-operator-row">
                    <div className="kfc-avatar">RA</div>
                    <div className="kfc-operator-meta">
                      <div className="kfc-operator-name">R. Andika</div>
                      <div className="kfc-badges">
                        <span className="kfc-badge gold">Gold</span>
                        <span className="kfc-badge">Forklift</span>
                      </div>
                    </div>
                  </div>

                  <div className="kfc-operator-row">
                    <div className="kfc-avatar">SM</div>
                    <div className="kfc-operator-meta">
                      <div className="kfc-operator-name">S. Mahendra</div>
                      <div className="kfc-badges">
                        <span className="kfc-badge silver">Silver</span>
                        <span className="kfc-badge">Lithium Safety</span>
                      </div>
                    </div>
                  </div>

                  <div className="kfc-operator-row">
                    <div className="kfc-avatar">NK</div>
                    <div className="kfc-operator-meta">
                      <div className="kfc-operator-name">N. Kartika</div>
                      <div className="kfc-badges">
                        <span className="kfc-badge gold">Gold</span>
                        <span className="kfc-badge">K3 Certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeNav === "eco" && (
          <div className="kfc-tab-grid">
            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">Eco-Monitor</h3>
                  <p className="kfc-card-sub">
                    Representation of Komtrax / EVCloud environmental feed.
                  </p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <div className="kfc-mini-kpis">
                  <div className="kfc-mini-kpi">
                    <div className="kfc-mini-label">Charging Efficiency</div>
                    <div className="kfc-mini-value">94%</div>
                    <div className="kfc-pill">Stable</div>
                  </div>
                  <div className="kfc-mini-kpi">
                    <div className="kfc-mini-label">Energy Consumption</div>
                    <div className="kfc-mini-value">1.28 MWh</div>
                    <div className="kfc-pill muted">Weekly</div>
                  </div>
                  <div className="kfc-mini-kpi">
                    <div className="kfc-mini-label">CO2 Reduction</div>
                    <div className="kfc-mini-value">742.5 t</div>
                    <div className="kfc-pill">YTD</div>
                  </div>
                </div>

                <div className="kfc-card-inner">
                  <div className="kfc-card-inner-title">Emission Savings Trend (Dummy)</div>
                  <div className="kfc-chart compact">
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={emissionTracking} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="kfcAreaEco" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6b99c8" stopOpacity={0.55} />
                            <stop offset="95%" stopColor="#b7c7f4" stopOpacity={0.2} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d9e1f2" />
                        <XAxis dataKey="month" stroke="#2b3e68" />
                        <YAxis stroke="#2b3e68" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="co2Saved"
                          stroke="#2b3e68"
                          strokeWidth={2}
                          fill="url(#kfcAreaEco)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">Eco Alerts (Dummy)</h3>
                  <p className="kfc-card-sub">What the client would see from Komtrax/EVCloud monitoring.</p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <ul className="kfc-list">
                  {ecoAlerts.map((a) => (
                    <li key={a.id} className="kfc-list-item">
                      <span className={`kfc-pill ${a.severity === "Watch" ? "accent" : ""}`}>{a.severity}</span>
                      <span className="kfc-list-text">{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeNav === "safety" && (
          <div className="kfc-tab-grid">
            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">Safety &amp; K3</h3>
                  <p className="kfc-card-sub">
                    Representation of safety assessment and risk evaluation.
                  </p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <div className="kfc-mini-kpis">
                  <div className="kfc-mini-kpi">
                    <div className="kfc-mini-label">Incidents</div>
                    <div className="kfc-mini-value">0</div>
                    <div className="kfc-pill">This Month</div>
                  </div>
                  <div className="kfc-mini-kpi">
                    <div className="kfc-mini-label">Near-miss Reports</div>
                    <div className="kfc-mini-value">3</div>
                    <div className="kfc-pill muted">Reviewed</div>
                  </div>
                  <div className="kfc-mini-kpi">
                    <div className="kfc-mini-label">Risk Classification</div>
                    <div className="kfc-mini-value">Low</div>
                    <div className="kfc-pill accent">98/100</div>
                  </div>
                </div>

                <div className="kfc-card-inner">
                  <div className="kfc-card-inner-title">Recent Safety Events (Dummy)</div>
                  <div className="kfc-table">
                    <div className="kfc-table-row head">
                      <div>Type</div>
                      <div>Unit</div>
                      <div>Status</div>
                      <div>Note</div>
                    </div>
                    {safetyEvents.map((e) => (
                      <div key={e.id} className="kfc-table-row">
                        <div>{e.type}</div>
                        <div>{e.unit}</div>
                        <div>
                          <span className="kfc-pill">{e.status}</span>
                        </div>
                        <div className="kfc-table-note">{e.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">Audit Readiness</h3>
                  <p className="kfc-card-sub">Checklist-style progress (Dummy).</p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <div className="kfc-progress">
                  <div className="kfc-progress-row">
                    <div className="kfc-progress-label">
                      <span>K3 Documentation</span>
                      <span className="kfc-progress-meta">100% • Ready</span>
                    </div>
                    <div className="kfc-progress-bar">
                      <div className="kfc-progress-fill" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div className="kfc-progress-row">
                    <div className="kfc-progress-label">
                      <span>Battery Handling SOP</span>
                      <span className="kfc-progress-meta">90% • In review</span>
                    </div>
                    <div className="kfc-progress-bar">
                      <div className="kfc-progress-fill secondary" style={{ width: "90%" }} />
                    </div>
                  </div>

                  <div className="kfc-progress-row">
                    <div className="kfc-progress-label">
                      <span>Operator Certification</span>
                      <span className="kfc-progress-meta">86% • On track</span>
                    </div>
                    <div className="kfc-progress-bar">
                      <div className="kfc-progress-fill secondary" style={{ width: "86%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeNav === "compliance" && (
          <div className="kfc-tab-grid">
            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">Compliance Center</h3>
                  <p className="kfc-card-sub">
                    Download templates for GRI/SASB &amp; K3 documentation.
                  </p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <div className="kfc-actions-row">
                  <button type="button" className="kfc-btn secondary" onClick={downloadGriSasbTemplate}>
                    <Download size={16} />
                    Download GRI/SASB Report
                  </button>
                  <button type="button" className="kfc-btn secondary" onClick={downloadK3Pack}>
                    <Download size={16} />
                    Download K3 Audit Pack
                  </button>
                </div>

                <div className="kfc-card-inner">
                  <div className="kfc-card-inner-title">Readiness Checklist (Dummy)</div>
                  <ul className="kfc-list">
                    <li className="kfc-list-item">
                      <span className="kfc-pill">Ready</span>
                      <span className="kfc-list-text">GRI 305 (Emissions): Scope 1/2/3 structure prepared</span>
                    </li>
                    <li className="kfc-list-item">
                      <span className="kfc-pill muted">Draft</span>
                      <span className="kfc-list-text">SASB: Safety incidents summary template</span>
                    </li>
                    <li className="kfc-list-item">
                      <span className="kfc-pill accent">In Review</span>
                      <span className="kfc-list-text">K3 documentation pack for audit submission</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">What gets exported</h3>
                  <p className="kfc-card-sub">Dummy export list to sell the idea.</p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <ul className="kfc-list">
                  <li className="kfc-list-item">
                    <span className="kfc-pill">PDF</span>
                    <span className="kfc-list-text">Executive summary (CO2 + hazardous waste)</span>
                  </li>
                  <li className="kfc-list-item">
                    <span className="kfc-pill">XLSX</span>
                    <span className="kfc-list-text">Asset list + operating assumptions (fleet inputs)</span>
                  </li>
                  <li className="kfc-list-item">
                    <span className="kfc-pill muted">API</span>
                    <span className="kfc-list-text">Komtrax / EVCloud connector endpoints (placeholder)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeNav === "training" && (
          <div className="kfc-tab-grid">
            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">Operator Training</h3>
                  <p className="kfc-card-sub">
                    Certifications &amp; digital badge issuance (placeholder).
                  </p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <div className="kfc-card-inner">
                  <div className="kfc-card-inner-title">Training Pipeline (Dummy)</div>
                  <div className="kfc-progress">
                    <div className="kfc-progress-row">
                      <div className="kfc-progress-label">
                        <span>Forklift Operations</span>
                        <span className="kfc-progress-meta">92% • Certified</span>
                      </div>
                      <div className="kfc-progress-bar">
                        <div className="kfc-progress-fill" style={{ width: "92%" }} />
                      </div>
                    </div>
                    <div className="kfc-progress-row">
                      <div className="kfc-progress-label">
                        <span>Lithium Battery Safety</span>
                        <span className="kfc-progress-meta">78% • In progress</span>
                      </div>
                      <div className="kfc-progress-bar">
                        <div className="kfc-progress-fill secondary" style={{ width: "78%" }} />
                      </div>
                    </div>
                    <div className="kfc-progress-row">
                      <div className="kfc-progress-label">
                        <span>K3 Audit Readiness</span>
                        <span className="kfc-progress-meta">88% • On track</span>
                      </div>
                      <div className="kfc-progress-bar">
                        <div className="kfc-progress-fill secondary" style={{ width: "88%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="kfc-card">
              <div className="kfc-card-header">
                <div>
                  <h3 className="kfc-card-title">Certified Operators</h3>
                  <p className="kfc-card-sub">Digital badge showcase (Dummy).</p>
                </div>
              </div>
              <div className="kfc-tab-body">
                <div className="kfc-operator-list">
                  {operatorTraining.map((o) => (
                    <div key={o.id} className="kfc-operator-tile">
                      <div className="kfc-avatar">{o.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</div>
                      <div className="kfc-operator-meta">
                        <div className="kfc-operator-name">{o.name}</div>
                        <div className="kfc-badges">
                          <span className={`kfc-badge ${o.badge === "Gold" ? "gold" : "silver"}`}>{o.badge}</span>
                          <span className="kfc-badge">{o.track}</span>
                        </div>
                        <div className="kfc-operator-next">{o.next}</div>
                      </div>
                      <div className="kfc-meter" aria-label={`Progress ${o.progress}%`}>
                        <div className="kfc-meter-fill" style={{ width: `${o.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
