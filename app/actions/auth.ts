import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { useRouter } from 'next/router';
import { notify, postdata, setupsessiondb } from '../function';
import {Token, externalurls, postInterface} from "../interface"
import { getIronSession } from 'iron-session';



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
    window.location.href = "/admin";
  } else {
    window.location.href = "/";
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

