import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { Spinner } from 'flowbite-react';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';

const MyToys = () => {
    const [toys, setToys] = useState([]);
    const { user, isLoading } = useContext(AuthContext);
    // For reload page
    const [reload, setReload] = useState(true);
    useTitle("My Toys");

    const token = localStorage.getItem('toy-cars-token');

    useEffect(() => {
        if (token) {
            fetch(`http://localhost:5000/my-toys?email=${user?.email}`, {
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
    }, [user, token, reload]);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/my-toys/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        setReload(!reload);
                    })
            }
        });
    }

    // console.log(toys);

    return (
        <><section className='container mx-auto mb-14'>
            <h1 className="text-3xl font-bold mb-4">My Toys</h1>
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
                                        <button className="bg-blue-500 text-white py-1 px-2 rounded"><Link to={`/toys/update/${toy._id}`}>Update</Link></button>
                                        <button className="bg-red-600 text-white py-1 px-2 rounded" onClick={() => handleDelete(toy._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>)
                }
            </table>
        </section >
        </>
    );
};

export default MyToys;