'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api-config';
import { useToast } from '@/hooks/use-toast';
import { MOCK_DATA } from '@/lib/mock-data';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Mock credentials for development
const MOCK_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password123',
};

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        // Use mock data in development
        if (process.env.NODE_ENV === 'development') {
          const mockToken = localStorage.getItem('mock_token');
          if (mockToken) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_DATA.users[0];
          }
          return null;
        }

        // Real API call (commented for now)
        // const token = localStorage.getItem('token');
        // if (!token) return null;
        // const data = await fetchApi<{ user: User }>('/api/user');
        // return data.user;

        return null;
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('mock_token');
        localStorage.removeItem('token');
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      // Use mock auth in development
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (data.email === MOCK_CREDENTIALS.email && 
            data.password === MOCK_CREDENTIALS.password) {
          return {
            user: MOCK_DATA.users[0],
            token: 'mock_token_123',
          };
        }
        throw new Error('Invalid credentials');
      }

      // Real API call (commented for now)
      // return fetchApi<AuthResponse>('/api/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });
    },
    onSuccess: (data) => {
      if (process.env.NODE_ENV === 'development') {
        localStorage.setItem('mock_token', data.token);
      } else {
        localStorage.setItem('token', data.token);
      }
      
      queryClient.setQueryData(['user'], data.user);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.message || 'Please check your credentials and try again.',
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Handle mock logout in development
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.removeItem('mock_token');
        return;
      }

      // Real API call (commented for now)
      // const token = localStorage.getItem('token');
      // if (token) {
      //   await fetchApi('/api/auth/logout', {
      //     method: 'POST',
      //   });
      // }
      // localStorage.removeItem('token');
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
      router.push('/');
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}