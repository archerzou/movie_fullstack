import { useParams } from "react-router"

const MovieDetail = () => {
    const {id} = useParams();

    return (
        <>
            <h3>Movie Detail: {id}</h3>
        </>
    )
};

export default MovieDetail;