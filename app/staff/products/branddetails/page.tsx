"use client"
import Image from "next/image";
import { Suspense, useCallback } from 'react';
import LayoutAdmin from "@/components/staff/AdminLayout";
import Chartjs from "@/components/staff/Chartjs";
import AdminAside from "@/components/staff/AdminAside";
import { LineTitle } from "@/components/staff/LineTitle";
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
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";


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
  popMenuwindow?:(event:any) => void,
  additem?:(event:any) => void,
  edititem?:(event:any) => void,
}


const BrandTypesListing = (prop:{brandid:any, data:any[], changeFun?:(event:any) => void}) => {

  const removeType =  useCallback( ( event: React.MouseEvent<HTMLAnchorElement> ) => {
      event.preventDefault();
      const id = event?.currentTarget?.id;
      // alert(`${APIBASEURl}/api/v1/products/brand/${id}/item/`)
      if (confirm("Are you sure?")) {
        const ft = async () => {
          const f =  await fetch(`${APIBASEURl}/api/v1/products/brand/${id}/item/`, {
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
  }, [] )

  return (
      <div className="flex flex-col shrink-0">
          <nav>
              <ul>
                 {prop?.data?.map((item:any, index:any) => (
                     <li title={`${item?.name}`} key={`list_id_${index}`}>
                          <div className="flex flex-row space-x-3 items-center">
                              <div>
                                  <Link className={item?.name} id={`${item?.id}`} onClick={prop.changeFun} href={`/${item?.id}`}>
                                      <div className="flex flex-row items-center">
                                        <div><HiMiniArrowSmallRight /> </div>
                                        <div>{`${item?.name}`}</div>
                                      </div>
                                  </Link>
                              </div>
                              <div>
                                  <Link onClick={removeType} id={`${item?.id}`} className="text-red-400" href={``}>
                                     <div className="flex flex-row items-center">
                                          <div>
                                          <FaTrash /> 
                                          </div>
                                          <div>Remove</div>
                                     </div>
                                  </Link>
                              </div>
                          </div>
                      </li>
                 ))}
              </ul>
          </nav>
      </div>
  )
}



const Tiles:React.FC<TilesInterface> = (prop) => {
    // console.log(prop.data?.data.name)
    const removeProduct = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      const productid = event.currentTarget.getAttribute('data-id');
      
      if (productid && confirm("Warning!, this action will delete every data attached to it. Do you still want to continue!")) {
          const ft = async () => {
              const f =  await fetch(`${process.env.APIBASEURl}/api/v1/products/product/${productid}/delete/`, {
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
         
            <div>
                <Link className="btn btn-ghost btn-circle" onClick={prop?.additem}  href={`${APIBASEURl}/api/v1/products/add/product/item/${prop?.data?.id}/`}><MdOutlineAddCircle size={25} /></Link>
            </div>
            <div><Link className="btn btn-ghost btn-circle"  onClick={prop?.edititem} href={{pathname:'/admin/products/productlisting/', query:{id:`${prop?.data?.id}`, name:`${prop?.data?.data?.name}` }}}><BsFillEyeFill size={25} /></Link></div>
            <div><Link className="btn btn-ghost btn-circle" onClick={prop?.edititem} href={`${APIBASEURl}/api/v1/products/edit/product/item/${prop?.data?.id}/`}><FiEdit size={25} /></Link></div>
            <div><button className="btn btn-ghost btn-circle" onClick={removeProduct}  data-id={`${prop?.data?.id}`}><MdDelete size={25} /></button></div>
        </div>
    )
}


const Card:React.FC<datalistinterface> = (props) => {
    // console.log(props)
    return (
        <div className="rounded-2xl border w-56 min-h-44 max-sm:w-full  p-3 bg-lightblack text-white font-inter font-bold">
            <div className="flex flex-col place-content-center items-center">
                <div className="mt-3">
                    <p className="text-center">
                        {`${props.data?.name}`}
                      
                    </p>
                </div>
                    <p className="text-center text-6xl text-red-500">
                        {`${props?.data?.quantity}`}
                    </p>
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



const ProductHome = () => {
  const [listdata, setlistdata] = useState<datalistinterface[][]>([]);
  const [switchview, setSwitchView] = useState<string>('grid');
  const [iframesrc, setIframesrc] = useState<string>('');
  const [itemname, setItemName] = useState<string>('');


  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

  const router = useSearchParams();
  const brandId = router.get('id');
  const name = router.get('name');

   const {ssrdata:brandlist, ssrerror:branderror, ssrstatus:brandstatus} = useCustomSSR({url:`${externalurls.productbrandslist}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

  const [brandliststate, setBrandList] = useState<any[]>()
  useEffect(() => {
      setBrandList(brandlist)
  }, [brandlist])

  const brand = brandliststate?.find(b => b.id === brandId);

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
  

  const selectType = (e:any) => {
      e.preventDefault();
      const url = `${externalurls.productsbybrandsandtypes}/${brandId}/${e.currentTarget.id}/list`;
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            headers: {
                'Content-Type':'application/json',
                "Authorization":`Bearer ${Token2} `
            },
          });
      
          if (response.ok) {
            const result = await response.json();
            setlistdata(result);
          } else {
                // 
          }
        } catch (err) {}
      };
      setItemName(e.currentTarget.className)
      fetchData();
  }


  
  return (
        <main className="p-2 h-screen">
            <LineTitle heading={`Brands ${name}`} content={[{title:'products',link:'products'}]} />
            <div className="flex flex-row mt-5 lg:space-x-10 max-sm:flex-col">
              {/* section */}
              <div className="w-2/3 max-sm:w-full">
                  <div className="flex flex-col space-y-10">
                      {/* <div><SearchBar isviewswitched={switchview} changeDataReverseView={changeDataReverseView} changeDataDisplayView={changeDataDisplayView} /></div> */}
                      <div className="px-3 ">
                          <h3 className="text-2xl">{`${itemname}`.toUpperCase()}</h3>
                          {listdata.length > 0 ? <GridView  additem={addItem} edititem={addItem} gridData={listdata} /> : (
                            <>
                                <Image 
                                    src={`https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611u0e7z6dp6cd3h77viia785rx42sbnnlo0okh02km&ep=v1_gifs_search&rid=giphy.gif&ct=g`} 
                                    width={100} height={100} alt="loading..." />
                            </>
                          )}
                      </div>
                  </div>
                 
              </div>
              {/* aside */}
              <div className="w-1/2 max-sm:w-full">
                  <h3 className="text-2xl font-sans font-bold">Brand Types</h3>
                  <BrandTypesListing changeFun={selectType} brandid={brandId} data={brand?.listtypes} />

                  <ModalProductPopover src={iframesrc} />
              </div>
            </div>
        </main>
  );
}



export default function Home () { 
  return (
      <LayoutAdmin>
          <Suspense fallback={"Loading..."}>
              <ProductHome />
          </Suspense>
      </LayoutAdmin>
  )
 }