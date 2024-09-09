"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from 'react';
import LayoutAdmin from "@/components/admin/AdminLayout";
import { LineTitle } from "@/components/admin/LineTitle";
import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";
import { MdDelete, MdOpenWith } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import AdminSingleProductView from "@/components/admin/AdminSingleProductView";
import { useSearchParams } from "next/navigation";
import { externalurls } from "@/app/interface";
import { useCustomSSR } from "@/app/custom_hooks";
import LoaderSpinner from "@/components/Loader";

interface actioninterface {
  view: string;
  delete?: string;
}

interface datalistinterface {
  name: string;
  image?: string;
  content?: actioninterface;
  popMenuwindow?: (event: any) => void;
}

const Tiles = ({ data, popMenuwindow }: {
  data?: actioninterface;
  popMenuwindow?: (event: any) => void;
}) => (
  <div className="flex flex-row space-x-2">
    <div>
      <Link title="view" onClick={popMenuwindow} href={`${data?.view}`}>
        <BsFillEyeFill size={25} />
      </Link>
    </div>
    <div>
      <Link title="delete" href={`${data?.delete}`}>
        <MdDelete size={25} />
      </Link>
    </div>
  </div>
);

const Card: React.FC<datalistinterface> = (props) => (
  <div className="rounded-2xl relative border w-56 h-36 max-sm:w-full p-3 bg-lightblack text-white font-inter font-bold">
    <Image src={`${props?.image}`} className="rounded-2xl z-0 brightness-50" fill={true} alt="..." />
    <div className="relative z-10 flex flex-col space-y-8 place-content-center items-center">
      <div className="mt-3">
        <p className="text-center">{props?.name}</p>
      </div>
      <div>
        <Tiles data={props?.content} popMenuwindow={props.popMenuwindow} />
      </div>
    </div>
  </div>
);

const GridView = ({ gridData, popMenuwindow }: {
  gridData: datalistinterface[][],
  popMenuwindow?: (event: any) => void,
}) => (
  <>
    {gridData?.map((item: any[], indx) => (
      <div key={`div_${item}_${indx}`} className="flex flex-row max-sm:flex-col gap-3 mt-4">
        {item?.map((itemdata: any, index) => (
          <Card
            key={`${itemdata.title}_${index}`}
            name={itemdata.name}
            image={itemdata.image.image}
            popMenuwindow={popMenuwindow}
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

  function popMenuwindow() {
    setComponent(<AdminSingleProductView />);
  }

  return (
    <div>
      <LineTitle heading="Products" content={[{ title: 'Product', link: 'products/' }]} />
      <div className="mt-3">
        <h3 className="text-lightorange text-lg font-inter font-bold">{name}</h3>
      </div>
      <div className="flex flex-row max-sm:flex-col mt-5 lg:space-x-8">
        <div className="w-full shrink-0 max-sm:w-full">
          <div className="flex flex-col space-y-10">
            <div className="px-3">
              <Suspense fallback={<LoaderSpinner />}>
                <GridView gridData={listdata} popMenuwindow={popMenuwindow} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      {switchComponent}
    </div>
  );
};

export default ProductList;
