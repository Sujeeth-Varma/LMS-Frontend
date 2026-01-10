import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { initSuperAdminAsync, clearError } from '../features/auth/authSlice';
import type { InitSuperAdminRequest } from '../services/authApi';

const InitSuperAdminForm: React.FC = () => {
  const [formData, setFormData] = useState<InitSuperAdminRequest>({
    email: '',
    password: '',
    name: ''
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(initSuperAdminAsync(formData));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text mb-1">Initialize Super Admin</h2>
          <p className="text-sm text-text-secondary">Create the first super administrator account</p>
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
            className="w-full bg-primary hover:bg-secondary disabled:bg-text-secondary text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Super Admin...' : 'Create Super Admin'}
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

export default InitSuperAdminForm;