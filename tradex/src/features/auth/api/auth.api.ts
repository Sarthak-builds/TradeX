import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { LoginValues, RegisterValues, ForgotPasswordValues, ResetPasswordValues } from '../types';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginValues) => {
      const { data } = await axiosInstance.post('/auth/login', values);
      return data; // Expected: { id, email, name, token }
    },
    onSuccess: (data) => {
      setAuth({ id: data.id, email: data.email, name: data.name }, data.token);
      toast.success('Login successful!');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error('Login failed', {
        description: error.response?.data?.message || 'Please check your credentials.',
      });
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      const { data } = await axiosInstance.post('/auth/register', values);
      return data;
    },
    onSuccess: () => {
      toast.success('Account created!', {
        description: 'Initializing your terminal...',
      });
      router.push('/check-email');
    },
    onError: (error: any) => {
      toast.error('Registration failed', {
        description: error.response?.data?.message || 'Please try again later.',
      });
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post('/auth/resend-verification');
      return data;
    },
    onSuccess: () => {
      toast.success('Verification email resent!', {
        description: 'Please check your inbox.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to resend email.', {
        description: error.response?.data?.message || 'Try again in a moment.',
      });
    },
  });
};

export const useLogout = () => {
  const logoutState = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post('/auth/logout');
    },
    onSuccess: () => {
      logoutState();
      toast.success('Logged out successfully');
      router.push('/login');
    },
    onError: () => {
      // Still logout state even if server fails
      logoutState();
      router.push('/login');
    },
  });
};

export const useForgotPassword = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: async (email: string) => {
      await axiosInstance.post('/auth/forgot-password', { email });
    },
    onSuccess: () => {
      toast.success('Reset link sent!', {
        description: 'Check your email for password recovery instructions.',
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error('Failed to send reset link.', {
        description: error.response?.data?.message || 'Try again later.',
      });
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ token, password }: any) => {
      await axiosInstance.post('/auth/reset-password', { token, password });
    },
    onSuccess: () => {
      toast.success('Password reset successful!', {
        description: 'You can now log in with your new password.',
      });
      router.push('/login');
    },
    onError: (error: any) => {
      toast.error('Failed to reset password.', {
        description: error.response?.data?.message || 'The link may have expired.',
      });
    },
  });
};
