"use client"


import { useCustomSSR } from '@/app/custom_hooks'
import { externalurls } from '@/app/interface'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { IoStorefrontSharp } from 'react-icons/io5'



const Token2 = globalThis?.sessionStorage?.getItem("apptoken")


interface StoreInterface {
    title?:string,
    link?:string,

}



const StoresListing = () => {
    const [storelistdata, setStoreListData] = useState<StoreInterface[]>([])

    const {ssrdata:storelist} = useCustomSSR({url:`${externalurls.warehouselist}`, headers:{
        "Authorization":`Bearer ${Token2} `
      }});

      useEffect( () => {
        let container: React.SetStateAction<StoreInterface[]> = [];
        console.log(storelist)

        storelist?.map( (item:{id:string, name:string, branch:{id:string, name:string}}, index:number) => {
            container.push({title:item.name, 
                link:`/staff/store/details/?id=${item.id}&name=${item.name}&branch_id=${item.branch.id}&branch_name=${item.branch.name}`})
        } )

        setStoreListData(container)
      }, [storelist] )


    return (
        <ul className='list'>
            {storelistdata?.map((item, index) => (
                <li key={`store_list_${index}`}>
                    <Link href={`${item.link}`}>
                        <div className="flex flex-row gap-x-1 items-center">
                            <div><IoStorefrontSharp /></div>
                            <div>{item.title}</div>
                        </div>
                    </Link>
                </li>
            ))}
            
        </ul>
    )
}

export default StoresListing
