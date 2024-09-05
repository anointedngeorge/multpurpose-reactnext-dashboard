import { useEffect, useState } from "react"
import { FormState } from "./lib/definitions";
import { EnumLike } from "zod";
import { getInterface } from "./interface";


interface propsData {
    fn:(state: FormState, formData: FormData) => void | any,
}


enum EnumMessage {
    LOADING = 'Loading',
    SUCCESS = 'Success',
    ERROR = 'Error',
}



export const useCustomActionState = ({fn}: propsData) => {
    const [state, setState] = useState<FormState | any>(null);
    const [status, setStatus] = useState<EnumMessage | null>();
    const [error, setError] = useState<string | null>(null);
    
    const action = async (formData: FormData) => {
        try {

            setStatus(EnumMessage.LOADING)
            setState(null);

            const fdata = await fn(state, formData);

            if(fdata.errors) {

                setState(fdata);
                setStatus(EnumMessage.ERROR)

            } else {

                setStatus(EnumMessage.SUCCESS)
            }
            
            return fdata;

        } catch(err:any) {
            setError(err)
        }
    }

    return {
        state,
        action,
        status,
        error,
        EnumMessage
    }
}


export const useCustomSSR = (props:getInterface) => {
    const [ssrdata, setSSRData] = useState<any>(null);
    const [ssrstatus, setStatus] = useState<boolean>(false);
    const [ssrerror, setError] = useState<any>(null);
    
    useEffect(() => {
        try{
            const e = async () => {
                const ft = await fetch(props.url, {
                    headers:props.headers,
                });
                if (ft.ok) {
                    const result = await ft.json();
                    setSSRData(result)
                } else {
                    setStatus(true)
                }
                
            }
            e();
        } catch(err : any) {
            setError(err)
        }
    }, []);

    return {
        ssrdata,
        ssrstatus,
        ssrerror
    }
}