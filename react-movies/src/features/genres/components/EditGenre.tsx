import type { SubmitHandler } from "react-hook-form";
import {useNavigate, useParams} from "react-router"
import type CreateGenre from "../models/CreateGenre.model";
import GenreForm from "./GenreForm";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import apiClient from "../../../api/apiClient.ts";
import type Genre from "../models/Genre.model.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";


const EditGenre = () => {
    const {id} = useParams();
    const [model, setModel] = useState<CreateGenre | undefined>(undefined);
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get<Genre>(`/genres/${id}`).then(res => setModel(res.data));
    }, [id])

    const onSubmit: SubmitHandler<CreateGenre> = async (data) => {
        try {
            await apiClient.put(`/genres/${id}`, data);
            navigate(`/genres`);
        }
        catch (err) {
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);
        }
    }

    return (
        <>
            <h3>Edit Genre</h3>
            {model ? <GenreForm errors={errors} onSubmit={onSubmit} model={model} /> : <Loading />}
        </>
    )
};

export default EditGenre;