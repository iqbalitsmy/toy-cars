import CategoriesCard from "./CategoriesCard";

const CategoriesCardContainer = () => {

    const cartDetails = [
        {
            title: "Sports Toy Car",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit dolore odio veritatis",
            src: "https://media.e-valy.com/cms/products/images/314a02e0-f699-453c-869c-1a06be51d1d6"
        },
        {
            title: "Truck Toy Car",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit do. Sunt, perspiciatis!",
            src: "https://m.media-amazon.com/images/I/71UqGP4aDGL.jpg"
        },
        {
            title: "Mini Fire Truck",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit dolore odio",
            src: "https://images-na.ssl-images-amazon.com/images/I/61irGwKE9sL.jpg"
        },
    ]


    return (
        <section className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 px-2 pb-28'>
            {
                cartDetails.map((cart, i) => {
                    return (<CategoriesCard cart={cart} key={i}></CategoriesCard>)
                })
            }
        </section>
    );
};

export default CategoriesCardContainer;