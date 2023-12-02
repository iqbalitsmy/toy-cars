import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';

const MyToyUpdate = () => {
    const { toyPhoto, toyName, toyPrice, rating, quantity, category, desc } = useLoaderData();
    const { id } = useParams();
    const [userData, setUserData] = useState({
        toyPrice: toyPrice,
        quantity: quantity,
        desc: desc,
    });
    const navigate = useNavigate();
    useTitle("Toys Update");

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
            fetch(`http://localhost:5000/my-toys/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        console.log("res", data);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Toys has been update",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        navigate('/my-toys');
                    }
                })
        }
    }

    return (
        <section className='container mx-auto mb-20'>
            <div className='p-2 pb-8 md:p-10 mx-auto max-w-md shadow-lg '>
                <div className='text-2xl font-bold text-center mb-6'>
                    <h2>Update Toy</h2>
                </div>
                <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit} >
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="photo" value="Toy photo URL" />
                        </div>
                        <TextInput id="photo" name='toyPhoto' type="text" value={toyPhoto} required shadow disabled />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Toy Name" />
                        </div>
                        <TextInput id="name" name='toyName' type="text" value={toyName} required shadow disabled />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2  gap-4'>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Toy Price" />
                            </div>
                            <TextInput onChange={handleOnChange} id="price" name='toyPrice' type="number" defaultValue={toyPrice} required shadow />
                        </div>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="rating" value="Toy Rating" />
                            </div>
                            <TextInput id="rating" name='rating' type="text" value={rating} required shadow disabled />
                        </div>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="quantity" value="Available quantity" />
                            </div>
                            <TextInput onChange={handleOnChange} id="quantity" name='quantity' type="number" defaultValue={quantity} required shadow />
                        </div>
                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Sub-category" />
                            </div>
                            <select
                                className="form-control w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                name='category'
                                id='category'
                                value={category}
                                disabled
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
                        <Textarea id="desc" name='desc' onChange={handleOnChange} placeholder="Detail description..." defaultValue={desc} required rows={4} />
                    </div>
                    <Button type="submit">Add</Button>
                </form>
            </div>
        </section>
    );
};

export default MyToyUpdate;