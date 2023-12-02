import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import logo from '../../assets/toy_car_black.png'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, } from 'react-router-dom';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user)
    
    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("Successfully");
                localStorage.removeItem("toy-cars-token");
                window.location.reload();
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <nav className='container mx-auto pt-2 mb-10'>
            <Navbar fluid rounded>
                <Link to={'/'}>
                    <img src={logo} className="mr-3 h-14 w-auto" alt="Toy Car" />
                    <span className="self-center whitespace-nowrap text-2xl font-extrabold dark:text-white">Toy Cars</span>
                </Link>
                <div className="flex md:order-2">
                    {
                        user?.email && (<Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={user?.photo} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{user?.name}</span>
                                <span className="block truncate text-sm font-medium">{user?.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                        </Dropdown>)
                    }
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Link to={'/'}>Home</Link>
                    <Link to={"/toys"}>All Toys</Link>
                    {
                        user?.email && (<><Link to={"/my-toys"}>My Toys</Link>
                            <Link to={"add-toys"}>Add A Toy</Link></>)
                    }
                    <Link to="#">Blogs</Link>
                    {
                        !user?.email && (<><Link to={'/login'}>Login</Link> <Link to="/register">Sign Up</Link></>)
                    }
                </Navbar.Collapse>
            </Navbar>
        </nav>
    );
};

export default NavBar;