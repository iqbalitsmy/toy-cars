import React from 'react';
import NavBar from '../Shared/NavBar/NavBar';
import Slider from '../components/Slider/Slider';
import CategoriesCardContainer from '../components/CategoriesCard/CategoriesCardContainer';

const Home = () => {
    return (
        <div className=''>
            <section className='shadow-md'>
                <NavBar></NavBar>
            </section>
            <section className='container mx-auto'>
                <Slider></Slider>
            </section>
            <section className='container mx-auto'>
                <CategoriesCardContainer></CategoriesCardContainer>
            </section>
        </div>
    );
};

export default Home;