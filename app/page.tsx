"use client"
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { RiLockPasswordFill } from "react-icons/ri";
import Login1 from "@/components/logins/Login1";
import { useState } from "react";
import Link from "next/link";
import { FaUser, FaUserFriends } from "react-icons/fa";

export default function Home() {

  // 
  return (
    <main>
        <div className="min-h-screen flex flex-row place-content-evenly place-items-center">
            <div className="bg-red-500 drop-shadow-md px-10 py-8 text-white font-bold rounded-full ">
              <Link  href={'/admin/login'}>
                <div className="flex flex-row space-x-2 items-center">
                  <div><FaUser size={50} /></div>
                  <div>Admin Login Page</div>
                </div>
              </Link>
            </div>
           
            <div className="bg-slate-500 px-10 py-8 text-white font-bold rounded-full drop-shadow-md">
              <Link  href={'/staff/login'}>
                <div className="flex flex-row space-x-2 items-center">
                  <div><FaUserFriends size={50} /></div>
                  <div>Staff Login Page</div>
                </div>
              </Link>
            </div>
        
        </div>
    </main>
  );
}
