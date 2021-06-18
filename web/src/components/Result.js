import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container,  Paper, useTheme } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import Box from '@material-ui/core/Box';

import StackedBarChart from "./data_visualization/StackedBarChart";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import './data_visualization/App.css';
import ReactTooltip from 'react-tooltip';

import wordcloud from './data_visualization/wordcloud.png';
import GroupedbarChart from "./data_visualization/GroupedbarChart";

// 
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ( {
  '@global': {
    ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },
    },
    subheader : {
        fontSize: 12,
    }
    ,
    topContainer : {
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
        paddingTop: '56.25%', // 16:9
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(3),
    },
    mapContainer: {
        marginBottom: 100,

    }, 
    mapContainer1: {
      marginBottom: 50,
      marginTop: 150,
      marginLeft: 50
  }, 
    cardGrid: {
        marginBottom: 100
    },
    paper : {
      padding : theme.spacing(2),
      textAlign : "Left",
      color : theme.palette.text.secondary,
      },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      //   width: 600,
      //   marginLeft: 'auto',
      //   marginRight: 'auto',
      // },
    },    
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(5),
      backgroundImage: 'url(https://images.unsplash.com/photo-1490735891913-40897cdaafd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
        paddingRight: 0,
      },
    },
    btnMail: {
      marginLeft: 500
    }
})); 

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 10,

  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 10,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

/*--------------------------------------*/

const allKeys = ["남성", "여성"];

const colors = {
  "남성": "#1c4c84",
  "여성": "#bb3736"
};

/*--------------------------------------*/

// Geo data 
const KOREA_TOPO_JSON = require('./data_visualization/skorea-provinces-2018-topo.json');

const PROJECTION_CONFIG = {
  scale: 4000,
  center: [127.5183, 35.7175] // 경기도 중심좌표 [East Latitude, North Longitude]
};

// Blue Variants
const COLOR_RANGE = [
  ' #d5e4f6',
  '#abcaed',
  '#81afe4',
  '#5795db',
  '2d7ad23',
  '#2462a8',
  '#1c4c84',
  '#163d69',
  '#0d253f'
];

const DEFAULT_COLOR = '#EEE';


const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

const getHeatMapData = () => {
  return [
    { code: '32', state: '강원도', value: 22.01 },
    { code: '31', state: '경기도', value: 22.57},
    { code: '38', state: '경상남도', value: 16.66 },
    { code: '37', state: '경상북도', value: 14.15 },
    { code: '24', state: '광주광역시', value: 21.66 },
    { code: '22', state: '대구광역시', value: 18.22 },
    { code: '25', state: '대전광역시', value: 16.96 },
    { code: '21', state: '부산광역시', value: 22.87 },
    { code: '11', state: '서울특별시', value: 20.05 },
    { code: '29', state: '세종특별자치시', value: 18.72 },
    { code: '26', state: '울산광역시', value: 21.16 },
    { code: '23', state: '인천광역시', value: 18.05 },
    { code: '36', state: '전라남도', value: 15.75 },
    { code: '35', state: '전라북도', value: 19.14},
    { code: '39', state: '제주특별자치도', value: 17.1 },
    { code: '34', state: '충청남도', value: 19.25 },
    { code: '33', state: '충청북도', value: 18.08 },
  ];
};

/*--------------------------------------*/

export default function Result() {
  const classes = useStyles();
  const apiUrl = '/test/responseScore'
  const [score, setScore] = useState();
  const [name, setName] = useState();
  const [region, setRegion] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [keys, setKeys] = useState(allKeys);
  const [cause, setCause] = useState();
  const [desc, setDesc] = useState();
  const [mail, setMail] = useState(false);
  const [reportTitle, setReportTitle] = useState();
  const [reportDesc, setReportDesc] = useState();
  

  const { id } = useParams();
  // const [data_2, setData_2] = useState([
  //   {
  //     year: "20대",
  //     "남성": 8.70,
  //     "여성": 19.38,
  //   },
  //   {
  //     year: "30대",
  //     "남성": 11.77,
  //     "여성": 16.03,
  //   },
  //   {
  //     year: "40대",
  //     "남성": 11.95,
  //     "여성": 12.32,

  //   },
  //   {
  //     year: "50대",
  //     "남성": 7.77,
  //     "여성": 11.11,

  //   },
  //   {
  //     year: "60대",
  //     "남성": 5.69,
  //     "여성": 9.83,
  
  //   },

  //   {
  //     year: "70대",
  //     "남성": 4.38,
  //     "여성": 7.78,
    
  //   }
  // ]);

/*--------------------------------------*/

  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };



/*--------------------------------------*/

  useEffect(() => {
    /* awards get */
    console.log(id)
    const getScore = () => {
      axios.get(`/responseScore/?user_id=${id}`, {})
        .then(response => {
          console.log(response.data)
          setScore(response.data.result[0].score);
          setName(response.data.result[0].user_name);
          setRegion(response.data.result[0].user_region_nm);
          setAge(response.data.result[0].user_age_nm);
          setGender(response.data.result[0].user_gender_nm);
          
        })
    }
    const getMessage = ()=> {
      axios.get(`/message/?user_id=${id}`,{})
        .then(response => {
          console.log(response.data)
          setCause(response.data.result[0].message_cause);
          setDesc(response.data.result[0].message_desc);
          
        })
    }
    const getReport = ()=> {
      axios.get(`/report/report?user_id=${id}`,{})
        .then(response => {
          setReportTitle(response.data.result[0].title);
          setReportDesc(response.data.result[0].desc);
          console.log(response.data)
        })
    }
      getMessage();
      getScore();
      getReport();
  }, [])
  
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
      <Container className={classes.topContainer} />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          우울 진단 테스트 결과 📑
        </Typography>
        <Typography variant="h4" align="center" color="textSecondary" component="p">
          {name}님의 우울 지수는 {score}점 / 60점 입니다.
        </Typography>
      </Container>
      <Box display="flex" alignItems="center" marginLeft={60} marginRight={60}>
        <Box minWidth={35}>
          <Typography variant="h3" color="textSecondary">0</Typography>
        </Box>
        <Box width="100%" mr={1}>
          <BorderLinearProgress variant="determinate" value={score / 60 * 100} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="h3" color="textSecondary">60</Typography>
        </Box>
      </Box>
      <br />
        <br />  <br />
        <br />
      <Container maxWidth="md" component="main" className={classes.mapContainer}>
      
        <br />
        <br />
        <br />


    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }}  />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {reportTitle}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
            {reportDesc}
            </Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <Grid item />
        <Button href="/recommend" variant="contained" color="primary" className={classes.mapContainer1}>
            솔루션 보기</Button>
        </Grid>
      </Grid>
    </Paper>
    <br />
        <br />
        {/*-------------------------편지---------------------------*/}

        <Typography component="h3" variant="h4" align="center" color="textPrimary">
          {name}님과 비슷한 연령대의 여행자님들께 보내드리는 <br />
      마인드 헬퍼의 편지가 궁금하다면?<br />
        </Typography>
        <br />
        <br />

          <br />
          <div className="">
            <Button className="btnMail" variant="contained" color="primary" onClick={() => { setMail(!mail) }}>
              {
                mail
                  ? '닫기'
                  : '편지확인하기'
              }
            </Button>
          </div>
          {
            mail
            &&
            <Typography component="h3" variant="h4" align="center" color="textPrimary">
            {desc}</Typography>
          }
          <br />
          <br />
          <br />

          <br />
        <br />

        {/*-------------------------연령별 / 성별 우울 정도---------------------------*/}


        <div className={classes.root}>
          <h1> 인포그래픽</h1>

          <br />
          <br />
          <br />
          <Grid container spacing={10} >
            <Grid item sm={5} >
              <Paper className={classes.paper}>

                <h5>오른쪽 그래프는 대한민국 사람들에게 우울감을 느끼는 지 물어봤을 때 약간, 중간, 심함 정도를 모두 포함하여 우울하다고 대답한 사람들의 연령별, 성별 비율이에요.<br /><br />
                  {name}님과 같은 {age} {gender}의 경우 다음 그래프에서 확인할 수 있습니다. <br /> <br />
                  {age} {gender}의 경우 {cause} 으로 우울감을 느끼고 상담을 받는다고 해요 </h5>
              </Paper>
            </Grid>

            <Grid item sm={7} >
              <h3>연령별, 성별 우울 정도 (단위 : %) </h3><br />
              <GroupedbarChart />
              <br />
            </Grid>
          </Grid>



          {/*-------------------------지역별 우울 정도---------------------------*/}
          <br />
          <br />
          <br />
          <br />
          <Grid container spacing={10}>
            <Grid item sm={5}>
              <Paper className={classes.paper}>

                <h5>오른쪽 그래프는 우울감을 느끼는 지 물어봤을 때
            지역별로 약간, 중간, 심한 정도를 모두 포함하여 그렇다고 대답한 대한민국 사람들의 비율이에요. <br /> <br />
            통계에 따르면 거주 지역이 우울감에 영향을 미칠 수 있다고 해요. <br /> <br />
                  {name}님과 같이 {region}에 거주하는 사람들은 얼마나 되는지 지도에서 확인해보세요. </h5>
              </Paper>
            </Grid>

            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <br />
            <br />
            <br />

            <Grid item sm={7}>
              <h3>지역별 우울 정도 (단위 : %)</h3><br />
              <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={600}
                height={200}
                data-tip=""
              >
                <Geographies geography={KOREA_TOPO_JSON}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      //console.log(geo.id);
                      const current = data.find(s => s.code === geo.properties.code);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                          style={geographyStyle}
                          onMouseEnter={onMouseEnter(geo, current)}
                          onMouseLeave={onMouseLeave}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

            </Grid>
          </Grid>


          {/*------------------------- 워드크라우드 ---------------------------*/}
          <br />
          <br />
          <br />
          <br />
          <Grid container spacing={10}>
            <Grid item sm={5}>
              <Paper className={classes.paper}>

                <h5> 실시간 힐링 키워드 정보를 확인해보세요 </h5>
              </Paper>
            </Grid>

            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <br />
            <br />
            <br />

            <Grid item sm={7}>
              <h3> 힐링 키워드  </h3><br />
              <img src={wordcloud} alt="Logo" height="240" width="" />;

        </Grid>
          </Grid>

          <br />
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />



      </Container>
              </main>

    </React.Fragment>
  );
  
}
