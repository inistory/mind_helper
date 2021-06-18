import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";

import SearchPlace from "./map/SearchPlace";
import SearchHealingPlace from "./map/SearchHealingPlace";

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
    marginBottom: 100,
  },
}));

export default function Pricing() {
  const classes = useStyles();

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
          🥕맞춤 솔루션
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          당신의 근처에서 심신을 쉬어가게 하는 공간을 추천합니다.
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          *현재 위치 정보 수집에 동의해주세요.
        </Typography>
      </Container>
      <Container
        maxWidth="md"
        component="main"
        className={classes.mapContainer}
      >
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
            <Card>
              <CardHeader
                title="내 주변 상담센터"
                subheader="근처에 상담을 받을 수 있는 곳이 있답니다!"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <SearchPlace></SearchPlace>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader
                title="내 주변 힐링 장소"
                subheader="근처 공원에서 산책하고 맛있는 식사를 하는건 어떨까요?"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <SearchHealingPlace />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          상담 서비스😊
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
              <CardActions>
                <Button size="small" color="primary" href="/chat?name=user02&room=Superman">
                  <ForumOutlinedIcon />
                  상담하기
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://images.unsplash.com/photo-1599744249110-8590cac79900?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGxlZ298ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                title="Image title"
              ></CardMedia>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  해리포터
                </Typography>
                <Typography>
                  있는 그대로의 나를 수용하고 자기 자신으로 살아갈 수 있도록
                  돕겠습니다.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  <ForumOutlinedIcon />
                  상담하기
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.cardGrid}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://images.unsplash.com/photo-1518946222227-364f22132616?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGxlZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  유니콘
                </Typography>
                <Typography>
                  당신의 감정이 강점이 될 수 있도록 함께 하겠습니다.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  <ForumOutlinedIcon />
                  상담하기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
