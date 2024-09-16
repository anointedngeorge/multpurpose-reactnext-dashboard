import React from 'react'
import { GoHomeFill } from 'react-icons/go';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { LuHistory } from 'react-icons/lu';
import { FcSalesPerformance } from 'react-icons/fc';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { PiCurrencyNgnFill } from 'react-icons/pi';
import { RiAlignItemBottomFill } from 'react-icons/ri';
import { FaWarehouse } from "react-icons/fa6";


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

const Icondata:React.FC<IconInterface> = (prop) => {
    return (
          <Link  href={`${prop.link}`} className={`hover:text-lightorange ${prop.linkclassname}`} title={`${prop.hovertitle}`}>
              <div className='flex flex-col items-center'>
                {prop.showicon? <div><prop.Icon className={`${prop.iconclassname}`} style={prop.iconstyle} /></div> : ''}
                <div><span className={`${prop.textclassname}`}>{`${prop.title}`}</span></div>
              </div>
          </Link>
    )
}

const AdminFooter = () => {
  return (
    <div className='w-full max-w-full' >
        <footer className='flex flex-row z-50 lg:place-content-center items-center space-x-20 max-sm:space-x-10 rounded-tr-lg rounded-tl-lg text-white lg:fixed lg:bottom-0 p-5 lg:h-20 bg-lightblack w-full max-sm:overflow-auto'>
            <div>
                <Icondata 
                  Icon={GoHomeFill} 
                  iconclassname='size-8' 
                  title='Home'
                  link='/admin'
                  hovertitle='Home'
                  showicon={true}
                />
            </div>
            <div><Icondata 
                  Icon={RiAlignItemBottomFill}
                  link='/admin/products'
                  iconclassname='size-8' 
                  title='Products'
                  hovertitle='Products'
                  showicon={true}
                />
            </div>
            <div>
              <Icondata 
                Icon={LuHistory} 
                iconclassname='size-8' 
                title='History'
                hovertitle='History'
                showicon={true}
              />
            </div>
            <div>
              <Icondata 
                Icon={FaWarehouse} 
                iconclassname='size-8' 
                title='Warehouse'
                hovertitle='Warehouse'
                showicon={true}
                link='/admin/warehouse'
              />
            </div>
            <div>
              <Icondata 
                  Icon={FcSalesPerformance} 
                  iconclassname='size-8' 
                  title='Reports'
                  hovertitle='Reports'
                  link='/admin/reports/'
                  showicon={true}
                />
                </div>
            <div>
              <Icondata 
                  Icon={HiMiniUserGroup} 
                  iconclassname='size-8' 
                  title='Accounts'
                  hovertitle='Accounts'
                  showicon={true}
                  link='/admin/accounts/staff'
                  />
                </div>
        </footer>
    </div>
  )
}

export default AdminFooter
