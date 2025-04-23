import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const OverViewCard = () => {
  const [expiringDocs, setExpiringDocs] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://api.dropshep.com/api/vehicle"
        );
        const vehicles = response.data?.data || [];

        const today = dayjs();
        const expiring = [];

        vehicles.forEach((vehicle) => {
          ["fitness_date", "road_permit_date", "text_date"].forEach((type) => {
            const date = dayjs(vehicle[type]);
            if (
              date.isValid() &&
              date.diff(today, "day") <= 7 &&
              date.diff(today, "day") >= 0
            ) {
              expiring.push({
                vehicle: vehicle.registration_number,
                document: type.replace(/_/g, " ").toUpperCase(),
                expireDate: date.format("DD-MM-YYYY"),
              });
            }
          });
        });

        setExpiringDocs(expiring);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="p-5">
      <ul className="md:flex gap-3 flex-wrap">
        {/* Card 1: আয় */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">আজকের আয়</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>টোটাল আয়</span> - <span>1595</span>
              </p>
            </div>
          </div>
        </li>

        {/* Card 2: ব্যয় */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">আজকের ব্যয়</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>ফুয়েল খরচ</span> - <span>1000</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>ট্রিপের খরচ</span> - <span>3000</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>টোটাল খরচ</span> - <span>4000</span>
              </p>
            </div>
          </div>
        </li>

        {/* Card 3: রিকুইজিশন */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">রিকুইজিশন</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>গাড়ির ধরন</span> - <span>Truck</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>লোড পয়েন্ট</span> - <span>Baddha</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>আনলোড পয়েন্ট</span> - <span>Gazipur</span>
              </p>
            </div>
          </div>
        </li>

        {/* Card 4: রিমাইন্ডার */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">রিমাইন্ডার</h3>
          </div>
          <div className="py-3 text-primary font-semibold text-sm space-y-2">
            {expiringDocs.length > 0 ? (
              expiringDocs.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* <div className="bg-primary w-[6px] h-[6px] rounded-full" /> */}
                  <p className="w-full">
                    <p>ডকুমেন্টের নামঃ {item.document}</p>
                    <p>রেজি.নাঃ {item.vehicle}</p>
                    <p>মেয়াদোত্তীর্ণ তারিখ: {item.expireDate}</p>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                কোনো মেয়াদোত্তীর্ণ ডেট নেই
              </p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OverViewCard;
