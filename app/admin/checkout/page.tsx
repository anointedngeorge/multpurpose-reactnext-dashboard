"use client"
import { createnewsales } from '@/app/actions/auth';
import { useCustomActionState } from '@/app/custom_hooks';
import { checkoutStorageName } from '@/app/interface';
import { InputTag, SelectTag } from '@/components/admin/FormElements'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [checkoutdata, setCheckOutData] = useState<any>('');
  const [totalPrice, setTotalPrice] = useState<any>('');

  const {state, action, status} = useCustomActionState({fn:createnewsales});

  useEffect( () => {
    const name = checkoutStorageName;
    const getdata:any = globalThis.sessionStorage.getItem(name);
    const converted_data = JSON.parse(getdata);
    setCheckOutData(JSON.stringify(getdata))
    setTotalPrice(converted_data?.total_price)
  }, [] )

  return (
    <div className='p-32 max-sm:p-10'>
        <div>{"<<<"}</div>
        <br />
        <div></div>

        <form action={action} >
            <div className="grid grid-cols-2 gap-3">
                    <div className='border-4 p-3'>
                        <div className="flex flex-col space-y-5">
                            <div>
                                <InputTag required={true} name='client' type='text' label='Client' 
                                placeholder='Client Emall Address' />
                                {/* <span>...</span> */}
                            </div>
                            <div>
                                <SelectTag required={true} content={[
                                    {name:"POS", val:'pos'},
                                    {name:"CASH", val:'cash'},
                                    {name:"TRANSFER", val:'transfer'}
                                ]} mapper={['val', 'name']} name={'mode_of_payment'} label='Mode Of Payment' />
                            
                            </div>
                            <div>
                                <SelectTag required={true} content={[
                                    {name:"Yes", val:true},
                                    {name:"No", val:false}
                                ]} mapper={['val', 'name']} name={'status'} label='Status' />
                                {/* include data */}
                                <input required={true} hidden type="text" name='data' defaultValue={checkoutdata} />
                            </div>

                        </div>
                    </div>
                    <div className='p-3 border-4'>
                        <strong>
                            <b>Checkout Summary</b>
                        </strong>
                        <br />
                        <h3 className='text-6xl'>N{totalPrice}</h3>
                        <br />
                        <button type='submit' className='btn btn-info btn-block'>Proceed</button>
                    </div>
            </div>
        </form>
    </div>
  )
}


