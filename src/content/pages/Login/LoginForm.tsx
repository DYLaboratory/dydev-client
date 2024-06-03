import { Box, Button, Card, Checkbox, FormControlLabel, Grid, styled, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { hasText } from 'src/utils/stringUtils';

/* style (s) */
const LoginTextField = styled(TextField)`
  width: 100%;
`

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
/* style (e) */

/* type(s) */
interface UserInfoTypes {
  userId: string;
  password: string;
}
/* type(e) */

function LoginForm() {
  const [idSaveYn, setIdSaveYn] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfoTypes>({
    userId: "",
    password: ""
  });

  // input box control
  const handleInputChange = e => {
    const { name, value } = e.target;
    if(name === 'id') {
      setUserInfo({...userInfo, userId: value});
    } else if (name === 'pwd') {
      setUserInfo({...userInfo, password: value});
    }
  }

  // 로그인 버튼 클릭
  const handleLoginButton = () => {
    if (hasText(userInfo.userId)) {
      alert('아이디를 입력하세요');
      return;
    }
    if (hasText(userInfo.password)) {
      alert('비밀번호를 입력하세요');
      return;
    }

    onClickSignIn()
  }
  
  // 회원가입 버튼 클릭
  const handleSignUpButton = () => {
    alert("모달 띄우기");
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onClickSignIn();
    }
  }

  const onClickSignIn = () => {

  }
  
  return (
      <Card>
        <Grid spacing={0} container>
          <Grid item md={12}>
            <Box p={3}>
              <Typography sx={{ pb: 3 }} variant="h3">
                LOGIN
              </Typography>
              <Box p={1}>
                <Typography variant="h4">ID</Typography>
                <LoginTextField type="text" name="id" placeholder="Enter your ID" onChange={handleInputChange} onKeyPress={handleKeyPress} />
              </Box>
              <Box p={1}>
                <Typography variant="h4">PASSWORD</Typography>
                <LoginTextField type="password" name="pwd" placeholder="Enter your Password" onChange={handleInputChange} onKeyPress={handleKeyPress} />
              </Box>
              <Box p={1}>
                <FormControlLabel
                    key='Y'
                    name="Y"
                    checked={idSaveYn}
                    control={
                      <Checkbox
                          id='Y'
                          name='Y'
                          value={idSaveYn}
                          onChange={() => setIdSaveYn(!idSaveYn)}
                      />
                    }
                    label='Save ID'
                    labelPlacement='end'
                />
              </Box>
              <Box p={1}>
                <Button variant="contained" fullWidth={true} onClick={handleLoginButton}>Login</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
  )
}

export default LoginForm;