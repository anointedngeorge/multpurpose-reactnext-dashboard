import { toast } from "react-toastify";
import { cookieInterface, customssrgetInterface, postInterface, postInterfaceWithImage, toastify } from "./interface";




export const notify = (props:toastify) => toast(props.message);


export const postdata = async (props:postInterface) => {
    try{
        const ft = await fetch(props.url, {
            method:'POST',
            headers:props.headers,
            body:JSON.stringify(props.body)
        });

        return ft;

    } catch(err : any) {}
}


export const postdataWithImage = async (props:postInterfaceWithImage) => {
    try{
        const ft = await fetch(props.url, {
            method:'POST',
            headers:props.headers,
            body:props.body
        });

        return ft;

    } catch(err : any) {}
}

export const getdata = async (props:customssrgetInterface) => {
    try{
        const ft = await fetch(props.url, {
            headers:props.headers,
        });
        return ft;
    } catch(err : any) {}
}



// export function setupcookie(prop:cookieInterface) {
//     const cookieStore = cookies();
//     return cookieStore.set(`${prop.name}`, `${prop.value}`, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       path: prop.path || '/',
//       maxAge: prop.maxtime || 60 * 60 * 24 * 1,
//     });
  
//   }

export const getdbsid = ({e}:{e:any}) => window?.sessionStorage?.getItem(e)


export function setupsessiondb(prop:cookieInterface) {
    const dbstore = window?.sessionStorage;
    return dbstore.setItem(`${prop.name}`, `${prop.value}`);
  }