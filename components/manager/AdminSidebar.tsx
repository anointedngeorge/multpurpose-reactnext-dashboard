"use client"
import { useCustomSSR } from '@/app/custom_hooks';
import { Apptoken, ThemeContext, Token, externalurls } from '@/app/interface';
import Image from 'next/image';
import Link from 'next/link'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import { IconType } from 'react-icons';
import { BiHome } from 'react-icons/bi';
import { FaListUl, FaShopify } from 'react-icons/fa';
import { LiaStoreAltSolid } from 'react-icons/lia';
import { LuLogOut } from 'react-icons/lu';
import { MdOutlineLocationCity } from 'react-icons/md';
import { TbPhotoFilled } from 'react-icons/tb';


interface IconInterface {
  Icon:IconType,
  showicon?:boolean,
  title?:string,
  link?:string,
  iconclassname?:string,
  textclassname?:string,
  linkclassname?:string,
  hovertitle?:string,
  iconstyle?:React.CSSProperties;
  onclick?:React.MouseEventHandler
}

const Profile = ({data}:{data?:any}) => {
  return (
      <div className="flex flex-col place-content-center items-center">
          <div>
            <div 
            className='rounded-ful bg-white'
            >
                <Image src={'/images/europe_logo.png'} alt='..' width={130} height={40}  />
            </div>
          </div>
          <div className='text-center mt-3'>
            <h3 className='font-inter text-lightorange font-semibold'>{`${data?.username}` || 'Cameron Williamson'}</h3>
              <p className='text-graywhite text-xs'>Administrator</p>
          </div>
      </div>
  )
}

const SidebarLinks:React.FC<IconInterface> = (prop) => {
  return (
    <div className='text-white'>
      <Link onClick={prop.onclick} href={`${prop.link}`} className={`${prop.linkclassname}`} title={`${prop.hovertitle}`}>
          <div className='flex flex-row space-x-2 place-items-center'>
            {prop.showicon? <div><prop.Icon className={`${prop.iconclassname}`} style={prop.iconstyle} /></div> : ''}
            <div><span className={`${prop.textclassname}`}>{`${prop.title}`}</span></div>
          </div>
      </Link>
    </div>
)
}

const Sidebar = () => {
  const context = useContext(ThemeContext);
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
  const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.profile}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});


  const logout = useCallback((event:React.MouseEvent) => {
        event.preventDefault();
        if (confirm("Are you sure?")) {
            globalThis?.sessionStorage?.removeItem(`${Apptoken}`);
            globalThis.location.href = "/";
        }
  }, [])



  return (
    <div >
        <div className='flex flex-col space-y-10'>
            <div>
                <Profile data={ssrdata} />
            </div>

            <div className="flex flex-col space-y-5">
               {/* <SidebarLinks 
                      Icon={LiaStoreAltSolid} 
                      showicon={true}
                      hovertitle='Stores'
                      title='Stores'
                      link='/admin/store/'
                      iconclassname='text-lightorange size-4'
                      textclassname='text-white text-md hover:text-lightorange'
                /> */}
               <SidebarLinks 
                      Icon={TbPhotoFilled}
                      link='/manager/gallery/'
                      showicon={true} 
                      title='Gallery'
                      hovertitle='Gallery'
                      iconclassname='text-lightorange size-4'
                      textclassname='text-white text-md hover:text-lightorange'
                />

              {/* <SidebarLinks 
                      Icon={MdOutlineLocationCity} 
                      showicon={true} 
                      title='Branch'
                      hovertitle='Branch'
                      link='/admin/branch/'
                      iconclassname='text-lightorange size-4'
                      textclassname='text-white text-md hover:text-lightorange'
                /> */}

              {/* <SidebarLinks 
                      Icon={FaShopify} 
                      showicon={true} 
                      title='Shop'
                      hovertitle='Shop'
                      link='/admin/shop'
                      iconclassname='text-lightorange size-4'
                      textclassname='text-white text-md hover:text-lightorange'
                /> */}

            </div>

        </div>


        {/*  */}
        <div className='mt-32'>
        <SidebarLinks   
                  link='/' 
                  onclick={logout}
                  Icon={LuLogOut}
                  showicon={true}
                  hovertitle='Logout'
                  title='Logout'
                  iconclassname='text-lightorange size-6'
                  textclassname='text-white text-md hover:text-lightorange'
            />
        </div>
    </div>
  )
}

export default Sidebar
