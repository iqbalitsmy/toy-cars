import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        photo: '',
        password: '',
        repeatPassword: '',
    })
    const { createUser } = useContext(AuthContext);
    const [err, setErr] = useState({});
    const navigate = useNavigate();

    const handleOnChange = e => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    const validUserData = () => {
        const newErr = {};
        setErr({});
        if (!userData.name) {
            newErr.name = 'Name is Require'
        }
        if (userData.password.length < 8) {
            newErr.password = 'Password must be at least 8 characters long';
        }
        if (userData.password !== userData.repeatPassword) {
            newErr.repeatPassword = 'Password and confirm password does not match';
        }
        setErr(newErr);
        return Object.keys(newErr).length === 0;
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (validUserData()) {
            setErr({});
            createUser(userData.email, userData.password)
                .then(result => {
                    console.log(result);
                    // remove repeatPassword
                    delete userData.repeatPassword;
                    fetch('http://localhost:5000/signup', {
                        method: "POST",
                        headers: {
                            'content-type': "application/json"
                        },
                        body: JSON.stringify(userData),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log("res", data)
                            localStorage.setItem("toy-cars-token", data.token);
                        })

                    navigate('/');
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            console.log(err.message);
        }

    }

    return (
        <section className='container mx-auto'>
            <div className='p-2 pb-8 md:p-10 mx-auto max-w-md shadow-lg '>
                <div className='text-2xl font-bold text-center mb-6'>
                    <h2>Create Account</h2>
                </div>
                <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit} >
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Your Name" />
                        </div>
                        <TextInput onChange={handleOnChange} id="name" name='name' type="text" placeholder="Name" required shadow />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput onChange={handleOnChange} id="email" name='email' type="email" placeholder="example@example.com" required shadow />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="photo" value="Your photo URL" />
                        </div>
                        <TextInput onChange={handleOnChange} id="photo" name='photo' type="text" placeholder="" required shadow />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput onChange={handleOnChange} id="password" name='password' type="password" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="repeat-password" value="Confirm password" />
                        </div>
                        <TextInput onChange={handleOnChange} id="repeat-password" name='repeatPassword' type="password" required shadow />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="agree" required />
                        <Label htmlFor="agree" className="flex">
                            I agree with the&nbsp;
                            <Link href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                                terms and conditions
                            </Link>
                        </Label>
                    </div>
                    <Button type="submit">Sign Up</Button>
                    <div className='text-center text-lg'>
                        <p>Or</p>
                    </div>
                    <Button type="submit" color="failure" >Continue With Google</Button>
                    <div>
                        <p>Already have an account? <Link to={'/login'} className='text-blue-600 underline'>Sign In</Link></p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;