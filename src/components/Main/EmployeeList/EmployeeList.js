import { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import Employee from "./Employee/Employee";
import styles from "./EmployeeList.module.scss";
import { AddCircle } from "@material-ui/icons";

const EmployeeList = (props) => {
  const [mousePointer, setMousePointer] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0); //current scroll position
  const [isScrolling, setIsScrolling] = useState(false);

  const firstColumnHeadRef = useRef();
  const firstColumnBodyRef = useRef();

  const firstColumn = document.getElementById("firstColumn");

  const firstColumnBody = document.querySelectorAll(".firstColumnBody");

  const bodyMouseHandler = (dx) => {
    firstColumnBodyRef.current.scrollLeft = dx;

    firstColumnBody.forEach((el) => {
      if (firstColumnBodyRef.current.scrollLeft > 0) {
        el.style.left = dx + "px";
      } else {
        el.style.left = 0 + "px";
      }
    });
  };

  const mouseMoveHandler = (e) => {
    // How far the mouse has been moved
    let clientX = e.clientX;
    if (clientX === undefined) {
      clientX = e.touches[0].clientX;
    }
    const dx = clientX - mousePointer;
    // const dy = e.clientY - pos.y;
    if (isScrolling) {
      // Scroll the element
      firstColumnHeadRef.current.scrollLeft = currentPosition + dx;
      if (firstColumnHeadRef.current.scrollLeft > 0) {
        firstColumn.style.left = firstColumnHeadRef.current.scrollLeft + "px";
      } else {
        firstColumn.style.left = 0 + "px";
      }

      bodyMouseHandler(firstColumnHeadRef.current.scrollLeft);

      setCurrentPosition(firstColumnHeadRef.current.scrollLeft);
      setMousePointer(clientX);
    }
  };

  const mouseUpHandler = () => {
    setIsScrolling(false);
  };

  const mouseDownHandler = (e) => {
    let clientX = e.clientX;
    if (clientX === undefined) {
      clientX = e.touches[0].clientX;
    }
    setIsScrolling(true);

    setMousePointer(clientX);
  };

  /* <---------------------------------------------------------------------------- custom scroller code -------------------------------------------------------------->  */

  const wrapperRef = useRef();
  const trackRef = useRef();
  const thumbRef = useRef();
  const contentRef = useRef();
  const [customScrollPosTop, setCustomScrollPosTop] = useState(0);
  const [customScrollPosY, setCustomScrollPosY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      // console.log(firstColumnHeadRef);
      if (!!firstColumnHeadRef && !!firstColumnHeadRef.current) {
        firstColumnHeadRef.current.style.transform = `translateY(-${scrollTop}px)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.addEventListener("scroll", onScroll);
  }, []);

  // Set the initial height for thumb
  const employeeCount = props.employeeData.length;

  useEffect(() => {
    const scrollRatio =
      contentRef.current.clientHeight / (employeeCount * 75 + 55);
    thumbRef.current.style.height = `${scrollRatio * 100}%`;
  }, [employeeCount]);

  const customScrollMoveHandler = function (e) {
    const scrollRatio =
      contentRef.current.clientHeight / (employeeCount * 75 + 55);
    // How far the mouse has been moved
    let clientY = e.clientY;
    if (clientY === undefined) {
      clientY = e.touches[0].clientY;
    }
    const dy = clientY - customScrollPosY;

    // Scroll the content
    contentRef.current.scrollTop = customScrollPosTop + dy / scrollRatio;
    wrapperRef.current.style.transform = `translateY(${contentRef.current.scrollTop}px)`;
  };

  const customScrollUpHandler = function (e) {
    document.removeEventListener("mousemove", customScrollMoveHandler);

    document.removeEventListener("mouseup", customScrollUpHandler);
  };

  const customScrollDownThumbHandler = (e) => {
    let clientY = e.clientY;
    if (clientY === undefined) {
      clientY = e.touches[0].clientY;
    }
    setCustomScrollPosTop(contentRef.current.scrollTop);
    setCustomScrollPosY(clientY);

    document.addEventListener("mousemove", customScrollMoveHandler);

    document.addEventListener("mouseup", customScrollUpHandler);
  };

  const customScrollContentHandler = () => {
    window.requestAnimationFrame(function () {
      thumbRef.current.style.top = `${
        (contentRef.current.scrollTop * 100) / contentRef.current.scrollHeight
      }%`;
      wrapperRef.current.style.transform = `translateY(${contentRef.current.scrollTop}px)`;
    });
  };

  const customScrollTrackClickHandler = (e) => {
    const bound = trackRef.current.getBoundingClientRect();
    let clientY = e.clientY;
    if (clientY === undefined) {
      clientY = e.touches[0].clientY;
    }
    const percentage = (clientY - bound.top) / bound.height;
    contentRef.current.scrollTop =
      percentage *
      (contentRef.current.scrollHeight - contentRef.current.clientHeight);
  };

  return (
    <Fragment>
      <div className={styles["table--summary"]}>
        <div className={styles["table--count"]}>
          <span className={styles["table--count__text"]}>Everyone</span>
          <span className={styles["table--count__number"]}>
            {props.employeeData.length}
          </span>
        </div>
        <Link to="addEmployee">
          <div className={styles["table--addBtn"]}>
            <AddCircle className={styles["table--addBtn__circle"]} />

            <span className={styles["table--addBtn__text"]}>Add a Person</span>
          </div>
        </Link>
      </div>
      <TableContainer
        ref={contentRef}
        className={styles["table--container"]}
        onScroll={customScrollContentHandler}
      >
        <Table>
          <TableHead
            ref={firstColumnHeadRef}
            onMouseDown={mouseDownHandler}
            onMouseLeave={mouseUpHandler}
            onMouseUp={mouseUpHandler}
            onMouseMove={mouseMoveHandler}
            onTouchStart={mouseDownHandler}
            onTouchEnd={mouseUpHandler}
            onTouchMove={mouseMoveHandler}
          >
            <TableRow>
              <TableCell id="firstColumn" align="center">
                Name & ID
              </TableCell>
              <TableCell> Role </TableCell>
              <TableCell> Referred by </TableCell>
              <TableCell> Individual Score </TableCell>
              <TableCell> Overall Score </TableCell>
              <TableCell> Filter </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            ref={firstColumnBodyRef}
            onMouseDown={mouseDownHandler}
            onMouseLeave={mouseUpHandler}
            onMouseUp={mouseUpHandler}
            onMouseMove={mouseMoveHandler}
            onTouchStart={mouseDownHandler}
            onTouchEnd={mouseUpHandler}
            onTouchMove={mouseMoveHandler}
          >
            {props.employeeData.map((employee) => (
              <Employee key={employee.id} employee={employee} />
            ))}
          </TableBody>
        </Table>
        <div id="wrapper" ref={wrapperRef} className={styles.wrapper}>
          <div id="scrollbar" className={styles.scrollbar}>
            <div
              id="track"
              ref={trackRef}
              className={styles.track}
              onClick={customScrollTrackClickHandler}
            ></div>
            <div
              id="thumb"
              ref={thumbRef}
              className={styles.thumb}
              onMouseDown={customScrollDownThumbHandler}
              onMouseLeave={customScrollUpHandler}
              onTouchStart={customScrollDownThumbHandler}
              onTouchEnd={customScrollUpHandler}
              onTouchMove={customScrollMoveHandler}
            ></div>
          </div>
        </div>
      </TableContainer>
    </Fragment>
  );
};

export default EmployeeList;
