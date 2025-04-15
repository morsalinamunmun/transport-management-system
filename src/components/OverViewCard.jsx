import React from "react";

const cardData = [
  {
    title: "যানবাহন",
    items: [
      { label: "On requisition", value: 0 },
      { label: "On maintenance", value: 395 },
      { label: "Available", value: 0 },
    ],
  },
  {
    title: "আজকের রিকুইজিশন",
    items: [
      { label: "Vehicle requisition", value: 0 },
      { label: "Pick & drop requisition", value: 0 },
      { label: "Maintenance requisition", value: 0 },
      { label: "Fuel requisition", value: 0 },
    ],
  },
  {
    title: "রিমাইন্ডার",
    items: [
      { label: "Legal doc soon expire", value: 0 },
      { label: "Legal doc expired", value: 1014 },
    ],
  },
  {
    title: "অন্যান্য কার্যক্রম",
    items: [
      { label: "Stock in", value: 477199 },
      { label: "Stock out", value: 1170325 },
    ],
  },
];

const OverViewCard = () => {
  return (
    <div className="p-5">
      <ul className="md:flex gap-3 flex-wrap">
        {cardData.map((card, index) => (
          <li
            key={index}
            className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3"
          >
            <div className="text-primary border-b pb-3 border-gray-300">
              <h3 className="font-semibold">{card.title}</h3>
            </div>
            <div className="p-3 text-primary font-semibold text-sm space-y-2">
              {card.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-primary w-[6px] h-[6px] rounded-full" />
                  <p className="flex justify-between w-full">
                    <span>{item.label}</span> - <span>{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverViewCard;
