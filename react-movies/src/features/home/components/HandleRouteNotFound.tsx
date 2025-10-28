import {Navigate, useLocation} from "react-router";
import {useEffect} from "react";

const HandleRouteNotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.log(`Route not found: ${location.pathname}`)
    }, [location])

    return <Navigate to="/" />
};

export default HandleRouteNotFound;