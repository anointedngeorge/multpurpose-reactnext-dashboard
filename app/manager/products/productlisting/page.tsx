"use client";
import LayoutAdmin from "@/components/manager/AdminLayout";
import ProductList from "@/components/manager/ProductListingComponent";

import { Suspense } from "react";




export default function Home() {
  return (
  
      <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
      </Suspense>
  
  );
}
