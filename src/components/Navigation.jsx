import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Users, User, LogOut, Lock, Leaf } from 'lucide-react';

export function Navigation({ currentPage, onNavigate }) {
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-medium text-slate-800">UserFlow</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {!isAuthenticated ? (
              <>
                <Button
                  variant={currentPage === 'login' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('login')}
                  className="text-slate-700 hover:text-green-600 hover:bg-green-50"
                >
                  Login
                </Button>
                <Button
                  variant={currentPage === 'register' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('register')}
                  className="text-slate-700 hover:text-green-600 hover:bg-green-50"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={currentPage === 'home' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('home')}
                  className="text-slate-700 hover:text-green-600 hover:bg-green-50 flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </Button>

                {/* User menu */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-green-100">
                  {user && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-8 h-8 rounded-full border-2 border-green-200"
                      />
                      <span className="text-sm text-slate-600">
                        {user.first_name} {user.last_name}
                      </span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-slate-500 hover:text-red-600 hover:bg-red-50 flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Protected route indicator */}
          {!isAuthenticated && (currentPage === 'home' || currentPage === 'user-detail') && (
            <div className="flex items-center space-x-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Login Required</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
