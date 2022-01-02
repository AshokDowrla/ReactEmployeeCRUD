import { useState, Fragment } from "react";

import styles from "./Sidebar.module.scss";
import { ReactComponent as Employee } from "../../assets/employee.svg";
import { ReactComponent as ManageIcon } from "../../assets/organization.svg";
import { ReactComponent as Shift } from "../../assets/shift.svg";
import { ReactComponent as Leave } from "../../assets/leave.svg";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as Support } from "../../assets/support.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as History } from "../../assets/history.svg";

import { ReactComponent as Dashboard } from "../../assets/dashboard.svg";
import Modal from "../Modal/Modal";
import SideBarContent from "./SideBarContent";

const sideBarJson = [
  {
    id: "0",
    title: "Dashboard",
    icon: <Dashboard />
  },
  {
    id: "1",
    title: "Manage People",
    icon: <Employee />,
    subOptions: [
      { id: "0", title: "Everyone" },
      { id: "1", title: "Bulk Registration" },
      { id: "2", title: "Permissions" }
    ]
  },
  {
    id: "2",
    title: "Manage  O",
    icon: <ManageIcon />
  },
  {
    id: "3",
    title: "Manage  A",
    icon: <Shift />
  },
  {
    id: "4",
    title: "Manage  B",
    icon: <Leave />
  },
  {
    id: "5",
    title: "Manage  C",
    icon: <Camera />
  },
  {
    id: "6",
    title: "Support",
    icon: <Support />
  },
  {
    id: "7",
    title: "Settings",
    icon: <Settings />
  },
  {
    id: "8",
    title: "Audit Trails",
    icon: <History />
  }
];

const Sidebar = () => {
  const [activeState, setActiveState] = useState("1");
  const onClickHandler = (id) => {
    setActiveState(id);
  };

  const showUserContent = window.innerWidth <= 700;

  const portModal = window.innerWidth <= 1270;
  return (
    <Fragment>
      {portModal ? (
        <Modal>
          <SideBarContent
            styles={styles}
            showUserContent={showUserContent}
            sideBarJson={sideBarJson}
            activeState={activeState}
            onClickHandler={onClickHandler}
          />
        </Modal>
      ) : (
        <SideBarContent
          styles={styles}
          showUserContent={showUserContent}
          sideBarJson={sideBarJson}
          activeState={activeState}
          onClickHandler={onClickHandler}
        />
      )}
    </Fragment>
  );
};

export default Sidebar;
