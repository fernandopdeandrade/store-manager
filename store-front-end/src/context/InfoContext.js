import { PropTypes } from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

const FilterContextState = createContext();

function FilterProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user') || []);
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState('');

    useEffect(() => {
            if (user.length !== 0) {
                localStorage.setItem('user', JSON.stringify(user));
            } 
    }, [user]);

    const value = useMemo(() => ({
        user,
        setUser,
        products,
        setProducts,
        idProduct,
        setIdProduct,
    }), [user, setUser, products, setProducts, idProduct, setIdProduct]);
    
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
