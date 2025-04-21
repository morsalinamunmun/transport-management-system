import React from "react";

const OverViewCard = () => {
  return (
    <div className="p-5">
      <ul className="md:flex gap-3 flex-wrap">
        {/* Card 1 */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">আজকের আয়</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>ফুয়েল খরচ</span> - <span>0</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>ট্রিপের খরচ</span> - <span>395</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>টোটাল আয়</span> - <span>200</span>
              </p>
            </div>
          </div>
        </li>

        {/* Card 2 */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">আজকের ব্যয়</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>ফুয়েল খরচ</span> - <span>0</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>ট্রিপের খরচ</span> - <span>0</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>টোটাল খরচ</span> - <span>200</span>
              </p>
            </div>
          </div>
        </li>

        {/* Card 3 */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">রিকুইজিশন</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>গাড়ির ধরন</span> - <span>0</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>লোড এবং আনলোড পয়েন্ট</span> - <span>0</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>Maintenance requisition</span> - <span>0</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>Fuel requisition</span> - <span>0</span>
              </p>
            </div>
          </div>
        </li>

        {/* Card 4 */}
        <li className="bg-white rounded-md p-3 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">রিমাইন্ডার</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>গাড়ির নাম্বার</span> - <span>0</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>ডকুমেন্টস এর নাম</span> - <span>1014</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>মেয়াদোত্তীর্ণ তারিখ</span> - <span>1014</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OverViewCard;
