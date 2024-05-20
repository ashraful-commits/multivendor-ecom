import { useRouter } from 'next/router'; // Import useRouter from 'next/router'

export function useRedirectTo(redirect)  {
  const router = useRouter();
  
  return function redirectTo(redirect) {
    router.push(redirect);
  };
}
