
"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { IconType } from "react-icons";
import { FaMoneyBill, FaSalesforce } from "react-icons/fa";
import { useCustomSSR } from "../custom_hooks";
import { externalurls } from "../interface";
import { BsPerson } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";


interface CardInterface {
    Icon?:IconType,
    iconsize?:number,
    iconcolor?:string,
    title?:string,
    value?:any,
}

const Card = (prop:CardInterface) => {
    return (
      <div className="p-10 rounded-xl border-4 drop-shadow-sm bg-gray-100">
          <div className="flex flex-col  place-items-center">
                <div className="flex flex-row font-extrabold space-x-1 items-center">
                    <div>{prop.Icon? (
                      <prop.Icon size={prop.iconsize} color={prop.iconcolor} />
                    ) : ''} </div>
                    <div className="font-bold text-xs">
                        {prop?.title}
                    </div>
                </div>
                <div className="text-xl font-bold text-lightorange">
                    {prop.value}
                </div>
          </div>
      </div>
    )
}



export default function Home() {
 
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

    const {
            ssrdata, 
            ssrerror,
            ssrstatus,
        } 
            = useCustomSSR({url:`${externalurls.countlist}`, headers:{
        "Authorization":`Bearer ${Token2} `
      } });

  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Dashboard" linkpath="home" />
            <div className="flex flex-row mt-5 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-2/3 max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                    <div className="grid grid-cols-2 gap-3">
                          <Card
                              Icon={FaMoneyBill}
                              title="Revenue"
                              iconsize={30}
                              value={ssrdata?.revenue}
                          />
                          <Card
                              Icon={FaSalesforce}
                              title="Sales"
                              iconsize={30}
                              value={ssrdata?.sales}
                          />
                          <Card
                              Icon={FaMoneyBill}
                              title="Products"
                              iconsize={30}
                              value={ssrdata?.product_listing}
                          />
                          <Card
                              Icon={MdOutlineProductionQuantityLimits}
                              title="Brand Quantity"
                              iconsize={30}
                              value={ssrdata?.overall_quantity}
                          />
                          <Card
                              Icon={BsPerson}
                              title="Staff"
                              iconsize={30}
                              value={ssrdata?.staff}
                          />
                          <Card
                              Icon={BsPerson}
                              title="Manager"
                              iconsize={30}
                              value={ssrdata?.manager}
                          />

                          <Card
                              Icon={FaWarehouse}
                              title="Warehouse"
                              iconsize={30}
                              value={ssrdata?.warehouse}
                          />
                    </div>
                    <div><Chartjs /></div>
                  </div>
              </div>
              {/* aside */}
              <div className="w-1/3 max-sm:w-full">
                <AdminAside />
              </div>
            </div>
        </main>
      </LayoutAdmin>
  );
}