import { createContext } from 'react';
import { toast } from 'react-toastify';
 

export const ThemeContext =  createContext<any>(null)

export const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJzdWIiOnRydWUsImV4cCI6MTcyNjQ1OTY2Mn0.EaVGjE6eGfp2nC9kUA3p7gWtj4GBpMrJINH5BYkCn24"

// export const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
// console.log(Token2);

export interface toastify {
    message:string
}

export const APIBASEURl = "https://europeshop.mydigitaltrader.com";

// export const APIBASEURl = 'http://127.0.0.1:8000';


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
    'productbrandlisting':`${APIBASEURl}/api/v1/products/productbrandlisting/list`,
    'photolist':`${APIBASEURl}/api/v1/products/photo/list`,
    'photoaddnewfile':`${APIBASEURl}/api/v1/products/photo/create/`,

    'branchadd':`${APIBASEURl}/api/v1/utility/branch/create`,
    'branchlist':`${APIBASEURl}/api/v1/utility/branch/list`,
    'warehouseadd':`${APIBASEURl}/api/v1/utility/warehouse/create`,
    'warehouselist':`${APIBASEURl}/api/v1/utility/warehouse/list`,
    'salesreportlist':`${APIBASEURl}/api/v1/reports/report/list`,
    
}


export interface postInterface {
    url:string,
    headers:{ [key:string]:any},
    body:{ [key:string]:any} ,
}

export interface postInterfaceWithImage {
    url:string,
    headers:{ [key:string]:any},
    body:any ,
}

export interface customssrgetInterface {
    url:string,
    headers:{ [key:string]:any},
    mutatetime?:number,
}


export interface cookieInterface {
    name:string,
    value:string,
    path?:string,
    maxtime?:number
    
}


export interface customTableInterface {
    thead?:any[] | undefined,
    tbody?:any[],
    mapper?:any[],
    data?:[{[key:string]: any}]
    show_thead?:boolean,
    title?:string,
}