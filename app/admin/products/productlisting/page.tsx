"use client";
import LayoutAdmin from "@/components/admin/AdminLayout";
import ProductList from "@/components/admin/ProductListingComponent";

import { Suspense } from "react";




export default function Home() {
  return (
  
      <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
      </Suspense>
  
  );
}
