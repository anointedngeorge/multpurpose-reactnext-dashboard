
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";





export default function Home() {
  return (
      <LayoutAdmin>
        <main className="p-2">
          <LineTitle heading="Dashboard" linkpath="home" />
            <div className="flex flex-row mt-5 r space-x-8">
              {/* section */}
              <div className="w-2/3">
                  <div className="flex flex-col space-y-10">
                      <div><Chartjs /></div>
                      {/* <div><Chartjs /></div> */}
                  </div>
              </div>
              {/* aside */}
              <div className="w-1/3">
                <AdminAside />
              </div>
            </div>
        </main>
      </LayoutAdmin>
  );
}
