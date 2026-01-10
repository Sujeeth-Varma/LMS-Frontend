import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createUserAsync, clearError } from '../features/auth/authSlice';
import type { CreateUserRequest } from '../services/authApi';

const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: '',
    password: '',
    name: ''
  });
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUserAsync(formData));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-surface p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Access Denied</h2>
          <p className="text-text-secondary">Please log in to create user accounts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text mb-1">Create User</h2>
          <p className="text-sm text-text-secondary">Add a new user to the system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text transition-colors"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text transition-colors"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text transition-colors"
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-primary disabled:bg-text-secondary text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating User...' : 'Create User'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-md">
            <div className="flex justify-between items-center">
              <p className="text-accent text-sm">{error}</p>
              <button
                onClick={handleClearError}
                className="text-accent hover:text-secondary text-sm font-medium"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUserForm;