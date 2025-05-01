import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Avatar, Grid, Paper, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';

function MyPage() {
  let [userInfo, setUserInfo] = useState({userName : "", email:"", intro:"", profileImg:""});
  let [refreshKey, setRefreshKey] = useState(0);
  let [open, setOpen] =useState(false);
  let [imgUrl, setImgUrl] = useState();
  let [file, setFile] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token);
  if(!token){
    navigate("/");
  }
  const dToken = jwtDecode(token);
  
  
  
  const selectImg = (e)=>{
    const file = e.target.files[0];
    if(file){
      const imgUrl = URL.createObjectURL(file);
      setImgUrl(imgUrl);
      setFile(file);
    }
  }
  const fnProfile = ()=>{
    const formData = new FormData();
    formData.append('email', userInfo.email);
    formData.append('profileImage', file);
    
    fetch("http://localhost:3005/member", {
      method: "PUT",
      body: formData
    })
    .then(res=>res.json())
    .then(data=>{
      alert(data.message);
      setOpen(false);
      setRefreshKey(prev => prev+1);
    })
  }
  useEffect(()=>{
    fetch("http://localhost:3005/member/"+dToken.userEmail)
    .then(res => res.json())
      .then(data => {
        console.log(data);
        setUserInfo(data.info);
      });
  },[refreshKey, dToken.userEmail])

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src={userInfo.profileImg ? "http://localhost:3005/"+userInfo.profileImg : "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"} 
              sx={{ width: 100, height: 100, marginBottom: 2 }}
              onClick={()=>{setOpen(!open)}}
            />
            <Typography variant="h5">{userInfo.userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo.email}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">150</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">100</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">50</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              {userInfo.intro}
            </Typography>
          </Box>
        </Paper>
        <Dialog open={open}>
          <DialogTitle>이미지 수정</DialogTitle>
          <DialogContent>
            <label>
              <input onChange={selectImg} type='file' accept='image/*' style={{display:"none"}}></input>
              <Button variant='outlined' component="span">이미지 선택</Button>
              {!imgUrl ? "선택된 파일 없음" : "선택 완료"}
            </label>
          </DialogContent>
          {imgUrl && (
            <Box mt={2}>
              <Typography variant='h5' >미리보기</Typography>
              <Avatar
                alt="프로필 이미지 미리보기"
                src={imgUrl} 
                sx={{ width: 100, height: 100, marginBottom: 2 }}
                onClick={()=>{setOpen(!open)}}
              />
            </Box>
          )}
          <DialogActions>
            <Button onClick={fnProfile} variant='contained'>저장</Button>
            <Button onClick={()=>{
              setOpen(false);
              setImgUrl(null);
            }} variant='outlined'>취소</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default MyPage;