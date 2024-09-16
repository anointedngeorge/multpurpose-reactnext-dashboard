"use client"
import LayoutAdmin from '@/components/admin/AdminLayout'
import { ModalProductPopover } from '@/components/globalComponents'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'


const Home = () => {
    const [loadpage, setPage] = useState('')

 const createaccount = useCallback( (event:any) => {
    const href = event.currentTarget.href;
    const modal:any = document.getElementById('my_modal_5');
    if (modal) {
        setPage(href)
        modal.showModal();
        
    }
 }, [] )


  return (
    <LayoutAdmin>
        <main >
            
            <div className="grid grid-rows-2 gap-2">
                    <div className='col-span-1'>
                        <div className="flex flex-row space-x-4">
                                <div><Link onClick={createaccount} className='btn btn-sm btn-primary' 
                                href={`/admin/accounts/staff/`} >Create Staff</Link></div>
                                <div><Link onClick={createaccount} className='btn btn-sm btn-primary' 
                                href={`/admin/accounts/manager/`} >Create Manager</Link></div>
                        </div>
                    </div>
                    <div className='border-4 col-span-1'>2</div>
            </div>

        <ModalProductPopover src={loadpage} />
        </main>
    </LayoutAdmin>
  )
}

export default Home
