
"use client"


import LayoutAdmin from "@/components/admin/AdminLayout";
import { LineTitle } from "@/components/admin/LineTitle";
import { useCallback, useEffect, useState } from "react";
import { APIBASEURl, externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";

// import Link from "next/link";


const Token2 = globalThis?.sessionStorage?.getItem("apptoken")


export default function Home() {
    const [salesreportdata, setsalesreportdata] = useState<any[]>([]);
    
    const {
            ssrdata:productsrlist, 
        } 
            = useCustomSSR({url:`${externalurls.productlist}/all`, headers:{
        "Authorization":`Bearer ${Token2} `
      } });
        
      useEffect(() => {
          setsalesreportdata(productsrlist)
        //   cssrmutate()
      }, [productsrlist])

    
    const updateCostPrice = useCallback( async (event:React.MouseEvent<HTMLInputElement>) => {
      const amount = event?.currentTarget?.value;
      const productid = event?.currentTarget?.dataset.productid;
      
        const ft = fetch(`${APIBASEURl}/api/v1/products/updatecostprice/${amount}/${productid}/`, {
            method:'put',
            headers:{
              'Authorization': `Bearer ${Token2}`
            }
        })
        const response =  (await ft).json();
       
        if ((await ft).ok) {
            // const response =  (await ft).json();
            alert("Cost Price Updated.")
        } else {
          alert("Failed To Update.")
        }

    }, [])


  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Product Cost Prices" />

            <div className="flex flex-row mt-5 mb-6 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-full max-sm:w-full">
                  <table className="table table-sm">
                      <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Type</th>
                            <th>Price</th>
                  
                        </tr>
                      </thead>

                      <tbody>
                          {salesreportdata?.map((item:{
                              id:string, name:string, 
                              brand_type:{brand_type:{name:string}},
                              brands:{name:string},
                              cost_price:number
                          }, index) => (
                            <tr key={`product_list_${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item?.brands?.name}</td>
                                <td>{item?.brand_type?.brand_type?.name} </td>
                                <td><input data-productid={item.id} title="Double click to save" onDoubleClick={updateCostPrice} type="number" defaultValue={item?.cost_price} className="input border-2 border-black input-sm font-black" /></td>
                            </tr>
                          ))}
                      </tbody>
                  </table>
                   {/* {JSON.stringify(salesreportdata)} */}
              </div>
              {/* aside */}
             
            </div>
            
        </main>
      </LayoutAdmin>
  );
}