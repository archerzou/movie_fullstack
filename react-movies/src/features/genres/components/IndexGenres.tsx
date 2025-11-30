import { NavLink } from "react-router";
import GenericList from "../../../components/GenericList.tsx";
import Button from "../../../components/Button.tsx";
import Pagination from "./Pagination.tsx";
import Loading from "../../../components/Loading.tsx";
import {useGenres} from "../hooks/useGenres.ts";
import apiClient from "../../../api/apiClient.ts";
import customConfirm from "../../../utils/customConfirm.ts";


export default function IndexGenres(){

    const { loading, page, recordsPerPage, totalAmountOfRecords, setPage, setRecordsPerPage, genres, loadRecords } = useGenres();

    async function deleteGenre(id: number){
        await apiClient.delete(`genres/${id}`);
        if (page === 1) {
            loadRecords();
        } else {
            setPage(1);
        }
    }

    return (
        <>
            <h3>Genres</h3>
            <div className="mb-2">
                <NavLink className="btn btn-primary"
                         to="/genres/create">Create Genre</NavLink>
            </div>

            {loading ? <Loading /> : <>
                <div className="mb-2">
                    <Pagination
                        totalAmountOfRecords={totalAmountOfRecords}
                        currentPage={page}
                        recordsPerPage={recordsPerPage}
                        onPaginateChange={(page, recordsPerPage) => {
                            setPage(page);
                            setRecordsPerPage(recordsPerPage);
                        }}
                        recordsPerPageOptions={[5,20,50]}
                    />
                </div>
                <GenericList list={genres}>
                    <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                        <thead className="table-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col" >Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {genres?.map(genre => <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td className="text-end">
                                <NavLink to={`/genres/edit/${genre.id}`} className="btn btn-sm btn-outline-primary me-2">
                                    <i className="bi bi-pencil me-l"></i> Edit
                                </NavLink>
                                <Button onClick={() => customConfirm(() => deleteGenre(genre.id)) } className="btn btn-sm btn-outline-danger me-2">
                                    <i className="bi bi-trash me-l"></i> Deleted
                                </Button>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </GenericList>
            </>}
        </>
    )
}