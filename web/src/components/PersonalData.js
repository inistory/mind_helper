import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Spinner } from "react-bootstrap";
import { MenuItem, FormControl, Select, FormHelperText, makeStyles, InputLabel, Paper, Grid } from '@material-ui/core'
import { useHistory, useLocation } from "react-router";
import { geoAlbers } from 'd3-geo';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



export default function PersonalData() {
    const apiUrl = '/test/code';
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState(0);
    const [region, setRegion] = useState(0);
    const [ageCode, setAgeCode] = useState({
        ageCode: null,
    });
    const [genderCode, setGenderCode] = useState({
        genderCode: null,
    });
    const [regionCode, setRegionCode] = useState({
        regionCode: null,
    });
    const location = useLocation();
    const [able, setAble] = useState(true);
    // if (location){
    //     setName(location.state.pname);
    //     setAge(location.state.page);
    //     setGender(location.state.pgender);
    //     setRegion(location.state.pregion);
    // }
    useEffect(() => {
        async function getCodeList() {
            let codeId = "age";
            await axios.get(apiUrl + `?code_id=${codeId}`).then((response) => {
                const data = response.data.result;

                const options = data.map((item) => {
                    return (
                        <option key={item.id} value={item.code}>
                            {item.code_nm}
                        </option>
                    );
                });

                setAgeCode(options);
            });

            codeId = "gender";
            await axios.get(apiUrl + `?code_id=${codeId}`).then((response) => {
                const data = response.data.result;

                const options = data.map((item) => {
                    return (
                        <option key={item.id} value={item.code}>
                            {item.code_nm}
                        </option>
                    );
                });

                setGenderCode(options);
            });

            codeId = "region";
            await axios.get(apiUrl + `?code_id=${codeId}`).then((response) => {
                const data = response.data.result;

                const options = data.map((item) => {
                    return (
                        <option key={item.id} value={item.code}>
                            {item.code_nm}
                        </option>
                    );
                });

                setRegionCode(options);
                setIsLoading(false);
            });
        }
        getCodeList();
    }, [isLoading]);

    async function pushdataToPsychometry() {
        if (age.value == '0') {
            alert('????????? ??????????????????');
        }
        else if (gender.value == '0') {
            alert('????????? ??????????????????');
        }
        else if (region.value == '0') {
            alert('???????????? ??????????????????');
        }
        else {
            const userId = await axios.post(`/test/user`, JSON.stringify({
                'user_name': name.value,
                'user_age': age.value,
                'user_gender': gender.value,
                'user_region': region.value
            }), {
                headers: { "Content-Type": "application/json" },
            });
            // const userId = postData()
            // debugger
            // setUserId(temp);
            history.push({
                pathname: "/Psychometry",
                state: {
                    pname: name.value,
                    page: age.value,
                    pgender: gender.value,
                    pregion: region.value,
                    pid: userId.data.result.user_id
                }
            })
        }
    };

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

    // async function postData(){

    //     console.log(response.data.result);
    //     // setUserId(response.data.result.user_id);
    //     debugger
    //     return (response.data.result.user_id)
    // }

    return (
        <Container maxWidth="sm">
            {isLoading ? (
                <Row className="justify-content-md-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
            <div className={useStyles.paper}>
                <CssBaseline />
       
                <Container maxWidth="sm" component="main">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
        
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                    ????????????? ????????? ?????? ?????? ??????????????? ??????????????????.????
                    </Typography>
                    <Typography variant="p" align="center" color="textSecondary" component="p">
                        *???????????? ????????? ????????? ?????? ?????? ????????? ???????????? ????????????.
                    </Typography>
                </Container>
                <Container>
                    <Form.Group controlId="name">
                        <Form.Label>??????</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="????????? ??????????????????"
                            onChange={(e) => {
                            setName(e.target);
                            }}
                        ></Form.Control>
                    </Form.Group>
                </Container>

                <Container>
                    <Form.Group controlId="age">
                        <Form.Label>?????????</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            onChange={(e) => {
                            setAge(e.target);
                            }}
                        >
                            {ageCode.map((option) => {
                            return option;
                            })}
                        </Form.Control>
                    </Form.Group>
                </Container>

                <Container>
                    <Form.Group controlId="gender">
                        <Form.Label>??????</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            onChange={(e) => {
                            setGender(e.target);
                            }}
                        >
                            {genderCode.map((option) => {
                            return option;
                            })}
                        </Form.Control>
                    </Form.Group>
                </Container>
                
                <Container>
                    <Form.Group controlId="region">
                        <Form.Label>?????????</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            onChange={(e) => {
                            setRegion(e.target);
                            }}
                        >
                            {regionCode.map((option) => {
                            return option;
                            })}
                        </Form.Control>
                    </Form.Group>
                </Container>

                <Container>
                    <Button
                        varient="primary"
                        size="large"
                        onClick={pushdataToPsychometry}
                        disabled = {(!name.value || !age.value || !gender.value || !region.value) }
                    >
                            ??????
                    </Button>
                </Container>

                {/* <p>?????? : {name.value}</p>
                <p>?????? : {age.value}</p>
                <p>?????? : {gender.value}</p>
                <p>?????? : {region.value}</p> */}
                
                <hr></hr>
                <a href="https://www.notion.so/86a389ec9b4d4f419ac64e99810fd0de" xs={2}>????????? ??????   </a>
                <a href="/CounselorLogin">    ????????? ??????</a>
            </div>

            )}
        </Container>
    );
}