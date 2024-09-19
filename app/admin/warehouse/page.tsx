
"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { InputTag, SelectTag } from "@/components/admin/FormElements";
import { useCustomActionState, useCustomSSR } from "@/app/custom_hooks";
import { createWarehouse, createbranch, photoform } from "@/app/actions/auth";
import { Token, externalurls } from "@/app/interface";
import { useCallback, useEffect, useState } from "react";
import CustomTable from "@/components/customTable";
import { FaEye } from "react-icons/fa6";
import { ModalProductPopover } from "@/components/globalComponents";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";




const Token2 = globalThis?.sessionStorage?.getItem("apptoken")






export default function Home() {
  const {state, action, status} = useCustomActionState({fn:createWarehouse});

  const [listdata, setListData] = useState<any>()
  const [listdataOnchange, setListOnChnageData] = useState<any>()
  const [listOffSet, setOffSet] = useState<number>(3)



  const {
    ssrdata, 
    ssrerror, 
    ssrstatus
  } = useCustomSSR({url:`${externalurls.productlistingall}/?limit=${listOffSet}&offset=0`, headers:{
      "Authorization":`Bearer ${Token2} `
  }});

  const loadmoredata = useCallback(() => {
    setOffSet(10);
  }, [listOffSet])


  const viewLoaddata = useCallback((event:any) => {
    event.preventDefault();
    const modal:any = document.getElementById('my_modal_5');
    if (modal) {
        modal?.showModal();
        setListOnChnageData(event?.currentTarget?.href)
    }
  }, [])
  

  useEffect( () => {
      setListData(ssrdata)
  }, [ssrdata] )

  const removeProduct = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const productid = event.currentTarget.getAttribute('data-id');
    
    if (productid && confirm("Are You Sure?")) {
        const ft = async () => {
            const f =  await fetch(`${process.env.APIBASEURl}/api/v1/products/productlisting/${productid}/item/delete/`, {
                  method:'delete',
                  headers: {
                      "Content-Type":"application/json",
                      'Authorization':`Bearer ${Token2}`
                  }
              });
              
              if (f.ok) {
                  globalThis.location.reload();
              }
        }
        ft();
    }
}, []);

  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Product Warehouse" linkpath="home" />
            <div className="flex flex-row mt-5 lg:space-x-8 max-sm:flex-col">
                <div className="w-full p-3">
                      <table className="table">
                          <thead className="bg-black text-white font-bold">
                              <tr>
                                  <th>#</th>
                                  <th>Image</th>
                                  <th>Name</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                             {listdata?.items?.length > 0? (
                              <>
                                {listdata?.items?.map( (item:any, index:any) => (
                                      <tr key={`product_list_id_${index}`}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <Image 
                                                src={`${item?.image?.image? item?.image?.image : ''}`} 
                                                width={100} 
                                                height={50}
                                                alt="..."
                                                style={{
                                                  width:"120px",
                                                  height:"120px"
                                                }}
                                            
                                              />
                                          </td>
                                          <td className="font-bold font-2xl">{`${item.name}`}</td>
                                          <td>
                                              <div className="flex flex-row space-x-3">
                                                  <Link title="Add Variation" href={`/admin/warehouse/item/?data=${JSON.stringify(item)}`}  onClick={viewLoaddata} >
                                                      <div className="flex flex-row space-x-1 items-center">
                                                          <div><FaPlus size={20} /></div>
                                                          <div>View</div>
                                                      </div>
                                                  </Link>
                                                  <Link title={`Edit ${item.name}`} href={`${process.env.APIBASEURl}/api/v1/products/productlisting/${item.id}/item/`}  onClick={viewLoaddata} >
                                                      <div className="flex flex-row space-x-1 items-center">
                                                          <div><FaEdit size={20} /></div>
                                                          <div>Edit</div>
                                                      </div>
                                                  </Link>
                                                  <button data-id={`${item?.id}`} onClick={removeProduct}>
                                                      <div className="flex flex-row space-x-1 items-center">
                                                          <div><FaTrash color="#DF392F" size={20} /></div>
                                                          <div>Delete</div>
                                                      </div>
                                                  </button>
                                              </div>
                                           
                                          </td>
                                      </tr>
                                  ) )}
                              </>
                            ) : (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Image 
                                          src={`https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611u0e7z6dp6cd3h77viia785rx42sbnnlo0okh02km&ep=v1_gifs_search&rid=giphy.gif&ct=g`} 
                                          width={100} 
                                          height={100} 
                                          alt="loading..."
                                        />
                                      </td>
                                    <td></td>
                                </tr>
                            )}
                          </tbody>
                          <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><button onClick={loadmoredata} className="btn btn-warning btn-sm">Load More</button></td>
                            </tr>
                          </tfoot>
                      </table>
                </div>
            </div>
            <ModalProductPopover src={listdataOnchange} />
        </main>
      </LayoutAdmin>
  );
}