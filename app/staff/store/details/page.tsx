
"use client"
import Image from "next/image";
import LayoutAdmin from "@/components/staff/AdminLayout";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams  } from "next/navigation";
import { useCustomSSR } from "@/app/custom_hooks";
import { APIBASEURl, externalurls } from "@/app/interface";
import StoreChartjs from "@/components/staff/StoreChartjs";
import { moneyFormat } from "@/app/utils/utils";



const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

const ListProduct = ({wayhouse_id, branch_id}:{wayhouse_id?:string, branch_id?:string}) => {
  const [listdata, setListData] = useState([])
  const {ssrdata:wayhouselist} = useCustomSSR({url:`${APIBASEURl}/api/v1/products/wayhouseproductinstore/${wayhouse_id}/list/`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

    useEffect( () => {
      setListData(wayhouselist)
    }, [wayhouselist] )

    return(
      <div className="overflow-auto">
   
        <table className="table table-sm">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
              {listdata?.map( (item:{
                    id:string,
                    product:{image:{image:string}, name:string}
                  },
                    index:number
                ) => (
                  <tr key={`store_list_product_${index}`}>
                      {/* <td>{JSON.stringify(listdata)}</td> */}
                      <td> {item?.product?.image?.image? (<Image src={`${item.product?.image.image}`} width={50} height={50} alt="..." />): '...'}  </td>
                      <td>{item?.product?.name}</td>
                      <td>action  </td>
                  </tr>
              ) )}
            </tbody>
        </table>
      </div>
    )
}


const ListStaff = ({wayhouse_id, branch_id}:{wayhouse_id?:string, branch_id?:string}) => {
  const [listdata, setListData] = useState([])
  const {ssrdata:wayhouselist} = useCustomSSR({url:`${APIBASEURl}/api/v1/accounts/staff/${branch_id}`, headers:{
    "Authorization":`Bearer ${Token2} `
  }});

    useEffect( () => {
      setListData(wayhouselist)
    }, [wayhouselist] )

    return(
      <div className="overflow-auto">
   
        <table className="table table-sm">
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                </tr>
            </thead>
            <tbody>
              {listdata?.map( (item:{
                    id:string,
                    first_name:string,
                    last_name:string,
                  },
                    index:number
                ) => (
                  <tr key={`store_staff_list_${index}`}>
                      <td> {item?.first_name} </td>
                      <td> {item?.last_name} </td>
                  </tr>
              ) )}
            </tbody>
        </table>
      </div>
    )
}




const DetailsPage = () => {
  const query = useSearchParams();
  const store_id = query.get("id");
  const name = query.get("name");
  const branch_id = query.get("branch_id");
  const branch_name = query.get('branch_name')

  const {ssrdata:revenue} = useCustomSSR({url:`${APIBASEURl}/api/v1/chart/month/store/${store_id}/revenue`, headers:{} });

  return (
      <div className="w-full flex flex-col">
          <div className="font-bold">Store Information</div>
          <div className="text-3xl font-bold">{name}({branch_name})</div>
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-3">
              <div className="bg-slate-100 p-2">
                <ListProduct wayhouse_id={`${store_id}`} branch_id={`${branch_id}`} />
              </div>
              {/* <div>
                  <ListStaff branch_id={`${branch_id}`} />
              </div> */}
              <div className="flex flex-col">
                  <div className="font-black text-xs">Total Revenue Generated</div>
                  <div className="text-3xl font-bold text-red-500">
                      
                      {revenue? moneyFormat({currency:'NGN', country:'en-NG'}).format(revenue?.revenue) : moneyFormat({currency:'NGN', country:'en-NG'}).format(0.00)}
                  </div>
              </div>
          </div>

          <div className="w-full mt-3">
              <StoreChartjs title={`${name}`} store_id={`${store_id}`} />
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