"use client"
import { useCustomSSR } from "@/app/custom_hooks";
import { APIBASEURl, externalurls } from "@/app/interface";
import CustomTable from "@/components/customTable";
import LayoutAdmin from "@/components/staff/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";



export default function Home() {
  const [dataset,setDataset] = useState<any>([])
  const [pagehref, setPagehref] = useState<string | null>(null)
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

  const {
    ssrdata, 
    ssrerror, 
    ssrstatus,
    } = useCustomSSR({url:`${APIBASEURl}/api/v1/products/products/productlist/all/`, headers:{
    "Authorization":`Bearer ${Token2}`
  }});

  useEffect(() => {
  setDataset(ssrdata?.items)
  }, [ssrdata])

   const makeRequestfun =   useCallback( async (event:React.MouseEvent<HTMLTitleElement>) => {
      event.preventDefault();
      const btnid = event?.currentTarget?.dataset?.btnid;
      const product_id = event?.currentTarget?.dataset?.id;
      const selectid = event?.currentTarget?.dataset?.selectid;
      const quantity = document.getElementById(`${btnid}`) as HTMLInputElement | null;
      const sizes = document.getElementById(`${selectid}`) as HTMLInputElement | null;
      const url = `${APIBASEURl}/api/v1/products/request/${product_id}/${quantity?.value}/${sizes?.value}/`;

      const ft = fetch(url, {
        method:'put',
        headers:{
            "Authorization":`Bearer ${Token2}`
        }
      });

      if ((await ft).ok) {
          alert("Request Sent");
      }
      
   }, [])


  return (
      <LayoutAdmin>
        
        <div className="overflow-auto">
        {/* {JSON.stringify(dataset)} */}
          <table className="table table-sm">
              <thead className="bg-red-600 text-white font-bold">
                  <tr>
                    <td>#</td>
                    <td>Image</td>
                    <td>Name</td>
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
                      image:{image:string},
                      product:{name:string, brands:{name:string} },
                      brands:{name:string},
                      variation_list:[{id:string, quantity:string, size:string}]
                      
                  }, index:number) => (
                    <tr className="even:bg-red-200 odd:bg-red-100" key={`product_list_${index}`}>
                      <td>{index + 1}.</td>
                        <td>
                            <Image src={`${item.image.image}`} className="rounded-md" height={100} width={80} alt="..." />
                        </td>
                        <td>{`${item?.name}`}</td>
                        <td>{`${item?.product?.name}`}</td>
                        <td>{`${item?.product?.brands.name}`}</td>
                        <td>
                          <select id={`select_${index}`} >
                              {item?.variation_list?.map((itm, indx) => (
                                  <option value={`${itm.quantity}`} key={`option_${indx}`}> {`Size:${itm.size}-Quantity:${itm.quantity}`} </option>
                              ))}
                          </select>
                        </td>
                        <td>
                            <input type="number" id={`btn_${index}`} className="border-2 border-black w-20 rounded-md" defaultValue={1} />
                        </td>
                        <td>
                          <table>
                              <tr>
                                <td>
                                  <Link 
                                    onClick={makeRequestfun} 
                                    href={`${item?.id}`} 
                                    data-btnid={`btn_${index}`} 
                                    data-id={`${item?.id}`} 
                                    data-selectid={`select_${index}`}
                                    className="btn btn-xs bg-red-400 hover:bg-red-700 text-white border-none">
                                      Request
                                    </Link>
                                  </td>
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