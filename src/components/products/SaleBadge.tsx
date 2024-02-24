import calculatePercentageOff from "@/utils/calculatePercentageOff";

type SaleBadgeProps = {
  price: number;
  salePrice: number;
};

const SaleBadge = ({ price, salePrice }: SaleBadgeProps) => {
  const calculatePercentage = calculatePercentageOff(price, salePrice);

  return (
    <div className="bg-primary w-14 h-14 text-white font-semibold rounded-full flex items-center justify-center">
      <p>{`${calculatePercentage}%`}</p>
    </div>
  );
};

export default SaleBadge;
