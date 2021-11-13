import { useEffect } from "react/cjs/react.development";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import Sorting from "../components/category-sorting";
import Menu from "../components/menu";
import CategoriesProvider from "../provider/categories-provider";

export default function Dashboard() {
  useEffect(() => {
    document.title = "HAKO | Dashboard";
  });

  return (
    <div className="font-fontbasic">
      <Header />
      <div className="container m-0-auto relative">
        <div className="flex w-full">
          <Sorting />
          <div className="ml-80 mt-32">
            <Timeline />
          </div>

          <Sidebar />
          <Menu />
        </div>
      </div>
    </div>
  );
}
