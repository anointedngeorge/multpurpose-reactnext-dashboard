"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { title } from "process";
import { Token, externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";
import { useEffect, useRef, useState } from "react";
import LoaderSpinner from "@/components/Loader";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOpenWith } from "react-icons/md";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { InputTag } from "@/components/admin/FormElements";


interface sidebarinterface {
    index?:any,
    listtypes?:[],
    name?:string,
    pageloader?: (event:any) => any
}

const Sidebar:React.FC<sidebarinterface> = (prop) => {
  const [toggleac, setToggleac] = useState<boolean>(true)

  const toggleAction = (event:any) => {
    setToggleac(false)
  }

  const toggleAction2 = (event:any) => {
    setToggleac(true)
  }

  return (
    <div tabIndex={prop?.index} className="collaps border-base-300 border">
    <div className={`collapse-title text-sm  bg-base-200 cursor-pointer ${toggleac? '' : 'bg-neutral-400 text-white'}`} onClick={toggleac? toggleAction : toggleAction2}>
        <div className="flex flex-row items-center space-x-2">
            <div>{toggleac? <HiMiniBars3 /> : <MdOpenWith />}</div>
            <div><strong><b>{`${prop?.name}`}</b></strong></div>
        </div>
    </div>

    <div className={`collapse-content2 ${toggleac? 'hidden': 'mt-2 mb-2'}`}>
        <div className="ml-3">
            <ul className="w-full cursor-pointer">
              {prop?.listtypes?.map((item:any, index) => (
                  <li key={`${item}_${index}`} className="mt-1 mb-1 hover:text-lightorange" >
                      <div className="flex flex-row items-center">
                          <div><IoMdArrowDropright /></div>
                          <div><Link onClick={prop.pageloader}  href={{pathname:`/admin/shop/item/`, query:{
                                id:`${item?.id}`, 
                                brand_id:`${item?.brand_id}`,
                                item_name:`${item?.name}`,
                                brand_name:`${prop?.name}`
                              }}}>{`${item?.name}`}</Link></div>
                      </div>
                  </li>
              ))}
            </ul>
        </div>
    </div>
  </div>
  )

}


const ShowEmptyPage = () => {
    return (
        <div className="flex flex-col place-content-center place-items-center p-10">
              <div><FaSearch size={100} /></div>
              <div>Click To Load Page</div>
        </div>
    )
}

export default function Home() {
  const [dataset,setDataset] = useState<any>([])
  const [pagehref, setPagehref] = useState<string | null>(null)
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

  const {
    ssrdata, 
    ssrerror, 
    ssrstatus,
    } = useCustomSSR({url:`${externalurls.productbrandslist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

  useEffect(() => {
  setDataset(ssrdata)
  }, [ssrdata])


  const pageload = async (event:any) => {
    event.preventDefault();
      setPagehref(event?.currentTarget?.href)
  }


  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle 
              heading="Shopping Mall" 
              content={[{title:'Products', link:'products/'}]}
              
          />
          {/* <div>
              <InputTag name="search" type="search" placeholder="Search" />
          </div> */}
            <div className="flex flex-row mt-1 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-full max-sm:w-full mb-20">
                  <div className="flex flex-col space-y-10 max-sm:flex-row">
                      <div className="flex flex-row max-sm:flex-col h-screen">
                            <div className="w-1/4 max-sm:w-full p-3 drop-shadow-md overflow-auto shrink-0 border-4 border-neutral-400">
                              <div className="flex flex-col space-y-3 max-sm:flex-row max-sm:items-baseline max-sm:w-full">
                                {dataset?.length > 0? "" : <LoaderSpinner  />}
                                  {dataset?.map((item:any, index:Number) => (
                                      <Sidebar pageloader={pageload} index={index} name={`${item?.name}`} listtypes={item?.listtypes} key={`${item}_${index}`} />
                                  ))}
                              </div>
                            </div>
                            <div className="w-3/4 h-screen max-sm:w-full max-sm:h-full border-4 border-neutral-200 shrink-0">
                              {pagehref ? (
                                  <iframe src={`${pagehref}`} className="border-none w-full h-screen"></iframe>
                              ) : <ShowEmptyPage />}
                                  
                            </div>
                      </div>
                  </div>
              </div>
      
            </div>
        </main>
      </LayoutAdmin>
  );
}