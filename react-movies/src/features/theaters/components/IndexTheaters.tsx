import {NavLink} from "react-router";

const IndexTheaters = () => {
    return (
        <>
            <h3>Theaters</h3>
            <NavLink to="/theaters/create" className="btn btn-primary">
                Create Theater</NavLink>
        </>
    )
};

export default IndexTheaters;