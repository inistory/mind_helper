import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const schema = yup.object().shape({
//     email: yup
//       .string()
//       .email("이메일 형식으로 입력하세요")
//       .required("아이디를 입력해주세요"),
//     password: yup
//       .string()
//   // .min(8, '8자리 이상으로 만들어주세요')
//         // .max(16)
//         // .matches("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$","비밀번호는 영문/ 숫자/ 특수문자를 모두 포함해야 합니다.")
//       .required("비밀번호를 입력해주세요")
  });

export default function CounselorLogin(){
    const classes = useStyles();

    const apiUrl = '/auth/login'
    const history = useHistory();
    
    const login = (data) => {
        axios.post(apiUrl, data)
            .then(response => {
                if(response.data.status === "success") {
                    const access_token = response.data.result.access_token;
                    localStorage.setItem('access_token', access_token);

                    loginToChatCounselor();
                } else {
                    alert(response.data.result.error);
                }
            });
    }


    const loginToChatCounselor = () =>{
        history.push({
            pathname: "/ChatCounselor",
        })
    };

    return(
        <Formik
            validationSchema={schema}
            onSubmit={values => {
                login(values);
            }}
            initialValues={{
                email: '',
                password: '',
            }}
            >
            {({
                handleSubmit,
                handleChange,
                values
            }) => (
                <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FavoriteIcon />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          헬퍼(상담가) 로그인
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email} 
            onChange={handleChange}
          />
          <ErrorMessage name="email" component="p" />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password} 
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                패스워드 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link to="/CounselorSignup" variant="body2">
                {"헬퍼가 되어주세요! 상담가 회원가입"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
            )}
        </Formik>
    );
}