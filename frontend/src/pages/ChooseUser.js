import { AccountCircle, Group, School } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Popup from '../components/Popup';
import { loginUser } from '../redux/userRelated/userHandle';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <WelcomeText>
        <span>Welcome to Edumaster360 Elearning Management System</span>
      </WelcomeText>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {["Admin", "Student", "Teacher"].map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard onClick={() => navigateHandler(role)}>
                <Box mb={2}>
                  {role === "Admin" && <AccountCircle fontSize="large" />}
                  {role === "Student" && <School fontSize="large" />}
                  {role === "Teacher" && <Group fontSize="large" />}
                </Box>
                <StyledTypography>{role}</StyledTypography>
                <CardDescription>
                  {role === "Admin"
                    ? "Login as an administrator to access the dashboard to manage app data."
                    : role === "Student"
                    ? "Login as a student to explore course materials and assignments."
                    : "Login as a teacher to create courses, assignments, and track student progress."}
                </CardDescription>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Animations
const marquee = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #6a11cb, #2575fc);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  color: white;
`;

const WelcomeText = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 10px 0;
  margin-bottom: 1rem;
  color: #f8f8f2;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;

  span {
    display: inline-block;
    padding-left: 100%;
    animation: ${marquee} 15s linear infinite;
    color: #f1c40f;
  }
`;

const StyledCard = styled(Paper)`
  height: 220px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: #2c3e50; /* Dark background for better contrast */
  color: black; /* Change text color to black */
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #34495e;
    color: #ecf0f1;
    transform: scale(1.05);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent overlay */
    border-radius: 8px;
    z-index: -1; /* Ensure overlay is behind text */
  }
`;

const StyledTypography = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: black; /* Ensure text is visible and black */
  text-shadow: none; /* Remove shadow to make the text solid black */
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: black; /* Change description text to black */
  text-shadow: none; /* Remove shadow */
`;

