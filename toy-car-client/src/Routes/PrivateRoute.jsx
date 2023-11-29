import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Spinner aria-label="Extra large spinner example" size="xl" />
    }
    if (user?.email) {
        return children;
    }

    return (<Navigate to={'/login'} state={{ from: location }} replace></Navigate>);
};

export default PrivateRoute;