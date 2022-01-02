import { useDispatch } from "react-redux";
import { TableCell, TableRow } from "@material-ui/core";
import ProgressBar from "./ProgressBar/ProgressBar";
import styles from "./Employee.module.scss";
import { ReactComponent as DeleteUser } from "../../../../assets/delete_user.svg";
import { ReactComponent as EditUser } from "../../../../assets/edit_user.svg";
import { employeeJsonActions } from "../../../../store/employeeJsonReducer";
import { useNavigate } from "react-router-dom";

const Employee = ({ employee }) => {
  // console.log(employee)
  const individualScore = parseInt(
    employee.individualScore.split("%").join("")
  );

  const overallScore = parseInt(employee.overallScore.split("%").join(""));

  const dispatch = useDispatch();

  const onDeleteHandler = (id) => {
    dispatch(employeeJsonActions.deleteEmployee(id));
  };

  const navigate = useNavigate();

  const onEditHandler = (employee) => {
    navigate("/updateEmployee",{state:employee});
  };

  return (
    <TableRow>
      <TableCell className={`${styles["table--row"]} firstColumnBody`}>
        <div className={styles["table--row__1"]}>
          <img src={employee.image} alt="" draggable="false" />
          <div className={styles["table--row__nameId"]}>
            <span className={styles["table--row__name"]}>{employee.name}</span>
            <span className={styles["table--row__id"]}>{employee.id}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className={styles["table--row"]}>{employee.role}</TableCell>
      <TableCell className={styles["table--row"]}>
        {employee.referredBy}
      </TableCell>
      <TableCell className={styles["table--row__individualScore"]}>
        <ProgressBar score={individualScore} className="individualScore" />
      </TableCell>
      <TableCell className={styles["table--row__overallScore"]}>
        <ProgressBar score={overallScore} className="overallScore" />
      </TableCell>
      <TableCell className={styles["table--row__filter"]}>
        <div className={styles["table--row__editor"]}>
          <div
            className="text_icon"
            onClick={onEditHandler.bind(null, employee)}
          >
            <EditUser />
            <span>Edit</span>
          </div>
          <div
            className="text_icon"
            onClick={onDeleteHandler.bind(null, employee.id)}
          >
            <DeleteUser />
            <span>Delete</span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Employee;
