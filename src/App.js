import "./App.css";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Charts from "./Pages/Chart";
import SideBar from "./components/SideBar";
import { useContext, useEffect, useState } from "react";
import { MenuAlt1Icon } from "@heroicons/react/outline";
import Logging from "./Pages/Logging";
import Monitoring from "./Pages/Monitoring";
import RecentActivity from "./Pages/RecentActivity";
import Settings from "./Pages/Settings";
import { UserContext } from "./Context/UserContext";
import SignIn from "./Pages/SignIn";
import ReactLoading from "react-loading";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { userData, signInContext } = useContext(UserContext);

  useEffect(() => {
    setLoader(true);
    const userFromLocalStorage = localStorage.getItem("admin");
    const user = JSON.parse(userFromLocalStorage);
    if (user) {
      if (new Date(user.expiresIn) > new Date().getTime()) {
        signInContext(user);
      } else {
        localStorage.removeItem("admin");
      }
    }
    const timer = setTimeout(() => {
      setLoader(false);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return loader ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex justify-center items-center h-screen">
        <ReactLoading type={"spin"} color={"blue"} height={150} width={150} />
      </div>
    </div>
  ) : userData === null ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SignIn />
      </div>
    </div>
  ) : (
    <>
      <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      {userData !== null && (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/logging" element={<Logging />} />

          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/recent-activity" element={<RecentActivity />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      )}
    </>
  );
}

export default App;
