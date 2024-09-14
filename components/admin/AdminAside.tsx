"use client"
import { List } from 'postcss/lib/list'
import React, { useEffect, useRef, useState } from 'react'
import Link  from 'next/link'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import CalendarView from './CalendarView'
import { v4 as uuidv4 } from 'uuid';


interface  ulistInterface {
    title:string,
    link?:any
}

interface ulistinterfacedata {
    data:ulistInterface[],
    title?:string
}


const Ulist:React.FC<ulistinterfacedata>=(props) => {
    const [datalist, SetDatalist] = useState<ulistInterface[]>(props.data)
    return (
        
        <div className='p-5 bg-[#EEEEEE]'>
            <p className='font-inter text-lg font-bold text-lightorange'>{props.title}</p>
            <ul className='text-left text-sm' style={{listStyle:'inside'}}>
                {datalist.map((item, index) => (
                    <li key={`${item.title}_${index}`}>
                        <Link href={`${item.link}`} >{`${item.title}`}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


const AdminAside = () => {
  return (
    <div className='flex flex-col space-y-3 mt-5'>
        <Ulist data={[
                {title: '...'},
            ]} title='Recent Activities' />
            {/*  */}
        <Ulist data={[
                {title: '...'},
                
            ]}  title='Active users' />
        <div className='w-full'>
            {/* calendar */}
            <CalendarView />
        </div>
    </div>
  )
}

export default AdminAside
