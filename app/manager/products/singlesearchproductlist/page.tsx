"use client"
import LayoutAdmin from "@/components/manager/AdminLayout";
import {  Suspense} from "react";
import { useSearchParams } from "next/navigation";
import AdminSingleSearchProductView from "@/components/manager/AdminSingleSearchProductView";




export default function Home() {
  const router = useSearchParams();
  const id = router.get('id');
  const name = router.get('name');
  const image = router.get('image');

    return (
        <LayoutAdmin >
          {/* <Link href={`/manager/products/branddetails?id=${id}&name=${name}`}>Back</Link> */}
          <Suspense>
              <AdminSingleSearchProductView image={image} id={id} name={name} />  
          </Suspense>
        </LayoutAdmin>
    )
}
