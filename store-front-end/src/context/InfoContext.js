import { PropTypes } from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

const FilterContextState = createContext();

function FilterProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user') || []);

    useEffect(() => {
            if (user.length !== 0) {
                localStorage.setItem('user', JSON.stringify(user));
            } 
    }, [user]);

    const value = useMemo(() => ({
        user,
        setUser,
    }), [user, setUser]);
    
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
