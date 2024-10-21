interface modelform_interface {
  title:string,
  name:string,
  placeholder:string
  type:string,
  buttonTitle:string,
  required?:boolean,
}


export const SingleModelForm:React.FC<modelform_interface> = (props) => {
  return (
      <div className="flex flex-col">
        <div>{props.title}</div>
        <div className="mt-5">
         
              <div className="flex  place-items-center space-x-3">
                <div className="w-full">
                    <input 
                          placeholder={`${props.placeholder}`} 
                          type={`${props.type}`} 
                          className="w-full border-2 text-lightorange font-inter font-bold py-3 px-5 rounded-3xl drop-shadow-sm "
                          name={`${props.name}`}
                          required={props.required}
                     />
                </div>
                <div>
                    <button className="rounded-full btn btn-neutral px-10 " type="submit">{`${props.buttonTitle}`}</button>
                </div>
              </div>
            
        </div>
      </div>
  )
}



interface SelectTagProps {
name: string;
label?: string;
mapper?: [string, string];
required?:boolean,
onchange?:( event?:any ) => void | any,
content: { [key: string]: any }[];
}


export const SelectTag:React.FC<SelectTagProps> = ({
          name,
          label,
          mapper = ["id", "name"],
          required,
          content,
          onchange,
          
    }) => {

  const namemapper:any = (item?:any, path?:any) => eval(`item.${path}`);
  return (
    <div className="w-full">
      {label? (
          <label>{`${label}`}</label>
      ) : ""}
    <select 
          onChange={onchange}
          className="w-full p-3  border-2 text-lightorange font-inter font-bold  px-10 rounded-3xl drop-shadow-sm "
          name={`${name}`}
          required={required}
     >
      <>
      <option defaultValue="..." disabled>Choose</option>
        {content?.map((item, index) => (
            <option key={`${namemapper(item, mapper[0])}_${index}`} value={`${namemapper(item, mapper[0])}`}>{`${namemapper(item, mapper[1])}`}</option>
        ))}
      </>
      </select>
</div>
  )
}


export const InputTag = (props:{
label?:string,
name:string,
min?:number,
max?:number,
value?:string,
defaultvalue?:string,
placeholder?:string,
required?:boolean,
disabled?:boolean,
readonly?:boolean,
type:string,
onkeyup?:(event:React.KeyboardEvent<HTMLInputElement>) => void,
onclick?:(event?:React.MouseEventHandler) => void,
}) => {
  return (
    <div className="w-full">
      {props.label? (
          <label>{`${props.label}`}</label>
      ) : ""}
     
    {props.placeholder? (
    <input 
          placeholder={`${props.placeholder}`} 
          type={`${props.type}`} 
          className="mt-2 w-full border-2 text-lightorange font-inter font-bold py-3 px-5 rounded-3xl drop-shadow-sm "
          name={`${props.name}`}
          required={props.required}
          min={props.min}
          max={props.max}
          defaultValue={props.defaultvalue}
          value={props.value}
          onKeyUp={props.onkeyup}
          disabled={props.disabled}
          readOnly={props.readonly}
     />
    ) : (<input 
      type={`${props.type}`} 
      className="mt-2 w-full border-2 text-lightorange font-inter font-bold py-3 px-5 rounded-3xl drop-shadow-sm "
      name={`${props.name}`}
      onKeyUp={props.onkeyup}
      disabled={props.disabled}
      readOnly={props.readonly}
      defaultValue={props.value}
 />)}
</div>
  )
}