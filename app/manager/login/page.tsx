"use client"

import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { RiLockPasswordFill } from "react-icons/ri";

import  {ManagerSignup}  from "@/app/actions/auth";
// import { useActionState, useState } from "react";
import { useCustomActionState } from "@/app/custom_hooks";
import { escapeSingleQuotes } from "@/app/interface";


interface dataprops {
    name:string,
    label?:string,
    placeholder?:string,
    type:string,
    required?:boolean,
    Icon?:IconType
}

interface LoginFuncInterface {
    submitFunction: (event:any) => void
}


const FormInput:React.FC<dataprops>  = (props) => {
  const Icon:any = props.Icon
  return (
      <div className="w-auto p-3 rounded-badge bg-white">
        
          <div className="flex flex-grow w-80 place-content-between items-center px-3">
              <div className="w-72">
                  <label 
                      htmlFor={`#id_${props.name}`}
                      className="text-black font-semibold"
                   >{`${props.label}`}</label>
                  <input 
                        type={`${props.type}`}
                        name={`${props.name}`}
                        id={`id_${props.name}`}
                        placeholder={`${props.placeholder}`} 
                        className="w-full h-full focus:outline-none border-none focus:border-none text-sm text-black font-bold font-inter"
                        required={props.required}
                   />
            </div>
            <div>
                {Icon? <Icon size={25} /> : ''}
            </div>
          </div>
      </div>
  )
}


export default  function Home ()  {
    const {state, action, status, EnumMessage} = useCustomActionState({fn:ManagerSignup})

  return (
    <main className="p-32 flex place-content-center">
        <div className="w-1/2 max-sm:w-auto drop-shadow-lg lg:bg-gray-100 rounded-lg p-8">
            <div className="flex flex-col place-content-center items-center space-y-10">
                <div className="text-center">
                    <h3 className="text-3xl font-inter font-bold text-red-600">Europe Shop </h3>
                    <p><strong><b>{escapeSingleQuotes("Manager's Dashboard")}</b></strong></p>
                </div>
                <div >
                    <form action={action} >
                        <div className="flex flex-col space-y-5">
                            <div>
                                <FormInput 
                                    name={"username"} 
                                    type={"text"} 
                                    placeholder="username"
                                    label="Username"
                                    required={true}
                                    Icon={MdEmail}
                                />
                                {state?.errors?.username && <p>{state.errors.username}</p>}
                            </div>
                            <div>
                                <FormInput 
                                    name={"password"} 
                                    type={"password"} 
                                    placeholder="**********"
                                    label="Password"
                                    required={true}
                                    Icon={RiLockPasswordFill}
                                />
                                {state?.errors?.password}
                                {state?.errors?.password && (
                                    <div>
                                    <p>Password must:</p>
                                    
                                    <ul>
                                        {state.errors.password.map((error:any) => (
                                        <li key={error}>- {error}</li>
                                        ))}
                                    </ul>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                            <button 
                                className="btn border-none bg-red-600 text-white px-14 text-lg font-inter" 
                                type="submit"
                                // disabled={status === EnumMessage.LOADING}
                            >
                                {status === EnumMessage.LOADING && "Loading..."}
                                {status === EnumMessage.SUCCESS && "Success!"}
                                {status === EnumMessage.ERROR && "Error"}
                                {!status && "Sign In"}
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
  );
}




