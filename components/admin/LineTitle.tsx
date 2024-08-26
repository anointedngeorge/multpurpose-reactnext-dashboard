


interface datainterface {
        heading:string,
        linkpath?:string
}

export const LineTitle:React.FC<datainterface> = (props) => {
    return (
        <div className="flex flex-row place-items-center place-content-between">
            <div><h3 className="font-inter text-lg text-left font-bold">{`${props.heading}`}</h3></div>
            <div><code>{`${props.linkpath}`}</code></div>
        </div>
    )
  }