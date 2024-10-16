"use client";
import LayoutAdmin from "@/components/staff/AdminLayout";
import ProductList from "@/components/staff/ProductListingComponent";

import { Suspense } from "react";




export default function Home() {
  return (
  
      <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
      </Suspense>
  
  );
}
