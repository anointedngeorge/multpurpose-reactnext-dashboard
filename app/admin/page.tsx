
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
import { TbCurrencyNaira } from "react-icons/tb";
import { moneyFormat } from "../utils/utils";


interface CardInterface {
    Icon?:IconType,
    iconsize?:number,
    iconcolor?:string,
    title?:string,
    value?:any,
}

const Card = (prop:CardInterface) => {
    return (
      <div className="p-8 rounded-2xl drop-shadow-sm  even:bg-gray-800 odd:bg-red-400 text-white font-bold ">
          <div className="flex flex-col  place-items-center">
                <div className="flex flex-row font-extrabold space-x-1 items-center">
                    <div>{prop.Icon? (
                      <prop.Icon size={prop.iconsize} color={prop.iconcolor} />
                    ) : ''} </div>
                    <div className="font-bold text-md ">
                        {prop?.title}
                    </div>
                </div>
                <div className="text-xl font-bold text-white ">
                    {prop.value}
                </div>
          </div>
      </div>
    )
}


export default function Home() {
 
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

    const {
            ssrdata
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
              <div className="w-full max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                    <div className="grid grid-cols-3 gap-3">
                          <Card
                              Icon={FaMoneyBill}
                              title="Revenue"
                              iconsize={30}
                              // value={ssrdata?.revenue}
                              value={moneyFormat({currency:'NGN', country:'en-NG'}).format(ssrdata?.revenue )}
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

                          <Card
                              Icon={TbCurrencyNaira}
                              title="Total Cost Price"
                              iconsize={30}
                              value={moneyFormat({currency:'NGN', country:'en-NG'}).format(ssrdata?.cost_price )}
                          />
                          
                    </div>
                    <div><Chartjs width="100%" /></div>
                  </div>
              </div>
              {/* aside */}
              <div className="w-1/4 max-sm:w-full">
                <AdminAside />
              </div>
            </div>
        </main>
      </LayoutAdmin>
  );
}