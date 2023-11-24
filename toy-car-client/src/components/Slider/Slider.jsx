import { Carousel } from 'flowbite-react';
import React from 'react';
import two from '../../assets/slider/2.jpg'
import three from '../../assets/slider/3.jpg'
import four from '../../assets/slider/4.jpg'

const Slider = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-10">
            <Carousel onSlideChange={(index) => console.log('onSlideChange()', index)}>
                <div
                    style={{ 'backgroundImage': `url(${two})` }}
                    className="h-full bg-no-repeat bg-cover bg-right dark:text-white  grid grid-cols-1 md:grid-cols-2">
                    <div className='bg-gradient-to-r from-[#201f1d] via-[#201f1d] p-9 h-full'>
                        <div className=''>
                            <h1
                                className='text-2xl font-extrabold text-white pb-4'
                            >Welcome to Toy Car Shop</h1>
                            <p
                                className='text-base text-[#a8a6a3]'
                            >Limited Time Offer</p>
                            <button
                                className='py-1 px-3 mt-4 text-white hover:text-black font-medium uppercase bg-[#201f1d] hover:bg-[#a8a6a3] border border-[#a8a6a3] rounded-3xl' type="button"
                            >Shop Now</button>
                        </div>
                    </div>
                </div>
                <div
                    style={{ 'backgroundImage': `url(${three})` }}
                    className="h-full bg-no-repeat bg-cover bg-right dark:text-white  grid grid-cols-1 md:grid-cols-2">
                    <div className='bg-gradient-to-r from-[#201f1d] via-[#201f1f] p-9 h-full'>
                        <div className=''>
                            <h1
                                className='text-2xl font-extrabold text-white pb-4'
                            >Welcome to Toy Car Shop</h1>
                            <p
                                className='text-base text-[#a8a6a3]'
                            >Limited Time Offer</p>
                            <button
                                className='py-1 px-3 mt-4 text-white hover:text-black font-medium uppercase bg-[#201f1d] hover:bg-[#a8a6a3] border border-[#a8a6a3] rounded-3xl' type="button"
                            >Shop Now</button>
                        </div>
                    </div>
                </div>
                <div
                    style={{ 'backgroundImage': `url(${four})` }}
                    className="h-full bg-no-repeat bg-cover bg-right dark:text-white  grid grid-cols-1 md:grid-cols-2">
                    <div className='bg-gradient-to-r from-[#201f1d] via-[#201f1d] p-9 h-full'>
                        <div className=''>
                            <h1
                                className='text-2xl font-extrabold text-white pb-4'
                            >Welcome to Toy Car Shop</h1>
                            <p
                                className='text-base text-[#a8a6a3]'
                            >Limited Time Offer</p>
                            <button
                                className='py-1 px-3 mt-4 text-white hover:text-black font-medium uppercase bg-[#201f1d] hover:bg-[#a8a6a3] border border-[#a8a6a3] rounded-3xl' type="button"
                            >Shop Now</button>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;