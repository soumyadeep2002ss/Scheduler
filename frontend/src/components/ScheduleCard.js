import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import './ScheduleCard.css';
import icon from './taskIcon1.svg';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function OutlinedCard({ textData, dateTimeData }) {
    return (
        <>
            <article className="card">
                <div className="card__wrapper">
                    <div className="card__avatar">
                        <img src={icon} alt="" />
                    </div>
                    <header className="card__highlights">
                        <p className="card__subtitle">Upcoming Task</p>
                        <h2 className="card__title">{textData}</h2>
                        <h2 className="card__title">{new Date(dateTimeData).toLocaleString()}</h2>
                    </header>
                </div>
            </article>
        </>
    );
}
