import type { SubmitHandler } from "react-hook-form"
import type MovieCreation from "../models/MovieCreation.model"
import MovieForm from "./MovieForm";
import type Genre from "../../genres/models/Genre.model";
import type Theater from "../../theaters/models/Theater.model";
import {useEffect, useState} from "react";
import apiClient from "../../../api/apiClient.ts";
import type MoviesPostGet from "../models/MoviesPostGet.model.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";
import extractErrors from "../../../utils/extractErrors.ts";
import Loading from "../../../components/Loading.tsx";
import convertMovieToFormData from "../utils/convertMovieToFormData.ts";
import type Movie from "../models/movie.model.ts";

const CreateMovie = () => {
    const [nonSelectedGenres, setNonSelectedGenres] = useState<Genre[]>([]);
    const [nonSelectedTheaters, setNonSelectedTheaters] = useState<Theater[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        apiClient.get<MoviesPostGet>('/movies/postget').then(res => {
            setNonSelectedGenres(res.data.genres);
            setNonSelectedTheaters(res.data.theaters);
            setLoading(false);
        })
    }, [])

    const onSubmit: SubmitHandler<MovieCreation> = async (data) => {
        try {
            const formData = convertMovieToFormData(data);
            const response = await apiClient.postForm<Movie>('/movies', formData);
            const movie = response.data;
            navigate(`/movie/${movie.id}`);
        }
        catch(err){
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);
        }
    }

    return (
        <>
            <h3>Create Movie</h3>
            {loading ? <Loading /> : <MovieForm onSubmit={onSubmit} nonSelectedGenres={nonSelectedGenres}
                selectedGenres={[]}
                nonSelectedTheaters={nonSelectedTheaters}
                selectedTheaters={[]}
                selectedActors={[]}
                errors={errors}
            />}
        </>
    )
};

export default CreateMovie;