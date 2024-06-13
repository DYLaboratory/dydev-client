import { Box, Button, Card, Checkbox, FormControlLabel, Grid, styled, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { hasText } from "src/utils/stringUtils";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { loginAsync } from "src/features/auth/authSlice";
import { LoginData } from "src/models/data/dataModels";

/* style (s) */
const LoginTextField = styled(TextField)`
  width: 100%;
`;

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
/* style (e) */

const checkLogin = () => {

}

function LoginForm() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.user).isLogin;

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
    if (hasText(userInfo.userId)) {
      alert('아이디를 입력하세요');
      return;
    }
    if (hasText(userInfo.password)) {
      alert('비밀번호를 입력하세요');
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
            alert(response.data.message);
          } else {
            alert('An error has occurred.');
          }
        }
      }
    });
  };

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item md={12}>
          <Box p={3}>
            <Typography sx={{ pb: 3 }} variant="h3">
              SIGN IN
            </Typography>
            <Box p={1}>
              <Typography variant="h4">ID</Typography>
              <LoginTextField
                type="text"
                name="id"
                placeholder="Enter your ID"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </Box>
            <Box p={1}>
              <Typography variant="h4">PASSWORD</Typography>
              <LoginTextField
                type="password"
                name="pwd"
                placeholder="Enter your Password"
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
                label="Save ID"
                labelPlacement="end"
              />
            </Box>
            <Box p={1}>
              <Button variant="contained" fullWidth onClick={handleLoginButton}>
                SIGN IN
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LoginForm;
