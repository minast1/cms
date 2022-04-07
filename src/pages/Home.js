import { Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import MainNav from '../components/MainNav';
import cuffs from '../images/cuffs.jpg';
import chess from '../images/BannerNew.png';

const carouselContent = [
    //{name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs},
   // {name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs},
    { name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs },
    { name: 'Chess', description : 'Awesome banner', imageUrl: chess }
]


const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20,
        fontWeight: 'bolder',
        fontSize: 23,
        color: '#0d3e8c'
    }
}));

const Home = () => {
    const classes = useStyles();
    const [ activeItem, setActiveItem ] = useState(0);
    return (
        <div>
            <MainNav />
            <Carousel
                animation="slide"
                next={(next, active) => {
                    setActiveItem(activeItem+1)
                }}
                prev={(prev, active) => {
                    setActiveItem(activeItem-1)
                }}
                startAt={activeItem}
            >
                {carouselContent.map((item, index) => <img key={index} src={item.imageUrl} alt={item.name} />)}
            </Carousel>
            <br />
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Typography className={classes.subTitle}>ABOUT CRIMINAL MANAGEMEMENT SYSTEM</Typography>
                <Divider />
                <br />
                <Typography>
                    The centralized crime record management system applies to all police station and headquarters
                    all across the country and specifically looks into the detection of suspects, criminal’s previous
                    crimes and records. This is a centralized system which means if any crime takes place in any city
                    in Ghana then police can search the database for suspects not only related to their states
                    but also of other states. This system also register FIR online and notifies the closest police station
                    for immediate action.
                </Typography>
                <br />
            </div>
            <Divider />
            <Typography style={{textAlign: 'center'}}>&copy; Criminal Management System</Typography>
            <br />
        </div>
    );
};

export default Home;