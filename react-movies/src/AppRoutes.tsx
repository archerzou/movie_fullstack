import {Route, Routes} from "react-router";
import LandingPage from "./features/home/components/LandingPage.tsx";
import IndexGenres from "./features/genres/components/IndexGenres.tsx";
import FilterMovies from "./features/movies/components/FilterMovies.tsx";
import MovieDetail from "./features/movies/components/MovieDetail.tsx";
import CreateMovie from "./features/movies/components/CreateMovie.tsx";
import EditMovie from "./features/movies/components/EditMovie.tsx";
import IndexActors from "./features/actors/components/IndexActors.tsx";
import CreateActor from "./features/actors/components/CreateActor.tsx";
import EditActor from "./features/actors/components/EditActor.tsx";
import HandleRouteNotFound from "./features/home/components/HandleRouteNotFound.tsx";
import IndexTheaters from "./features/theaters/components/IndexTheaters.tsx";
import CreateTheater from "./features/theaters/components/CreateTheater.tsx";
import EditTheater from "./features/theaters/components/EditTheater.tsx";
import EditGenre from "./features/genres/components/EditGenre.tsx";
import CreateGenre from "./features/genres/components/CreateGenre.tsx";
import ProtectRoute from "./features/security/components/ProtectRoute.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />

                <Route element={<ProtectRoute claims={['isadmin']} />}>
                        <Route path='/genres' element={<IndexGenres />} />
                        <Route path='/genres/create' element={<CreateGenre />} />
                        <Route path='/genres/edit/:id' element={<EditGenre />} />

                        <Route path='/actors' element={<IndexActors />} />
                        <Route path='/actors/create' element={<CreateActor />} />
                        <Route path='/actors/edit/:id' element={<EditActor />} />

                        <Route path='/theaters' element={<IndexTheaters />} />
                        <Route path='/theaters/create' element={<CreateTheater />} />
                        <Route path='/theaters/edit/:id' element={<EditTheater />} />

                        <Route path='/movies/create' element={<CreateMovie />} />
                        <Route path='/movies/edit/:id' element={<EditMovie />} />
                        {/*<Route path="/users" element={<IndexUsers /> } />*/}
                </Route>

                <Route path='/movies/filter' element={<FilterMovies />} />
            <Route path='/movie/:id' element={<MovieDetail /> } />


            <Route path='*' element={<HandleRouteNotFound />} />

        </Routes>
    );
};

export default AppRoutes;