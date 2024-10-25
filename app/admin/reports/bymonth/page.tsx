
"use client"

import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import { LineTitle } from "@/components/admin/LineTitle";
import { useCallback, useEffect, useState } from "react";
import { APIBASEURl, externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";
import CustomTable from "@/components/customTable";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Link from "next/link";


const Token2 = globalThis?.sessionStorage?.getItem("apptoken")


export default function Home() {
    const [salesreportdata, setsalesreportdata] = useState<any[]>([]);
    const date =  new Date()
    
    
    const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ]

    const get_current_month = `${months[date.getMonth()]}`.toLowerCase()

    const {
            ssrdata:productsrlist, 
            ssrerror:productsrerror,
            ssrstatus:productsrtatus,
            cssrmutate
        } 
            = useCustomSSR({url:`${APIBASEURl}/api/v1/reports/monthly/reports`, headers:{
        "Authorization":`Bearer ${Token2} `
      } });
        
      useEffect(() => {
        const filtered = productsrlist?.filter((item:{month:string}) => item.month == get_current_month )
        setsalesreportdata(filtered)
      }, [productsrlist, get_current_month])

  const selectReport = useCallback((event:React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      // alert(value)
      const filtered = productsrlist?.filter((item:{month:string}) => item.month == value )
      setsalesreportdata(filtered)
      
  }, [productsrlist])


  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Monthly Reports" />

            <div className="flex flex-row mt-5 mb-6 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-full max-sm:w-full">
                    <table className="table table-xs">
                      <tr>
                          <td><Link href={'/admin/reports'} className="btn btn-xs btn-warning" >View Daily Reports</Link></td>
                          <td>
                              <div className="flex flex-col">
                                  <div><label >Monthly Report</label></div>
                                  <div>
                                      <select onChange={selectReport}  className="select select-xs">
                                        <option value="choose"> Select Date </option>
                                        {months?.map((item, index) => (
                                            <option key={`report_${item}_${index}`} value={`${item.toLowerCase()}`} >{`${item}`}</option>
                                        ))}
                                      </select>
                                  </div>
                              </div>
                          </td>
                      </tr>
                    
                    </table>
                  <div className="grid grid-cols-1 gap-3 max-sm:flex max-sm:flex-col mt-3">
                    {salesreportdata?.length > 0 ? '' : 'Fetching, please wait...'}
                        {salesreportdata?.map((item, index) => (
                            <div key={`items${index}`}>
                                <div className="flex flex-row space-x-3 items-center">
                                    <div><FaArrowRightArrowLeft /></div>
                                    <div><h3 className="text-2xl">{`${item?.month}`.toUpperCase()}</h3></div>
                                </div>
                                <div className="mt-5">
                                  
                                    {salesreportdata?.length > 0 ? (
                                      <CustomTable
                                          thead={['client','Attendant','Mode', 'Hash', 'On Loan','Amount']}
                                          mapper={['client.full_name','attendant.fullname','mode_of_payment', 'sales_hash', 'on_loan','total_price' ]}
                                          tbody={item?.sales_list}
                                          placeholder_values={{'$id':"data.id"}}

                                          actions={[
                                            { 
                                                name:'Print',
                                                id:'$id',
                                                link:'/admin/products/$id/',
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