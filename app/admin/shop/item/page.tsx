"use client"

import React from 'react'
import {useSearchParams} from "next/navigation"



const Card = () => {
    return (
        <div className='col-span-1 w-full h-72 border-4 border-black rounded-xl'></div>
    )
}



const Home = () => {
    const query = useSearchParams();
    const id = query?.get('id');
    const brand_id = query?.get('brand_id');
    const item_name = query?.get('item_name');
    const brand_name = query?.get('brand_name');

  return (
    <main className='w-full p-3'>
        <div><h3 className='text-2xl font-inter font-bold text-black'>{brand_name} ({item_name})</h3></div>
        
        <div className="grid grid-cols-3 gap-2 mt-10">
            {[4,5,6,4,5,45,45,45,45,45,45,45,45,45,45,45,].map((item, index) => (
                <Card key={`${item}_${index}`} />
            ))}
        </div>

    </main>
  )
}

export default Home
