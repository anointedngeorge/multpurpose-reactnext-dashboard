"use client";
import LayoutAdmin from "@/components/admin/AdminLayout";
import ShopItemListing from "@/components/admin/ShopItemListing";

import { Suspense } from "react";




export default function Home() {

  return (
    <LayoutAdmin>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopItemListing />
      </Suspense>
    </LayoutAdmin>
  );
}
