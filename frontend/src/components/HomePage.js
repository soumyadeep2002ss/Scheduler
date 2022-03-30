import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Alert from './Alert';
import axios from "axios";
import { useState, useEffect } from 'react';
import './Home.css';
import ScheduleCard from './ScheduleCard';
import CountdownCircleTimer1 from './CountdownTimer';

const theme = createTheme();

export default function Home() {
    const [dataarr, setDataarr] = useState([]);
    const [timeArr, setTimeArr] = React.useState([]);
    const [textarr, setTextArr] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [textmsg, setTextmsg] = React.useState('');
    const [trigger, setTrigger] = React.useState(0);
    const scheduleFunc = () => {
        axios.get('http://localhost:4000/api/v1/schedules')
            .then(res => {
                setDataarr(res.data.textTimes);
                // console.log(data);
                let tempDateArr = [];
                let tempTextArr = [];
                res.data.textTimes.forEach(element => {
                    tempDateArr.push(new Date(element.dateTime) - new Date());
                    tempTextArr.push(element.text);
                })
                // console.log(tempDateArr);
                // console.log(tempTextArr);
                setTimeArr(tempDateArr);
                setTextArr(tempTextArr);
                for (let i = 0; i < tempDateArr.length; i++) {
                    if (tempDateArr[i] >= 0 && tempDateArr[i] <= 200) {
                        // console.log(tempTextArr[i]);
                        setTextmsg(tempTextArr[i]);
                        setOpen(true);
                        setTrigger(tempTextArr[i].length);
                        setTimeout(() => {
                            setOpen(false);
                        }, tempTextArr[i].length * 1000);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        setInterval(() => {
            scheduleFunc();
        }, 1)
    }, [])

    const [flag, setflag] = React.useState(false);
    const [value, setValue] = React.useState(new Date());
    const [altMsg, setAltMsg] = React.useState("");
    const [altType, setAltType] = React.useState("");
    const [bgColor, setBgColor] = React.useState("#c1e6e4");
    const [btn, setBtn] = React.useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('text') !== '') {
            axios.post('http://localhost:4000/api/v1/schedules/new', {
                text: data.get('text'),
                dateTime: value,
            })
                .then((response) => {
                    console.log(response.data.message);
                    setflag(true);
                    setBgColor("#90a6a5");
                    if (response.data.message === "Time already exists") {
                        // alert("This Time slot already used Try Another");
                        setAltType("error");
                        setBtn(true);
                        setAltMsg("This Time slot already used Try Another");
                        // <Alert message={`This Time slot already used Try Another`} />
                    }
                    else {
                        // alert("Slot added successfully");
                        setAltType("success");
                        setAltMsg("Slot added successfully");
                        setBtn(true);
                    }
                    setTimeout(() => {
                        setflag(false);
                        setBtn(false);
                        setBgColor("#c1e6e4");
                    }, 4000);
                }).catch((error) => {
                    console.log(error);
                }
                );
        }
    };

    return (
        <div className="home" style={{ backgroundColor: bgColor }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}><Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AccessTimeIcon />
                            </Avatar>
                            <Typography component="h1" variant="h4" alignItems="center" >
                                Scheduler
                            </Typography>
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                            <Stack spacing={2}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Enter Text"
                                    name="text"
                                    autoComplete="off"
                                    autoFocus
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="DateTimePicker"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={btn}
                            >
                                Click
                            </Button>
                            {
                                flag && <Alert message={altMsg} alttype={altType} />
                            }
                        </Box>
                    </Box>

                </Container>
                {open === true && <Alert message={textmsg} alttype={altType} />}
                <div className='timer-wrapper'>
                    {open === true && <CountdownCircleTimer1 duration={trigger} />}
                </div>
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {dataarr.length > 0 && dataarr.map(dt => <ScheduleCard key={dt._id} textData={dt.text} dateTimeData={dt.dateTime} />)}
                </Box>
            </ThemeProvider>
        </div>
    );
}