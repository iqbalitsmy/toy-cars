import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import logo from '../../assets/toy_car_black.png'

const NavBar = () => {
    return (
        <nav className='container mx-auto pt-2 mb-10'>
            <Navbar fluid rounded>
                <Navbar.Brand href="https://flowbite-react.com">
                    <img src={logo} className="mr-3 h-14 w-auto" alt="Toy Car" />
                    <span className="self-center whitespace-nowrap text-2xl font-extrabold dark:text-white">Toy Cars</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">All Toys</Navbar.Link>
                    <Navbar.Link href="#">My Toys</Navbar.Link>
                    <Navbar.Link href="#">Add A Toy</Navbar.Link>
                    <Navbar.Link href="#">Blogs</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </nav>
    );
};

export default NavBar;