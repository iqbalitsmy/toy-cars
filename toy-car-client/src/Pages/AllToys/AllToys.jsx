import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const AllToys = () => {
    const [toys, setToys] = useState([]);
    useTitle('All Toys');

    useEffect(() => {
        fetch('http://localhost:5000/toys', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setToys(data);
                // console.log(data);
            })

    }, []);

    return (
        <section className='container mx-auto mb-14'>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">All Toys</h1>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Seller</th>
                            <th className="py-2 px-4 border-b">Toy Name</th>
                            <th className="py-2 px-4 border-b">Sub-category</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Available Quantity</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toys.map((toy, index) => (
                            <tr key={toy._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className="py-2 px-4 border-b">{toy.sellerName}</td>
                                <td className="py-2 px-4 border-b">{toy.toyName}</td>
                                <td className="py-2 px-4 border-b">{toy.category}</td>
                                <td className="py-2 px-4 border-b">{toy.toyPrice}</td>
                                <td className="py-2 px-4 border-b">{toy.quantity}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white py-1 px-2 rounded"><Link to={`/toys/${toy._id}`}>View Details</Link></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllToys;