"use client"
import Image from "next/image";
import { Suspense } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { APIBASEURl, Token, externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";
import { ModalProductPopover } from "@/components/globalComponents";
import { useSearchParams } from "next/navigation";



interface actioninterface {
    add:string,
    edit:string,
    view:string,
    delete?:string
}

interface datalistinterface {
    id?:string,
    data:any,
    quantity?:Number,
    content?:actioninterface
    popMenuwindow?:(event:any) => void,
    additem?:(event:any) => void,
    edititem?:(event:any) => void,
}


const SearchBar = (
  {changeDataDisplayView, changeDataReverseView , isviewswitched}:{
    changeDataDisplayView:(event:any) => void,
    changeDataReverseView:(event:any) => void,
    isviewswitched:string
  }) => {
  return (
      <div className="flex flex-row max-sm:flex-col place-content-between px-3 items-center ">
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



interface TilesInterface {
  data?:any,
  popMenuwindow?:(event:any) => void,
  additem?:(event:any) => void,
  edititem?:(event:any) => void,
}

const Tiles:React.FC<TilesInterface> = (prop) => {

    return (
        <div className="flex flex-row shrink-0">
            <div>
                <Link className="btn btn-ghost btn-circle" onClick={prop?.additem}  href={`${APIBASEURl}/api/v1/products/add/product/item/${prop?.data?.id}/`}><MdOutlineAddCircle size={25} /></Link>
            </div>
            <div><Link className="btn btn-ghost btn-circle"  onClick={prop?.popMenuwindow} href={{pathname:'/admin/products/productlisting/', query:{id:`${prop?.data?.id}`, name:`${prop?.data?.name}` }}}><BsFillEyeFill size={25} /></Link></div>
            <div><Link className="btn btn-ghost btn-circle" onClick={prop?.edititem} href={`${APIBASEURl}/api/v1/products/edit/product/item/${prop?.data?.id}/`}><FiEdit size={25} /></Link></div>
            <div><Link className="btn btn-ghost btn-circle" onClick={prop?.popMenuwindow} href={`delete/?id=${prop?.data?.id}`}><MdDelete size={25} /></Link></div>
        </div>
    )
}


const Card:React.FC<datalistinterface> = (props) => {
    // alert(JSON.stringify())
    return (
        <div className="rounded-2xl border w-56 h-36 max-sm:w-full  p-3 bg-lightblack text-white font-inter font-bold">
            <div className="flex flex-col place-content-center items-center">
                <div className="mt-3">
                    <p className="text-center">
                        {`${props.data?.name}`}
                      
                    </p>
                </div>
                {/* <p className="text-center">
                        {`${props?.data?.brand_type?.name}`}
                    </p> */}
                <div>
                    <Tiles additem={props.additem} edititem={props.edititem} data={props} popMenuwindow={props.popMenuwindow} />
                </div>
            </div>
        </div>
    )
}


interface gridInterface {
  gridData:datalistinterface[][], 
  popMenuwindow?:(event:any) => void,
  additem?:(event:any) => void,
  edititem?:(event:any) => void,
}

const GridView:React.FC<gridInterface>= (prop) => {
  return (
    <>
        {prop.gridData?.map((item: any[]) => (
            <div key={`${uuidv4()}_${item}`} className="flex flex-row gap-3 mt-4 max-sm:flex-col">
                {item?.map((itemdata) => (
                        <Card
                          id={itemdata?.id}
                          key={`${uuidv4()}_${itemdata?.name}`} 
                          data={itemdata} 
                          popMenuwindow={prop.popMenuwindow}
                          content={itemdata?.content}
                          additem={prop.additem}
                          edititem={prop.edititem}
                          />
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


const ProductHome = () => {
  const [listdata, setlistdata] = useState<datalistinterface[][]>([]);
  const [switchview, setSwitchView] = useState<string>('grid');
  const [iframesrc, setIframesrc] = useState<string>('');

  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

  const router = useSearchParams();
  const id = router.get('id');
  const name = router.get('name');

  const {ssrdata:productsrlist, ssrerror:productsrerror, ssrstatus:productsrtatus} = useCustomSSR({url:`${externalurls.productlist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

  
    
  // useEffect(() => {
  //     const perloaddatalist:datalistinterface[][] = productsrlist;
  //     setlistdata(perloaddatalist)
  // }, [productsrlist])

  function changeDataDisplayView(event:any) {
    setSwitchView('table')
  }
 function changeDataReverseView(event:any) {
  setSwitchView('grid')
  }


  const addItem = async (event:any) => {
    event.preventDefault();
    const href:string =  event.currentTarget.href;
    setIframesrc(href);
    const modal:any =  document.getElementById("my_modal_5");
        if (modal) {
            modal.showModal();
        }

  }
  

  const editItem = async (event:any) => {
    event.preventDefault();
    const href:string =  event.currentTarget.href;
    setIframesrc(href);
  }

  
  return (
        <main className="p-2">
            <LineTitle heading={`Brands ${name}`} content={[{title:'products',link:'products'}]} />
            <div className="flex flex-row mt-5 lg:space-x-10 max-sm:flex-col">
              {/* section */}
              <div className="w-2/3 max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      <div><SearchBar isviewswitched={switchview} changeDataReverseView={changeDataReverseView} changeDataDisplayView={changeDataDisplayView} /></div>
                      <div className="px-3 ">
                          {id} {name}
                          {switchview == 'grid'? <GridView  additem={addItem} edititem={addItem} gridData={productsrlist} /> : <TableView />}
                        
                      </div>
                  </div>
                 
              </div>
              {/* aside */}
              <div className="w-1/2 max-sm:w-full">
                {/* <AdminAside /> */}
                <ModalProductPopover src={iframesrc} />
                {/* <iframe className="w-full h-[500px]" allowFullScreen={true} src={iframesrc} id="iframepageloader"></iframe> */}
              </div>
            </div>
        </main>
  );
}



export default function Home () { 
  return (
      <LayoutAdmin>
          <Suspense fallback={"<div>Loading...</div>"}>
              <ProductHome />
          </Suspense>
      </LayoutAdmin>
  )
 }