"use client"
import React from 'react'
import { customTableInterface } from '@/app/interface'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import Link from 'next/link';
// import { nullable } from 'zod';


interface theadInterface {
    head?:any[] | undefined,
    body?:any[],
    mapper? :any[],
    actions?:{name:string, link:string, onclick?:(event:any) => void, id?:string}[],
    placeholder_values?:any,
    onclick?: () => any
}


const Thead:React.FC<theadInterface> = (prop) => {
    return (
        <thead className='bg-secondary-content'>
            <tr>
                <th>#</th>
                <th>...</th>
                {prop?.head?.map((data:any, i:number) => (
                    <th key={`t${data}${i}`}>
                        {`${data}`.toUpperCase()}
                    </th>
                ))}
                
            </tr>
        </thead>
    )
}

const Td= (prop:{data:any, mapper?:any[]}) => {
    return (
        <>
            {prop.mapper?.map((item, i) => (
                <td key={`nn${i}`}>
                    {`${eval(`prop.data.${item}`)}`}
                </td>
            ))}
        </>
    )
}

const Tbody:React.FC<theadInterface> = (prop) => {
    
    const url = (url?:string, data?:any) => {
        let formattedurl:string | undefined= "";
            Object.keys(prop.placeholder_values).map((item) => {
                formattedurl = url?.replaceAll(item, eval(`${prop.placeholder_values[item]? prop.placeholder_values[item]: ''}`))
        })
        return  formattedurl;
    }

    return (
        <tbody>
            {prop?.body?.map((data, i:number) => (
                <tr key={`trk${i}`}>
                    <td>{i + 1}</td>
                    <td  key={`trkd${i}`}>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="m-1">
                                <CiMenuKebab />
                            </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    {prop?.actions?.map((dx, indx:number) => (
                                        <li key={`span_id_${indx}`} >
                                            <Link 
                                                onClick={dx.onclick}
                                                id={`${url(dx.id, data)}`}
                                                href={`${url(dx.link, data)}`}
                                            >
                                                {dx.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    </td>
                    <Td key={`tf${i}`} data={data} mapper={prop.mapper} />
                   
                </tr>
            ))}
        </tbody>
    )
}


const CustomTable:React.FC<customTableInterface> = (props) => {
  return (
        <div className='flex flex-col space-y-10 '   >
            <div className='flex flex-row place-content-end'>
                    <div>
                        <input
                            hidden={props.is_searchable}
                            type="text" className='p-2 input-sm rounded-lg border-2 text-black placeholder:text-black' 
                            placeholder='Search...' 
                        />
                    </div>
            </div>

            <div className="overflow-x-auto h-screen">
                {props.title? (
                    <h3>{props.title || '...'}</h3>
                ) : ''}
                <table className="table table-zebra " >
                    <Thead head={props?.thead} />
                    <Tbody 
                        body={props?.tbody} 
                        mapper={props?.mapper} 
                        placeholder_values={props.placeholder_values} 
                        actions={props?.actions}
                    />
                </table>
            </div>
            
            {/*  */}
            <div className='flex flex-row place-content-end'>
                <div className="join">
                    <button className="join-item btn">1</button>
                    <button className="join-item btn btn-active">2</button>
                    <button className="join-item btn">3</button>
                    <button className="join-item btn">4</button>
                </div>
            </div>
            {/*  */}
        </div>
  )
}

export default CustomTable
