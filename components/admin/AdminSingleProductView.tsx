"use client"
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { InputTag, SelectTag } from './FormElements'
import Link from 'next/link'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { photoform, productVariations } from '@/app/actions/auth'
import { externalurls } from '@/app/interface'
import CustomTable from '../customTable'
import { IoReload } from "react-icons/io5";



const VariationListing = (prop:{listdata?:any}) => {
    return (
        <div>
            {prop.listdata?.length > 0 ? (
                        <CustomTable
                            title="Varations Listing"
                            thead={['Size', 'Quantity']}
                            mapper={['size', 'quantity' ]}
                            tbody={prop.listdata}
                        />
                      ) : "Loading... "}
        </div>
    )
}



const AdminSingleProductView = (prop:{
    id?:any,
    name?:any,
    data?:any,
    image?:any
}) => {
    const [datalist, setDataList] = useState()
    const {state, action, status} = useCustomActionState({fn:productVariations});
    const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

    const {
        ssrdata, 
        ssrerror,
        ssrstatus,
        cssrmutate
    } 
        = useCustomSSR({url:`${externalurls.productfetchvariations}/${prop.id}/list`, headers:{
    "Authorization":`Bearer ${Token2} `
  } });

  

  useEffect(() => {
    setDataList(ssrdata)
    // cssrmutate()
  }, [ssrdata])

  const reloader = useCallback(() => {
        globalThis.location.reload()
  }, [])
  return (
    <div className=' flex flex-col mt-3 lg:space-y-8 max-sm:flex-col'>
        <div>
            <h3 className='text-3xl text-red-500'>{prop.name}</h3>
        </div>
        <button className='btn btn-outline btn-primary' onClick={reloader}> <IoReload /> Reload Page</button>
        {/*  */}
        <div className='flex flex-row max-sm:flex-col'>
            <div className='w-7/12 mt-10 h-96  max-sm:h-72 max-sm:w-full shrink-0 lg:border-r-4 lg:border-lightblack p-1'>
                <div className="w-full h-full rounded-lg relative ">
                    <Image className='image-full rounded-3xl' src={`${prop.image}`} alt="..." fill={true} />
                </div>
            </div>
            <div className='w-1/2 p-3 max-sm:w-full'>
                <div className='mb-6'>
                    <strong><b>Add Variation</b></strong>
                </div>

                <div>
                    <form action={action}>
                        <div className="flex flex-col space-y-3">
                            {/* <div><InputTag required={true} label='Name' value={`${prop.name} `}  name={'name'} type={'text'} placeholder='Enter Name' /></div> */}
                            <div><InputTag required={true} label='Size'  name={'size'} type={'number'} /></div>
                            <div><InputTag required={true} label='Quantity'  name={'quantity'} type={'number'} /></div>
                            <div>
                                <input required={true} type="text" defaultValue={prop.id} name='product_listing_id' hidden />
                                <button className='px-10 rounded-3xl py-3 bg-lightorange' type="submit">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        <div className='mt-10'>
            <VariationListing listdata={datalist} />
        </div>
    </div>
        
  )
}

export default AdminSingleProductView
