import React from "react";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

const MainTest = () => {
  return (
    <div className="flex flex-row">
      <BarChart />
      <PieChart />
    </div>
  );
};

export default MainTest;
