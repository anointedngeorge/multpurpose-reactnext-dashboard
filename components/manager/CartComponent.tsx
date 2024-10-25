
"use client"
import { photoform, productSellAddToCartSubmit } from '@/app/actions/auth';
import { useCustomActionState } from '@/app/custom_hooks';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'




const CartTable = (prop:{data?:any[], totalprice?:number}) => {

  const convertJSON = (itdata:any) => {
      return JSON.parse(itdata);
  }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
              {prop?.data?.map( (item, index) => (
                  <tr key={`cart_tr_${index}`}>
                      <td>{index+1} 
                          <input hidden type="text" name={`id${index}`} defaultValue={item?.id} />
                      </td>
                      <td><Image src={`${convertJSON(item?.data).image.image}`} width={50} height={50} alt='...' /></td>
                      <td>
                        {`${convertJSON(item?.data).name}`}
                      </td>
                      <td>
                        {item?.quantity}
                        <input hidden type="text" name={`quantity${index}`} defaultValue={item?.quantity} />
                      </td>
                      <td>
                        {item?.size}
                        <input hidden type="text" name={`size${index}`} defaultValue={item?.size} />
                      </td>
                      <td>
                        {item?.selling_price}
                        <input hidden type="text" name={`selling_price${index}`} defaultValue={item?.selling_price} />
                      </td>
                      <td>
                          N{item?.selling_price * item?.quantity}
                          <input hidden type="text" name={`item_total${index}`} defaultValue={item?.selling_price * item?.quantity} />
                      </td>
                  </tr>
              ) )}
            </tbody>
            <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total Price Calculated:</td>
                  <td>
                    <strong><b>N{prop.totalprice}</b></strong>
                    <input hidden type="text" name='total_price' defaultValue={prop.totalprice} />
                  </td>
                </tr>
            </tfoot>
        </table>
    )
}






const CartComponent = (prop:{data?:any}) => {
  const [cartData, setCartData] = useState<any | null>('');
  const [itemData, setItemData] = useState<any[]>([]);
  const [itemTotal, setItemTotal] = useState<number>();

  const {state, action, status} = useCustomActionState({fn:productSellAddToCartSubmit});

  useEffect(() => {
    // const item = prop?.data?  JSON.parse(prop?.data?.data) : '';
    // setItemData(item)
    setCartData(prop?.data)

    let container = [];
    let selling_price = 0

    for (const key in cartData) {
      if (Object.prototype.hasOwnProperty.call(cartData, key)) {
        const element = cartData[key];
        let total = parseFloat(element.quantity) * parseFloat(element.selling_price)
        selling_price += total;
        container.push(element);
      }
    }

    setItemData(container);
    setItemTotal(selling_price)

  }, [prop])


  


  return (
    <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-3xl text-lightorange">
                    Cart Preview
                </h3>

                {/* body */}
                <div className="overflow-x-auto">
                    <form action={action}>
                          <CartTable data={itemData} totalprice={itemTotal} />
                          {itemData.length > 0? (
                              <button className='btn btn-primary'>Checkout</button>
                          ) : ""}
                    </form>
                </div>
              {/*  */}
              <div className="modal-action">
                  <form method="dialog">
                      {/* if there is a button, it will close the modal */}
                      <button className="btn">Close</button>
                  </form>
            </div>
        </div>
    </dialog>
  )
}

export default CartComponent
