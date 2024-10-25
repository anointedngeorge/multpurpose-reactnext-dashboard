"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/manager/AdminLayout";
import Chartjs from "@/components/manager/Chartjs";
import AdminAside from "@/components/manager/AdminAside";
import { LineTitle } from "@/components/manager/LineTitle";
import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";
import { MdDelete, MdOpenWith, MdOutlineAddCircle } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";
import { ChangeEvent, Key, useEffect, useState } from "react";
import { windowOpenPromise } from "window-open-promise";



interface actioninterface {
    edit:string,
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
            
            <div><Link onClick={popMenuwindow} href={`${data.edit}`}><FiEdit size={25} /></Link></div>
            <div><Link onClick={popMenuwindow} href={`${data.view}`}><BsFillEyeFill size={25} /></Link></div>
            <div><Link onClick={popMenuwindow} href={`${data.delete}`}><MdDelete size={25} /></Link></div>
        </div>
    )
}


const Card:React.FC<datalistinterface> = (props) => {
    return (
        <div 
        className=" rounded-2xl relative border w-72 h-48 p-2 text-white font-inter font-bold">
          <div className="mt-1">
                    <p className="text-lef text-white shadow">
                        {`${props.title}`}
                    </p>
                </div>
            
            <div className="mt-10  flex flex-col pb-6 h-full place-content-center items-center">
                <div>
                    <Tiles data={props.content} popMenuwindow={props.popMenuwindow} />
                </div>
            </div>
            <Image src={`${props.image}`} fill={true} className="-z-20 rounded-2xl brightness-75" alt={"s"}></Image>
        </div>
    )
}


const GridView = ({gridData, popMenuwindow}:{
        gridData:datalistinterface[], 
        popMenuwindow?:(event:any) => void,
    }) => {
  return (
    <>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {gridData.map(itemdata => (
               <Card 
               key={itemdata.title} 
               title={`${itemdata.title}`}
               image={itemdata.image}
               popMenuwindow={popMenuwindow}
               content={itemdata.content}
             />
          ) )}
        </div> 
    </>
  )
}


export default function Home() {
  const [listdata, setlistdata] = useState<datalistinterface[]>([]);
  const [switchview, setSwitchView] = useState<string>('grid');

  const windowOpen = windowOpenPromise(globalThis);

  async function popMenuwindow(event?:any) {
    event.preventDefault();
    await windowOpen({
      url: `${event.currentTarget.href}`, // URL is not required, you can open a blank window
      top: 10,
      left: 10,
    })
      .then(newWindow => {
        // console.log("This will log in the new window.");
        newWindow.addEventListener("beforeunload", _event => {
          // console.log("This will log when the new window is closed.");
        });
      })
      .catch(_error => {
        console.error("This will log if the new window can't be opened.");
      });
  }

  useEffect(() => {
      const perloaddatalist:datalistinterface[] = [
          {
            title:'Shoe Content',
            image:'/images/12.jpg',
            content: { edit: '/admin', view: '/admin' }
          },
          {
            title:'Shoe Content1',
            image:'/images/e1.png',
            content: { edit: '/admin', view: '/admin' }
          },
          {
            title:'Shoe Content2',
            image:'/images/e11.jpg',
            content: { edit: '/admin', view: '/admin' }
          },
          {
            title:'Shoe Content4',
            image:'/images/e3.jpg',
            content: { edit: '/admin', view: '/admin' }
          },
         
      ];

      setlistdata(perloaddatalist)
  }, [])

  function changeDataDisplayView(event:any) {
    setSwitchView('table')
  }
 function changeDataReverseView(event:any) {
  setSwitchView('grid')
  }

  

  return (

        <main className="p-10">
            <LineTitle heading="Product Listing" linkpath="admin/produc/listing" />
            <div className="flex flex-row mt-5 r space-x-8">
              {/* section */}
              <div className="w-full">
              <h3 className="text-2xl text-lightorange font-medium">Balciaga shoe</h3>
                  <div className="flex flex-col space-y-10">
                    
                      {/* <div><SearchBar isviewswitched={switchview} changeDataReverseView={changeDataReverseView} changeDataDisplayView={changeDataDisplayView} /></div> */}
                      <div>
                          <GridView popMenuwindow={popMenuwindow} gridData={listdata} />
                      </div>
                  </div>
              </div>
              {/* aside */}
            </div>
        </main>
    );
}
