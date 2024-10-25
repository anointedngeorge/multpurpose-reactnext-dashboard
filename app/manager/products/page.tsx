"use client"

import { Suspense, useCallback } from 'react';
import LayoutAdmin from "@/components/manager/AdminLayout";
import { LineTitle } from "@/components/manager/LineTitle";
import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";
import { MdDelete, MdOpenWith } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";
import {  useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";






const Token2 = globalThis?.sessionStorage?.getItem("apptoken")



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
  name?:string,
  popMenuwindow?:(event:any) => void,
  additem?:(event:any) => void,
  edititem?:(event:any) => void,
}

const Tiles:React.FC<TilesInterface> = (prop) => {

  const removeProduct = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const productid = event.currentTarget.getAttribute('data-id');
    
    if (productid && confirm("Warning!, this action will delete every data attached to it. Do you still want to continue!")) {
        const ft = async () => {
            const f =  await fetch(`${process.env.APIBASEURl}/api/v1/products/productbrand/${productid}/delete/`, {
                  method:'delete',
                  headers: {
                      "Content-Type":"application/json",
                      'Authorization':`Bearer ${Token2}`
                  }
              });
              
              if (f.ok) {
                  globalThis.location.reload();
              }
        }
        ft();
    }
}, []);

    return (
        <div className="flex flex-row shrink-0">
            {/* <div>
                <Link className="btn btn-ghost btn-circle" onClick={prop?.additem}  href={`${APIBASEURl}/api/v1/products/add/product/item/${prop?.data?.id}/`}><MdOutlineAddCircle size={25} /></Link>
            </div> */}
            <div><Link className="btn btn-ghost btn-circle"  onClick={prop?.popMenuwindow} href={{pathname:'/manager/products/branddetails/', query:{id:`${prop?.data?.id}`, name:`${prop?.name}` }}}><BsFillEyeFill size={25} /></Link></div>
            {/* <div><Link className="btn btn-ghost btn-circle" onClick={prop?.edititem} href={`${APIBASEURl}/api/v1/products/edit/product/item/${prop?.data?.id}/`}><FiEdit size={25} /></Link></div> */}
            <div><button className="btn btn-ghost btn-circle" onClick={removeProduct}  data-id={`${prop?.data?.id}`}><MdDelete size={25} /></button></div>
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
      
                <div>
                    <Tiles name={props.data?.name} additem={props.additem} edititem={props.edititem} data={props} popMenuwindow={props.popMenuwindow} />
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
    <div  className="grid grid-cols-4 gap-3 mt-4 max-sm:flex max-sm:flex-col">
        {prop.gridData?.map((itemdata: any) => (
                
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

  const {ssrdata:productsrlist} = useCustomSSR({url:`${externalurls.productbrandslist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

 

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
            <LineTitle heading="Products/Brands" content={[
              {title:'Add Product', link:'products/add'}
            ]}  />
            <div className="flex flex-row mt-5 lg:space-x-10 max-sm:flex-col">
              {/* section */}
              <div className="max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      {/* <div><SearchBar isviewswitched={switchview} changeDataReverseView={changeDataReverseView} changeDataDisplayView={changeDataDisplayView} /></div> */}
                      <div className="px-3 ">
                        
                          {switchview == 'grid'? <GridView  additem={addItem} edititem={addItem} gridData={productsrlist} /> : <TableView />}
                        
                      </div>
                  </div>
                 
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