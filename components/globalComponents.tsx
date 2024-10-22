import Image from "next/image"
import { InputTag } from "./admin/FormElements"
import { ChangeEvent, HtmlHTMLAttributes, useEffect, useState } from "react"
import { FormState } from "@/app/lib/definitions"
import { moneyFormat } from "@/app/utils/utils"
import { APIBASEURl, externalurls } from "@/app/interface"
import { useCustomSSR } from "@/app/custom_hooks"



export const ModalPopOver = ({data, action}:{data?:any, action?:any}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabledInput, setIsDisabledInput] = useState(true);
    const [inputquantity, setQuantity] = useState<number>(0);
    const [inputsize, setSize] = useState<number>(0);
    const Token2 = globalThis?.sessionStorage?.getItem("apptoken")

    return (
        <dialog id="my_modal_5" className="modal modal-top sm:modal-middle">
                <div className="modal-box">
                        <div className='col-span-1'>
                        <div className="card bg-base-100  w-full border-4 p-2">
                            <figure className='w-full relative h-72'>
                                {/* {JSON.stringify(data)} */}
                                <Image
                                src={data?.data?.image? `${data?.data?.image}`: ''}
                                alt="Shoes" fill={true}  />
                            </figure>
                            <div className="card-body">
                                <div>
                                        <h2 className="card-title text-sm">
                                        {data?.data.name}
                                        
                                        {/* <div className="badge badge-secondary">NEW</div> */}
                                        </h2>
                                        <p>{data?.data.description}</p>
                                       
                                        <form action={action} >
                                            <input type="text" readOnly hidden value={JSON.stringify(data?.data)} name="data" />
                                            <input type="text" readOnly hidden value={`${data?.data?.id}`} name="id" />
                                            <div className="flex flex-col">
                                                <div>
                                                    <span id="current_selling_price" className="text-red-400 text-xs" data-price={`${data?.data?.selling_price}`} >
                                                        <span className="text-black">Current Selling Price:</span>
                                                            {data?.data?.selling_price? moneyFormat({currency:'NGN', country:'en-NG'}).format(data?.data?.selling_price) : moneyFormat({currency:'NGN', country:'en-NG'}).format(0.00)}
                                                    </span>

                                                    <InputTag 
                                                            max={data?.data?.selling_price} 
                                                            label={`Selling Price`} 
                                                            name='selling_price' 
                                                            type='number'
                                                            required={true}
                                                            min={0}
                                                            onkeyup={(event:React.KeyboardEvent<HTMLInputElement>) => {
                                                                const selling_price_value = event.currentTarget.value;
                                                                const selling_price = document.getElementById("current_selling_price")?.dataset['price'];
                                                                
                                                                if (selling_price) {
                                                                    if (parseInt(selling_price_value) > parseInt(selling_price)) {
                                                                        setIsDisabled(true);
                                                                    } else {
                                                                        setIsDisabled(false);
                                                                    }
                                                                }
                                                                
                                                            }}
                                                        /></div>
                                                <div className="flex flex-row space-x-2">
                                                    {/* <div><InputTag placeholder="0" label="Size" name='size' type='number' /></div> */}
                                                    <div>
                                                        <label >Choose Sizes </label>
                                            
                                                        <select
                                                            className="mt-2 w-full border-2 text-lightorange font-inter font-bold py-3 px-5 rounded-lg drop-shadow-sm"
                                                            name="store_variation_id"
                                                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                                                const dt = data?.data?.variation_store_list?.filter((e:{id:string}) => e.id == event.target.value);
                                                                const quantityid = document.getElementById('quantityid');
                                                                setIsDisabledInput(true)
                                                                if (dt?.length > 0 && event.target.value !== 'choose') {
                                                                    // alert(event.target.value);
                                                                    setQuantity(dt[0]['quantity'] );
                                                                    setSize(dt[0]['sizes'] );
                                                                    setIsDisabledInput(false)

                                                                } else {
                                                                    setQuantity(0);
                                                                    setSize(0);
                                                                    setIsDisabledInput(true)
                                                                }
                                                            }}
                                                        >
                                                            <option value={'choose'} >Choose</option>
                                                            {/* {JSON.stringify(data?.data)} */}
                                                            {data?.data?.variation_store_list?.map((item:{id:string, sizes:number, quantity:number}, index:number) => (
                                                                <option key={`size_${index}`}  value={`${item.id}`} >{`${item.sizes}`} </option>
                                                            ))}
                                                        </select>
                                                        <input type="text" hidden name="size" defaultValue={inputsize} />
                                                    </div>
                                                    <div>
                                                        {/* <span>{inputsize} {inputquantity}</span> */}
                                                        <InputTag 
                                                                id="quantity"
                                                                placeholder="0"  
                                                                label={`Quantity Available (${inputquantity})`} 
                                                                name='quantity' 
                                                                type='number'
                                                                required={true}
                                                                disabled={isDisabledInput}
                                                                onkeyup={(event:React.KeyboardEvent<HTMLInputElement>) => {
                                                                    const quantity_value = event.currentTarget.value;
                                                                    
                                                                    if ( quantity_value == '' ) {
                                                                        
                                                                        setIsDisabled(true);
                                                                    } else {
                                                                        setIsDisabled(false);
                                                                    }


                                                                    if (inputquantity) {
                                                                        if (parseInt(quantity_value) > inputquantity) {
                                                                            setIsDisabled(true);
                                                                        } else {
                                                                            setIsDisabled(false);
                                                                        }
                                                                    }
                                                                }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                        {(data?.data?.quantity_available <= data?.data?.quantity_sold)}
                                            <button type='submit' disabled={isDisabled} className='btn btn-sm  btn-secondary btn-block'>
                                                Add To Cart
                                            </button>
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



