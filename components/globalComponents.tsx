import Image from "next/image"
import { InputTag } from "./admin/FormElements"
import { ChangeEvent, useEffect, useState } from "react"
import { FormState } from "@/app/lib/definitions"



export const ModalPopOver = ({data, action}:{data?:any, action?:any}) => {
    return (
        <dialog id="my_modal_5" className="modal modal-top sm:modal-middle">
                <div className="modal-box">
                        <div className='col-span-1'>
                        <div className="card bg-base-100  w-full border-4 p-2">
                            <figure className='w-full relative h-72'>
                                <Image
                                src={data?.data?.image.image? `${data?.data?.image.image}`: ''}
                                alt="Shoes" fill={true}  />
                            </figure>
                            <div className="card-body">
                                <div>
                                        <h2 className="card-title text-sm">
                                        {data?.data.name}
                                        
                                        <div className="badge badge-secondary">NEW</div>
                                        </h2>
                                        <p>{data?.data.description}</p>
                                        <form action={action} >
                                            <input type="text" readOnly hidden value={JSON.stringify(data?.data)} name="data" />
                                            <input type="text" readOnly hidden value={`${data?.data?.id}`} name="id" />
                                            <div className="flex flex-col">
                                                <div><InputTag max={data?.data?.selling_price} value={data?.data?.selling_price} label="Price" name='selling_price' type='number' /></div>
                                                <div className="flex flex-row space-x-2">
                                                    <div><InputTag placeholder="0" label="Size" name='size' type='number' /></div>
                                                    <div><InputTag placeholder="0"  label={`Quantity Available (${data?.data?.quantity_available})`} name='quantity' type='number'  /></div>
                                                </div>
                                            </div>
                                            <br />
                                        {(data?.data?.quantity_available <= data?.data?.quantity_sold)}
                                            <button type='submit' className='btn btn-sm  btn-secondary btn-block'>Add To Cart</button>
                                        </form>
                                    </div>
                                    </div>
                                    <p className='bg-neutral-500 text-center text-white rounded-full'>
                                        {data?.data.product?.name}
                                    </p>
                        </div>

                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                    </div>
                </div>
            </dialog>
    )
}


export const ModalGalleryPopOver = (prop:{data?:any, formaction?:any}) => {
    const [preview, setPreview] = useState<string>('');

    const imageChanger = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target?.result as string); // Update preview with the file data
          };
          reader.readAsDataURL(file);
        }
      };

    return (
        <dialog id="my_modal_5" className="modal modal-top sm:modal-middle">
                <div className="modal-box  bg-slate-100">

                <form action={prop?.formaction} >
                        <div className="flex flex-col space-y-3 place-content-center items-center">
                                <div className="w-full h-60 rounded-lg relative ">
                                    {preview? (
                                        <Image className="rounded-lg" src={`${preview}`} fill={true} alt={""} />
                                    ) : "Photo Preview here..."}
                                    
                                </div>
                                
                                <div>
                                    <label htmlFor="file" className="btn btn-primary btn-sm">
                                        <input 
                                            id="file" 
                                            name="image" 
                                            onChange={imageChanger} 
                                            style={{width:0}} 
                                            type="file"
                                         />
                                        Choose Image
                                    </label>
                                </div>

                                <div>
                                    <InputTag name="title" type="text" placeholder="photo title" label="Photo Title" />
                                </div>

                                <div className="mt-12">
                                    <button className="btn btn-block  btn-primary" type="submit">Upload Photo</button>
                                </div>
                        </div>
                </form>

                <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    )
}



export const ModalProductPopover = (prop:{src?:any}) => {
    const [preview, setPreview] = useState<string>('');
    
    return (
        <dialog id="my_modal_5" className="modal">
                <div className="modal-box w-11/12 max-w-5xl  bg-slate-100">
                
                <iframe className="w-full h-[500px]"  src={prop?.src} id="iframepageloader"></iframe>
                
                <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    )
}



