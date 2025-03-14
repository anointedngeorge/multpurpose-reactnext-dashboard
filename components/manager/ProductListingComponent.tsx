"use client";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from 'react';
import LayoutAdmin from "@/components/admin/AdminLayout";
import { LineTitle } from "@/components/admin/LineTitle";
import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";
import { MdDelete, MdOpenWith } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import AdminSingleProductView from "@/components/admin/AdminSingleProductView";
import { useSearchParams } from "next/navigation";
import { APIBASEURl, externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";
import LoaderSpinner from "@/components/Loader";

interface actioninterface {
  view: string;
  delete?: string;
}

interface datalistinterface {
  id?:any,
  name: string;
  image?: string;
  content?: actioninterface;
  popMenuwindow?: React.MouseEventHandler<HTMLAnchorElement>;
  onclickRemove?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Tiles = (prop: {
  data?: actioninterface; id?:any, name?:any,
  image?:any, 
  popMenuwindow?:  React.MouseEventHandler<HTMLAnchorElement>;
  onclickRemove?:  React.MouseEventHandler<HTMLAnchorElement>;
}) => (

  <div className="flex flex-row space-x-2 items-center">
    <div>
      <Link title="view"  href={`${`/admin/products/singleproductlist/?id=${prop.id}&name=${prop.name}&image=${prop.image}`}`}>
          <BsFillEyeFill size={25} />
      </Link>
    </div>
    <div>
      <Link title="delete" onClick={prop.onclickRemove} href={``} id={`${prop.id}`}  >
        <MdDelete size={25} />
      </Link>
    </div>
  </div>
);

const Card: React.FC<datalistinterface> = (props) => (
  <div className="rounded-2xl relative border w-56 min-h-44 max-sm:w-full p-3 bg-lightblack text-white font-inter font-bold">
    <Image src={`${props?.image? props?.image : ""}`} className="rounded-2xl z-0 brightness-50" fill={true} alt="..." />
    <div className="relative z-10 flex flex-col space-y-8 place-content-center items-center">
      <div className="mt-3">
        <p className="text-center">{props?.name}</p>
      </div>
      <div>
        <Tiles 
              image={props?.image} id={props.id} 
              name={props.name} 
              data={props?.content} 
              popMenuwindow={props.popMenuwindow}
              onclickRemove={props.onclickRemove}
        />
      </div>
    </div>
  </div>
);

const GridView = ({ gridData, popMenuwindow, onclickRemoval }: {
  gridData: datalistinterface[][],
  id?:any,
  name?:any,
  popMenuwindow?: (event: any) => void,
  onclickRemoval?: React.MouseEventHandler<HTMLAnchorElement>,
  
}) => (
  <>
    {gridData?.map((item: any[], indx) => (
      <div key={`div_${item}_${indx}`} className="flex flex-row max-sm:flex-col gap-3 mt-4">
        {item?.map((itemdata: any, index) => (
          <Card
            key={`${itemdata.title}_${index}`}
            name={itemdata.name}
            id={itemdata.id}
            image={itemdata?.image?.image}
            popMenuwindow={popMenuwindow}
            onclickRemove={onclickRemoval}
            content={itemdata?.content}
          />
        ))}
      </div>
    ))}
  </>
);

const ProductList = () => {
  const [listdata, setlistdata] = useState<datalistinterface[][]>([]);
  const [switchview, setSwitchView] = useState<string>('grid');
  const Token2 = globalThis?.sessionStorage?.getItem("apptoken");

  const router = useSearchParams();
  const id = router.get('id');
  const name = router.get('name');

  const { ssrdata: productsrlist } = useCustomSSR({
    url: `${externalurls.productlisting}/${id}/`,
    headers: { "Authorization": `Bearer ${Token2}` }
  });

  useEffect(() => {
    if (productsrlist) {
      setlistdata(productsrlist);
    }
  }, [productsrlist]);

  const [switchComponent, setComponent] = useState<JSX.Element | null>(null);


  const removeProductType = useCallback( (event:React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (confirm("Are you sure?")) {
          const ft = async () => {
            const id = event?.currentTarget?.id
            const f =  await fetch(`${APIBASEURl}/api/v1/products/productlisting/${id}/item/delete/`, {
                  method:'delete',
                  headers: {
                      "Content-Type":"application/json",
                      'Authorization':`Bearer ${Token2}`
                  }
              });
              if (f.ok) {
                  globalThis.location.reload();
              } else {
                alert(f.statusText)
              }
        }
        ft();
        }
  }, [Token2] );


  function popMenuwindow() {
    setComponent(<AdminSingleProductView />);
  }

  return (
    <div className="p-3">
      {/* <LineTitle heading="Products" content={[{ title: 'Product', link: 'products/' }]} /> */}
      <div className="mt-3">
        <h3 className="text-lightorange text-lg font-inter font-bold">Products of ({name})</h3>
      </div>
      <div className="flex flex-row max-sm:flex-col mt-5 lg:space-x-8">
        <div className="w-full shrink-0 max-sm:w-full">
          <div className="flex flex-col space-y-10">
            <div className="px-3">
                <GridView 
                    gridData={listdata} 
                    popMenuwindow={popMenuwindow}
                    onclickRemoval={removeProductType}
                />
            </div>
          </div>
        </div>
      </div>
      {switchComponent}
    </div>
  );
};

export default ProductList;
