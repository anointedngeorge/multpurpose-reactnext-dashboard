"use client"
import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import AdminTop from './AdminTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBASEURl, externalurls, ThemeContext } from '@/app/interface';
import Link from 'next/link';
import Image from 'next/image';
import { useCustomSSR } from '@/app/custom_hooks';


const Token2 = globalThis?.sessionStorage?.getItem("apptoken")


const LayoutAdmin = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    
    // const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
    const { ssrdata } 
            = useCustomSSR({url:`${APIBASEURl}/api/v1/auth/token/validate/`, headers:{
        "Authorization":`Bearer ${Token2} `
      } });

      // force login if token validate is false
      useEffect(() => {
          if (ssrdata?.token) {
             globalThis.location.href = "/admin/login";
          }
      }, [ssrdata]);
    
    if (ssrdata?.token) {
        return (
          <ThemeContext.Provider value={{token:Token2}}>
            <main>
              {/* {JSON.stringify(ssrdata)} dsd */}
              <div className='flex flex-row'>
                <div className='w-screen'>
                  <div className="flex flex-row">
                      {/*  */}
                      <div className='h-screen max-sm:hidden w-1/5 bg-lightblack max-sm:h-screen rounded-br-lg p-10 '>
                        <AdminSidebar />
                      </div>
                      {/*  */}
                      <div className='w-11/12 px-8 max-sm:px-2 max-sm:w-full'>
                        <div className='flex flex-col space-y-4'>
                          <div>
                          <AdminTop />
                          </div>
                          <div className='bg-white shadow p-3 rounded-sm max-h-[500px] overflow-y-scroll'>
                              
                                {children}
                          
                          </div>
                        </div>
                      </div>
                      {/*  */}
                  </div>
                </div>
              </div>
              
              {/* footer start here */}
              <div>
                  <AdminFooter />
              </div>
              {/* end of footer */}
              
              <ToastContainer />
            </main>
          </ThemeContext.Provider>
        )
    } else {
        return (
          <main className='w-full flex place-content-center items-center bg-gray-800 h-screen '>
            <div className='flex flex-col space-y-5 items-center'>
              <div>
                  <Image  src={'/images/restricted_area.jpeg'}  className='rounded-3xl'  width={100} height={100} alt='...' />
              </div>
                <div>
                    <h3 className='text-white font-bold'>{ssrdata?.message? `${ssrdata?.message}`.toUpperCase() : 'Loading, please wait...'}</h3>
                </div>
                <div> {ssrdata?.btn_action == 'login'? <Link href={'/admin/login/'} className='btn btn-sm btn-warning'>Click To Login</Link> : '...'}</div>
            </div>
          </main>
        )
    }
}

export default LayoutAdmin
