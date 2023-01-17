import React from "react";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  return (
    <div className="w-[90%] flex flex-wrap py-10 mx-auto gap-2 justify-center">
      <DashboardCard label="Categories" number="2" />
      <DashboardCard label="Authors" number="2" />
      <DashboardCard label="Posts" number="2" />
      <DashboardCard label="Users" number="2" />
    </div>
  );
};

export default Dashboard;
