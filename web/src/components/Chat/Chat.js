import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";

import "./Chat.css";

const ENDPOINT = "http://localhost:3001";

let socket;

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  subheader: {
    fontSize: 12,
  },
  topContainer: {
    padding: theme.spacing(4, 0, 2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    marginBottom: 50,
  },
  cardHeader: {
    padding: theme.spacing(4, 0, 2),
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(3),
  },
  mapContainer: {
    marginBottom: 100,
  },
  cardGrid: {
    marginBottom: 0,
  },
}));

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.topContainer} />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          채팅 서비스😊
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          당신의 오늘은 안녕하신가요?
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          지금 바로 전문 심리상담사와 일대일 원격 상담이 가능합니다.
        </Typography>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://images.unsplash.com/photo-1590341328520-63256eb32bc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGxlZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  슈퍼맨
                </Typography>
                <Typography>
                  당신의 마음에 공감하는 따뜻한 상담사가 되겠습니다.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} className={classes.cardGrid}>
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </Grid>
        </Grid>
      </Container>
      <div>
            <a href="https://www.notion.so/86a389ec9b4d4f419ac64e99810fd0de" xs={2}>서비스 소개</a>
                &nbsp;&nbsp;
                <a href="/CounselorLogin">상담사 전용</a>
            </div>

    </React.Fragment>
  );
};

export default Chat;
