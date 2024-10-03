"use client"
import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import AdminTop from './AdminTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getdbsid } from '@/app/function';
import { ThemeContext } from '@/app/interface';



const LayoutAdmin = ({ children,}: Readonly<{ children: React.ReactNode; }>) => {
    const [token, setToken] = useState<any>(null)
    useEffect(() => {
      const token = getdbsid({e:'apptoken'})
      setToken(token)
    }, []);

    

  return (
    <ThemeContext.Provider value={{token:token}}>
      <main>

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
}

export default LayoutAdmin
