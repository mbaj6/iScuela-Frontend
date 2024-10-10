'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../utils/api';

interface User {
	username: string;
	userType: 'teacher' | 'student';
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (username: string, password: string) => Promise<User>;
	register: (username: string, password: string, userType: 'teacher' | 'student') => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const login = async (username: string, password: string): Promise<User> => {
		try {
			const response = await apiLogin(username, password);
			console.log('Login response in AuthContext:', response);
			if (response.role) {
				const user = { username, userType: response.role as 'teacher' | 'student' };
				setUser(user);
				setToken(response.access_token);
				return user;
				}
			else {
				console.error('User role not found in login response');
				throw new Error('Unable to determine user role');
			}
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const register = async (username: string, password: string, userType: 'teacher' | 'student') => {
		try {
			await apiRegister(username, password, userType);
			// Note: We don't set the user or token here because we typically want the user to log in after registration
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		// You might want to clear the token from localStorage here as well
		localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ user, token, login, register, logout }}>
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
