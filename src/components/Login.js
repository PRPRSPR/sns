import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography, Paper } from '@mui/material'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일/비밀번호를 입력해주세요.');
      return;
    }

    try {
      fetch("http://localhost:3005/member", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          pwd: password
        })
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          if (data.success) {
            localStorage.setItem("token", data.token);
            navigate("/feed");
          }
        })
        .catch(err => {
          console.log("서버 에러");
        })

    } catch (error) {
      setError('Error logging in. Please try again later.');
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" fontFamily="'Segoe UI', sans-serif">
          Instagram
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <TextField
          fullWidth
          label="사용자 이메일"
          margin="normal"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="비밀번호"
          margin="normal"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 1 }}
          onClick={handleLogin}
        >
          로그인
        </Button>
        <Typography variant="body2" color="text.secondary">
          <span style={{ color: '#1976d2', cursor: 'pointer' }}>비밀번호를 잊으셨나요?</span>
        </Typography>
      </Paper>

      <Paper elevation={1} sx={{ mt: 2, p: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          아직 계정이 없으신가요? <span style={{ color: '#1976d2', cursor: 'pointer' }}>회원가입</span>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
