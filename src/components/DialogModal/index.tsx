import { Dialog, styled } from "@mui/material";
import { DialogProps } from "@mui/material/Dialog/Dialog";

const DialogBox = styled(Dialog)(
  () => `
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
  `
);

function DialogModal(props: DialogProps) {
  return (
    <DialogBox open={props.open} onClose={props.onClose}>
      {props.children}
    </DialogBox>
  )
}

export default DialogModal;