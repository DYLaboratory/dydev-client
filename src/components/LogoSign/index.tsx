import packageJson from '../../../package.json';
import { Badge, Box, styled, Tooltip, tooltipClasses, TooltipProps, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
`
);

const LogoSign = styled(Box)(
  ({ theme }) => `
        background: ${theme.general.reactFrameworkColor};
        width: 18px;
        height: 18px;
        border-radius: ${theme.general.borderRadiusSm};
        position: relative;
        transform: rotate(45deg);
        top: 3px;
        left: 17px;

        &:after, 
        &:before {
            content: "";
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            top: -1px;
            right: -20px;
            transform: rotate(0deg);
            border-radius: ${theme.general.borderRadiusSm};
        }

        &:before {
            background: ${theme.palette.primary.main};
            right: auto;
            left: 0;
            top: 20px;
        }

        &:after {
            background: ${theme.palette.secondary.main};
        }
`
);

const LogoSignInner = styled(Box)(
  ({ theme }) => `
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${theme.general.borderRadiusSm};
        background: ${theme.header.background};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

interface LogoProps {
  isTheme?: boolean;
}

function Logo(props: LogoProps) {
  const { isTheme } = props;

  const theme = useTheme();

  const mainLogo = () => {
    if (isTheme) {
      return theme.palette.mode === "dark" ? "/static/images/dylabo/main-logo.png" : "/static/images/dylabo/main-logo-dark.png"
    } else {
      return "/static/images/dylabo/main-logo.png";
    }
  }

  const textLogo = () => {
    if (isTheme) {
      return theme.palette.mode === "dark" ? "/static/images/dylabo/main-text.png" : "/static/images/dylabo/main-text-dark.png"
    } else {
      return "/static/images/dylabo/main-text.png";
    }
  }

  return (
    <TooltipWrapper title="DY Laboratory" arrow>
      <LogoWrapper to="/">
        <Badge
          sx={{
            '.MuiBadge-badge': {
              fontSize: theme.typography.pxToRem(10),
              right: 2,
              top: 5
            }
          }}
          overlap="circular"
          color="success"
          badgeContent={packageJson.version}>
          <LogoSignWrapper>
            <img
              src={mainLogo()}
              alt=""
              height="50px"
              width="50px"
            />
            {/* <LogoSign>
              <LogoSignInner />
            </LogoSign> */}
          </LogoSignWrapper>
        </Badge>
        <img
          src={textLogo()}
          alt=""
          height="45px"
          width="180px"
        />
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
