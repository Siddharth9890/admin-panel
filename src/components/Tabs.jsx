import { useState } from "react";
import ImagesData from "./ImagesData";
import UserData from "./UserData";
import VideoData from "./VideoData";

const tabs = [
  { name: "User Data", id: 0 },
  { name: "Video data", id: 1 },
  { name: "Images data", id: 2 },
];

export default function Tabs() {
  const components = [
    <UserData></UserData>,
    <VideoData></VideoData>,
    <ImagesData></ImagesData>,
  ];
  const [active, setActive] = useState(components[0]);
  return (
    <>
      <div className="-mb-px flex">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 
              w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
            onClick={() => setActive(components[tab.id])}
          >
            {tab.name}
          </div>
        ))}
      </div>
      {active}
    </>
  );
}
