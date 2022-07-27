import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
  const handleClose = () => props.setOpen(false);

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TeamModalLayout team={props.team}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            posuere venenatis vehicula. Fusce pulvinar nunc eu mi consequat
            aliquet. Donec ipsum tortor, rhoncus ut leo a, pretium tincidunt
            diam. Quisque fringilla quam aliquam sem viverra varius. Nunc sit
            amet nibh at ante finibus rhoncus. Phasellus vehicula, erat at
            rhoncus tincidunt, mi ipsum venenatis ligula, ac tincidunt risus
            libero non elit. Nullam ac nibh ac elit mattis accumsan. Donec
            interdum dui at metus tristique tristique. Cras accumsan laoreet
            odio nec porttitor. Maecenas eleifend lacus quis sodales porttitor.
            Nunc ultricies accumsan consectetur. Sed eget egestas elit. Integer
            nec tellus odio. In hac habitasse platea dictumst.
          </div>
        </TeamModalLayout>
      </Box>
    </Modal>
  );
};
