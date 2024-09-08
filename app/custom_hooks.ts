import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FormState } from "./lib/definitions";
import { EnumLike } from "zod";
import { customTableInterface, customssrgetInterface } from "./interface";


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


export const useCustomSSR = (props: customssrgetInterface) => {
    const [ssrdata, setSSRData] = useState<any>(null);
    const [ssrstatus, setStatus] = useState<boolean>(false);
    const [ssrerror, setError] = useState<any>(null);
  
    const timer = props.mutatetime || 60000;
  
    const fetchData = useCallback(async () => {
      try {
        const response = await fetch(props.url, {
          headers: props.headers,
        });
    
        if (response.ok) {
          const result = await response.json();
          setSSRData(result); 
          setStatus(false);    
        } else {
          setStatus(true);     
        }
      } catch (err) {
        setError(err);    
        setStatus(true);    
      }
    }, [props.url, props.headers, setSSRData, setStatus, setError]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]); 
    

    const cssrmutate = () => {
      const intervalId = setInterval(() => {
        fetchData();
      }, timer);
      return () => clearInterval(intervalId); 
    };
  
    return {
      ssrdata,
      ssrstatus,
      ssrerror,
      cssrmutate,
    };
  }
  
 

