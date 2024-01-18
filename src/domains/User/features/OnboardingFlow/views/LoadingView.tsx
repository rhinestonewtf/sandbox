export const LoadingView = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="bg-primary bg-opacity-5 w-24 h-24 rounded-full mt-[120px]">
        <span className="loading loading-dots w-8 h-full text-primary"></span>
      </div>

      <div className="font-medium text-2xl mt-10">Waiting for response</div>
      <div className="w-[448px] text-base font-normal leading-normal mt-2 mb-40">
        You will be redirected to the next step once we have it
      </div>
    </div>
  )
}
