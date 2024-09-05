
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";


export default function Home() {
  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Warehouse" linkpath="home" />
            <div className="flex flex-row mt-5 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-full max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      <div>
                            sdsdds
                      </div>
                  </div>
              </div>
      
            </div>
        </main>
      </LayoutAdmin>
  );
}