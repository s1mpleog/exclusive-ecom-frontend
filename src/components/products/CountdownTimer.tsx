import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const styles = "flex flex-col items-center justify-start";
  const timeStyles = "font-semibold text-4xl";

  return (
    <div className="flex gap-5">
      <div className={styles}>
        <p>Days</p>
        <p className={timeStyles}>{timeLeft.days && `0${timeLeft.days}`} </p>
      </div>
      <span className="m-auto text-primary text-2xl">:</span>
      <div className={styles}>
        <p>Hours</p>
        <p className={timeStyles}>{timeLeft.hours && `${timeLeft.hours}`} </p>
      </div>
      <span className="m-auto text-primary text-2xl">:</span>

      <div className={styles}>
        <p>Minutes</p>
        <p className={timeStyles}>
          {timeLeft.minutes && `${timeLeft.minutes}`}{" "}
        </p>
      </div>
      <span className="m-auto text-primary text-2xl">:</span>

      <div className={styles}>
        <p>Seconds</p>
        <p className={timeStyles}>
          {timeLeft.seconds && `${timeLeft.seconds}`}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
