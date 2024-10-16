"use client"
import { Suspense } from 'react';
import React, { useEffect, useState } from 'react'
import {useSearchParams} from "next/navigation"
import Image from 'next/image'
import { APIBASEURl, Token, externalurls } from '@/app/interface'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { InputTag } from '@/components/admin/FormElements'
import { ModalPopOver } from '@/components/globalComponents'
import { photoform, productSellAddToCart } from '@/app/actions/auth';


interface cardinterface {
    sellfunction?: (event:any) => any,
    data?:any
}

const Card:React.FC<cardinterface> = (prop) => {
    return (
            <div className='col-span-1'>
                <div className="card bg-base-100  w-full shadow-xl">
                    <figure className='w-full relative h-44'>
                        <Image
                        src={prop?.data?.image?.image? `${prop?.data?.image?.image}`: ''}
                        alt="Shoes" fill={true}  />
                    </figure>
                    <div className="card-body">
                    {/* <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div> */}
                        <h2 className="card-title text-sm text-center">
                        {`${prop?.data?.name}`}
                        <div className="badge badge-secondary">NEW</div>
                        </h2>
                        {/* <p>{`${prop?.data?.description}`}</p> */}
                        <button value={JSON.stringify(prop)} type='button' onClick={prop.sellfunction} className='btn btn-sm  btn-secondary btn-block'>Proceed</button>
                    </div>
                        <p className='text-center bg-neutral-600 text-white'>
                        {`${prop?.data?.product?.name}`}
                        </p>
                    </div>
            </div>
    )
}


const ShopItemListing = () => {
    const [dataset, setDataset] = useState<[]>([]);
    const [modaldataset, setModalDataset] = useState<any>(null);
    const {state, action, status} = useCustomActionState({fn:productSellAddToCart});

    const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
    const query = useSearchParams();
    const product_id = query?.get('id');
    const brand_id = query?.get('brand_id');
    const item_name = query?.get('item_name');
    const brand_name = query?.get('brand_name');
    // `api/v1/products/staffproductbrandlisting/list/${brand_id}/${product_id}`
    const {
        ssrdata:productbrandtypessrlist, 
        ssrerror:productbrandtypessrerror, 
        ssrstatus:productbrandtypessrtatus,
    } = useCustomSSR({url:`${APIBASEURl}/api/v1/products/staffproductbrandlisting/list/${brand_id}/${product_id}`, headers:{
        "Authorization":`Bearer ${Token2} `
      }});


      useEffect(() => {
        setDataset(productbrandtypessrlist)
      }, [productbrandtypessrlist])


    const sellfunction = (event:any) => {
        const modal:any =  document.getElementById("my_modal_5");
        if (modal) {
            modal.showModal();
        }
        setModalDataset(JSON.parse(event.currentTarget.value))
    }


  return (
    <main className='w-full p-3'>
        <div><h3 className='text-2xl font-inter font-bold text-black'>{brand_name} ({item_name})</h3></div>
        <div className="grid grid-cols-3 mt-10 gap-2">
                {/* {Token}
                <br /> */}
                {/* {brand_id} */}
                {/* <br /> */}
                {/* {product_id} */}
                {productbrandtypessrlist?.map((item:any, index:number) => (
                    <Card data={item} sellfunction={sellfunction} key={`div_${index}`} />
                ))}
        </div>
        
        <ModalPopOver data={modaldataset} action={action} />
    </main>
  )
}

export default ShopItemListing
