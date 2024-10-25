"use client"
import { useCustomSSR } from "@/app/custom_hooks";
import { APIBASEURl, externalurls } from "@/app/interface";
import CustomTable from "@/components/customTable";
import LayoutAdmin from "@/components/manager/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";



export default function Home() {
  const [dataset,setDataset] = useState<any>([])
  const [pagehref, setPagehref] = useState<string | null>(null)
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

  const {
    ssrdata, 
    } = useCustomSSR({url:`${APIBASEURl}/api/v1/products/request/`, headers:{
    "Authorization":`Bearer ${Token2}`
  }});

  useEffect(() => {
  setDataset(ssrdata)
  }, [ssrdata])

   const rejectRequestFun =   useCallback( async (event:React.MouseEvent<HTMLTitleElement>) => {
      event.preventDefault();
      const product_id = event?.currentTarget?.dataset?.id;
 
      const url = `${APIBASEURl}/api/v1/products/reject/request/${product_id}/`;

      if (confirm("Are you sure")) {
          const ft = fetch(url, {
              method:'delete',
              headers:{
                  "Authorization":`Bearer ${Token2}`
              }
            });

            if ((await ft).ok) {
                alert("Request Sent");
            }
      }
      
   }, [Token2])


   const confirmFun =   useCallback( async (event:React.MouseEvent<HTMLTitleElement>) => {
    event.preventDefault();
    const btnid = event?.currentTarget?.dataset?.btnid;
    const request_id = event?.currentTarget?.dataset?.id;
    const selectid = event?.currentTarget?.dataset?.selectid;
    const quantity = document.getElementById(`${btnid}`) as HTMLInputElement | null;
    const sizes = document.getElementById(`${selectid}`) as HTMLInputElement | null;
    const url = `${APIBASEURl}/api/v1/products/assign/request/${request_id}/${quantity?.value}/${sizes?.value}/`;

    if (confirm("Are You Sure?")) {
        const ft = fetch(url, {
          method:'put',
          headers:{
              "Authorization":`Bearer ${Token2}`
          }
        });
    
        ft.then(async e => {
            if (e.ok) {
                const m =  await e.json();
                alert(m['message']);
            }else {
              const m =  await e.json();
              alert(m['message']);
            }
        })
      }
    
 }, [Token2])


  return (
      <LayoutAdmin>
        
        <div className="overflow-auto">
        {/* {JSON.stringify(dataset)} */}
          <table className="table table-sm">
              <thead className="bg-red-600 text-white font-bold">
                  <tr>
                    <td>#</td>
                    <td>Image</td>
                    <td>Product Name</td>
                    <td>Brands Name</td>
                    <td>Sizes</td>
                    <td>Quantity</td>
                    <td>...</td>
                  </tr>
              </thead>
              <tbody className="text-black font-bold">
                {dataset?.map((item:{
                      id:string,
                      name:string,
                      product:{id:string, name:string, product:{brands:{name?:string}}, image:{image:string} },
                      size:string,
                      quantity:string,
                      
                  }, index:number) => (
                    <tr className="even:bg-red-200 odd:bg-red-100" key={`product_list_${index}`}>
                      <td>{index + 1}.</td>
                        <td>
                            <Image src={`${item?.product?.image? item?.product?.image?.image : '/'}`} className="rounded-md" height={100} width={80} alt="..." />
                        </td>
                    
                        <td>{`${item?.product?.name}`}</td>
                        <td>{`${item?.product?.product.brands?.name}`}</td>
                        <td>
                            <input type="text" className="w-10" readOnly id={`select_${index}`} defaultValue={item?.size} />
                        </td>
                        <td>
                        <input type="text" className="w-10" readOnly id={`btn_${index}`} defaultValue={item?.quantity} />
                        </td>
                        <td>
                          <table>
                              <tr>
                                <td>
                                  <Link 
                                    onClick={confirmFun} 
                                    href={`${item?.id}`} 
                                    data-btnid={`btn_${index}`} 
                                    data-id={`${item?.id}`} 
                                    data-selectid={`select_${index}`}
                                    className="btn btn-xs drop-shadow-xl bg-green-500 hover:bg-green-700 text-white border-none">
                                      Confirm
                                    </Link>
                                  </td>
                                  <td>
                                  <Link 
                                    onClick={rejectRequestFun} 
                                    href={`${item?.id}`} 
                                    data-id={`${item?.id}`} 
                                    className="btn btn-xs bg-yellow-200 hover:bg-yellow-400 text-black drop-shadow-xl border-none">
                                      Reject
                                    </Link>
                                  </td>

                                  {/* <td>
                                  <Link 
                                    onClick={makeRequestfun} 
                                    href={`${item?.id}`} 
                                    data-id={`${item?.id}`} 
                                    className="btn btn-xs drop-shadow-xl bg-red-400 hover:bg-red-700 text-white border-none">
                                      Remove
                                    </Link>
                                  </td> */}
                                  
                              </tr>
                          </table>
                        </td>
                    </tr>
                )) }
              </tbody>
          </table>
        </div>
      </LayoutAdmin>
  );
}