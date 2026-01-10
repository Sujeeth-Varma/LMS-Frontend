import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createAdminAsync, clearError } from '../features/auth/authSlice';
import type { CreateAdminRequest } from '../services/authApi';

const CreateAdminForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateAdminRequest>({
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
    dispatch(createAdminAsync(formData));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-surface p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Access Denied</h2>
          <p className="text-text-secondary">Please log in to create admin accounts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text mb-1">Create Admin</h2>
          <p className="text-sm text-text-secondary">Add a new administrator to the system</p>
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
            className="w-full bg-secondary hover:bg-primary disabled:bg-text-secondary text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Admin...' : 'Create Admin'}
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

export default CreateAdminForm;