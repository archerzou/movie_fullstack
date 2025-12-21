import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router"
import type TheaterCreation from "../models/TheaterCreation.model";
import TheaterForm from "./TheaterForm";
import Loading from "../../../components/Loading";
import type { SubmitHandler } from "react-hook-form";
import apiClient from "../../../api/apiClient.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";

const EditTheater = () => {
    const {id} = useParams();
    const [model, setModel] = useState<TheaterCreation | undefined>(undefined);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        apiClient.get(`/theaters/${id}`).then(res => setModel(res.data));
    }, [id])

    const onSubmit: SubmitHandler<TheaterCreation> = async (data) => {
        try {
            await apiClient.put(`/theaters/${id}`, data);
            navigate('/theaters');
        } catch (err) {
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);
        }
    }

    return (
        <>
            <h3>Edit Theater</h3>
            {model ? <TheaterForm errors={errors}  model={model} onSubmit={onSubmit} /> : <Loading />}
        </>
    )
};

export default EditTheater;