import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import useTitle from '../../hooks/useTitle';

const AddToys = () => {
    const { user } = useContext(AuthContext);
    const { name, email } = user;
    const [userData, setUserData] = useState({
        toyPhoto: '',
        toyName: '',
        sellerName: name,
        sellerEmail: email,
        toyPrice: '',
        rating: '',
        quantity: '',
        category: 'Sports car',
        desc: "",
    });

    useTitle("Add A Toy");

    const handleOnChange = e => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        // console.log(userData);
        const token = localStorage.getItem('toy-cars-token');
        if (token) {
            fetch('http://localhost:5000/add-toys', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            })
                .then(res => res.json())
                .then(data => {
                    if(data.acknowledged){
                        console.log("res", data);
                        e.target.reset();
                    }
                })
        }
    }


    return (
        <section className='container mx-auto mb-20'>
            <div className='p-2 pb-8 md:p-10 mx-auto max-w-md shadow-lg '>
                <div className='text-2xl font-bold text-center mb-6'>
                    <h2>Add A Toy</h2>
                </div>
                <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit} >
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="photo" value="Toy photo URL" />
                        </div>
                        <TextInput onChange={handleOnChange} id="photo" name='toyPhoto' type="text" placeholder="URL" required shadow />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Toy Name" />
                        </div>
                        <TextInput onChange={handleOnChange} id="name" name='toyName' type="text" placeholder="Toy Name" required shadow />
                    </div>
                    {/* Seller Details */}
                    <div className='md:flex gap-4'>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="seller-name" value="Seller Name" />
                            </div>
                            <TextInput id="seller-name" name='sellerName' type="text" value={user.name} placeholder="" required shadow disabled />
                        </div>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="seller-email" value="Seller email" />
                            </div>
                            <TextInput id="seller-email" name='sellerEmail' type="email" placeholder="example@example.com" value={user.email} required shadow disabled />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2  gap-4'>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Toy Price" />
                            </div>
                            <TextInput onChange={handleOnChange} id="price" name='toyPrice' type="number" required shadow />
                        </div>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="rating" value="Toy Rating" />
                            </div>
                            <TextInput onChange={handleOnChange} id="rating" name='rating' type="text" required shadow />
                        </div>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="quantity" value="Available quantity" />
                            </div>
                            <TextInput onChange={handleOnChange} id="quantity" name='quantity' type="number" required shadow />
                        </div>
                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Sub-category" />
                            </div>
                            <select
                                className="form-control w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                name='category'
                                id='category'
                                onChange={handleOnChange}
                            >
                                <option value={"Sports car"}>Sports car</option>
                                <option value={"Truck car"}>Truck car</option>
                                <option value={"Regular car"}>Regular car</option>
                                <option value={"Mini fire truck"}>Mini fire truck</option>
                                <option value={"Mini police car"}>Mini police car</option>
                            </select>
                        </div>
                    </div>
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="desc" value="Toy Description" />
                        </div>
                        <Textarea id="desc" name='desc' onChange={handleOnChange} placeholder="Detail description..." required rows={4} />
                    </div>
                    <Button type="submit">Add</Button>
                </form>
            </div>
        </section>
    );
};

export default AddToys;