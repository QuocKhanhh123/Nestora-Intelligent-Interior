import { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser } from '../data/accounts';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for saved user on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('nestora_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                localStorage.removeItem('nestora_user');
            }
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = (email, password) => {
        const result = authenticateUser(email, password);

        if (result.success) {
            setUser(result.user);
            localStorage.setItem('nestora_user', JSON.stringify(result.user));
        }

        return result;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('nestora_user');
    };

    // Check if user is admin
    const isAdmin = () => {
        return user && user.role === 'admin';
    };

    // Check if user is logged in
    const isAuthenticated = () => {
        return user !== null;
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAdmin,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
