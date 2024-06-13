import { ReactNode, useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import { useAppDispatch } from "src/app/hooks";
import { getUserAsync } from "src/features/user/userSlice";

interface BaseLayoutProps {
  children?: ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}>
      {children || <Outlet />}
    </Box>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
