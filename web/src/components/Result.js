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

const allKeys = ["??????", "??????"];

const colors = {
  "??????": "#1c4c84",
  "??????": "#bb3736"
};

/*--------------------------------------*/

// Geo data 
const KOREA_TOPO_JSON = require('./data_visualization/skorea-provinces-2018-topo.json');

const PROJECTION_CONFIG = {
  scale: 4000,
  center: [127.5183, 35.7175] // ????????? ???????????? [East Latitude, North Longitude]
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
    { code: '32', state: '?????????', value: 22.01 },
    { code: '31', state: '?????????', value: 22.57},
    { code: '38', state: '????????????', value: 16.66 },
    { code: '37', state: '????????????', value: 14.15 },
    { code: '24', state: '???????????????', value: 21.66 },
    { code: '22', state: '???????????????', value: 18.22 },
    { code: '25', state: '???????????????', value: 16.96 },
    { code: '21', state: '???????????????', value: 22.87 },
    { code: '11', state: '???????????????', value: 20.05 },
    { code: '29', state: '?????????????????????', value: 18.72 },
    { code: '26', state: '???????????????', value: 21.16 },
    { code: '23', state: '???????????????', value: 18.05 },
    { code: '36', state: '????????????', value: 15.75 },
    { code: '35', state: '????????????', value: 19.14},
    { code: '39', state: '?????????????????????', value: 17.1 },
    { code: '34', state: '????????????', value: 19.25 },
    { code: '33', state: '????????????', value: 18.08 },
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
  //     year: "20???",
  //     "??????": 8.70,
  //     "??????": 19.38,
  //   },
  //   {
  //     year: "30???",
  //     "??????": 11.77,
  //     "??????": 16.03,
  //   },
  //   {
  //     year: "40???",
  //     "??????": 11.95,
  //     "??????": 12.32,

  //   },
  //   {
  //     year: "50???",
  //     "??????": 7.77,
  //     "??????": 11.11,

  //   },
  //   {
  //     year: "60???",
  //     "??????": 5.69,
  //     "??????": 9.83,
  
  //   },

  //   {
  //     year: "70???",
  //     "??????": 4.38,
  //     "??????": 7.78,
    
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
          ?????? ?????? ????????? ?????? ????
        </Typography>
        <Typography variant="h4" align="center" color="textSecondary" component="p">
          {name}?????? ?????? ????????? {score}??? / 60??? ?????????.
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
            ????????? ??????</Button>
        </Grid>
      </Grid>
    </Paper>
    <br />
        <br />
        {/*-------------------------??????---------------------------*/}

        <Typography component="h3" variant="h4" align="center" color="textPrimary">
          {name}?????? ????????? ???????????? ?????????????????? ??????????????? <br />
      ????????? ????????? ????????? ????????????????<br />
        </Typography>
        <br />
        <br />

          <br />
          <div className="">
            <Button className="btnMail" variant="contained" color="primary" onClick={() => { setMail(!mail) }}>
              {
                mail
                  ? '??????'
                  : '??????????????????'
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

        {/*-------------------------????????? / ?????? ?????? ??????---------------------------*/}


        <div className={classes.root}>
          <h1> ???????????????</h1>

          <br />
          <br />
          <br />
          <Grid container spacing={10} >
            <Grid item sm={5} >
              <Paper className={classes.paper}>

                <h5>????????? ???????????? ???????????? ??????????????? ???????????? ????????? ??? ???????????? ??? ??????, ??????, ?????? ????????? ?????? ???????????? ??????????????? ????????? ???????????? ?????????, ?????? ???????????????.<br /><br />
                  {name}?????? ?????? {age} {gender}??? ?????? ?????? ??????????????? ????????? ??? ????????????. <br /> <br />
                  {age} {gender}??? ?????? {cause} ?????? ???????????? ????????? ????????? ???????????? ?????? </h5>
              </Paper>
            </Grid>

            <Grid item sm={7} >
              <h3>?????????, ?????? ?????? ?????? (?????? : %) </h3><br />
              <GroupedbarChart />
              <br />
            </Grid>
          </Grid>



          {/*-------------------------????????? ?????? ??????---------------------------*/}
          <br />
          <br />
          <br />
          <br />
          <Grid container spacing={10}>
            <Grid item sm={5}>
              <Paper className={classes.paper}>

                <h5>????????? ???????????? ???????????? ????????? ??? ???????????? ???
            ???????????? ??????, ??????, ?????? ????????? ?????? ???????????? ???????????? ????????? ???????????? ???????????? ???????????????. <br /> <br />
            ????????? ????????? ?????? ????????? ???????????? ????????? ?????? ??? ????????? ??????. <br /> <br />
                  {name}?????? ?????? {region}??? ???????????? ???????????? ????????? ????????? ???????????? ??????????????????. </h5>
              </Paper>
            </Grid>

            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <br />
            <br />
            <br />

            <Grid item sm={7}>
              <h3>????????? ?????? ?????? (?????? : %)</h3><br />
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


          {/*------------------------- ?????????????????? ---------------------------*/}
          <br />
          <br />
          <br />
          <br />
          <Grid container spacing={10}>
            <Grid item sm={5}>
              <Paper className={classes.paper}>

                <h5> ????????? ?????? ????????? ????????? ?????????????????? </h5>
              </Paper>
            </Grid>

            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <br />
            <br />
            <br />

            <Grid item sm={7}>
              <h3> ?????? ?????????  </h3><br />
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
