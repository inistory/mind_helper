import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useHistory, useLocation } from "react-router";
import { FormControl, Form, FormLabel, RadioGroup, Radio, TablePagination, Typography} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from '@material-ui/lab/Skeleton';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';



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



export default function Psychometry() {
    const classes = useStyles();


    const history = useHistory();
    const location = useLocation();

    const questionApiUrl = "/test/question?question_id=";
    const itemApiUrl = "/test/questionItem?question_id=";
    const responseApiUrl = "/response/";

    const [name, setName] = useState(location.state.pname);
    const [age, setAge] = useState(location.state.page);
    const [gender, setGender] = useState(location.state.pgender);
    const [region, setRegion] = useState(location.state.pregion);
    const [userId, setUserId] = useState(location.state.pid);
    const [question, setQuestion] = useState();

    const [pageNumber, setPageNumber] = useState(1);
    const [item, setItem] = useState([]);

    const questionlength = 20;
    const arrayAnswer = [];
    for (let i=0;i<questionlength;i++) {
        arrayAnswer.push(0);
    }
    const [answer, setAnswer] = useState(arrayAnswer);

    const [complete, setComplete] = useState(false);

    useEffect(() => {
        async function fetch() {
            const questionResponse = await axios.get(questionApiUrl + pageNumber);
            const pagequestion = questionResponse.data.result[0].question;
            setQuestion(pagequestion);

            const itemResponse = await axios.get(itemApiUrl + pageNumber);
            const item = itemResponse.data.result;
            setItem(item);
        }
        fetch();
    }, [pageNumber]);

    // useEffect(() =>{
    //     async function fetch() {

    //         debugger
    //     };
    //     fetch();
    // }, []);
    //debugger

    const pushdataToResult = () => {
        history.push({
            pathname: `/Result/${userId}`,
            state: {
                panswer: answer,
                pname: name,
                page: age,
                pgender: gender,
                pregion: region,
                puid: userId,
            },
        });
    };

    const responsePost = (responseData) => {
        //response post
        axios.post(responseApiUrl, responseData).then((response) => {
            console.log(response);
        });
    };

    // const pushdataToPersonalData = () =>{
    //     history.push({
    //         pathname: "/PersonalData",
    //         state: {
    //             pname : name,
    //             page : age,
    //             pgender : gender,
    //             pregion : region
    //         }
    //     });
    // };

    return (

        <Box pt={10} paddingLeft ={50} paddingRight ={50}>
        <Container align = "center" >
                <h1>🤖</h1>
                <Typography className={classes.title} component="h1" variant="h5">
                    {question}
                </Typography>
                <br/>
                <br/>

            <Container >
            
                {item.map((items) => (
 
                <Button
                    align = "center"
                    color="primary"
                    padding = {100}
                    fullWidth 
                    style={{ minHeight: '50px', minWidth : '200px'}}
                    variant="outlined"
                    onClick={() => {
                        const changeAnswer = [...answer];
                        changeAnswer[pageNumber - 1] = items.score;
                        setAnswer(changeAnswer);
                        // this.variant="contained";
                        //결과보기 버튼 활성화
                        setTimeout(function(){
                            if (pageNumber == questionlength) {
                                setComplete(true);
                            } else {
                                setPageNumber(pageNumber + 1);
                            }
                        }, 300);

                        const responseData = {
                            response_score: items.score,
                            question_id: pageNumber,
                            user_id: userId,
                        };
                        responsePost(responseData);

                    }}>
                    {items.question_item}
                </Button>
                
           
                ))}
                
            
                    <br/>
                    <br/>
                    <br/>
                {/*
                <Pagination
                    count={20}
                    alignItems="center"
                    onChange={(e) => {
                        setPageNumber(parseInt(e.target.innerText));
                        // debugger
                    }}/>  */}
       
            </Container>
            
            {/* <Button variant="contained" onClick={clickAnswer}>{pageAnswer}</Button> */}
            {/* <Button variant="contained" color="primary" onClick={pushdataToPersonalData}>이전으로</Button> */}
  
            <br/>
            <br/>
            <br/>


                <Button
                    variant="contained"
                    color="primary"
                    onClick={pushdataToResult}
                    disabled={!complete}
                    style={{ minHeight: '50px', minWidth : '180px'}}
                >
                    결과보기
                </Button>


            
        </Container>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <div>
                <hr></hr>
                <a href="https://www.notion.so/86a389ec9b4d4f419ac64e99810fd0de">
                    서비스 소개
                </a>{" "}
                <a href="/CounselorLogin">상담사 전용</a>
        </div>
        </Box>
        


 


    );
}