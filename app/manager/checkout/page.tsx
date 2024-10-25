"use client"
import { createnewsales } from '@/app/actions/auth';
import { useCustomActionState } from '@/app/custom_hooks';
import { checkoutStorageName } from '@/app/interface';
import { InputTag, SelectTag } from '@/components/manager/FormElements'
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { HiArrowSmLeft } from "react-icons/hi";



export default function Home() {
  const [checkoutdata, setCheckOutData] = useState<any>('');
  const [totalPrice, setTotalPrice] = useState<any>('');
  const  [clientPaymentStatus, setSetClientPaymentStatus] = useState<any>('')
  const  [partpayment, setPartpayment] = useState<any>('0.00')
  const  [partpOrigialAmt, setPartpOrigialAmt] = useState<any>('')
  const [checkfornegativevalue, setCheckForNegativeValue] = useState<boolean>(false)

  const {state, action, status} = useCustomActionState({fn:createnewsales});

  const checkIfClientIsPayOnloan = useCallback( (event:any) => {
        setPartpayment('0.00')
        setSetClientPaymentStatus(event.currentTarget.value)
  }, [] )

  

  useEffect( () => {
    const name = checkoutStorageName;
    const getdata:any = globalThis.sessionStorage.getItem(name);
    const converted_data = JSON.parse(getdata);
    setCheckOutData(JSON.stringify(getdata))
    setTotalPrice(converted_data?.total_price)
  }, [] )



  const partPaymentCalculator = useCallback( (event:any) => {
    let amount = parseInt(totalPrice) - parseFloat(event.currentTarget.value)
    function isNegative(num:number) {
        return num < 0;
      }

      if (!isNegative(amount)) {
        setPartpayment(amount);
        setPartpOrigialAmt(event.currentTarget.value)
        setCheckForNegativeValue(false)
    } else {
        setCheckForNegativeValue(true)
    }
    

   
}, [totalPrice] )


  return (
    <div className='py-10 px-32 max-sm:p-10'>
        <div>
            <Link className='btn btn-ghost' title='Back To Home' href={`/admin/`}>
                <HiArrowSmLeft size={40} />
            </Link>
        </div>
        <br />
        <div></div>

        <form action={action} >
            <div className="grid grid-cols-2">
                    <div className='py-20 px-3 bg-slate-100'>
                        <div className="flex flex-col space-y-5">

                        <div>
                                <SelectTag onchange={checkIfClientIsPayOnloan} required={true} content={[
                                    {name:"Yes", val:true},
                                    {name:"No", val:false}
                                ]} mapper={['val', 'name']} name={'status'} label='Is Client On Pending' />
                                {/* include data */}
                                <input required={true} hidden type="text" name='data' defaultValue={checkoutdata} />
                            </div>

                            <div>
                                <InputTag required={true} name='client' type='tel' label='Client' 
                                placeholder='Client Phone Number' />
                            </div>

                            <div>
                                <InputTag required={true} name='fullname' type='text' label='Client Fullname' 
                                placeholder='Client fullname' />
                            </div>

                            {clientPaymentStatus == 'true'? (
                                  <>
                                    <div>
                                        <InputTag
                                                onkeyup={partPaymentCalculator}
                                                required={true}
                                                name='partpaymentamt' type='number' 
                                                label='Part Payment' 
                                                
                                            />
                                    </div>

                                    <div>
                                        <InputTag 
                                                name='duration' type='date' 
                                                label='Duration' 
                                            />
                                    </div>
                                  </>
                            ) : '' }

                            <div>
                                <SelectTag required={true} content={[
                                    {name:"POS", val:'pos'},
                                    {name:"CASH", val:'cash'},
                                    {name:"TRANSFER", val:'transfer'}
                                ]} mapper={['val', 'name']} name={'mode_of_payment'} label='Mode Of Payment' />
                            
                            </div>
                            

                        </div>
                    </div>
                    <div className='p-3 bg-slate-200'>
                        <strong className='text-3xl text-lightorange'>
                            <b>Checkout Summary</b>
                        </strong>
                        <br />
                        <br />
                        <h3 className='text-6xl'>
                            {totalPrice? (
                                <>
                                    N{totalPrice}   
                                    <input type="text" defaultValue={totalPrice} hidden name='total_price' />
                                </>
                            ) : <span className="loading loading-spinner loading-xs"></span>}
                            
                            </h3>

                            <br />
                        
                            {`${totalPrice} - ${partpOrigialAmt? partpOrigialAmt : '...'} = ${partpayment? partpayment : '...'}`}
                            {checkfornegativevalue}
                            <br />
                            <br />
                        {totalPrice? (
                             <button disabled={checkfornegativevalue} type='submit' className='btn btn-neutral btn-block'>Proceed</button>
                        ) : (
                            <span className="loading loading-spinner loading-xs"></span>
                        )}
                       
                    </div>
            </div>
            <input type="text" defaultValue={partpayment} hidden name='remaining_balance' />
        </form>
    </div>
  )
}


