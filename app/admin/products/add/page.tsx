"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";
import { MdDelete, MdOpenWith, MdOutlineAddCircle } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";
import { ChangeEvent, Key, LinkHTMLAttributes, useEffect, useState } from "react";
import { AppLinks } from "next/dist/lib/metadata/types/extra-types";
import { InputTag, SelectTag, SingleModelForm } from "@/components/admin/FormElements";




export default function Home() {
  

  return (
      <LayoutAdmin>
        <main className="p-2">
            <LineTitle heading="Product Section" linkpath="admin/products/New" />
            <div className="flex flex-row mt-5 r space-x-8">
              {/* section */}
              <div className="w-2/3">
                  <div className="flex flex-col space-y-5">
                      <div><SingleModelForm 
                              title={"Brand"} 
                              name={"name"} 
                              actionLink={"#"} 
                              method={"post"} 
                              placeholder={"Brand"} 
                              type={"text"} 
                              buttonTitle={"Add"}
                               />
                      </div>

                        <div><SingleModelForm 
                              title={"Create New Brand Types"} 
                              name={"name"} 
                              actionLink={"#"} 
                              method={"post"} 
                              placeholder={"Brand Type"} 
                              type={"text"} 
                              buttonTitle={"Add"}
                               />
                        </div>
                        <div>
                            <div>Brand Type</div>
                            <div className="mt-3 flex flex-col space-y-3">
                               <div>
                                  <InputTag name={"name"} placeholder={"Brand Type"} type={"text"} />
                               </div>
                                <div className="flex">
                                      <SelectTag name={"brand"} content={[
                                          {title:'Brand', val:'brand'}
                                      ]} />
                                </div>
                                <div>
                              <button className="rounded-full btn btn-neutral px-10 " type="submit">{`Add`}</button>
                          </div>
                            </div>
                            
                        </div>
                        {/*  */}
                        
                        <div>
                            <div>Products</div>
                            <form action="">
                            <div className="mt-3 flex flex-col space-y-3">
                            
                               <div>
                                  <InputTag name={"name"} placeholder={"name"} type={"text"} />
                               </div>
                                <div className="flex">
                                      <SelectTag name={"brand"} content={[
                                              {title:'Brand', val:'brand'}
                                          ]} />
                                    </div>
                                    <div>
                                  <button className="rounded-full btn btn-neutral px-10 " type="submit">{`Create Product`}</button>
                              </div>
                            </div> 
                            </form>
                        </div>
                  </div>
              </div>
              {/* aside */}
              <div className="w-1/3">
                <AdminAside />
              </div>
            </div>
        </main>
      </LayoutAdmin>
  );
}
