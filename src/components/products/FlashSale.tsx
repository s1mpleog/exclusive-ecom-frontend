import CountdownTimer from "./CountdownTimer";

const FlashSale = () => {
  return (
    <div className="my-10">
      <div className="flex items-center justify-start gap-3">
        <span
          aria-hidden={true}
          className="h-8 rounded-md w-4 bg-primary"
        ></span>
        <p className="font-medium text-lg text-primary">Today’s</p>
      </div>
      <div className="flex my-10 items-center justify-start gap-20">
        <h3 className="text-4xl font-medium">Flash Sales</h3>
        <CountdownTimer />
      </div>
    </div>
  );
};

export default FlashSale;
