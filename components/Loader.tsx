import React from 'react'


const LoaderSpinner = ({size}:{size?:string}) => {
  return <span className={`loading loading-spinner ${size}`} ></span>
}


export default LoaderSpinner
