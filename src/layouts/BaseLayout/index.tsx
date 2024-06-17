import { ReactNode, useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

import { Box, styled } from "@mui/material";
import { useAppDispatch } from "src/app/hooks";
import { getUserAsync } from "src/features/user/userSlice";

const BaseLayoutBox = styled(Box)(
  () => `
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
  `
);

interface BaseLayoutProps {
  children?: ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <BaseLayoutBox
      sx={{
        flex: 1,
        height: '100%'
      }}>
      {children || <Outlet />}
    </BaseLayoutBox>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
