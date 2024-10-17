import { Box, Card, Tooltip, Typography } from "@mui/material";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { ReactElement } from "react";
import LoadingProgress from "src/components/LoadingProgress";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const CardWrapper = styled(Card)`
  height: 330px;
`

interface DashboardCardProps {
  title: string;
  rightTitle?: ReactElement;
  url?: string;
  loading?: boolean;
  error?: string;
  children: ReactElement | ReactElement[];
}

function DashboardCard(props: DashboardCardProps) {
  const { title, rightTitle, url, loading, error, children } = props;

  const { t } = useTranslation();

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
            <Tooltip title={t(`tooltip.more`)}>
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
