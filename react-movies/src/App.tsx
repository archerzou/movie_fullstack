import {BrowserRouter} from "react-router";
import AppRoutes from "./AppRoutes.tsx";
import Menu from "./features/home/components/Menu.tsx";
import {useEffect, useState} from "react";
import type Claim from "./features/security/models/Claim.model.ts";
import AuthenticationContext from "./features/security/utils/AuthenticationContext.ts";
import {getClaims} from "./features/security/utils/HandleJWT.ts";

function App() {

    const [claims, setClaims] = useState<Claim[]>([]);

    useEffect(() => {
        setClaims(getClaims());
    }, [])

    function updateClaims(claims: Claim[]){
        setClaims(claims);
    }

    return (
    <>
        <BrowserRouter>
            <AuthenticationContext.Provider value={{claims, update: updateClaims}}>
                <Menu />
                <div className="container mb-5">
                    <AppRoutes />
                </div>
            </AuthenticationContext.Provider>
        </BrowserRouter>

    </>
  )
}


export default App
