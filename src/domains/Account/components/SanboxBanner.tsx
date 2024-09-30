import Image from "next/image";

export const SanboxBanner = () => {
  return (
    <div className="flex flex-col w-full h-[360px] bg-white bg-center bg-border-[10px] rounded-[16px] box-border p-8 relative">
      <div className="flex flex-col justify-center items-center h-full">
        <Image
          width={200}
          height={200}
          alt=""
          src="/modules.png"
          className="rounded-2xl"
        />
        <div className="text-neutral-dark text-2xl font-medium font-oatmealProMedium mt-6">
          Introducing Rhinestone Sandbox
        </div>
        <div className="text-neutral-dark opacity-40 text-2xl font-normal">
          Build and test smart account modules
        </div>
      </div>
    </div>
  );
};
