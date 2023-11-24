import React from 'react';
import './CategoriesCard.css'

const CategoriesCard = ({ cart }) => {
    return (
        <div>
            <div className="slider-container">
                <div
                    style={{
                        background: `url(${cart.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                    className='slider-div'
                >
                    <div
                        className="text-white text-center h-full w-full bg-black bg-opacity-40 p-4"
                    >
                        <h3 className='text-2xl font-extrabold mt-2'>{cart.title}</h3>
                        <p className='text-lg mt-2'>{cart.description}</p>
                    </div>
                </div>
                <div
                    className='slider-div object-contain'
                    style={{
                        background: `url(${cart.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                >
                    <div
                        className="text-white text-center h-full w-full bg-black bg-opacity-40 p-4"
                    >
                         <h3 className='text-2xl font-extrabold mt-2'>{cart.title}</h3>
                        <p className='text-lg mt-2'>{cart.description}</p>
                        <button
                            className='py-1 px-3 mt-4 text-white hover:text-black font-medium uppercase bg-black hover:bg-[#a8a6a3] rounded-3xl' type="button"
                        >Shop Now</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CategoriesCard;