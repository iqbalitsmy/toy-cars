import React from 'react';
import logo from '../../assets/toy_cars.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';

const FooterSection = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto p-8 flex justify-between items-center">
                <div>
                    <img src={logo} className="mr-3 h-14 w-auto" alt="Toy Car" />
                    <span className="self-center whitespace-nowrap text-2xl font-extrabold dark:text-white">Toy Cars</span>
                    <p className="text-gray-400">123 Street, Cityville, Country</p>
                    <p className="text-gray-400">iqbalitsmy@gmail.com</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul>
                        <li className="mb-2"><a href="#">Home</a></li>
                        <li className="mb-2"><a href="#">All Toys</a></li>
                        <li className="mb-2"><a href="#">Services</a></li>
                        <li className="mb-2"><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                    <div className="flex space-x-4 text-lg">
                        <a href="https://www.facebook.com/iqbalitsmy" target='_blank' rel="noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com/iqbal_itsmy" target='_blank' rel="noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                            <FontAwesomeIcon icon={faSquareTwitter} />
                        </a>
                        <a href="https://www.instagram.com/iqbalitsmy" target='_blank' rel="noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://github.com/iqbalitsmy" target='_blank' rel="noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-gray-700 py-2">
                <p className="text-center text-gray-400">© 2023 @iqbalitsmy. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default FooterSection;