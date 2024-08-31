import Image from 'next/image'
import React from 'react'
import { InputTag, SelectTag } from './FormElements'
import Link from 'next/link'


const Navlinks = () => {
    return (
        <div className="flex flex-row space-x-3">
            {[3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,2].map((item, index) => (
                <div key={`${item}_${index}`}><Link className='cursor-pointer hover:underline hover:text-lightorange' href={''} >Home</Link></div>
            ))}
        </div>
    )
}

const VariationListing = () => {
    return (
        <div>
           <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                        Column 1
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                        Column 2
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                        Column 3
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                        Row 1, Cell 1
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                        Row 1, Cell 2
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                        Row 1, Cell 3
                    </td>
                    </tr>
                    <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                        Row 2, Cell 1
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                        Row 2, Cell 2
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                        Row 2, Cell 3
                    </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

const AdminSingleProductView = () => {
  return (
    <div className='flex flex-col mt-3 lg:space-y-8 max-sm:flex-col'>
        <div className='flex flex-row place-content-center'>
            <div className='w-96 shrink-0 overflow-auto border-3'>
                <Navlinks />
            </div>
        </div>
        {/*  */}
        <div className='flex flex-row max-sm:flex-col'>
            <div className='w-7/12 mt-10  max-sm:h-72 max-sm:w-full shrink-0 lg:border-r-4 lg:border-lightblack p-1'>
                <div className="w-full h-full rounded-lg relative ">
                    <Image className='image-full rounded-3xl' src={`/./images/e6.jpg`} alt="..." fill={true} />
                </div>
            </div>
            <div className='w-1/2 p-3 max-sm:w-full'>
                <div className='mb-6'>
                    <strong><b>Add Variation</b></strong>
                </div>

                <div>
                    <form>
                        <div className="flex flex-col space-y-3">
                            <div><InputTag label='Name'  name={'name'} type={'text'} placeholder='Enter Name' /></div>
                            <div><InputTag label='Size'  name={'size'} type={'number'} /></div>
                            <div><InputTag label='Quantity'  name={'quantity'} type={'number'} /></div>
                            <div><InputTag 
                                    label='Product Listing' 
                                    name={'product_listing_id'} 
                                    type={'text'}
                                    />
                            </div>
                            <div>
                                <button className='px-10 rounded-3xl py-3 bg-lightorange' type="submit">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        <div>
            <VariationListing />
        </div>
    </div>
        
  )
}

export default AdminSingleProductView
