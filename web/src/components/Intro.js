import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import imgRobot from './image/robot.png';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    title: {
        margin: theme.spacing(2),
      },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

  }));


export default function Intro(){


    return(


     <Container align = "center" >
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

     <img src={imgRobot}  height="240" width = ""/>;

      <br/>
      <br/>
      <h1>마인드 헬퍼</h1>
      <br/>
      <br/>

      <h3>지금 나는 우울증을 겪고 있는 것일까?</h3>
      <br/>
   
      <Box width = {1200}>
      <Button color = "outline" variant = "contained" >
     <h1> <Link to="/personaldata" color="secondary" >
       바로 진단시작하기
      </Link> </h1>
      </Button>
      </Box>
    </Container>
    

    );
}