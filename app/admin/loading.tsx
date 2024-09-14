
"use client"


const Skeleton = () => {
    return (
      <div className="flex w-52 flex-col place-content-center items-center">
        <div>
          <span className="loading loading-dots loading-lg"></span>
        </div>
        <div className="text-center">
            Loading...  
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