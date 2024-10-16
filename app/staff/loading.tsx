"use client"


import Image from "next/image"
const Skeleton = () => {
    return (
      <div className="flex w-52 flex-col place-content-center items-center place-items-center">
        <div className="text-3xl text-red-500 font-extrabold">
            Loading... 
        </div>
        <div className="text-center">
             <Image 
                src={`https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611u0e7z6dp6cd3h77viia785rx42sbnnlo0okh02km&ep=v1_gifs_search&rid=giphy.gif&ct=g`} 
                width={100} 
                height={100} 
                alt="loading..."
              />
        </div>
    </div>
    )
}

export default function Loading() {
    return (
      <div className="h-screen flex place-content-center items-center content-center">
          <div>

              <Skeleton />

          </div>
      </div>
    )
  }