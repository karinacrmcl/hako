import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import Sorting from "../components/category-sorting";
import Menu from "../components/menu";
import { useMediaQuery } from "react-responsive";
import Header from "../components/header";

export default function Dashboard() {
  useEffect(() => {
    document.title = "HAKO | Dashboard";
  });

  const [isOnTop, setIsOnTop] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: "650px" });

  useEffect(() => {
    if (isMobile) {
      document
        .querySelector("#publications")
        ?.addEventListener("scroll", (e) => {
          if (document.getElementById("publications").scrollTop == 0) {
            setIsOnTop(true);
          } else {
            setIsOnTop(false);
          }
        });
    } else {
      return;
    }
  }, []);

  return (
    <div className="font-fontbasic mobileXL:shadow-none">
      <Header />
      <div className="w-full flex justify-center m-0-auto mobileXL:bg-gray-bgMobile">
        <div className="py-2 flex justify-between mt-32 lptpXS:mt-28 w-full max-w-containerLg lptpXL:px-6 lptpXS:px-8 mobileSM:px-2.5 rselative mobileXL:mt-16 mobileXL:flex-col mobileXL:items-center">
          <div className="mobileXL:h-12">
            <Sorting isOnTop={isOnTop} />
          </div>

          <Timeline />
          <div className="">
            <Sidebar />
          </div>
          <Menu />
        </div>
      </div>
    </div>
  );
}
