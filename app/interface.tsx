import { createContext } from 'react';
import { toast } from 'react-toastify';
 

export const ThemeContext =  createContext<any>(null)


export const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJzdWIiOnRydWUsImV4cCI6MTcyNTg0MDM3OX0.Tr0nWZMaxDmxB5GxLxvI1AeIaZyWMnUxhzehHfZtzFA"


export interface toastify {
    message:string
}

export const APIBASEURl = 'http://127.0.0.1:8000';

export const externalurls = {
    'token':`${APIBASEURl}/api/v1/auth/token`,
    'profile':`${APIBASEURl}/api/v1/auth`,
    'brand':`${APIBASEURl}/api/v1/products/brand/new`,
    'brandlist':`${APIBASEURl}/api/v1/products/getbrand/list`,
    'brandtype':`${APIBASEURl}/api/v1/products/brand/type`,
    'brandtypelist':`${APIBASEURl}/api/v1/products/brand/type/list`,
    'producttype':`${APIBASEURl}/api/v1/products/productbrandtype`,
    'producttypelist':`${APIBASEURl}/api/v1/products/productbrandtype/list`,
    'productadd':`${APIBASEURl}/api/v1/products/products/add`,
    'productlist':`${APIBASEURl}/api/v1/products/products/list`,
    'productlisting':`${APIBASEURl}/api/v1/products/productlisting/list`,

    'productbrandslist':`${APIBASEURl}/api/v1/products/productbrands/list/`,
}


export interface postInterface {
    url:string,
    headers:{ [key:string]:any},
    body:{ [key:string]:any},
}


export interface getInterface {
    url:string,
    headers:{ [key:string]:any},
}


export interface cookieInterface {
    name:string,
    value:string,
    path?:string,
    maxtime?:number
    
}
