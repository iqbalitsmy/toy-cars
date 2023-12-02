import FooterSection from '../Shared/Footer/FooterSection';
import NavBar from '../Shared/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <section className='shadow-md'>
                <NavBar></NavBar>
            </section>
            <Outlet></Outlet>
            <FooterSection></FooterSection>
        </>
    );
};

export default Main;