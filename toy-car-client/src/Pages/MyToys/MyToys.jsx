import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { Spinner } from 'flowbite-react';

const MyToys = () => {
    const [toys, setToys] = useState([]);
    const { user, isLoading } = useContext(AuthContext);
    console.log(user)

    useEffect(() => {
        const token = localStorage.getItem('toy-cars-token');
        console.log(token);
        if (token && !isLoading) {
            fetch(`http://localhost:5000/my-toys?email=${user.email}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    setToys(data);
                    // console.log(data);
                })
        }
    }, [user.email, isLoading]);

    console.log(toys);

    return (
        <>
            {
                (<section className='container mx-auto'>
                    <h1 className="text-3xl font-bold mb-4">All Toys</h1>
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">Toy Name</th>
                                <th className="py-2 px-4 text-left border-b">Sub-category</th>
                                <th className="py-2 px-4 text-left border-b">Price</th>
                                <th className="py-2 px-4 text-left border-b">Available Quantity</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        {
                            isLoading ? <Spinner className='mx-auto' aria-label="Extra large spinner example" size="xl" /> :
                                (<tbody>
                                    {toys.map((toy, index) => (
                                        <tr key={toy._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                            <td className="py-2 px-4 border-b max-w-md">{toy.toyName}</td>
                                            <td className="py-2 px-4 border-b">{toy.category}</td>
                                            <td className="py-2 px-4 border-b">{toy.toyPrice}</td>
                                            <td className="py-2 px-4 border-b">{toy.quantity}</td>
                                            <td className="py-2 px-4 border-b flex gap-4">
                                                <button className="bg-blue-500 text-white py-1 px-2 rounded"><Link to={`/toys/${toy._id}`}>Update</Link></button>
                                                <button className="bg-red-600 text-white py-1 px-2 rounded"><Link to={`/toys/${toy._id}`}>Delete</Link></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>)
                        }
                    </table>
                </section >)
            }
        </>
    );
};

export default MyToys;