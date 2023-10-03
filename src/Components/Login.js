 import * as React from 'react';
import { useContext,useState } from 'react';
// import {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import './Login.css'
import insta from '../Assets/Instagram.JPG'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link} from  'react-router-dom';
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import { AuthContext } from '../Context/AuthContext';
// import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const store=useContext(AuthContext);
    console.log(store);
    const useStyles = makeStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        text2:{
            textAlign:'center'
        },
        card2:{
            height:'7vh',
            marginTop:'2%'
        }
    })
    const classes = useStyles();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [error,setError]=useState('');
    const[loading,setLoading]=useState(false);
    const navigate = useNavigate();
    const {login}=useContext(AuthContext);
   
    const handleClick=async()=>{
try{
    setError('');
    setLoading(true)
    try{
    let res=await login(email,password);
    setLoading(false);
    navigate("/");
    }
   catch(err){
    let crux=err.message+"";
    // console.log(crux);
    // console.log(typeof crux);
    // console.log(crux.substr(10));
    let error=crux.substr(10);
    // console.log(error);
    // setError(""+error);
    setError(error+"")
    setTimeout(()=>{
        setError('')
    },2000);
    setLoading(false)
   }
    
}catch(err)
{
    setError(err);
    setTimeout(()=>{
        setError('')
    },2000);
    setLoading(false)
}
    }
    const {forgotPassword}=useContext(AuthContext);
    const forgotPasswordHandler=async()=>{
        //     console.log("forgot");
            // console.log(email)
        if(email){
            // console.log(email)
            setLoading(true)
            let res=await forgotPassword(email);
            setLoading(false);
        }
        else
        alert('hello');
        }

  return (
      <div className="loginWrapper">
          <div className="imgcar" style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
              <div className="car">
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={5}
                    // step={3}
                    naturalSlideWidth={238}
                    naturalSlideHeight={423}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={false}
                >
                    <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
                    </Slider>
                </CarouselProvider>
              </div>
          </div>
          <div className="loginCard">
            <Card variant="outlined">
                <div className="insta-logo">
                    <img src={insta} alt="" />
                </div>
                <CardContent>
                    {error!=''&& <Alert severity="error">{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined"  fullWidth={true} margin="dense" size="small" onChange={(e)=>setPassword(e.target.value)} />
                    <Typography className={classes.text2} color="primary" variant="subtitle1" onClick={()=>forgotPasswordHandler}>
                     <Button color="primary" fullWidth={true} variant="contained" onClick={forgotPasswordHandler} >
                    Forgot Password
                    </Button>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" fullWidth={true} variant="contained" onClick={handleClick} disabled={loading} >
                    Log in
                    </Button>
                </CardActions>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Don't have an account ? <Link to="/signup" style={{textDecoration:'none'}}>Signup</Link>
                    </Typography>
                </CardContent>
            </Card>
          </div>
      </div>
    
  );
}