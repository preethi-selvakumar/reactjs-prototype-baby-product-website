import React, { createContext, useState, useContext, useEffect } from 'react';

// create the context
const AppContext = createContext();

// custom hook: to easily use the context
export const useAppContext = () => {
    return useContext(AppContext);
};

// localstorage keys
const CART_STORAGE_KEY = 'babyzoneCartItems';
const ORDER_STORAGE_KEY = 'babyzoneLastOrder';
const AUTH_STORAGE_KEY = 'babyzoneUserAuth';

// authentication initial state (for user/auth details)
const initialUserState = {
    isUserLoggedIn: false,
    registeredEmail: null,
    registeredPassword: null,
};

// provider component: to hold the state and pass it to other components
export const AppProvider = ({ children }) => {

    // cart states
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedItems = localStorage.getItem(CART_STORAGE_KEY);
            return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
            console.error("error parsing cart data from localstorage:", error);
            return [];
        }
    });

    // last placed order state
    const [lastOrder, setLastOrder] = useState(() => {
        try {
            const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
            return storedOrder ? JSON.parse(storedOrder) : null;
        } catch (error) {
            console.error("error parsing last order data from localstorage:", error);
            return null;
        }
    });

    // auth state: maintains user login information
    const [userAuth, setUserAuth] = useState(() => {
        try {
            // try to load from local storage (for page refresh)
            const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
            return storedAuth ? JSON.parse(storedAuth) : initialUserState;
        } catch (error) {
            console.error("error parsing auth data from localstorage:", error);
            return initialUserState;
        }
    });

    // modal states
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    // useeffect hooks (storage sync)
    // useeffect: saves to localstorage whenever cartitems changes
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("error setting cart data to localstorage:", error);
        }
    }, [cartItems]);

    // useeffect: saves to localstorage whenever lastorder changes
    useEffect(() => {
        try {
            if (lastOrder) {
                localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(lastOrder));
            } else {
                localStorage.removeItem(ORDER_STORAGE_KEY);
            }
        } catch (error) {
            console.error("error setting last order data to localstorage:", error);
        }
    }, [lastOrder]);

    // useeffect: saves to localstorage whenever userauth changes
    useEffect(() => {
        try {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userAuth));
        } catch (error) {
            console.error("error setting auth data to localstorage:", error);
        }
    }, [userAuth]);

    // derived state: calculates the total quantity from cartitems (navbar count)
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // cart functions
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id && item.selectedAge === product.selectedAge && item.selectedColor === product.selectedColor
            );

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += product.quantity;
                return newItems;
            } else {
                return [...prevItems, product];
            }
        });
    };

    const removeFromCart = (productId, selectedAge) => {
        setCartItems(prevItems => {
            return prevItems.filter(item => !(item.id === productId && item.selectedAge === selectedAge));
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    // modal functions
    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsRegisterModalOpen(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    // authentication functions (modified)
    // register logic: check if email already exists
    const registerAndLoginUser = (email, password) => {
        // check if email is already registered
        if (userAuth.registeredEmail && userAuth.registeredEmail === email) {
            return { success: false, message: "This email is already registered. Please log in." };
        }

        // success: save user details and set login status to true
        setUserAuth({
            isUserLoggedIn: true,
            registeredEmail: email,
            registeredPassword: password,
        });
        return { success: true, message: "Registration successful!" };
    };

    // login logic: check if user details match registered details
    const loginUser = (email, password) => {
        if (
            email === userAuth.registeredEmail &&
            password === userAuth.registeredPassword
        ) {
            // success: only change login state to true
            setUserAuth(prev => ({
                ...prev,
                isUserLoggedIn: true,
            }));
            return { success: true, message: "Login successful!" };
        } else if (!userAuth.registeredEmail) {
            // if user has not registered
            return { success: false, message: "New user? Please register first." };
        } else {
            // if email/password do not match
            return { success: false, message: "Invalid email or password." };
        }
    };

    // logout logic: added alert
    const logoutUser = () => {
        setUserAuth(prev => ({
            ...prev,
            isUserLoggedIn: false,
        }));
        // show logout alert
        alert("You have been logged out successfully!");
    };


    const contextValue = {
        // cart values
        cartCount,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,

        // order values
        lastOrder,
        setLastOrder,

        // modal values
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isRegisterModalOpen,
        openRegisterModal,
        closeRegisterModal,

        // auth states and functions
        isUserLoggedIn: userAuth.isUserLoggedIn, // user login status
        registeredEmail: userAuth.registeredEmail, // registered email (for display/check)
        registerAndLoginUser, // registration and setting credentials
        loginUser,           // login check
        logoutUser,          // logout
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;