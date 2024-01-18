import "@/src/styles/globals.css";
import { Providers } from "./Providers";
import { MainLayout } from "@/src/components/MainLayout";
import { AccountLoader } from "@/src/domains/Account/features";

type Props = {
  children: React.ReactNode;
};

export default async ({ children }: Props) => {
  return (
    <html lang="en" className="">
      <body className="font-oatmealPro">
        <main>
          <Providers>
            <MainLayout>
              <AccountLoader>{children}</AccountLoader>
            </MainLayout>
          </Providers>
        </main>
      </body>
    </html>
  );
};
