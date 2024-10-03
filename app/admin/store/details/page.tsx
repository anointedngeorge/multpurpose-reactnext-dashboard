
"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import { Suspense } from "react";
import { useSearchParams  } from "next/navigation";


const DetailsPage = () => {
  const query = useSearchParams();
  const wayhouse_id = query.get("id");
  const name = query.get("name");
  const branch_id = query.get("branch_id");
  const branch_name = query.get('branch_name')

  return (
      <div className="w-full flex flex-col">
          <div className="font-bold">Store Information</div>
          <div className="text-3xl font-bold">{name}({branch_name})</div>
          <div className="grid grid-cols-[2fr_1fr_1fr]">
              <div className="border-4">
                products
                {wayhouse_id}
               
              </div>
              <div className="border-4">staff</div>
              <div className="border-4">Accounts</div>
          </div>
      </div>
  )
}




export default function Home() {
 
  return (
      <LayoutAdmin>
        <Suspense>
            <DetailsPage />
        </Suspense>
      </LayoutAdmin>
  );
}