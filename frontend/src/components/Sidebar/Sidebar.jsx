// import React, { useState } from "react";
// import "./Sidebar.css";
// import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

// const Sidebar = ({ setActiveSection }) => {
//   const [active, setActive] = useState("Transport");

//   const handleClick = (section) => {
//     setActive(section);
//     if (setActiveSection) {
//       setActiveSection(section);  
//     }
//   };

//   return (
//     <aside className="sidebar">
//       <ul>
//         <li
//           className={active === "Shopping" ? "active" : ""}
//           onClick={() => handleClick("Shopping")}
//         >
//           <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
//         </li>
//         <li
//           className={active === "Transport" ? "active" : ""}
//           onClick={() => handleClick("Transport")}
//         >
//           <Car size={20} strokeWidth={1.5} /> Transport
//         </li>
//         <li
//           className={active === "Electricity" ? "active" : ""}
//           onClick={() => handleClick("Electricity")}
//         >
//           <Bolt size={20} strokeWidth={1.5} /> Electricity
//         </li>
//         <li
//           className={active === "Food" ? "active" : ""}
//           onClick={() => handleClick("Food")}
//         >
//           <Utensils size={20} strokeWidth={1.5} /> Food
//         </li>
//         <li
//           className={active === "Result" ? "active" : ""}
//           onClick={() => handleClick("Result")}
//         >
//           <BarChart size={20} strokeWidth={1.5} /> Result
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import "./Sidebar.css";
// import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

// const Sidebar = ({ setActiveSection }) => {
//   const [active, setActive] = useState("Shopping");

//   const handleClick = (section) => {
//     setActive(section);
//     setActiveSection(section); // Ensure the parent component receives the update
//   };

//   return (
//     <aside className="sidebar">
//       <ul>
//         <li
//           className={active === "Shopping" ? "active" : ""}
//           onClick={() => handleClick("Shopping")}
//         >
//           <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
//         </li>
//         <li
//           className={active === "Transport" ? "active" : ""}
//           onClick={() => handleClick("Transport")}
//         >
//           <Car size={20} strokeWidth={1.5} /> Transport
//         </li>
//         <li
//           className={active === "Electricity" ? "active" : ""}
//           onClick={() => handleClick("Electricity")}
//         >
//           <Bolt size={20} strokeWidth={1.5} /> Electricity
//         </li>
//         <li
//           className={active === "Food" ? "active" : ""}
//           onClick={() => handleClick("Food")}
//         >
//           <Utensils size={20} strokeWidth={1.5} /> Food
//         </li>
//         <li
//           className={active === "Result" ? "active" : ""}
//           onClick={() => handleClick("Result")}
//         >
//           <BarChart size={20} strokeWidth={1.5} /> Result
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;





// import React, { useEffect, useState } from "react";
// import "./Sidebar.css";
// import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

// const Sidebar = ({ setActiveSection }) => {
//   // Load the active section from localStorage or default to "Shopping"
//   const [active, setActive] = useState(localStorage.getItem("activeSection") || "Shopping");

//   useEffect(() => {
//     setActiveSection(active); // Ensure the parent component gets the correct section on load
//   }, []); // Runs only on component mount

//   const handleClick = (section) => {
//     setActive(section);
//     setActiveSection(section); // Ensure the parent component receives the update
//     localStorage.setItem("activeSection", section); // Store in localStorage
//   };

//   return (
//     <aside className="sidebar">
//       <ul>
//         <li className={active === "Shopping" ? "active" : ""} onClick={() => handleClick("Shopping")}>
//           <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
//         </li>
//         <li className={active === "Transport" ? "active" : ""} onClick={() => handleClick("Transport")}>
//           <Car size={20} strokeWidth={1.5} /> Transport
//         </li>
//         <li className={active === "Electricity" ? "active" : ""} onClick={() => handleClick("Electricity")}>
//           <Bolt size={20} strokeWidth={1.5} /> Electricity
//         </li>
//         <li className={active === "Food" ? "active" : ""} onClick={() => handleClick("Food")}>
//           <Utensils size={20} strokeWidth={1.5} /> Food
//         </li>
//         <li className={active === "Result" ? "active" : ""} onClick={() => handleClick("Result")}>
//           <BarChart size={20} strokeWidth={1.5} /> Result
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;




import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { ShoppingBag, Car, Bolt, BarChart } from "lucide-react";

const Sidebar = ({ activeSection, setActiveSection }) => {
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

  const [active, setActive] = useState(() =>
    normalizeSection(localStorage.getItem("activeSection"))
  );

  useEffect(() => {
    console.log("Sidebar detected activeSection change:", activeSection);
    setActive(normalizeSection(activeSection));
  }, [activeSection]); // Sync with changes from parent

  const handleClick = (section) => {
    console.log("Sidebar clicked:", section);
    setActive(section);
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  return (
    <aside className="sidebar">
      <ul>
        <li
          className={active === "FleetProfile" ? "active" : ""}
          onClick={() => handleClick("FleetProfile")}
        >
          <ShoppingBag size={20} strokeWidth={1.5} /> Fleet Profile
        </li>
        <li
          className={active === "UsageIntensity" ? "active" : ""}
          onClick={() => handleClick("UsageIntensity")}
        >
          <Car size={20} strokeWidth={1.5} /> Usage Intensity
        </li>
        <li
          className={active === "ComparisonTarget" ? "active" : ""}
          onClick={() => handleClick("ComparisonTarget")}
        >
          <Bolt size={20} strokeWidth={1.5} /> Comparison Target
        </li>
        <li
          className={active === "ImpactReport" ? "active" : ""}
          onClick={() => handleClick("ImpactReport")}
        >
          <BarChart size={20} strokeWidth={1.5} /> Impact Report
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
