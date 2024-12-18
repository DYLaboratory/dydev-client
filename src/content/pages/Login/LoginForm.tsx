import { Box, Button, Card, Checkbox, FormControlLabel, styled, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { hasText } from "src/utils/stringUtils";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { loginAsync } from "src/features/auth/authSlice";
import { LoginData } from "src/models/data/dataModels";
import HeaderTheme from "src/layouts/SidebarLayout/Header/Buttons/Theme";
import { useSnackbarAlert } from "src/utils/errUtils";
import HeaderLanguage from "src/layouts/SidebarLayout/Header/Buttons/Language";
import { useTranslation } from "react-i18next";

/* style (s) */
const LoginCard = styled(Card)`
  max-width: 500px;
`;
/* style (e) */

function LoginForm() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.user).isLogin;

  const { t } = useTranslation();

  const { errAlert } = useSnackbarAlert();

  const navigate = useNavigate();

  const [idSaveYn, setIdSaveYn] = useState(false);

  const [userInfo, setUserInfo] = useState<LoginData>({
    userId: '',
    password: ''
  });

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  // input box control
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'id') {
      setUserInfo({ ...userInfo, userId: value });
    } else if (name === 'pwd') {
      setUserInfo({ ...userInfo, password: value });
    }
  };

  // 로그인 버튼 클릭
  const handleLoginButton = async () => {
    if (!hasText(userInfo.userId)) {
      errAlert('아이디를 입력하세요.');
      return;
    }
    if (!hasText(userInfo.password)) {
      errAlert('비밀번호를 입력하세요.');
      return;
    }

    await onClickSignIn();
  };

  // 회원가입 버튼 클릭
  const handleSignUpButton = () => {
    alert('모달 띄우기');
  };

  const handleKeyPress = async e => {
    if (e.key === 'Enter') {
      await onClickSignIn();
    }
  };

  const onClickSignIn = () => {
    dispatch(loginAsync(userInfo)).then(res => {
      const { payload } = res;
      const response = payload['response'];

      if (payload['status'] === 200) {
        navigate('/');
      } else {
        if (response) {
          if (response.status === 400) {
            errAlert(response.data.message);
          } else {
            errAlert('An error has occurred.');
          }
        }
      }
    });
  };

  return (
    <LoginCard>
      <Box>
        <Box p={3}>
          <Box pb={3} display="flex" justifyContent="space-between">
            <Typography variant="h3">
              {t(`login.title`)}
            </Typography>
            <Box>
              <HeaderLanguage />
              <HeaderTheme />
            </Box>
          </Box>
          <Box p={1}>
            <Typography variant="h4">{t(`login.id`)}</Typography>
            <TextField
              type="text"
              name="id"
              placeholder={t(`login.id_ph`)}
              fullWidth
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </Box>
          <Box p={1}>
            <Typography variant="h4">{t(`login.password`)}</Typography>
            <TextField
              type="password"
              name="pwd"
              placeholder={t(`login.password_ph`)}
              fullWidth
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </Box>
          <Box p={1}>
            <FormControlLabel
              key="Y"
              name="Y"
              checked={idSaveYn}
              control={
                <Checkbox
                  id="Y"
                  name="Y"
                  value={idSaveYn}
                  onChange={() => setIdSaveYn(!idSaveYn)}
                />
              }
              label={t(`login.save_id`)}
              labelPlacement="end"
            />
          </Box>
          <Box p={1}>
            <Button variant="contained" fullWidth onClick={handleLoginButton}>
              {t(`login.sign_in`)}
            </Button>
          </Box>
        </Box>
      </Box>
    </LoginCard>
  );
}

export default LoginForm;
