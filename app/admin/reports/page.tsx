
"use client"

import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { useEffect, useState } from "react";
import { ModalGalleryPopOver } from "@/components/globalComponents";
import { Token, externalurls } from "@/app/interface";
import { useCustomActionState, useCustomSSR } from "@/app/custom_hooks";
import { brandType, photoform } from "@/app/actions/auth";
import { IoMdCloudUpload } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import CustomTable from "@/components/customTable";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";






const Photos = (prop:{data?:any}) => {
    return (
        <div className="col-span-1 w-full h-52  rounded-lg relative border-4 border-l-fuchsia-800  ">
            <Image className="image-full rounded-md" src={`${prop?.data?.image}`} fill={true} alt="" />
        </div>
    )
}


export default function Home() {
    const [salesreportdata, setsalesreportdata] = useState<any[]>([]);
    const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

    const {
            ssrdata:productsrlist, 
            ssrerror:productsrerror,
            ssrstatus:productsrtatus,
            cssrmutate
        } 
            = useCustomSSR({url:`${externalurls.salesreportlist}`, headers:{
        "Authorization":`Bearer ${Token2} `
      } });
        
      useEffect(() => {
          setsalesreportdata(productsrlist)
        //   cssrmutate()
      }, [productsrlist])



  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Daily Reports" content={[
            {link:'/products', title:'products'}
          ]} />

            <div className="flex flex-row mt-5 mb-6 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-full max-sm:w-full">
                  <div className="grid grid-cols-1 gap-3 max-sm:flex max-sm:flex-col">
                    {salesreportdata?.length > 0 ? '' : 'Fetching, please wait...'}
                        {salesreportdata?.map((item, index) => (
                            <div key={`items${index}`}>
                                <div className="flex flex-row space-x-3 items-center">
                                    <div><FaArrowRightArrowLeft /></div>
                                    <div><h3 className="text-2xl">{`${item?.tracker}`}</h3></div>
                                </div>
                                <div className="mt-5">
                                    {salesreportdata?.length > 0 ? (
                                      <CustomTable
                                          thead={['client','Attendant','Mode', 'Hash', 'on loan']}
                                          mapper={['client.fullname','attendant.fullname','mode_of_payment', 'sales_hash', 'on_loan' ]}
                                          tbody={item?.sales_list}
                                      />
                                    ) : "Loading... "}
                                </div>
                            </div>
                        ))}
                  </div>
              </div>
              {/* aside */}
             
            </div>
            
        </main>
      </LayoutAdmin>
  );
}