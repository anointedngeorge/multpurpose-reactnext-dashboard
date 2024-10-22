import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { useRouter } from 'next/router';
import { notify, postdata, postdataWithImage, setupsessiondb } from '../function';
import {cartStorageName, checkoutStorageName, externalurls, postInterface} from "../interface"
import { getIronSession } from 'iron-session';
import { FaMdb } from 'react-icons/fa';


const Token = globalThis?.sessionStorage?.getItem("apptoken")

const formprops = (formdata: FormData) => {
  let container: { [key: string]: any } = {};
  const data:any = formdata.entries();
  for (const [key, value] of data) {
    container[key] = value;
  }
  return container;
};



export const signup = async (state: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const username = formData.get('username');
  const password = formData.get('password');

  const postRequest:postInterface =  {
    url:`${externalurls.token}`,
    headers:{
      "Content-Type":"application/json",
    },
    body: {
      username,
      password,
    }
  }
  const req = await postdata(postRequest);

  if (req?.ok) {
    const j = await req.json();
    const token = j['token'];
    setupsessiondb({name:'apptoken', value:token})
    globalThis.location.href = "/admin";
  } else {   
    globalThis.location.href = "/admin/login";
  }
  
}


export const staffsignup = async (state: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const username = formData.get('username');
  const password = formData.get('password');

  const postRequest:postInterface =  {
    url:`${externalurls.token}`,
    headers:{
      "Content-Type":"application/json",
    },
    body: {
      username,
      password,
    }
  }
  const req = await postdata(postRequest);
  
  if (req?.ok) {
    const j = await req.json();
    const token = j['token'];
    setupsessiondb({name:'apptoken', value:token})
    globalThis.location.href = "/staff";
  } else {    
    globalThis.location.href = "/staff/login";
  }
  
}


export const brand = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.brand}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
  } else {
    notify({message:`${req?.statusText}`});
  }
  
}


export const brandType = async (state: FormState, formData: FormData) => {
  const name = formData.get('name');
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.brandtype}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
  } else {
    notify({message:`${req?.statusText}`});
  }
  
}



export const productType = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.producttype}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
  } else {
    notify({message:`${req?.statusText}`});
  }
  
}



export const product_add = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.productadd}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
  } else {

    notify({message:`${req?.statusText}`});
  }
  
}



export const photoform = async (state: FormState, formData: FormData) => {

  const postRequest:postInterface =  {
    url:`${externalurls.photoaddnewfile}`,
    headers:{
      "Authorization": `Bearer ${Token}`
    },
    body:formData
  }

  const req = await postdataWithImage(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
  } else {

    notify({message:`${req?.statusText}`});
  }
  
}


export const createbranch = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.branchadd}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
  } else {

    notify({message:`${req?.statusText}`});
  }
  
}

export const createWarehouse = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.warehouseadd}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
  } else {

    notify({message:`${req?.statusText}`});
  }
  
}



export const productSellAddToCart = async (state: FormState, formData: FormData) => {
    const data:any = formprops(formData);
    const itemid = formData.get("id");

    let storage:any = {}
 
    const cartdataitem = globalThis.sessionStorage.getItem(cartStorageName)

    if (cartdataitem) {
      let cartdataitemparse = JSON.parse(cartdataitem)
      cartdataitemparse[`${itemid}`] = data;
      globalThis.sessionStorage.setItem(cartStorageName, JSON.stringify(cartdataitemparse))
    
    } else {
        storage[`${itemid}`] = data;
        globalThis.sessionStorage.setItem(cartStorageName, JSON.stringify(storage))
    }

}


export const productSellAddToCartSubmit = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  globalThis.sessionStorage.setItem(checkoutStorageName, JSON.stringify(data));
  globalThis.location.href = "/staff/checkout"
}

export const createnewsales = async (state: FormState, formData: FormData) => {
  // const popdata = formData.delete('total_price')
  const data:any = formprops(formData);
  const checkoutName = checkoutStorageName;
  const cartStorageNamed =  cartStorageName

  const postRequest:postInterface =  {
    url:`${externalurls.createnewsales}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    notify({message:'Created!'});
    globalThis.sessionStorage.removeItem(checkoutName)
    globalThis.sessionStorage.removeItem(cartStorageNamed)
    globalThis.location.href = "/staff/"
  } else {
    notify({message:`${req?.statusText}`});
  }
  
}





export const productVariations = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.productaddvariations}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    alert("Created");
  } else {
    alert(`${req?.statusText}`);
  }
  
}


// 

export const createProductInStore = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);

  const postRequest:postInterface =  {
    url:`${externalurls.productInStoreAdd}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  const response = await req?.json()
  alert(response?.message)
  
}