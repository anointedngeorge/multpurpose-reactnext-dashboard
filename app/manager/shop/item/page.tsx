"use client";
import LayoutAdmin from "@/components/manager/AdminLayout";
import ShopItemListing from "@/components/manager/ShopItemListing";

import { Suspense } from "react";




export default function Home() {

  return (
   
      <Suspense fallback={"Loading..."}>
        <ShopItemListing />
      </Suspense>
 
  );
}
