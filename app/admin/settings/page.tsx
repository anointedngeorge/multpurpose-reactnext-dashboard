"use client"
import Chartjs from '@/components/admin/Chartjs'

import { LineTitle } from '@/components/admin/LineTitle'
import React, { useCallback, useEffect, useState } from 'react'
import { FaMoneyCheckDollar, FaUserGroup } from "react-icons/fa6";
import { TbBuildingEstate } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FcPaid } from "react-icons/fc";
import { FcDebt } from "react-icons/fc";
import { useCustomSSR } from '@/app/custom_hooks'
import { externalurls } from '@/app/interface'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout';


const Homepage = () => {
    return (
        <div className='text-center flex place-content-center '>
            <div className='flex place-content-center items-center'>Settings</div>
        </div>
    )
}



const Home = () => {
    const [page, setPage] = useState("");

    const loadpage = useCallback((event:React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            setPage(event.currentTarget?.href);
    }, [])


  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4'>
            <div>
                <LineTitle heading={'Application Settings'}  />
            </div>

            <div className='flex flex-row mb-3'>
                <div className='shrink-0 w-1/5 bg-gray-100 h-screen p-2 space-y-4'>
                    <ul className='flex flex-col space-y-5 font-sans'>

                        <li>
                            <Link href={'/admin/settings/general_settings'} onClick={loadpage} >General Settings</Link>
                        </li>

                        <li>
                            <Link href={'/admin/settings/email_settings'} onClick={loadpage} >Email Settings</Link>
                        </li>

                        {/* <li>
                            <Link href={'/admin/settings/sms_settings'} onClick={loadpage} >SMS Settings</Link>
                        </li> */}
                 
                    </ul>
                </div>
                
                <div className=' w-4/5 h-screen'>
                    {page ? (
                        <iframe src={`${page}`} className='w-full h-screen font-sans m-0'></iframe>
                    ) : <Homepage /> }
                </div>
            </div>
        </main>

    </AdminLayout>
  )
}

export default Home
