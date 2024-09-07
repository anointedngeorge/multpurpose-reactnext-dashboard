
"use client"

import Image from "next/image";
import LayoutAdmin from "@/components/admin/AdminLayout";
import Chartjs from "@/components/admin/Chartjs";
import AdminAside from "@/components/admin/AdminAside";
import { LineTitle } from "@/components/admin/LineTitle";
import { useEffect, useState } from "react";
import { ModalGalleryPopOver } from "@/components/globalComponents";
import { Token, externalurls } from "@/app/interface";
import { useCustomActionState, useCustomSSR } from "@/app/custom_hooks";
import { brandType, photoform } from "@/app/actions/auth";
import { IoMdCloudUpload } from "react-icons/io";
import { GrGallery } from "react-icons/gr";





const Photos = (prop:{data?:any}) => {
    return (
        <div className="col-span-1 w-full h-52  rounded-lg relative border-4 border-l-fuchsia-800  ">
            <Image className="image-full rounded-md" src={`${prop?.data?.image}`} fill={true} alt="" />
        </div>
    )
}


export default function Home() {
    const [modaldataset, setModalDataset] = useState<any>(null);
    const [photodata, setPhotodata] = useState<any[]>([]);
    const {state, action, status} = useCustomActionState({fn:photoform});

    const {
            ssrdata:productsrlist, 
            ssrerror:productsrerror,
            ssrstatus:productsrtatus,
            cssrmutate
        } 
            = useCustomSSR({url:`${externalurls.photolist}`, headers:{
        "Authorization":`Bearer ${Token} `
      } });
        
      useEffect(() => {
          setPhotodata(productsrlist)
        //   cssrmutate()
      }, [productsrlist])

    const galleryfunc = (event:any) => {
        const modal:any =  document.getElementById("my_modal_5");
        if (modal) {
            modal.showModal();
        }

        setModalDataset('')
        
    }

  return (
      <LayoutAdmin>
        <main className="lg:p-2">
          <LineTitle heading="Gallery" content={[
            {link:'/products', title:'products'}
          ]} />

            <div className="flex flex-row place-content-between items-center mt-5 ">
                <div><GrGallery /></div>
                <div>
                    <button title="Upload Images" onClick={galleryfunc} type="button" className="btn btn-ghost">
                    <div className="flex flex-row space-x-1 place-content-center items-center">
                        <div><IoMdCloudUpload size={30} /></div>
                        <div>Upload Image</div>
                    </div>
                    </button>
                </div>
            </div>
          
            <div className="flex flex-row mt-5 mb-6 lg:space-x-8 max-sm:flex-col">
              {/* section */}
              <div className="w-full max-sm:w-full">
                  <div className="grid grid-cols-4 gap-3 max-sm:flex max-sm:flex-col">
                    {photodata?.length > 0 ? '' : 'Fetching, please wait...'}
                        {photodata?.map((item, index) => (
                            <Photos data={item} key={`div_${index}`} />
                        ))}
                  </div>
              </div>
              {/* aside */}
             
            </div>
            <ModalGalleryPopOver formaction={action} />
        </main>
      </LayoutAdmin>
  );
}