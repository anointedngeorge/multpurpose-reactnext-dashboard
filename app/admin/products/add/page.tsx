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
import { useCustomActionState, useCustomSSR } from "@/app/custom_hooks";
import { brand, brandType, productType, product_add, signup } from "@/app/actions/auth";
import { Token, externalurls } from "@/app/interface";




export default function Home() {
  const [filteredtypes, setFilteredTypes] = useState<[]>([])
  const [producttype, setproducttype] = useState<[]>([])
  const {state:brandstate1, action:brandaction, status:brandstatus} = useCustomActionState({fn:brand});
  const {state:brandtypestate1, action:brandtypeaction, status:brandtypestatus} = useCustomActionState({fn:brandType});
  const {state:producttypestate1, action:producttypeaction, status:producttypestatus} = useCustomActionState({fn:productType});
  const {state:products, action:productsaction, status:productsstatus} = useCustomActionState({fn:product_add});

  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")


  const {ssrdata:brandssrlist, ssrerror:brandssrerror, ssrstatus:brandssrtatus} = useCustomSSR({url:`${externalurls.brandlist}`, headers:{
    "Authorization":`Bearer ${Token2}`
  }});

  const {ssrdata:brandtypessrlist, ssrerror:brandtypessrerror, ssrstatus:brandtypessrtatus} = useCustomSSR({url:`${externalurls.brandtypelist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

  const {ssrdata:productbrandtypessrlist, ssrerror:productbrandtypessrerror, ssrstatus:productbrandtypessrtatus} = useCustomSSR({url:`${externalurls.producttypelist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

  const getBrandsTypes = (event:any) => {
      const brandid = event.currentTarget.value;
      // setproducttype(productbrandtypessrlist);
      const filtered:any = [...productbrandtypessrlist?.filter((item:any) => item?.brand?.id === brandid)];
      setFilteredTypes(filtered);
  }


  return (
      <LayoutAdmin>
        <main className="p-2">
            <LineTitle heading="Product Section" linkpath="admin/products/New" />
            <div className="flex flex-row mt-5 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-2/3 max-sm:w-full mb-10">
                  <div className="flex flex-col space-y-5">
                      <div>
                        <form action={brandaction}>
                          <SingleModelForm
                                required={true}
                                title={"Brand"} 
                                name={"name"} 
                                placeholder={"Brand"} 
                                type={"text"} 
                                buttonTitle={"Add"}
                            />
                        </form>
                      </div>

                        <div>
                            <form action={brandtypeaction}>
                              <SingleModelForm
                                    required={true}
                                    title={"Create New Brand Types"} 
                                    name={"name"} 
                                    placeholder={"Brand Type"} 
                                    type={"text"} 
                                    buttonTitle={"Add"}
                                  />
                            </form>
                        </div>
                        <div>
                            <form action={producttypeaction} >
                                <div className="mt-3 flex flex-col space-y-3">
                                    <div>
                                          <SelectTag 
                                            label="Brand Type" 
                                            name={"brand_type_id"} 
                                            mapper={['id', 'name']} content={brandtypessrlist} />
                                    </div>
                                      <div className="flex">
                                            <SelectTag label="Brands" name={"brand_id"} mapper={['id', 'name']} 
                                            content={brandssrlist} />
                                        </div>
                                        <div>
                                      <button className="rounded-full btn btn-neutral px-10 " type="submit">{`Add`}</button>
                                  </div>
                                </div>
                            </form>
                        </div>
                        {/*  */}
                        
                        <div className=" bg-gray-200 p-2" >
                            <div>Products</div>
                                <form action={productsaction} >
                                    <div className="mt-3 flex flex-col space-y-2">
                                            <div>
                                                <InputTag required={true} name={"name"} placeholder={"name"} type={"text"} />
                                            </div>
                                            <div>
                                                <SelectTag required={true} onchange={getBrandsTypes} label="Brands" 
                                                name={"brands_id"} mapper={['id', 'name']} 
                                                content={brandssrlist} />
                                            </div>
                                            <div>
                                                  <SelectTag required={true} label="Brand Type" name={"brand_type_id"} 
                                                  mapper={['id', 'brand_type.name']} content={filteredtypes} />
                                            </div>

                                            <div>
                                                <InputTag  required={true} name={"quantity"} label="Overal Quantity" placeholder={"0"} type={"number"} />
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
              <div className="w-1/3 max-sm:w-full">
                <AdminAside />
              </div>
            </div>
        </main>
      </LayoutAdmin>
  );
}
