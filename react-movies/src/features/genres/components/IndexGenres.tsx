import {useEntities} from "../../../hooks/useEntities.ts";
import type Genre from "../models/Genre.model.ts";
import IndexEntities from "../../../components/IndexEntities.tsx";


export default function IndexGenres(){

    const genresHook = useEntities<Genre>('/genres');

    return (
        <>
            <IndexEntities<Genre> title="Genres" url="/genres" urlCreate="/genres/create" entity="Genre"
                                  {...genresHook} >
                {(entities, buildButtons) => <>

                    <thead className="table-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" className="text-end">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entities?.map(genre => <tr key={genre.id}>
                        <td>{genre.name}</td>
                        <td className="text-end">
                            {buildButtons(`/genres/edit/${genre.id}`, genre.id)}
                        </td>
                    </tr>)}
                    </tbody>

                </>}
            </IndexEntities>
        </>)

}