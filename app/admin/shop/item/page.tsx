"use client";
import LayoutAdmin from "@/components/admin/AdminLayout";
import ShopItemListing from "@/components/admin/ShopItemListing";

import { Suspense } from "react";




export default function Home() {

  return (
   
      <Suspense fallback={"Loading..."}>
        <ShopItemListing />
      </Suspense>
 
  );
}
