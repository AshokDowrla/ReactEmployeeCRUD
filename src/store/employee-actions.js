import { employeeJsonActions } from "./employeeJsonReducer";
import axios from "axios";
import { newEmployeeActions } from "./newEmployeeReducer";

export const fetchData = () => {
  return (dispatch) => {
    axios
      .get(
        "https://reactemployeecrud-default-rtdb.firebaseio.com/EmployeeList.json"
      )
      .then((res) => {
        let loadedData = [];

        for (const key in res.data) {
          loadedData.push({
            ...res.data[key]
          });
        }

        dispatch(employeeJsonActions.replaceEmployees(loadedData));
      });
  };
};

export const sendData = (newJson) => {
  return (dispatch) => {
    console.log("sent");
    // axios({
    //   method: "post",
    //   url: "https://reactemployeecrud-default-rtdb.firebaseio.com/EmployeeList.json",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data: JSON.stringify(newJson)
    // }).then((res) => {
    //   console.log(res);
    // });
  };
};

export const updateData = (updatedJson) => {
  return (dispatch) => {
    console.log("update");
    // axios({
    //   method: "PUT",
    //   url: "https://reactemployeecrud-default-rtdb.firebaseio.com/EmployeeList.json",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data: JSON.stringify([...updatedJson])
    // }).then((res) => {
    //   console.log(res);
    // });
  };
};

export const uploadImageToServer = (image) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "njf8sfc0");
    formData.append("folder", "images");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      .then((res) => {
        console.log(res);
        dispatch(
          newEmployeeActions.addProperty({ type: "image", value: res.data.url })
        );
        dispatch(newEmployeeActions.formSubmitted(true));
      });
  };
};
