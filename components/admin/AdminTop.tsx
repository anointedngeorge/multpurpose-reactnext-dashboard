"use client"
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IconType } from 'react-icons'
import { FaBell, FaCartArrowDown, FaRegBell } from 'react-icons/fa'
import { LuShoppingCart } from 'react-icons/lu'
import Image from 'next/image'
import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl, cartStorageName, externalurls } from '@/app/interface'
import CartComponent from './CartComponent'
import { FaWindowClose } from "react-icons/fa";




const Token2 = globalThis?.sessionStorage?.getItem("apptoken")



interface NotificationInterface {
    Icon:IconType,
    val?:string,
    link?:string,
    onclick?:(e:any) => void
}

const Notification:React.FC<NotificationInterface> = (prop) => {
    return (
      <Link 
          onClick={prop.onclick}
          className="btn btn-ghost btn-circle" 
          href={`${prop.link}`}
      >
            <div className="indicator">
                <prop.Icon size={25} />
                <span className="badge badge-md bg-lightorange text-white indicator-item">{`${prop.val}`}</span>
            </div>
      </Link>
    )
}


const Searchbar = () => {

  const [searchInput, setSearchInput] = useState<{
        id:string,
        name:string,
        image:{image:string},
        product:{id:string},
        brands:{id:string},
        brand_type:{id:string},
    }[]>([]);
  const [is_searchable, setSearchable] = useState<boolean>(true);


  const handleInput = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const selectedValue = event?.currentTarget?.value;
    setSearchable(false)
    const ft = async () => {
      const f =  await fetch(`${APIBASEURl}/api/v1/products/productlisting/search/?name__icontains=${selectedValue}`, {
            method:'get',
            headers: {
                "Content-Type":"application/json",
                'Authorization':`Bearer ${Token2}`
            }
        });

        if (f.ok) {
            const data = await f?.json()
            const dt = data? data : [];
            setSearchInput(dt)
        } else {
          setSearchInput([])
        }
  }

  ft();
    if (selectedValue == '') {
      setSearchable(true)
    }
  };

  // close
  const closeOPenSearch = () => {
    setSearchable(true)
  }

  const notfoundpng = "https://png.pngtree.com/png-clipart/20221221/original/pngtree-no-camera-icon-png-image_8792933.png";

  return (
      
        <div className='flex flex-col  w-96 fixed z-40'>

            <div className="flex h-10 max-sm:w-auto bg-white border-2 rounded-full place-content-center items-center space-x-3">
                      <div className='w-72' >
                          <input 
                              type="text"
                              placeholder='Products'
                              onKeyUp={handleInput}
                              className='focus:outline-none focus:border-none p-2 border-0 border-lightblack w-full h-full focus-within:border-0'
                            />
                      </div>
                      <div className='text-center'><span><CiSearch size={25}/></span></div>
              </div>
            
            <div hidden={is_searchable} className='mt-1 fade-in bg-slate-100 w-full p-3 min-h-32 drop-shadow-2xl'>
                <span onClick={closeOPenSearch} className='cursor-pointer text-xs float-end'><FaWindowClose size={16} /></span>
                <hr className='w-full' />
                <ul className='list mt-2'>
                    {searchInput? searchInput?.map((item, index) => (
                        <li key={`search_${index}`}>
                            <Link href={{pathname:`/admin/products/singlesearchproductlist`, query:{
                              id:item?.id,
                              name:item?.name,
                              product_id:item?.product?.id,
                              brands_id:item?.brands?.id,
                              brand_type_id:item?.brand_type?.id,
                              image:item?.image?.image
                            } }}>
                            <div className="flex flex-row items-center space-x-1">
                                <div>
                                  <Image className='rounded-md' src={`${item?.image? item?.image.image : notfoundpng}`} width={35} height={35} alt='...' />
                                </div>
                                <div className='text-lg font-bold'>
                                    {`${item?.name}`}
                                </div>
                            </div>
                            </Link>
                        </li>
                    )) : "Not Found"}
                </ul>
            </div>

        </div>
   
  )
}


const Profile = () => {
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
  const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.profile}`, headers:{
    "Authorization":`Bearer ${Token2}`
  }});


    return (
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full relative">
          <Image
            alt="..."
            fill={true}
            src={"/images/person_avata.jpeg"}
           />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><strong className='text-center'>{`${ssrdata?.username}` || "Cameron Williamson"}</strong></li>
        <li></li>
        {/* <li>
          <Link href={`#`} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li> */}
        {/* <li><Link href={`#`}>Settings</Link></li> */}
        <li><Link href={`#`}>Logout</Link></li>
      </ul>
    </div>
    )
}

const AdminTop = () => {
  const [cartCounter, setCartCounter] = useState<any>('0');
  const [cartData, setCartData] = useState<any>();

  useEffect(() => {
    setInterval(() => {
      const cartstoragedata:any =  globalThis.sessionStorage.getItem(cartStorageName);
      if (cartstoragedata) {
        const parse = JSON.parse(cartstoragedata);
        setCartData(parse)
        const total = Object?.keys(parse);
        setCartCounter(total?.length);
      }
     
    }, 3000)
  }, [])

  const viewCartdetails = (event:any) => {
      event.preventDefault();
      const modal:any =  document.getElementById("my_modal_4");
      if (modal) {
          modal.showModal();
      }
  }


  const [dataset,setDataset] = useState<string | number>(0)
  const {
    ssrdata, 
    } = useCustomSSR({url:`${APIBASEURl}/api/v1/products/request/count/`, headers:{
    "Authorization":`Bearer ${Token2}`
  }});

  useEffect(() => {
  setDataset(ssrdata?.count)
  }, [ssrdata])


  return (
    <>
      <div className='grid grid-flow-col max-sm:grid-flow-row lg:space-x-48 w-full py-3 px-8 max-sm:p-1 place-content-between'>
          <div><Searchbar /> </div>
        
          <div>
            <div className="flex flex-row space-x-10 ">
                {/* <div><Notification Icon={LuShoppingCart}  val={`${cartCounter}`} onclick={viewCartdetails} /></div> */}
                <div><Notification link='/admin/productrequest/' Icon={FaRegBell} val={`${dataset}`} /></div>
                <div><Profile /> </div>
            </div>
          </div>

          
      </div>
      {/* <CartComponent data={cartData} /> */}
    </>
  )
}

export default AdminTop
