"use client"
import { useCustomSSR } from "@/app/custom_hooks copy"
import { APIBASEURl, externalurls } from "@/app/interface"
import { moneyFormat } from "@/app/utils/utils"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";




const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

const Title = () => {
    return (
        <div className='flex flex-row p-2 place-content-between bg-gray-900 text-white  rounded-md items-center'>
            <div>
                <h3 className="font-bold text-2xl">Europe Store Receipt</h3>
            </div>
            <div>
                <div className=" bg-white  text-center flex items-center place-content-center">
                    <Image src={`/images/europe_logo.png`} className="rounded-2xl" alt="" width={200} height={100}   />
                </div>
            </div>
        </div>
    )
}

interface PropertieInterface {
    client:{full_name:string},
    attendant:{fullname:string},
    mode_of_payment:string,
    on_loan:boolean,
    sale_date_tracker:string,
    sales_hash:string

}


const Describe = (prop:{ssrdata?:PropertieInterface}) => {
    return (
        <div className="grid grid-cols-3">
            <div>
                <h3>Client information</h3>
                <p>
                    <span className="font-bold underline">Client:</span><span>{prop?.ssrdata?.client?.full_name}</span>
                </p>
                <p>
                    <span className="font-bold underline">Payment Mode: </span><span>{prop?.ssrdata?.mode_of_payment}</span>
                </p>
                <p>
                    <span className="font-bold underline">Loan Status:</span><span>{prop?.ssrdata?.on_loan? 'On Loan' : 'Full Payment'}</span>
                </p>
            </div>
            <div>
                {/* <h3>From</h3> */}
            </div>
            <div className="text-right">
                <h3>Information</h3>
                <p>
                    <span className="font-bold underline">Attendant:</span> <span>{prop?.ssrdata?.attendant?.fullname}</span>
                </p>
                <p>
                    <span className="font-bold underline">Hash:</span><span><strong className="text-red-500">{prop?.ssrdata?.sales_hash}</strong></span>
                </p>
                <p>
                    <span className="font-bold underline">Date:</span><span>{prop?.ssrdata?.sale_date_tracker}</span>
                </p>
                <p><span>Contact Information</span></p>
                <p>
                    <span className="font-bold underline"><FaWhatsapp />:</span><span>{'+23407065075128'}</span>
                </p>
                <p >
                    <span className="font-bold underline"><FaBell  />:</span>
                </p>
                {/* <p>
                    <span className="font-bold underline"><FaInstagramSquare />:</span><span>{''}</span>
                </p> */}
                <p>
                    <span className="font-bold underline">Address:</span><span>{'FFog/25 Diamond Plaza, Abibu'} <br />  Oki Street,  Lagos Island, Nigeria.</span>
                </p>
            </div>
        </div>
    )
}


const Describe2 = () => {
    return (
        <div className="grid grid-cols-3">
            <div>
                <h3>From</h3>
                <h3>Email Payment</h3>

            </div>
            <div>
                <h3>From</h3>
            </div>
        </div>
    )
}


const Table = (prop:{id?:string, data?:[]}) => {
    
    return (
        <>
            <table border={1} className="table border border-collapse table-xs   border-black text-xs">
                <thead className="bg-gray-900 text-red-400 font-bold">
                    <tr>
                        <td>Qty</td>
                        <td>Description</td>
                        <td>Unit Price</td>
                        <td>Amount</td>
                    </tr>
                </thead>

                <tbody>
                    {prop?.data?.map((item:{
                            name:string, product:{name:string},
                            quantity:number,
                            selling_price:number,
                            total_price:number
                        }, index:number) => (
                        <tr className="border border-black" key={`reciept_table_${index}_${index+1}`}>
                        <td className="border border-black" >{`${index + 1}`}</td>
                        <td className="border border-black" >
                            <p>{item?.product?.name}</p>
                        </td>
                        <td className="border border-black" >
                            {`${item?.quantity} * ${moneyFormat({currency:'NGN', country:'en-NG'}).format(item?.selling_price) }`}
                        </td>
                        <td className="border border-black" >
                            {`${moneyFormat({currency:'NGN', country:'en-NG'}).format(item?.total_price) }`}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            {/* {JSON.stringify(ssrdata)} */}
        </>
    )
}


const Receipt = () => {

    const query = useSearchParams();
    const id = query.get("id")
    
    const {
        ssrdata
    } 
        = useCustomSSR({url:`${APIBASEURl}/api/v1/reports/salesreport/${id}`, headers:{
    "Authorization":`Bearer ${Token2} `
  } });

    return (
        <main className="p-8">
           
            <div className="mt-10 mx-auto text-xs border-2 border-black flex-col space-y-10 font-bold p-2">
                <div>
                    <Title />
                </div>
                <div  >
                    <Describe ssrdata={ssrdata} />
                </div>
                {/* <div>
                    <Describe2 />
                </div> */}
                <div>
                    <Table id={`${id}`} data={ssrdata?.list_items} />
                </div>
                <div className="flex flex-row place-content-between text-lg font-bold border bg-gray-900 text-white p-3 rounded-md">
                    <div>Total Amount</div>
                    <div>{`${moneyFormat({currency:'NGN', country:'en-NG'}).format(ssrdata?.total_price) }`}</div>
                </div>
            </div>
        </main>
    )
}



export default function Home() { 
    return (
        <Suspense>
            <Receipt />
        </Suspense>
    )
}