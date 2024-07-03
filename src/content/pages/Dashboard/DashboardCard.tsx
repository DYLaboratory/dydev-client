import { Box, Card, Tooltip, Typography } from "@mui/material";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { ReactElement } from "react";
import LoadingProgress from "src/components/LoadingProgress";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";

const CardWrapper = styled(Card)`
  height: 330px;
`

interface DashboardCardProps {
  title: string;
  rightTitle?: ReactElement;
  url?: string;
  loading: boolean;
  error?: string;
  children: ReactElement | ReactElement[];
}

function DashboardCard(props: DashboardCardProps) {
  const { title, rightTitle, url, loading, error, children } = props;

  const navigate = useNavigate();

  return (
    <CardWrapper sx={{ textAlign: 'center', p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ pb: 3 }}
          display="flex"
          justifyContent="space-between"
          variant="h4">
          {title}&nbsp;
          {url &&
            <Tooltip title="자세히보기">
              <LoginTwoToneIcon fontSize="small" cursor="pointer" onClick={() => navigate(url)} />
            </Tooltip>
          }
        </Typography>
        <Typography sx={{ pb: 3 }} variant="h4">
          {rightTitle}
        </Typography>
      </Box>

      {/* loading */}
      {loading && <LoadingProgress />}

      {/* error */}
      {!loading && error}

      {!loading && children}
    </CardWrapper>
  )
}

export default DashboardCard;