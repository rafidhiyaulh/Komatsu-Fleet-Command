// import { useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Sidebar from "./components/Sidebar/Sidebar";
// import ContentBox from "./components/ContentBox/ContentBox";
// import "./App.css";

// function App() {
//   const [activeSection, setActiveSection] = useState("Shopping"); // Manage active section here

//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar />
//         <div className="main-container">
//           <Sidebar setActiveSection={setActiveSection} />
//           <ContentBox activeSection={activeSection} />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentBox from "./components/ContentBox/ContentBox";
import Home from "./pages/Home/Home"; // Import Home Page
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { UserInputProvider } from "./context/UserInputContext";
import ComingSoon from "./pages/ComingSoon";

function App() {
  const normalizeSection = (raw) => {
    const legacyToNew = {
      Shopping: "FleetProfile",
      Transport: "UsageIntensity",
      Electricity: "ComparisonTarget",
      Result: "ImpactReport",
    };

    if (!raw) return "FleetProfile";
    if (legacyToNew[raw]) return legacyToNew[raw];

    const allowed = new Set([
      "FleetProfile",
      "UsageIntensity",
      "ComparisonTarget",
      "ImpactReport",
    ]);
    return allowed.has(raw) ? raw : "FleetProfile";
  };

  const [activeSection, setActiveSection] = useState(() =>
    normalizeSection(localStorage.getItem("activeSection"))
  ); // Manage active section here

  return (
    <UserInputProvider>


    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home Page */}
            <Route
              path="/calculate"
              element={
                <div className="calculate-layout">
                  <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                  <ContentBox activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
              }
            />
            <Route path="/auth" element={<ComingSoon title="Authentication" />} />
            <Route path="/redeem" element={<ComingSoon title="Rewards & Redeem" />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </UserInputProvider>
  );
}

export default App;

