import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'admin' | 'doctor' | 'patient' | 'pharmacist' | 'technician' | 'billing';

interface User {
    id: string;
    name: string;
    role: UserRole;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (role: UserRole) => {
        // Mock login logic
        let name = '';
        switch(role) {
            case 'admin': name = 'System Admin'; break;
            case 'doctor': name = 'Dr. Sarah Smith'; break;
            case 'pharmacist': name = 'David Pharm'; break;
            case 'technician': name = 'Lisa Lab'; break;
            case 'billing': name = 'Robert Accounts'; break;
            default: name = 'John Doe';
        }

        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            role,
            email: `${role}@smarthealth.com`,
        };
        setUser(mockUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
