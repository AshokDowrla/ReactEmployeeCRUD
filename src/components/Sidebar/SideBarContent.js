import { useState, useRef } from "react";
import UserContent from "../Header/UserContent";
import SidebarItem from "./SidebarItem/SidebarItem";
import { ReactComponent as PhoneIcon } from "../../assets/phone-call.svg";
import { ReactComponent as Email } from "../../assets/email.svg";
import classes from "./SideBarContent.module.scss";
import { useEffect } from "react";
const SideBarContent = (props) => {
  const wrapperRef = useRef();
  const contentRef = useRef();
  const trackRef = useRef();
  const thumbRef = useRef();
  const itemsRef = useRef();
  const footerRef = useRef();

  // Set the initial height for thumb
  const initializeRef = () => {
    const scrollRatio =
      contentRef.current.clientHeight / contentRef.current.scrollHeight;
    return scrollRatio;
  };

  useEffect(() => {
    initializeRef();
  }, []);

  useEffect(() => {
    const scrollRatio = initializeRef();
    thumbRef.current.style.height = `${scrollRatio * 100}%`;
  }, [thumbRef]);

  useEffect(() => {
    const contentId = document.getElementById("content");

    const styles = window.getComputedStyle(contentId);
    if (
      contentId.clientHeight >
      itemsRef.current.scrollHeight +
        footerRef.current.scrollHeight +
        parseInt(styles.paddingBottom, 10)
    ) {
      const scrollBarId = document.getElementById("scrollbar");
      scrollBarId.style.display = "none";
    }
  }, []);

  const [posTop, setPosTop] = useState(0);
  const [posY, setPosY] = useState(0);

  const mouseMoveHandler = function (e) {
    const scrollRatio = initializeRef();
    // How far the mouse has been moved
    const dy = e.clientY - posY;

    // Scroll the content
    contentRef.current.scrollTop = posTop + dy / scrollRatio;
  };

  const mouseUpHandler = function (e) {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  const mouseDownThumbHandler = (e) => {
    setPosTop(contentRef.current.scrollTop);
    setPosY(e.clientY);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const scrollContentHandler = () => {
    window.requestAnimationFrame(function () {
      thumbRef.current.style.top = `${
        (contentRef.current.scrollTop * 100) / contentRef.current.scrollHeight
      }%`;
    });
  };

  const trackClickHandler = (e) => {
    const bound = trackRef.current.getBoundingClientRect();
    const percentage = (e.clientY - bound.top) / bound.height;
    contentRef.current.scrollTop =
      percentage *
      (contentRef.current.scrollHeight - contentRef.current.clientHeight);
  };
  return (
    <div
      id="wrapper"
      ref={wrapperRef}
      className={props.styles["sidebar--scrollWrapper"]}
    >
      <div id="scrollbar" className={classes.scrollbar}>
        <div
          id="track"
          ref={trackRef}
          className={classes.track}
          onClick={trackClickHandler}
        ></div>
        <div
          id="thumb"
          ref={thumbRef}
          className={classes.thumb}
          onMouseDown={mouseDownThumbHandler}
          onMouseLeave={mouseUpHandler}
        ></div>
      </div>

      <nav
        id="content"
        ref={contentRef}
        className={props.styles["sidebar--container"]}
        onScroll={scrollContentHandler}
      >
        {props.showUserContent && (
          <div className={props.styles["sidebar--userContent"]}>
            <UserContent />
          </div>
        )}
        <ul className={props.styles["sidebar--items"]} ref={itemsRef}>
          {props.sideBarJson.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              activeStateId={props.activeState}
              icon={item.icon}
              title={item.title}
              click={props.onClickHandler}
              options={item.subOptions ? item.subOptions : null}
            />
          ))}
        </ul>
        <div className={props.styles["sidebar--footer"]} ref={footerRef}>
          <div className={props.styles["sidebar--footer__item"]}>
            <PhoneIcon />
            <h4>1800-3934-3490349</h4>
          </div>
          <div className={props.styles["sidebar--footer__item"]}>
            <Email />
            <h4>helpdesk@ciphense.com</h4>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBarContent;
