import { CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import styles from "./ProgressBar.module.scss"
const ProgressBar = ({ score, className }) => {
  const [individualScoreProgress, setIndividualScoreProgress] = useState(0);

  

  useEffect(() => {
    const timer = setInterval(() => {
      setIndividualScoreProgress((prevProgress) =>
        prevProgress >= score ? score : prevProgress + 10
      );
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [score]);
  return (
    <div className={styles["table--row__score"]}>
      <CircularProgress
        className={className}
        style={{ width: "32px", height: "32px" }}
        variant="determinate"
        value={individualScoreProgress}
      />

      <span className="progress-value">{score + "%"}</span>
    </div>
  );
};

export default ProgressBar;
