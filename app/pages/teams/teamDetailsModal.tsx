import { useState } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { JobsDashboard } from "~/pages/jobs";

import { TeamModalLayout } from "~/layout/TeamModalLayout";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "1px solid #999",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

interface ITeamDetailsModalProps {
  open: boolean;
  team: string;
  setOpen: Function;
}
export const TeamDetailsModal = (props: ITeamDetailsModalProps) => {
  const [modalNavIndex, setModalNavIndex] = useState(0);
  const handleClose = () => props.setOpen(false);

  const getView = (value: number) => {
    switch (value) {
      case 0:
        return <div>Home</div>;
      case 1:
        return <JobsDashboard />;
      case 2:
        return <div>cASEE 1</div>;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TeamModalLayout
          team={props.team}
          modalNavIndex={modalNavIndex}
          setModalNavIndex={setModalNavIndex}
        >
          {getView(modalNavIndex)}
        </TeamModalLayout>
      </Box>
    </Modal>
  );
};
