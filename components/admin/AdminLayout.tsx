"use client"

import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import AdminTop from './AdminTop';
import LoadingWidget from './LoadingWidget';


const LayoutAdmin = ({ children,}: Readonly<{ children: React.ReactNode; }>) => {

  return (
    <main>

      <div className='flex flex-row'>
        <div className='w-screen'>
          <div className="flex flex-row">
              {/*  */}
              <div className='h-[565px] max-sm:hidden w-1/5 bg-lightblack max-sm:h-screen rounded-br-lg p-10 '>
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
      
    </main>
  )
}

export default LayoutAdmin
