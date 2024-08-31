import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons';
import { BiHome } from 'react-icons/bi';
import { FaListUl } from 'react-icons/fa';
import { LiaStoreAltSolid } from 'react-icons/lia';
import { LuLogOut } from 'react-icons/lu';
import { TbPhotoFilled } from 'react-icons/tb';

interface IconInterface {
  Icon:IconType,
  showicon?:boolean,
  title?:string,
  link?:string,
  iconclassname?:string,
  textclassname?:string,
  linkclassname?:string,
  hovertitle?:string,
  iconstyle?:React.CSSProperties;
}

const Profile = () => {
  return (
      <div className="flex flex-col place-content-center items-center">
          <div>
            <div 
            className='border-2 border-lightorange w-20 h-20 rounded-full'
            style={{
              background:`url(https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp)`,
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat',
              backgroundPosition:'bottom'
            }}
            ></div>
          </div>
          <div className='text-center mt-3'>
            <h3 className='font-inter text-lightorange font-semibold'>Cameron Williamson</h3>
              <p className='text-graywhite text-xs'>Administrator</p>
          </div>
      </div>
  )
}

const SidebarLinks:React.FC<IconInterface> = (prop) => {
  return (
    <Link href={`${prop.link}`} className={`${prop.linkclassname}`} title={`${prop.hovertitle}`}>
        <div className='flex flex-row space-x-2 place-items-center'>
          {prop.showicon? <div><prop.Icon className={`${prop.iconclassname}`} style={prop.iconstyle} /></div> : ''}
          <div><span className={`${prop.textclassname}`}>{`${prop.title}`}</span></div>
        </div>
    </Link>
)
}


const Sidebar = () => {
  return (
    <div>
        <div className='flex flex-col space-y-10'>
            <div>
                <Profile />
            </div>

            <div>

              <div className="flex flex-col space-y-10">
                <div><SidebarLinks 
                      Icon={LiaStoreAltSolid} 
                      showicon={true}
                      hovertitle='Warehouse'
                      title='Warehouse'
                      iconclassname='text-lightorange size-4'
                      textclassname='text-white text-md hover:text-lightorange'
                /></div>

                {/*  */}
                <div><SidebarLinks 
                      Icon={TbPhotoFilled} 
                      showicon={true} 
                      title='Gallery'
                      hovertitle='Gallery'
                      iconclassname='text-lightorange size-4'
                      textclassname='text-white text-md hover:text-lightorange'
                /></div>
                {/*  */}

                <div><SidebarLinks 
                      Icon={FaListUl} 
                      showicon={true}
                      hovertitle='Product Listing'
                      title='Product Listing'
                      iconclassname='text-lightorange size-4'
                      textclassname='text-white text-md hover:text-lightorange'
                /></div>
              </div>

              <div className='mt-32 text-white'>
              <SidebarLinks   
                      link='/'  
                      Icon={LuLogOut}
                      showicon={true}
                      hovertitle='Logout'
                      title='Logout'
                      iconclassname='text-lightorange size-6'
                      textclassname='text-white text-md hover:text-lightorange'
                />
              </div>
            </div>

            {/*  */}
           
        </div>
    </div>
  )
}

export default Sidebar
