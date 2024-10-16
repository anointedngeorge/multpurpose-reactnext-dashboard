
"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/staff/AdminLayout";
import Chartjs from "@/components/staff/Chartjs";
import AdminAside from "@/components/staff/AdminAside";
import { LineTitle } from "@/components/staff/LineTitle";
import { InputTag, SelectTag } from "@/components/staff/FormElements";
import { useCustomActionState, useCustomSSR } from "@/app/custom_hooks";
import { createWarehouse, createbranch, photoform } from "@/app/actions/auth";
import { APIBASEURl, Token, externalurls } from "@/app/interface";
import { useEffect, useState } from "react";
import CustomTable from "@/components/customTable";


export default function Home() {
  const {state, action, status} = useCustomActionState({fn:createWarehouse});

  const [listdata, setListData] = useState<any>([])
  const [storelistdata, setStoreListData] = useState<any>([])
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
  const {ssrdata, ssrerror, ssrstatus} = 
  useCustomSSR({url:`${externalurls.branchlist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});


  const {ssrdata:storelist, ssrerror:storeerror, ssrstatus:storetatus} = useCustomSSR({url:`${externalurls.warehouselist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

  

  useEffect( () => {
      setListData(ssrdata)
      setStoreListData(storelist)
  }, [ssrdata, storelist] )

  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Store Section" linkpath="home" />
            <div className="flex flex-row mt-5 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-2/3 max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      <form action={action} >
                          <div className="flex flex-col space-y-5">
                              <div>
                                <InputTag
                                      label="Name*"
                                      name="name" 
                                      type="text" 
                                      placeholder="Store Name"
                                      required={true}
                                  />
                              </div>
                              <div>
                                <InputTag 
                                      name="description" 
                                      type="text" 
                                      placeholder="Description"
                                      label="Description"
                                />
                              </div>

                              <div>
                                <SelectTag 
                                    label="Choose Branch" 
                                    name="branch_id" mapper={['id', 'name']} 
                                    content={listdata}
                                />
                              </div>

                              <div>
                                  <button className="btn btn-primary  btn-block">Create New Store</button>
                              </div>
                          </div>
                      </form>
                  </div>

                    <div className="mt-5">
                      {listdata?.length > 0 ? (
                        <CustomTable
                            title="Store Listing"
                            thead={['Name', 'Description', 'Branch']}
                            mapper={['name', 'description', 'branch.name']}
                            tbody={storelistdata}
                            placeholder_values={{'$id':"data.id"}}
                            actions={[
                              { 
                                  name:'Delete',
                                  id:'$id',
                                  link:'/admin/products/$id/',
                                  onclick(event:React.MouseEvent<HTMLAnchorElement>) {
                                        event.preventDefault();
                                        if (confirm("Are you sure?")) {
                                          
                                          const ft = async () => {
                                            const id = event?.currentTarget?.id
                                            const f =  await fetch(`${APIBASEURl}/api/v1/utility/warehouse/${id}/item`, {
                                                  method:'delete',
                                                  headers: {
                                                      "Content-Type":"application/json",
                                                      'Authorization':`Bearer ${Token2}`
                                                  }
                                              });
                                              if (f.ok) {
                                                  globalThis.location.reload();
                                              } else {
                                                alert(f.statusText)
                                              }
                                        }
                                        ft();
                                        }
                                  },
                              },
                            ]}
                        />
                      ) : "Loading... "}
                    </div>
              </div>
              {/* aside */}
              <div className="w-1/3 max-sm:w-full">
                <AdminAside  />
              </div>
            </div>
        </main>
      </LayoutAdmin>
  );
}