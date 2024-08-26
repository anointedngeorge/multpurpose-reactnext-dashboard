"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";
import { MdDelete, MdOpenWith, MdOutlineAddCircle } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";
import { ChangeEvent, Key, LinkHTMLAttributes, useEffect, useState } from "react";
import { AppLinks } from "next/dist/lib/metadata/types/extra-types";
import { InputTag, SelectTag, SingleModelForm } from "@/components/admin/FormElements";




export default function Home() {
  

  return (
     <main className="p-48">
        <div className="flex flex-col space-y-10">
          <div><h3 className="font-inter font-bold text-lg">Add New Item</h3></div>
          <div>
              <form action="">
              <div className="flex flex-col space-y-3">
                  <div>
                      <strong>Name</strong>
                      <InputTag name={"name"} type={"text"} placeholder="Name" />
                    </div>
                    <div>
                      <strong>Brand</strong>
                      <SelectTag name={"brandtype"} content={[]} />
                    </div>
                    <div>
                        <div className="flex flext-row space-x-3">
                            <div><button type="submit" className="btn px-10 bg-lightorange font-inter text-lg rounded-xl">Add</button></div>
                            <div><Link href={"/"} className="btn bg-neutral text-white px-10 text-lg"> View Listing </Link></div>
                        </div>
                    </div>
                </div>
              </form>
          </div>
          
        </div>
     </main>
  );
}
