import type Genre from "../../genres/models/Genre.model.ts";
import type Theater from "../../theaters/models/Theater.model.ts";
import type MovieActor from "./MovieActor.model.ts";

export default interface Movie{
    id: number;
    title: string;
    poster: string;
    releaseDate: string;
    trailer: string;
    genres?: Genre[];
    theaters?: Theater[];
    actors?: MovieActor[];
}