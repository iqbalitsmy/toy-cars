import Slider from '../../components/Slider/Slider';
import CategoriesCardContainer from '../../components/CategoriesCard/CategoriesCardContainer';

const Home = () => {
    return (
        < >
            <section className='container mx-auto'>
                <Slider></Slider>
            </section>
            <section className='container mx-auto'>
                <CategoriesCardContainer></CategoriesCardContainer>
            </section>
        </>
    );
};

export default Home;