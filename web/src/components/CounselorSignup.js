import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(8)
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
    // email:yup
    //   .string()
    //   .email("이메일 형식으로 입력하세요")
    //   .required("아이디를 입력해주세요"),
    // password: yup
    //   .string()
    //   .min(8, '8자리 이상으로 만들어주세요')
    //   .max(16)
    //   .matches("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$","비밀번호는 영문/ 숫자/ 특수문자를 모두 포함해야 합니다.")
    //   .required("비밀번호를 입력해주세요")
    //   ,
    // confirm: yup
    //   .string()
    //   .oneOf([yup.ref('password'), null],
    //     '비밀번호가 일치하지 않습니다.')
    //   .required("비밀번호를 한 번 더 입력해주세요."),

    // name: yup
    //   .string()
    //   .required("이름을 입력해주세요.")
  });



export default function CounselorSignup(){
    const classes = useStyles();

    const apiUrl = '/auth/signup'
    const history = useHistory();

    const signUp = (data) => {
        axios.post(apiUrl, data)
            .then(response => {
                if(response.data.status === "success") {
                    alert("회원가입이 완료되었습니다.");
                    history.push({
                        pathname: "/CounselorLogin",
                    });
                } else {
                    alert(response.data.result.error);
                }
            });
    };

    return(
            <Formik
                validationSchema={schema}
                onSubmit={values => {
                    signUp(values);
                }}
                initialValues={{
                    email: '',
                    password: '',
                    confirm: '',
                    name: '',
                    phone: ''
                }}
                >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                }) => (
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                      <Avatar className={classes.avatar}>
                        <FavoriteBorderIcon />
                      </Avatar>
                      <Typography className={classes.title} component="h1" variant="h5">
                        헬퍼(상담가) 회원가입
                      </Typography>
                      <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              id="email"
                              label="Email"
                              name="email"
                              type="email"
                              value={values.email} 
                              onChange={handleChange}
                              autoFocus
                            />
                            <ErrorMessage name="email" component="p" /> 
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="password"
                              label="비밀번호"
                              type="password"
                              id="password"
                              value={values.password} 
                              onChange={handleChange}
                            />
                            <ErrorMessage name="password" component="p" />
              
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="confirm"
                              label="비밀번호 확인"
                              type="password"
                              id="password"
                              value={values.confirm} 
                              onChange={handleChange}
                            />
                            <ErrorMessage name="confirm" component="p" />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              autoComplete="fname"
                              name="name"
                              variant="outlined"
                              required
                              fullWidth
                              id="name"
                              label="상담가명"
                              value={values.name} 
                              onChange={handleChange}
                            />
                            <ErrorMessage name="name" component="p" />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              id="phone"
                              label="연락처"
                              name="phone"
                              value={values.phone} 
                              onChange={handleChange}
                            />
                            <ErrorMessage name="phone" component="p" />
                          </Grid>
              
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={<Checkbox value="allowExtraEmails" color="primary" />}
                              label="마인드헬퍼의 서비스 약관에 동의합니다."
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          회원가입
                        </Button>
                        <Grid container justify="flex-end">
                          <Grid item>
                            <Link to="/CounselorLogin" variant="body2">
                              {"이미 회원가입이 되어있다면? 로그인하기"}
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
