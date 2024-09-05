import Link from 'next/link'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IconType } from 'react-icons'
import { FaBell, FaCartArrowDown, FaRegBell } from 'react-icons/fa'
import { LuShoppingCart } from 'react-icons/lu'
import Image from 'next/image'
import { useCustomSSR } from '@/app/custom_hooks'
import { externalurls } from '@/app/interface'

interface NotificationInterface {
    Icon:IconType,
    val?:string
}

const Notification:React.FC<NotificationInterface> = (props) => {
    return (
      <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <props.Icon size={25} />
        <span className="badge badge-md bg-lightorange text-white indicator-item">{`${props.val}`}</span>
      </div>
    </button>
    )
}


const Searchbar = () => {
  return (
      <form action="">
        <div className="flex w-96 h-10 max-sm:w-auto bg-white border-2 rounded-full place-content-center items-center space-x-3">
          <div className='w-72' >
              <input 
                  type="text"
                  placeholder='Search...'
                  className='focus:outline-none focus:border-none p-2 border-0 border-lightblack w-full h-full focus-within:border-0'
                 />
          </div>
          <div className='text-center'><button type='submit'><CiSearch size={25}/></button></div>
      </div>
      </form>
  )
}


const Profile = () => {
    
  const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.profile}`, headers:{
    "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJzdWIiOnRydWUsImV4cCI6MTcyNTg0MDM3OX0.Tr0nWZMaxDmxB5GxLxvI1AeIaZyWMnUxhzehHfZtzFA `
  }});


    return (
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full relative">
          <Image
            alt="Tailwind CSS Navbar component"
            fill={true}
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
           />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><strong className='text-center'>{`${ssrdata?.username}` || "Cameron Williamson"}</strong></li>
        <li></li>
        <li>
          <Link href={`#`} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link href={`#`}>Settings</Link></li>
        <li><Link href={`#`}>Logout</Link></li>
      </ul>
    </div>
    )
}

const AdminTop = () => {
  return (
    <div className='grid grid-flow-col max-sm:grid-flow-row lg:space-x-48 w-full py-3 px-8 max-sm:p-1 place-content-between'>
        <div><Searchbar /> </div>
      
        <div>
          <div className="flex flex-row space-x-10 ">
              <div><Notification Icon={LuShoppingCart} val='0' /></div>
              <div><Notification Icon={FaRegBell} val='0' /></div>
              <div><Profile /> </div>
          </div>
        </div>
    </div>
  )
}

export default AdminTop
