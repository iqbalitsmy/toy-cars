import { Button, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const { signIn } = useContext(AuthContext);
    const [err, setErr] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleOnChange = e => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    const validUserData = () => {
        const newErr = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setErr({});

        if (!emailRegex.test(userData.email)) {
            newErr.email = 'Invalid email address';
        }
        if (userData.password.length < 8) {
            newErr.password = 'Password must be at least 8 characters long';
        }
        setErr(newErr);
        return Object.keys(newErr).length === 0;
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (validUserData()) {
            setErr({});
            signIn(userData.email, userData.password)
                .then( () => {
                    // console.log(result);
                    fetch('http://localhost:5000/login', {
                        method: "POST",
                        headers: {
                            'content-type': "application/json"
                        },
                        body: JSON.stringify(userData),
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log("res", data)
                            localStorage.setItem("toy-cars-token", data.token);
                        })

                    navigate(from, { replace: true });
                })
                .catch(error => {
                    console.log(error.message);
                })
        } else {
            console.log(err);
        }

    }

    return (
        <section className='container mx-auto'>
            <div className='p-2 pb-8 md:p-10 mx-auto max-w-md shadow-lg '>
                <div className='text-2xl font-bold text-center mb-6'>
                    <h2>Login in to your account</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput onChange={handleOnChange} id="email" name='email' type="text" placeholder="example@example.com" required shadow />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput onChange={handleOnChange} id="password" name='password' type="password" placeholder='********' required shadow />
                    </div>
                    <Button type="submit">Sign In</Button>
                    <div className='text-center text-lg'>
                        <p>Or</p>
                    </div>
                    <Button type="submit" color="failure" >Continue With Google</Button>
                    <div>
                        <p>Don't have an account? <Link to={'/register'} className='text-blue-600 underline'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;