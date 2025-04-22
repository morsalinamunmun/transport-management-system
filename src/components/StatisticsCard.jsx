import React from "react";
import {
  FaTruck,
  FaChartPie,
  FaUsers,
  FaUserPlus,
  FaArrowUp,
} from "react-icons/fa";

const statisticsData = [
  {
    title: "টোটাল ট্রিপ",
    icon: <FaTruck className="text-white text-3xl" />,
    value: 20,
  },
  {
    title: "টোটাল গাড়ি",
    icon: <FaChartPie className="text-white text-3xl" />,
    value: 7,
  },
  {
    title: "টোটাল গ্রাহক",
    icon: <FaUsers className="text-white text-3xl" />,
    value: 10,
  },
  {
    title: "ড্রাইভার",
    icon: <FaUserPlus className="text-white text-3xl" />,
    value: 7,
  },
];

const StatisticsCard = () => {
  return (
    <div className="px-5 py-6">
      <ul className="grid grid-cols-2 md:flex gap-3 justify-between">
        {statisticsData.map((card, index) => (
          <li
            key={index}
            className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full"
          >
            <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
              <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
                {card.icon}
              </span>
              <div>
                <h3 className="text-[#11375B] md:font-semibold">
                  {card.title}
                </h3>
                <span className="text-gray-500 font-semibold">
                  {card.value}
                </span>
              </div>
            </div>
            <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
              <span className="pr-1 md:pr-3">আরও তথ্য</span>
              <FaArrowUp className="inline-block" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatisticsCard;
