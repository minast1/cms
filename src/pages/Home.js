import { Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import MainNav from '../components/MainNav';
import cuffs from '../images/cuffs.jpg';

const carouselContent = [
    {name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs},
    {name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs},
    {name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs}
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
                <Typography className={classes.subTitle}>ABOUT ONLINE CRIME REPORTING SYSTEM</Typography>
                <Divider />
                <br />
                <Typography>
                The outbreak of coronavirus disease 2019 (COVID-19) has created a global health crisis that has had a
                deep impact on the way we perceive our world and our everyday lives. Not only the rate of contagion and patterns
                of transmission threatens our sense of agency, but the safety measures put in place to contain the spread of the virus
                also require social distancing by refraining from doing what is inherently human, which is to find solace in the company
                of others. Within this context of physical threat, social and physical distancing, as well as public alarm, organizations
                have gone cashless in a bid to continue with service delivery.
                Crime reporting systems is another solution that will help in not only the fight against COVID, by reducing the physical
                going of individuals to the police station for any crime reporting but will also bring in efficiency in curbing and managing
                crime which will substantially reduce the levels of crime.
                The online crime reporting system will not only bring in efficiency but also proper management of crime and criminal records 
                and brings in availability of crime information to residents and communities without having to manually go to the police
                station for the information.
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