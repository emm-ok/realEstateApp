import { Search } from "lucide-react";
import React from "react";
import propImage1 from "@/public/images/elite-prop-hmlP-v0vJ5o-unsplash.jpg"
import propImage2 from "@/public/images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg"
import propImage3 from "@/public/images/francesca-tosolini-tHkJAMcO3QE-unsplash.jpg"
import Image from "next/image";

const ActiveListing = () => {
  return (
    <div className="shadow-md">
      <div className="flex justify-between items-center">
        <h2>Active Listing</h2>
        <div>
          <label className="flex gap-2 border border-gray-300 rounded-full p-2">
            <Search size={18} />
            <input placeholder="Search" className="outline-none" />
          </label>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Units</th>
              <th>Cost</th>
              <th>Active Leads</th>
              <th>Views</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td className="flex items-center gap-2">
                <Image 
                    src={propImage1} 
                    alt="" 
                    width={100} 
                    height={100} 
                    className="w-6 h-6 object-cover rounded-full"
                />
                <p>Property Name</p>
              </td>
              <td className="py-4 px-2">House</td>
              <td className="py-4 px-2">12</td>
              <td className="py-4 px-2">$1.5M</td>
              <td className="py-4 px-2 flex items-center gap-0">
                <Image 
                    src={propImage1} 
                    alt="" 
                    width={100} 
                    height={100} 
                    className="w-6 h-6 object-cover rounded-full"
                />
                <Image 
                    src={propImage2} 
                    alt="" 
                    width={100} 
                    height={100} 
                    className="relative -left-2 w-6 h-6 object-cover rounded-full"
                />
                <Image 
                    src={propImage3} 
                    alt="" 
                    width={100} 
                    height={100} 
                    className="relative -left-4 w-6 h-6 object-cover rounded-full"
                />
                <p className="relative -left-3 font-bold">+1</p>
              </td>
              <td className="py-4 px-2">125</td>
              <td className="py-4 px-2">Occupied</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveListing;
