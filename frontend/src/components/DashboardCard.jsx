import React from "react";

const DashboardCard = ({ label, number }) => {
  return (
    <div className="cursor-pointer w-1/4 h-32 bg-emerald-400 flex flex-col items-center justify-center rounded-lg gap-2">
      <p className="text-4xl font-bold">{number}</p>
      <h2 className="text-xl">{label}</h2>
    </div>
  );
};

export default DashboardCard;
