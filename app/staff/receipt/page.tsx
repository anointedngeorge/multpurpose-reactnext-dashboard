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
import { BsTelephone } from "react-icons/bs";



const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

const Title = (prop:{title?:string}) => {
    return (
        <div className='flex flex-row p-2 place-content-between bg-gray-900 text-white  rounded-md items-center'>
            <div>
                <h3 className="font-bold text-2xl">{`${prop.title}`}</h3>
            </div>
            <div>
                <div className=" bg-white  text-center flex items-center place-content-center">
                    <Image src={`/images/europe_logo.png`}  alt="" width={100} height={80}   />
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
                <h3 className="text-red-700 mb-3">Client information</h3>
                <p>
                    <span className="font-bold underline text-red-400">Client:</span> <span>{prop?.ssrdata?.client?.full_name}</span>
                </p>
                <p>
                    <span className="font-bold underline text-red-400">Payment Mode:</span> <span>{prop?.ssrdata?.mode_of_payment}</span>
                </p>
                <p>
                    <span className="font-bold underline text-red-400">Loan Status:</span> <span>{prop?.ssrdata?.on_loan? 'On Loan' : 'Full Payment'}</span>
                </p>
            </div>
            <div>
                {/* <h3>From</h3> */}
            </div>
            <div className="text-right">
                <h3 className="text-red-700 mb-3">Information</h3>
                <p>
                    <span className="font-bold underline">Attendant:</span> <span>{prop?.ssrdata?.attendant?.fullname}</span>
                </p>
                <p>
                    <span className="font-bold underline">Hash:</span><span><strong className="text-red-500">{prop?.ssrdata?.sales_hash}</strong></span>
                </p>
                <p>
                    <span className="font-bold underline">Date:</span><span>{prop?.ssrdata?.sale_date_tracker}</span>
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
                <thead className="bg-gray-900 text-slate-50 font-bold">
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

  const {ssrdata:settings_data} = useCustomSSR({url:`${APIBASEURl}/api/v1/control/settings/list/`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

    return (
        <main className="p-8">
           {/* {JSON.stringify(settings_data)} */}
           {settings_data? (
            <div className="mt-10 mx-auto text-xs border-2 border-black flex-col space-y-10 font-bold p-2">
                <div>
                    <Title title={`${settings_data?.app_name}`} />
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
                <div className="flex flex-row place-content-between text-lg font-bold  text-gray-950 p-3 rounded-md">
                    <div>Total Amount</div>
                    <div>{`${moneyFormat({currency:'NGN', country:'en-NG'}).format(ssrdata?.total_price) }`}</div>
                </div>
                <div className="flex flex-col place-content-start">
                    <div>
                        <h3 className="font-bold text-2xl text-red-700"><strong>Contact Information</strong></h3>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                        <div><FaWhatsapp /></div>
                        <div>{`${settings_data?.whatsapp}`}</div>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                        <div><BsTelephone /></div>
                        <div>{`${settings_data?.app_phone}`}</div>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                        <div><FaBell /></div>
                        <div>{`${settings_data?.telegram}`}</div>
                    </div>

                    <div className="flex flex-row items-center space-x-2">
                        <div><FaInstagramSquare /></div>
                        <div>{`${settings_data?.instagram}`}</div>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                        <div>Address:</div>
                        <div>{`${settings_data?.office_address}`}</div>
                    </div>
                </div>
            </div>
            ) : "Loading data ..."}
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