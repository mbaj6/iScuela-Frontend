'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../utils/api';

interface User {
	token: string;
	role: 'teacher' | 'student';
	// Add other user properties as needed
}

interface AuthContextType {
	user: User | null;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string, userType: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Check if user is logged in on initial load
		const token = localStorage.getItem('token');
		if (token) {
			// You might want to validate the token here
			setUser({ token, role: 'teacher' }); // Or fetch user details including role
		}
	}, []);

	const login = async (username: string, password: string) => {
		const data = await apiLogin(username, password);
		const userData: User = {
			token: data.access_token,
			role: data.role, // Ensure your API returns a role
			// Add other user properties as needed
		};
		setUser(userData);
		localStorage.setItem('token', data.access_token);
	};

	const register = async (username: string, password: string, userType: string) => {
		await apiRegister(username, password, userType);
		// You might want to automatically log in the user after registration
		await login(username, password);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
