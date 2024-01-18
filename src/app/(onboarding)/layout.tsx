import "@/src/styles/globals.css";
import { LogoIcon } from "@/src/ui-kit/Icons";
import { Providers } from "../(app)/Providers";

type Props = {
  children: React.ReactNode;
};

export default async ({ children }: Props) => {
  return (
    <html lang="en" className={``}>
      <body className="font-oatmealPro">
        <main>
          <Providers>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-5">
              <LogoIcon />
            </div>
            <div className="flex justify-center items-center h-screen bg-background">
              <div className="bg-white rounded-2xl p-5 pb-10 w-[512px] h-[560px] shadow box-border">
                <div className="">{children}</div>
              </div>
            </div>
          </Providers>
        </main>
      </body>
    </html>
  );
};
