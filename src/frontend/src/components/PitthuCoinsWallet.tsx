import { Coins } from "lucide-react";

interface Props {
  coins: number;
  className?: string;
}

export default function PitthuCoinsWallet({ coins, className = "" }: Props) {
  return (
    <div
      className={`flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl px-4 py-2 ${className}`}
      data-ocid="profile.pitthu_coins"
    >
      <Coins className="w-5 h-5 text-yellow-500" />
      <div>
        <p className="font-montserrat font-black text-yellow-700 dark:text-yellow-400 text-lg leading-none">
          {coins.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-yellow-600 dark:text-yellow-500 uppercase tracking-wide">
          Pitthu Coins
        </p>
      </div>
    </div>
  );
}
