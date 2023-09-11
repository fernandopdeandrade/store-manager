import { PropTypes } from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

const FilterContextState = createContext();

function FilterProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorRegister, setErrorRegister] = useState('');
    const [successRegister, setSuccessRegister] = useState('');

    useEffect(() => {
            if (token === 'access-token') {
                localStorage.setItem('user', JSON.stringify(user));
            } 
    }, [token, user]);

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
        successRegister,
        setSuccessRegister,
    }), [user, token, role, isLoading, errorRegister, successRegister]);
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
