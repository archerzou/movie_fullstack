import {BrowserRouter} from "react-router";
import AppRoutes from "./AppRoutes.tsx";
import Menu from "./features/home/components/Menu.tsx";

function App() {

    return (
    <>
        <BrowserRouter>
            <Menu />
            <div className="container">
                <AppRoutes />
            </div>
        </BrowserRouter>

    </>
  )
}


export default App
