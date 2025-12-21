import type { SubmitHandler } from "react-hook-form"
import type TheaterCreation from "../models/TheaterCreation.model"
import TheaterForm from "./TheaterForm";
import {useNavigate} from "react-router";
import {useState} from "react";
import apiClient from "../../../api/apiClient.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";


const CreateTheater = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    const onSubmit: SubmitHandler<TheaterCreation> = async (data) => {
        try{
            await apiClient.post('/theaters', data);
            navigate('/theaters');
        } catch(err){
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);
        }
    }

    return (
        <>
            <h3>Create Theater</h3>
            <TheaterForm errors={errors} onSubmit={onSubmit} />
        </>
    )
};

export default CreateTheater;