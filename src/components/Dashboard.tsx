import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import LoginForm from './LoginForm';
import InitSuperAdminForm from './InitSuperAdminForm';
import CreateAdminForm from './CreateAdminForm';
import CreateUserForm from './CreateUserForm';
import UserLists from './UserLists';

type ViewType = 'login' | 'init-superadmin' | 'create-admin' | 'create-user' | 'dashboard';

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const { isAuthenticated, user, userRole } = useAppSelector(state => state.auth);

  // Auto-navigate to dashboard when logged in as SUPERADMIN
  useEffect(() => {
    if (isAuthenticated && userRole === 'SUPERADMIN' && currentView === 'login') {
      setCurrentView('dashboard');
    }
  }, [isAuthenticated, userRole, currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <UserLists />;
      case 'login':
        return <LoginForm />;
      case 'init-superadmin':
        return <InitSuperAdminForm />;
      case 'create-admin':
        return <CreateAdminForm />;
      case 'create-user':
        return <CreateUserForm />;
      default:
        return <LoginForm />;
    }
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-0 sm:h-16 gap-3 sm:gap-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-text">LMS</h1>
                <p className="text-xs text-text-secondary hidden sm:block">Learning Management System</p>
              </div>
            </div>
flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="flex items-center space-x-2 order-2 sm:order-1">
                  <div className="text-sm">
                    <span className="font-medium text-text">{user}</span>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded bg-primary text-white">{userRole}</span>
                  </div>
                </div>
                <nav className="flex flex-wrap gap-2 order-1 sm:order-2">
                  {/* Super Admin Navigation */}
                  {userRole === 'SUPERADMIN' && (
                    <>
                      <button
                        onClick={() => handleViewChange('dashboard')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentView === 'dashboard'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:text-text hover:bg-gray-100'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleViewChange('create-admin')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentView === 'create-admin'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:text-text hover:bg-gray-100'
                        }`}
                      >
                        + Admin
                      </button>
                      <button
                        onClick={() => handleViewChange('create-user')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentView === 'create-user'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:text-text hover:bg-gray-100
                            ? 'bg-primary text-white shadow-md'
                            : 'text-text-secondary hover:text-text hover:bg-background border border-border'
                        }`}
                      >
                        + User
                      </button>
                    </>
                  )}

                  {/* Admin Navigation */}
                  {userRole === 'ADMIN' && (
                    <>
                      <button3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentView === 'dashboard'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:text-text hover:bg-gray-100'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleViewChange('create-user')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentView === 'create-user'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:text-text hover:bg-gray-100'
                        }`}
                      >
                        + User
                      </button>
                    </>
                  )}

                  {/* User Navigation */}
                  {userRole === 'USER' && (
                    <button
                      onClick={() => handleViewChange('dashboard')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'dashboard'
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:text-text hover:bg-gray-100'
                      }`}
                    >
                      My Profile
                    </button>
                  )}

                  <button
                    onClick={() => handleViewChange('login')}
                    className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-white hover:bg-primary transition-colors"
                  >
                    Sign Out
                  </button>
                </nav>
              </div>
            )}

            {!isAuthenticated && (
              <nav className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleViewChange('login')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'login'
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text hover:bg-gray-100'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => handleViewChange('init-superadmin')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'init-superadmin'
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text hover:bg-gray-100'
                  }`}
                >
                  Setup Admin
                </button>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default Dashboard;