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
import { ChangeEvent, Key, Suspense, useEffect, useState } from "react";
import { windowOpenPromise } from "window-open-promise";
import AdminSingleProductView from "@/components/admin/AdminSingleProductView";
import { useSearchParams } from "next/navigation";




export default function Home() {
  const router = useSearchParams();
  const id = router.get('id');
  const name = router.get('name');
  const image = router.get('image');

    return (
        <div className="p-3">
          {/* <Link href={`/admin/products/branddetails?id=${id}&name=${name}`}>Back</Link> */}
          <Suspense>
              <AdminSingleProductView image={image} id={id} name={name} />  
          </Suspense>
        </div>
    )
}
