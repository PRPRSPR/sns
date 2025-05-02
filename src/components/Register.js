import React, {useState, useRef} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function Register() {
  const [files, setFiles] = useState(null);
  let titleRef = useRef();
  let contentRef = useRef();

  const token = localStorage.getItem("token");
  const dToken = jwtDecode(token);
  console.log(dToken);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const fnRegister = ()=> {
    let feedInfo = {
      email : dToken.userEmail,
      title : titleRef.current.value,
      content : contentRef.current.value
    }
    console.log(feedInfo);

    const formData = new FormData();
    formData.append('feedInfo', feedInfo);
    formData.append('FeedImage', files);

    fetch("http://localhost:3005/feed", {
      method : "POST",
      headers : {
          "Content-type" : "application/json"
      },
      body : formData
  })
      .then( res => res.json())
      .then( data => {
          alert(data.message);
          if(data.success){
              
              // navigate("/feed");
          }
      })
      .catch( err => {
          console.log("서버 에러");
      })
  }
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start" // 상단 정렬
        minHeight="100vh"
        sx={{ padding: '20px' }} // 배경색 없음
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>카테고리</InputLabel>
          <Select defaultValue="" label="카테고리">
            <MenuItem value={1}>일상</MenuItem>
            <MenuItem value={2}>여행</MenuItem>
            <MenuItem value={3}>음식</MenuItem>
          </Select>
        </FormControl>

        <TextField inputRef={titleRef} label="제목" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={contentRef} 
          label="내용"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
        />

        <Box display="flex" alignItems="center" margin="normal" fullWidth>
          <input
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {/* {file && (
            <Avatar
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
          )} */}
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {files ? files.name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button onClick={fnRegister} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;