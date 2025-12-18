import React, { createContext, useContext, useState } from "react";

const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    transport: { mode: "", carpool: "", driveFrequency: "" , dailyDistance: ""},
    energy: { energyType: "", applianceUsage: "" ,electricityBill: "" },
    food: { meatFrequency: "", meatLover: "", dairyFrequency: "", restaurantChoice: "" },
    shopping: { purchaseCategory:"",shoppingFrequency:"", clothingPurchase: "", electronicsReplacement: "", mediumElectronics: "", homeFurniture: "", applianceReplacement: ""}, // Ensure shopping exists
    calculator: {
      currentPowerSource: "ice",
      numberOfUnits: 50,
      dailyOperationHours: 16,
      operationalDaysPerYear: 300,
      comparisonTarget: "komatsu_lithium",
    },
  });

  const updateUserData = (category, data) => {
    setUserData((prev) => ({
      ...prev,
      [category]: { ...prev[category], ...data }, // Merge new data
    }));
  };

  return (
    <UserInputContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserInputContext.Provider>
  );
};

export const useUserInput = () => useContext(UserInputContext);
