"use client"

import React, { useContext } from 'react'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl, ThemeContext } from '@/app/interface'
import { addSettings } from '@/app/actions/auth'



const Token = globalThis?.sessionStorage?.getItem("apptoken")

const Home = () => {
    const context = useContext(ThemeContext)
    const {state, action, status} = useCustomActionState({fn:addSettings});

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/api/v1/control/settings/list/`, headers:{
        "Authorization":`Bearer ${Token} `
      }});



  return (
        <main className='font-sans p-3 flex flex-col space-y-8'>
            <div><h3>General Settings</h3></div>
            <div>
                <form action={action} >
                    <div className="flex flex-col space-y-6">
                        <div className='row-span-1'>
                            <label  >Application Name</label><br />
                            <input type="text" defaultValue={ssrdata?.app_name} name='app_name' placeholder="website Name" className="input input-bordered w-full" />  
                        </div>
                        <div className='row-span-1'>
                            <label  >Application Phone</label><br />
                            <input defaultValue={ssrdata?.app_phone} type="tel" name='app_phone' placeholder="website Phone" className="input input-bordered w-full" />  
                        </div>
                        <div className='row-span-1'>
                            <label  >Office Address</label><br />
                            <input defaultValue={ssrdata?.office_address} type="text" placeholder="Office Address" name='office_address' className="input input-bordered w-full" />  
                        </div>

                        <div className='row-span-1'>
                            <label  >Application short Description</label><br />
                            <textarea defaultValue={ssrdata?.app_description} maxLength={100} name="app_description" className='textarea w-full border-2 border-gray-300' placeholder='Site Description'></textarea>
                        </div>


                        <div className='text-right'>
                            <button type="submit" className='btn-warning btn btn-xs'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
  )
}

export default Home
