"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BackIcon, Button } from "@/src/ui-kit";
import { useCreateAccount } from "../../../../Account/api";
import { networks } from "../../../../Network/api/networks";
import { useActiveAccount } from "@/src/domains/Account/hooks";

type Props = {
  onBackClick: () => void;
};

export const OnboardingCompletedView = ({ onBackClick }: Props) => {
  const router = useRouter();
  const [activeAccount, setActiveAccount] = useActiveAccount();

  const webauthnCredential = localStorage.getItem(`webauthnCredential`)
    ? JSON.parse(localStorage.getItem(`webauthnCredential`)!)
    : undefined;

  const walletSigner = localStorage.getItem(`signer`) || undefined;

  const salt = "1"; // todo: get latest salt (random?)

  const { refetch: createAccount, isFetching } = useCreateAccount({
    webauthnCredential,
    walletSigner,
    salt,
    network: networks[0],
  });

  const onFinishClick = async () => {
    if (webauthnCredential || walletSigner) {
      try {
        const { data } = await createAccount();
        console.log(data);
        const updatedActiveAccount = {
          ...activeAccount,
          ...data,
          salt,
          webauthnKeyId: webauthnCredential?.id,
          walletSigner,
        };
        setActiveAccount(updatedActiveAccount);
        const accounts = JSON.parse(localStorage.getItem(`accounts`) ?? "[]");
        localStorage.setItem(
          `accounts`,
          JSON.stringify([updatedActiveAccount, ...accounts])
        );
        localStorage.removeItem(`webauthnCredential`);
        localStorage.removeItem(`signer`);
        console.log(updatedActiveAccount);
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center relative">
      <div
        className="absolute left-0 top-0 flex items-center gap-2 hover:cursor-pointer"
        onClick={onBackClick}
      >
        <BackIcon />{" "}
        <div className="text-neutral-dark font-mono text-xs">BACK</div>
      </div>
      <Image
        alt=""
        width={200}
        height={200}
        className="mt-[60px]"
        src="/robot.png"
      />
      <div className="text-2xl font-medium mt-4">
        Great! You&apos;re now ready to start using Rhinestone
      </div>

      <Button
        className="profile-security-btn mt-[104px] bg-primary hover:bg-primary"
        isLoading={isFetching}
        disabled={isFetching}
        onClick={onFinishClick}
      >
        Finish
      </Button>
    </div>
  );
};
