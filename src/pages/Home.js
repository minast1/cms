import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import MainNav from '../components/MainNav';
import cuffs from '../images/cuffs.jpg';

const carouselContent = [
    {name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs},
    {name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs},
    {name: 'Police badge', description: 'Awesome police badge', imageUrl: cuffs}
]
const Home = () => {
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
        </div>
    );
};

export default Home;