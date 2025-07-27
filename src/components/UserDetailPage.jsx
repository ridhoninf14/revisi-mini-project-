import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import { ArrowLeft, Mail, User, Hash, Calendar, Globe } from 'lucide-react';

export function UserDetailPage({ userId, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) {
        onNavigate('login');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('User not found');
        }

        const data = await response.json();
        setUser(data.data);
      } catch (err) {
        setError('Failed to load user details. Please try again.');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, isAuthenticated, onNavigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-xl text-slate-800 mb-2">Access Restricted</h2>
            <p className="text-slate-600 mb-4">Please log in to view user details.</p>
            <Button
              onClick={() => onNavigate('login')}
              className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            onClick={() => onNavigate('home')}
            variant="outline"
            className="mb-4 border-green-200 hover:bg-green-50 text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-700">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <Skeleton className="w-32 h-32 rounded-full" />
                </div>
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <div className="space-y-3">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : user ? (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-32 h-32 rounded-full border-4 border-green-200 shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <h1 className="text-3xl text-slate-800 mb-2">
                        {user.first_name} {user.last_name}
                      </h1>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
                        <Hash className="w-3 h-3 mr-1" />
                        ID: {user.id}
                      </Badge>
                      <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200 px-3 py-1">
                        <User className="w-3 h-3 mr-1" />
                        Active User
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                    <Mail className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-sm text-slate-600">Email Address</p>
                      <p className="text-slate-800">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                    <Globe className="w-4 h-4 text-cyan-600" />
                    <div>
                      <p className="text-sm text-slate-600">Profile URL</p>
                      <p className="text-slate-800">reqres.in/users/{user.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <User className="w-5 h-5 text-green-600" />
                    <span>Profile Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <Hash className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-slate-600">User ID</p>
                      <p className="text-slate-800">#{user.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-sm text-slate-600">Member Since</p>
                      <p className="text-slate-800">2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">About {user.first_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-50 to-cyan-50 p-6 rounded-lg border border-green-100">
                  <p className="text-slate-700 leading-relaxed">
                    {user.first_name} {user.last_name} is a valued member of our community...
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="border-green-200 hover:bg-green-50 text-green-700">
                    <User className="w-4 h-4 mr-2" />
                    Add to Contacts
                  </Button>
                  <Button variant="outline" className="border-cyan-200 hover:bg-cyan-50 text-cyan-700">
                    <Globe className="w-4 h-4 mr-2" />
                    View Public Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl text-slate-800 mb-2">User Not Found</h2>
              <p className="text-slate-600 mb-4">The user you're looking for doesn't exist or has been removed.</p>
              <Button
                onClick={() => onNavigate('home')}
                className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
              >
                Back to Users
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
