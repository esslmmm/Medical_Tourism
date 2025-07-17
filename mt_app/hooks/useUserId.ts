import { useSession } from 'next-auth/react';

export function useUserId() {
  const { data: session, status } = useSession();
  
  return {
    userId: session?.user?.id,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated'
  };
}
