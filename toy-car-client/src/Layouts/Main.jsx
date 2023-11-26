import NavBar from '../Shared/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <section className='shadow-md'>
                <NavBar></NavBar>
            </section>
            <Outlet></Outlet>
        </>
    );
};

export default Main;