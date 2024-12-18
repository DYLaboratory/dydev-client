import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface BulkActionsProps {
  onClickDeleteButton: () => void;
}

function BulkActions(props: BulkActionsProps) {
  const { onClickDeleteButton } = props;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={onClickDeleteButton}
          >
            DELETE
          </ButtonError>
        </Box>
      </Box>
    </>
  );
}

export default BulkActions;
