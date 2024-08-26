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
import { ChangeEvent, Key, useEffect, useState } from "react";


interface actioninterface {
    add:string,
    edit:string,
    view:string,
    delete?:string
}

interface datalistinterface {
    title:string,
    content:actioninterface
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


const Tiles = ({data}:{data:actioninterface}) => {
    return (
        <div className="flex flex-row space-x-2">
            <div>
                <Link href={`${data.add}`}><MdOutlineAddCircle size={25} /></Link>
            </div>
            <div><Link href={`${data.edit}`}><FiEdit size={25} /></Link></div>
            <div><Link href={`${data.view}`}><BsFillEyeFill size={25} /></Link></div>
            <div><Link href={`${data.delete}`}><MdDelete size={25} /></Link></div>
        </div>
    )
}


const Card:React.FC<datalistinterface> = (props) => {
    return (
        <div className="rounded-2xl border w-56 h-36  p-3 bg-lightblack text-white font-inter font-bold">
            <div className="flex flex-col space-y-8 place-content-center items-center">
                <div className="mt-3">
                    <p className="text-center">
                        {`${props.title}`}
                    </p>
                </div>
                <div>
                    <Tiles data={props.content}  />
                </div>
            </div>
        </div>
    )
}


const GridView = ({gridData}:{gridData:datalistinterface[][]}) => {
  return (
    <>
        {gridData.map((item: any[]) => (
            <div key={`div_${item}`} className="flex flex-row gap-3 mt-4">
                {item.map((itemdata: { title: Key | null | undefined; content: actioninterface; }) => (
                    <Card 
                      key={itemdata.title} 
                      title={`${itemdata.title}`} 
                      content={itemdata.content} />
                    ))}
                </div>
          ))} 
    </>
  )
}


const TableView = () => {
  return (
      <>  
        table view
      </>
  )
}


export default function Home() {
  const [listdata, setlistdata] = useState<datalistinterface[][]>([]);
  const [switchview, setSwitchView] = useState<string>('grid');

  useEffect(() => {
      const perloaddatalist:datalistinterface[][] = [
          [
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }},
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }},
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }}
          ],

          [
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }},
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }},
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }}
          ],

          [
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }},
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }},
            {title:'Shoe Content', content: { add: '/admin', edit: '/admin', view: '/admin' }}
          ]
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
      <LayoutAdmin>
        <main className="p-2">
            <LineTitle heading="Products" linkpath="admin/products" />
            <div className="flex flex-row mt-5 r space-x-8">
              {/* section */}
              <div className="w-2/3">
                  <div className="flex flex-col space-y-10">
                      <div><SearchBar isviewswitched={switchview} changeDataReverseView={changeDataReverseView} changeDataDisplayView={changeDataDisplayView} /></div>
                      <div className="px-3 ">
                        {switchview == 'grid'? <GridView gridData={listdata} /> : <TableView />}
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
