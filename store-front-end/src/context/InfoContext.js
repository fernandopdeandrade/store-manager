import { PropTypes } from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

const FilterContextState = createContext();

function FilterProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorRegister, setErrorRegister] = useState('');

    useEffect(() => {
        try {
            if (token !== '' && token !== undefined) {
                const registerUser = (token) => {
                console.log("entrei no if do infoContext", typeof token)
                // const url = 'http://localhost:8080/auth/login';
                //     const options = {
                //         method: 'POST',
                //         headers: { 'Content-Type': 'application/json', authorization: token },
                //     };

                //     fetchDataRegisterUser(url, options)
                //         .then((response) => {
                //             setRole(response.role);
                //             setErrorRegister(response.message);
                //             localStorage.setItem('role', JSON.stringify(response.role));
                //         })
                //         .catch((err) => setErrorRegister(err.message))
                //         .finally(() => setIsLoading(false));
                 };
                registerUser(token);
            }
        } catch (error) {
            setErrorRegister(error.message);
        }
    }, [token]);


    const value = useMemo(() => ({
        user,
        setUser,
        token,
        setToken,
        role,
        setRole,
        isLoading,
        setIsLoading,
        errorRegister,
        setErrorRegister,
    }), [user, token, role, isLoading, errorRegister]);
    return (
        <FilterContextState.Provider value={value}>
            {children}
        </FilterContextState.Provider>
    );
}

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { FilterContextState, FilterProvider };
