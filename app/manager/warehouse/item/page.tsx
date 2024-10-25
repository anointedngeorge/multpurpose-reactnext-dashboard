"use client"

import { createProductInStore, createWarehouse } from '@/app/actions/auth'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { externalurls } from '@/app/interface'
import { InputTag, SelectTag } from '@/components/manager/FormElements'
import { noSSR } from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useCallback, useEffect, useState } from 'react'



const ItemData = () => {
    const router = useSearchParams()
    const data:any = router.get("data");
    const data2 = JSON.parse(data);
    const [listdata, setListData] = useState<any>([])
    const {state, action, status} = useCustomActionState({fn:createProductInStore});

    const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

    const {ssrdata, ssrerror, ssrstatus} = 
      useCustomSSR({url:`${externalurls.warehouselist}`, headers:{
      "Authorization":`Bearer ${Token2} `
  }});

  const {ssrdata:itemdata, ssrerror:itemerror, ssrstatus:itemstatus} = 
      useCustomSSR({url:`${externalurls.productInStoreList}/${data2.id}/list/`, headers:{
      "Authorization":`Bearer ${Token2} `
  }});

  useEffect( () => {
    setListData(ssrdata)
}, [ssrdata] )

const removeProductFromStore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
  const id = (event.currentTarget as HTMLButtonElement).getAttribute('data-id');
  
  if (globalThis.confirm("Are you sure you want to remove this product?")) {
    fetch(`${externalurls.productInStoreList}/${id}/remove/`, {
      method: 'DELETE', // Use DELETE method for removal
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token2}` // Correct header name is 'Authorization'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert(`Product removed successfully: ${data}`);
      // Optionally, update UI or state after successful removal
    })
    .catch(error => {
      alert(`There was a problem with the fetch operation: ${error}`);
    });
  }
}, [Token2]);


const reloadPage =  useCallback( () => {
    globalThis.location.reload();
}, [] )


    return (
      <div className='p-10 max-sm:p-1' >
        <button type='button' onClick={reloadPage} className='btn btn-sm btn-primary'>Reload</button>
       <form action={action} >
       <div className="flex flex-col  items-center p-10 max-sm:p-1 space-y-3 ">
            <div>
                <Image className='rounded-lg' src={`${data2?.image?.image}`} alt='...' width={250} height={100} />
            </div>
            <div>
                <h3 className='font-bold text-3xl'>{data2?.name}</h3>
            </div>

            <div className='mt-5'>
                <div className="grid grid-cols-3 max-sm:flex max-sm:flex-col max-sm:space-y-3">
                    {/* <div>
                      Quantity:
                      <span className='font-bold text-3xl max-sm:text-sm'>{data2?.quantity_available}</span>
                    </div> */}
                    {/* <div>
                    Quantity Sold:
                    <span className='font-bold text-3xl'>{data2?.quantity_sold}</span>
                    </div> */}
                    <div>
                    Selling Price:
                    <span className='font-bold text-3xl max-sm:text-md'>N{data2?.selling_price}</span>
                    </div>
                </div>
                <br />
                {/*  */}
                <div className="flex flex-row max-sm:flex-col space-x-3 items-center">
                    <div>
                        <input hidden type="text" name='product_id' defaultValue={data2?.id} />
                        
                        <SelectTag required={true} name={'wayhouse_id'} mapper={['id','name']} content={listdata} label='Store' />
                    </div>
                    <div>
                        <SelectTag required={true} name={'sizes'} mapper={['id','size']} content={data2?.variation_list} label='Sizes' />
                    </div>
                    <div><InputTag name={'quantity'} type={'number'} label='Quantity?' required={true} /></div>
                </div>
                {/*  */}
            </div>
            <div>
                <button type='submit' className='btn bg-lightorange text-white'>Assign</button>
            </div>
        </div>
       </form>


       <div>
            <table className='table'>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Sizes</td>
                        <td>Quantity</td>
                        <td>Store</td>
                        <td>...</td>
                    </tr>
                </thead>
                <tbody>
                  {itemdata?.map((item:any, index:any) => (
                    <tr key={`store_${index}`}>
                        <td>{`${index + 1}`}</td>
                        <td>{item?.sizes}</td>
                        <td>{item?.quantity}</td>
                        <td>{item?.wayhouse.name}</td>
                        <td>
                            <button type='button' onClick={removeProductFromStore} data-id={item.id} className="btn btn-sm btn-warning">Remove</button>
                        </td>
                    </tr>
                  ))}
                    
                </tbody>
            </table>
       </div>
    </div>
    )
}


const Home = () => {
  return (
    <Suspense fallback="Loading...">
        <ItemData />
    </Suspense>
  )
}

export default Home
