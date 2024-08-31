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
import { ChangeEvent, Component, Key, useEffect, useState } from "react";
import { windowOpenPromise } from "window-open-promise";
import AdminSingleProductView from "@/components/admin/AdminSingleProductView";
import { ComponentChild } from "@fullcalendar/core/preact.js";



interface actioninterface {
    view:string,
    delete?:string
}

interface datalistinterface {
    title:string,
    image?:string,
    content:actioninterface
    popMenuwindow?:(event:any) => void
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
            data:actioninterface,
            popMenuwindow?:(event:any) => void
      }) => {
    return (
        <div className="flex flex-row space-x-2">
            <div><Link  title="view" onClick={popMenuwindow} href={`${data.view}`}><BsFillEyeFill size={25} /></Link></div>
            <div><Link title="delete" href={`${data.delete}`}><MdDelete size={25} /></Link></div>
        </div>
    )
}


const Card:React.FC<datalistinterface> = (props) => {
    return (
        <div className="rounded-2xl relative border w-56 h-36 max-sm:w-full  p-3 bg-lightblack text-white font-inter font-bold">
          <Image src={`${props.image}`} className="rounded-2xl z-0 brightness-50" fill={true}  alt="..."></Image>
            <div className="relative z-10 flex flex-col space-y-8 place-content-center items-center">
              {/* {JSON.stringify(`${props.image}`)} */}
              
                <div className="mt-3">
                    <p className="text-center">
                        {`${props.title}`}
                    </p>
                </div>
                <div>
                    <Tiles data={props.content} popMenuwindow={props.popMenuwindow} />
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
        {gridData.map((item: any[]) => (
            <div key={`div_${item}`} className="flex flex-row max-sm:flex-col gap-3 mt-4">
                {item.map((itemdata: { 
                          title: Key | null | undefined; 
                          content: actioninterface;
                          image:string
                      }) => (
                    <Card 
                      key={itemdata.title} 
                      title={`${itemdata.title}`} 
                      image={`${itemdata.image}`}
                      popMenuwindow={popMenuwindow}
                      content={itemdata.content} />
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
          {[1,4,5,6,3,5,88,54].map(item => (
              <li key={item} className="hover:underline cursor-pointer rounded-xl hover:text-white p-2"><Link  href={`/admin/products/`}>product one</Link></li>
          ))}
        </ul>
      </div>
  )
}


export default function Home() {
  const [listdata, setlistdata] = useState<datalistinterface[][]>([]);
  const [switchview, setSwitchView] = useState<string>('grid');
  

  useEffect(() => {
      const perloaddatalist:datalistinterface[][] = [
          [
            {title:'Shoe Content', image:'/images/e3.jpg' , content: { view: '/admin/products/productlisting' }},
            {title:'Shoe Content', image:'/images/e4.jpg' , content: { view: '/admin' }},
            {title:'Shoe Content', image:'/images/e5.jpg' , content: { view: '/admin' }}
          ],
      ];

      setlistdata(perloaddatalist)
  }, [])

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
            <LineTitle heading="Products" linkpath="admin/products" />
            <div className="mt-3">
            <h3 className="text-lightorange text-lg font-inter font-bold">Balenciga Shoe</h3>
            </div>
            {!swtichComponent? (
            <div className="flex flex-row max-sm:flex-col mt-5 lg:space-x-8">
             
              {/* section */}
              <div className="w-2/3 shrink-0 max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      {/* <div><SearchBar isviewswitched={switchview} changeDataReverseView={changeDataReverseView} changeDataDisplayView={changeDataDisplayView} /></div> */}
                      <div className="px-3">
                          <GridView popMenuwindow={popMenuwindow}  gridData={listdata} />
                      </div>
                  </div>
              </div>
              {/* aside */}
             
              <div className="w-1/3 max-sm:w-full max-sm:mt-8 flex-shrink-0 bg-graywhite p-3">
                <h1 className="text-lg text-lightorange">
                    <strong><b>Product Listing</b></strong>
                </h1>
                <ProductListLink />
              </div>
           
            </div>
            ) : swtichComponent}
        </main>
      </LayoutAdmin>
  );
}
