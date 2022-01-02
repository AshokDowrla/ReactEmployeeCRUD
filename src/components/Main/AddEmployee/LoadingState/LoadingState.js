import { Fragment } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as LoadingSvg } from "../../../../assets/loadingWait.svg";

const portalElement = document.getElementById("loadingModal");
const LoadingState = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={props.styles["addPerson--loadingSvg"]}>
          <LoadingSvg />
        </div>,
        portalElement
      )}
    </Fragment>
  );
};

export default LoadingState;
