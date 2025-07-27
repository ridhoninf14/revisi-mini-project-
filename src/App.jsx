// import React, { useState, useEffect } from 'react';
// import { AuthProvider, useAuth } from './components/AuthContext';
// import { Navigation } from './components/Navigation';
// import { LoginPage } from './components/LoginPage';
// import { RegisterPage } from './components/RegisterPage';
// import { HomePage } from './components/HomePage';
// import { UserDetailPage } from './components/UserDetailPage';

// type Page = 'login' | 'register' | 'home' | 'user-detail';

// function AppContent() {
//   const [currentPage, setCurrentPage] = useState<Page>('login');
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
//   const { isAuthenticated } = useAuth();

//   // Auto-navigate based on authentication status
//   useEffect(() => {
//     if (isAuthenticated && (currentPage === 'login' || currentPage === 'register')) {
//       setCurrentPage('home');
//     } else if (!isAuthenticated && (currentPage === 'home' || currentPage === 'user-detail')) {
//       setCurrentPage('login');
//     }
//   }, [isAuthenticated, currentPage]);

//   const handleNavigate = (page: string, userId?: number) => {
//     setCurrentPage(page as Page);
//     if (userId) {
//       setSelectedUserId(userId);
//     }
//   };

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'login':
//         return <LoginPage onNavigate={handleNavigate} />;
//       case 'register':
//         return <RegisterPage onNavigate={handleNavigate} />;
//       case 'home':
//         return <HomePage onNavigate={handleNavigate} />;
//       case 'user-detail':
//         return selectedUserId ? (
//           <UserDetailPage userId={selectedUserId} onNavigate={handleNavigate} />
//         ) : (
//           <HomePage onNavigate={handleNavigate} />
//         );
//       default:
//         return <HomePage onNavigate={handleNavigate} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
//       <main>
//         {renderCurrentPage()}
//       </main>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// koreksi

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Navigation } from './components/Navigation';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { HomePage } from './components/HomePage';
import { UserDetailPage } from './components/UserDetailPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('login'); // type Page dihapus
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('home');
    } else if (!isAuthenticated && (currentPage === 'home' || currentPage === 'user-detail')) {
      setCurrentPage('login');
    }
  }, [isAuthenticated, currentPage]);

  const handleNavigate = (page, userId) => {
    setCurrentPage(page);
    if (userId) {
      setSelectedUserId(userId);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'user-detail':
        return selectedUserId ? (
          <UserDetailPage userId={selectedUserId} onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
