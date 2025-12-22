import type Movie from "../models/movie.model.ts";
import styles from './DisplayMovie.module.css'
import {NavLink} from "react-router";
import Button from "../../../components/Button.tsx";
import customConfirm from "../../../utils/customConfirm.ts";
import {useContext} from "react";
import AlertContext from "../../../utils/AlertContext.ts";
import apiClient from "../../../api/apiClient.ts";
import Authorized from "../../security/components/Authorized.tsx";

export default function DisplayMovie(props: DisplayMovieProps) {
    const buildLink = () => `/movie/${props.movie.id}`
    const alert = useContext(AlertContext);

    async function deleteMovie(){
        await apiClient.delete(`/movies/${props.movie.id}`);
        alert();
    }

    return (
        <div className={styles.div}>
            <a href={buildLink()}>
                <img src={props.movie.poster} alt="Poster" />
            </a>
            <p>
                <a href={buildLink()}>{props.movie.title}</a>
            </p>
            <div>
                <Authorized claims={['isadmin']}
                            authorized={<>
                                <NavLink to={`/movies/edit/${props.movie.id}`} className='btn btn-primary'>Edit</NavLink>
                                <Button className="btn btn-danger ms-4" onClick={() => customConfirm(() => deleteMovie())}>Delete</Button>
                            </>}
                />
            </div>
        </div>

    )
}

interface DisplayMovieProps {
    movie: Movie
}