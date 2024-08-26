interface modelform_interface {
    title:string,
    name:string,
    method:string,
    placeholder:string
    type:string,
    actionLink:string,
    buttonTitle:string
}


export const SingleModelForm:React.FC<modelform_interface> = (props) => {
    return (
        <div className="flex flex-col">
          <div>{props.title}</div>
          <div className="mt-5">
              <form action={`${props.actionLink}`} method={props.method}    >
                <div className="flex  place-items-center space-x-3">
                  <div className="w-full">
                      <input 
                            placeholder={`${props.placeholder}`} 
                            type={`${props.type}`} 
                            className="w-full border-2 text-lightorange font-inter font-bold py-3 px-5 rounded-3xl drop-shadow-sm "
                            name={`${props.name}`}
                       />
                  </div>
                  <div>
                      <button className="rounded-full btn btn-neutral px-10 " type="submit">{`${props.buttonTitle}`}</button>
                  </div>
                </div>
              </form>
          </div>
        </div>
    )
}


export const SelectTag = (props:{
  name:string,
  content:{title:any, val:any}[]}) => {
    return (
      <div className="w-full">
      <select 
            className="w-full p-3  border-2 text-lightorange font-inter font-bold  px-10 rounded-3xl drop-shadow-sm "
            name={`${props.name}`}
       >
        {props.content.map(item => (
            <option key={`${item.title}`} value={`${item.val}`}>{`${item.title}`}</option>
        ))}

        </select>
  </div>
    )
}


export const InputTag = (props:{
  name:string,
  placeholder?:string
  type:string,}) => {
    return (
      <div className="w-full">
      <input 
            placeholder={`${props.placeholder}`} 
            type={`${props.type}`} 
            className="w-full border-2 text-lightorange font-inter font-bold py-3 px-5 rounded-3xl drop-shadow-sm "
            name={`${props.name}`}
       />
  </div>
    )
}