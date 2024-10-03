
"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { InputTag } from "@/components/admin/FormElements";
import { useCustomActionState, useCustomSSR } from "@/app/custom_hooks";
import { createbranch, photoform } from "@/app/actions/auth";
import CustomTable from "@/components/customTable";
import { useEffect, useState } from "react";
import { APIBASEURl, Token, externalurls } from "@/app/interface";


export default function Home() {
  const {state, action, status} = useCustomActionState({fn:createbranch});
  const [listdata, setListData] = useState<any>([])

  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
  
  const {ssrdata, ssrerror, ssrstatus} = 
  useCustomSSR({url:`${externalurls.branchlist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

  useEffect( () => {
    setListData(ssrdata)
}, [ssrdata] )
  
  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Branch Section" linkpath="home" />
            <div className="flex flex-row mt-5 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-2/3 max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      <form action={action} >
                          <div className="flex flex-col space-y-5">
                              <div>
                                <InputTag
                                      label="Name*:"
                                      name="name" 
                                      type="text" 
                                      placeholder="Branch Name"
                                      required={true}
                                  />
                              </div>
                              <div>

                              <InputTag 
                                    name="address" 
                                    type="text" 
                                    placeholder="Description"
                                    label="Description"
                              />
                              </div>
                              <div>
                                  <button className="btn btn-primary  btn-block">Create</button>
                              </div>
                          </div>
                      </form>
                  </div>
                  {/* table */}
                  <div className="mt-5">
                      {listdata?.length > 0 ? (
                        <CustomTable
                            title="Branch Listing"
                            thead={['Name', 'Address']}
                            mapper={['name', 'address' ]}
                            tbody={listdata}
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
                                            const f =  await fetch(`${APIBASEURl}/api/v1/utility/branch/${id}/item`, {
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
                <AdminAside />
              </div>
            </div>
        </main>
      </LayoutAdmin>
  );
}