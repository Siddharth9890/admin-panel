import { ScaleIcon } from "@heroicons/react/outline";
import { SearchBar } from "../components/SearchBar";
import Info from "../components/Info";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [transactionsToShow, setTransactionsToShow] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);
  const cards = [
    {
      name: "Total Users",
      icon: ScaleIcon,
      amount: usersCount,
    },
    {
      name: "Total Images compressed",
      icon: ScaleIcon,
      amount: imagesCount,
    },
    {
      name: "Total Videos downloaded",
      icon: ScaleIcon,
      amount: videoCount,
    },
  ];

  const fetchData = async () => {
    const imagesData = await axios.get(
      "http://localhost:5000/api/get-images-data"
    );
    const userData = await axios.get("http://localhost:5000/api/get-user-data");
    const videoData = await axios.get(
      "http://localhost:5000/api/get-videos-data"
    );
    const imagesResults = Object.values(imagesData.data);
    const userResults = Object.values(userData.data);
    const videoResults = Object.values(videoData.data);
    const filteredData = videoResults.filter((videoDetail) => {
      return videoDetail.IPV4 === undefined ? false : true;
    });
    setUsersCount(userResults.length);
    setVideoCount(videoResults.length);
    setImagesCount(imagesResults.length);
    const finalResults = imagesResults.concat(userResults, filteredData);

    setTransactionsToShow(finalResults.slice(0, 5));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className="min-h-full">
        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <SearchBar />
          </div>
          <main className="flex-1 pb-8">
            <Info />
            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Overview
                </h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cards.map((card) => (
                    <div
                      key={card.name}
                      className="bg-white overflow-hidden shadow rounded-lg"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <card.icon
                              className="h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                {card.name}
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  {card.amount}
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Last 10 activity
              </h2>

              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-full mx-auto">
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Country Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  IP Address
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Type
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {transactionsToShow.length > 0 &&
                                transactionsToShow.map((transaction, idx) => (
                                  <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {transaction.CountryName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {transaction.IPV4}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(
                                        transaction.Date
                                      ).toDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {transaction?.VideoTitle}
                                      {transaction?.PictureFormat || "USER"}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
