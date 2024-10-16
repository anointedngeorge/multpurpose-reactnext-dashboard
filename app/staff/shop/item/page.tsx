"use client";
import LayoutAdmin from "@/components/staff/AdminLayout";
import ShopItemListing from "@/components/staff/ShopItemListing";

import { Suspense } from "react";




export default function Home() {

  return (
   
      <Suspense fallback={"Loading..."}>
        <ShopItemListing />
      </Suspense>
 
  );
}
