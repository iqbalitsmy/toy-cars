import Slider from '../../components/Slider/Slider';
import CategoriesCardContainer from '../../components/CategoriesCard/CategoriesCardContainer';
import ToysCategory from '../../components/ToysCategory/ToysCategory';
import useTitle from '../../hooks/useTitle';

const Home = () => {
    useTitle("Home");

    return (
        <main>
            <section className='container mx-auto'>
                <Slider></Slider>
            </section>
            <section className='container mx-auto'>
                <CategoriesCardContainer></CategoriesCardContainer>
            </section>
            <section className='container mx-auto'>
                <ToysCategory></ToysCategory>
            </section>
        </main>
    );
};

export default Home;