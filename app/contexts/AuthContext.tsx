'use client'

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { logout as apiLogout } from '@/app/utils/api';

interface User {
	token: string | null;
	role: string | null;
}

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const role = localStorage.getItem('role');
		if (token && role) {
			setUser({ token, role });
		}
	}, []);

	const logout = async () => {
		try {
			await apiLogout();
			setUser(null);
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			router.push('/login');
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
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

export const withAuth = (WrappedComponent: React.ComponentType) => {
	return (props: any) => {
		const { user } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!user) {
				router.push('/login');
			}
		}, [user]);

		if (!user) {
			return null; // or a loading spinner
		}

		return <WrappedComponent {...props} />;
	};
};
