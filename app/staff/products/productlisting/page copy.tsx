"use client"
import Image from "next/image";
import { Suspense } from 'react';
import LayoutAdmin from "@/components/staff/AdminLayout";
import Chartjs from "@/components/staff/Chartjs";
import AdminAside from "@/components/staff/AdminAside";
import { LineTitle } from "@/components/staff/LineTitle";
import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";
import { MdDelete, MdOpenWith, MdOutlineAddCircle } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";
import { ChangeEvent, Component, Key, useEffect, useState } from "react";
import { windowOpenPromise } from "window-open-promise";
import AdminSingleProductView from "@/components/staff/AdminSingleProductView";
import { ComponentChild } from "@fullcalendar/core/preact.js";
import { useRouter, useParams, useSearchParams} from "next/navigation";
import { Token, externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";
import LoaderSpinner from "@/components/Loader";



interface actioninterface {
    view:string,
    delete?:string
}

interface datalistinterface {
    name:string,
    image?:string,
    content?:actioninterface,
    popMenuwindow?:(event:any) => void,
}


const SearchBar = (
  {changeDataDisplayView, changeDataReverseView , isviewswitched}:{
    changeDataDisplayView:(event:any) => void,
    changeDataReverseView:(event:any) => void,
    isviewswitched:string
  }) => {
  return (
      <div className="flex flex-row place-content-between px-3 items-center ">
          <div>
              <input 
                type="text" 
                className="size-9 px-5 w-72 border-2 border-lightorange rounded-full text-xs font-inter font-bold"
                placeholder="Search"

             />
          </div>
      
          <div>
            <div className="flex flex-row space-x-3">
              <div>
                  <Link href={`products/add`}>Add New</Link>
              </div>
              <div>
                  {
                    isviewswitched == 'grid'?  <Link title="Grid View" href={'#'} onClick={changeDataDisplayView}>
                    <BiSolidDashboard size={25} />
                    </Link> : <Link title="Table View" href={'#'} onClick={changeDataReverseView}>
                      <MdOpenWith size={25} />
                    </Link>
                  }
              </div>
            </div>
          </div>
      </div>
  )
}


const Tiles = ({data, popMenuwindow}:{
            data?:actioninterface,
            popMenuwindow?:(event:any) => void
      }) => {
    return (
        <div className="flex flex-row space-x-2">
            <div><Link  title="view" onClick={popMenuwindow} href={`${data?.view}`}><BsFillEyeFill size={25} /></Link></div>
            <div><Link title="delete" href={`${data?.delete}`}><MdDelete size={25} /></Link></div>
        </div>
    )
}


const Card:React.FC<datalistinterface> = (props) => {

    return (
        <div className="rounded-2xl relative border w-56 h-36 max-sm:w-full  p-3 bg-lightblack text-white font-inter font-bold">
          <Image src={`${props?.image}`} className="rounded-2xl z-0 brightness-50" fill={true}  alt="..."></Image>
            <div className="relative z-10 flex flex-col space-y-8 place-content-center items-center">
              {/* {JSON.stringify(`${props.image}`)} */}
             
                <div className="mt-3">
                    <p className="text-center">
                        {`${props?.name}`}
                    </p>
                </div>
                <div>
                    <Tiles data={props?.content} popMenuwindow={props.popMenuwindow} />
                </div>
            </div>
        </div>
    )
}


const GridView = ({gridData, popMenuwindow}:{
        gridData:datalistinterface[][],
        popMenuwindow?:(event:any) => void,
    }) => {

  return (
    <>
        {gridData?.map((item: any[], indx) => (
            <div key={`div_${item}_${indx}`} className="flex flex-row max-sm:flex-col gap-3 mt-4">
              
                {item?.map((itemdata:any, index) => (
                    <>
                        <Card 
                          key={`${itemdata.title}}_${index}`} 
                          name={`${itemdata.name}`} 
                          image={itemdata.image.image}
                          popMenuwindow={popMenuwindow}
                          content={itemdata?.content}
                        />
                      </>
                    ))}
                </div>
          ))} 
    </>
  )
}


const ProductListLink = () => {
  return (
      <div className="flex flext-col">
        <ul>
          {[1,4,5,6,3,5,88,54].map((item, index) => (
              <li key={`${item}_${index}`} className="hover:underline cursor-pointer rounded-xl hover:text-white p-2"><Link  href={`/admin/products/`}>product one</Link></li>
          ))}
        </ul>
      </div>
  )
}


function Home() {
  const [listdata, setlistdata] = useState<datalistinterface[][]>([]);
  const [switchview, setSwitchView] = useState<string>('grid');
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

  const router = useSearchParams();
  const id = router.get('id');
  const name = router.get('name');

  const {ssrdata:productsrlist, 
    ssrerror:productsrerror, 
    ssrstatus:productsrtatus} = useCustomSSR({url:`${externalurls.productlisting}/${id}/`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});
  

  useEffect(() => {
      const perloaddatalist:datalistinterface[][] = productsrlist;
      setlistdata(perloaddatalist)
  }, [productsrlist])

  const [swtichComponent, setComponent] = useState<JSX.Element | null>(null);
  
  // useEffect(() => {
  //   setComponent(<GridView popMenuwindow={popMenuwindow}  gridData={listdata} />)
  // }, [listdata, popMenuwindow])

  function popMenuwindow() {
    setComponent(<AdminSingleProductView />)
  }


  return (
      <LayoutAdmin>
        <main className="p-2">
            <LineTitle heading="Products" content={[
                {title:'Product', link:'products/'}
            ]} />
            <div className="mt-3">
            <h3 className="text-lightorange text-lg font-inter font-bold">{`${name}`}</h3>
            </div>
            {!swtichComponent? (
            <div className="flex flex-row max-sm:flex-col mt-5 lg:space-x-8">
             
              {/* section */}
              <div className="w-full shrink-0 max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      {/* <div><SearchBar isviewswitched={switchview} changeDataReverseView={changeDataReverseView} changeDataDisplayView={changeDataDisplayView} /></div> */}
                      <div className="px-3">
                          <Suspense fallback={<div>Loading...</div>}  >
                            <GridView  gridData={listdata}  />
                          </Suspense>
                      </div>
                  </div>
              </div>
              {/* aside */}
            </div>
            ) : swtichComponent}
        </main>
      </LayoutAdmin>
  );
}
