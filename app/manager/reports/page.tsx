
"use client"

import Image from "next/image";
import LayoutAdmin from "@/components/manager/AdminLayout";
import { LineTitle } from "@/components/manager/LineTitle";
import { useEffect, useState } from "react";
import { externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";
import CustomTable from "@/components/customTable";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Link from "next/link";


const Token2 = globalThis?.sessionStorage?.getItem("apptoken")



const Photos = (prop:{data?:any}) => {
    return (
        <div className="col-span-1 w-full h-52  rounded-lg relative border-4 border-l-fuchsia-800  ">
            <Image className="image-full rounded-md" src={`${prop?.data?.image}`} fill={true} alt="" />
        </div>
    )
}


export default function Home() {
    const [salesreportdata, setsalesreportdata] = useState<any[]>([]);
    

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
                    <table>
                      <tr>
                          <td><Link href={'/manager/reports/bymonth/'} className="btn btn-xs btn-warning" >View Monthly Report</Link></td>
                          {/* <td><Link href={''} className="btn btn-xs btn-info" >View Yearly Report</Link></td> */}
                      </tr>
                    
                    </table>
                  <div className="grid grid-cols-1 gap-3 max-sm:flex max-sm:flex-col mt-3">
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
                                          thead={['id','client','Attendant','Mode', 'Hash', 'On Loan','Amount']}
                                          mapper={['id','client.full_name','attendant.fullname','mode_of_payment', 'sales_hash', 'on_loan','total_price' ]}
                                          tbody={item?.sales_list}
                                          placeholder_values={{'$id':"data.id"}}

                                          actions={[
                                            { 
                                                name:'Print',
                                                id:'$id',
                                                link:'/manager/products/$id/',
                                                onclick(event:React.MouseEvent<HTMLAnchorElement>) {
                                                      event.preventDefault();
                                                      const ft = async () => {
                                                        const id = event?.currentTarget?.id
                                                        globalThis.location.href = `/admin/receipt/?id=${id}`
                                                    }
                                                    ft();
                                                },
                                            },
                                          ]}
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