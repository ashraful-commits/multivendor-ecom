import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequest) {
    const token = request?.nextauth?.token;
    const path = request?.nextUrl?.pathname;
    const isPublicPath = path === '/login' || path === '/register';

    // Define the roles and their corresponding allowed paths
    const rolePermissions = {
      USER: ['/dashboard/orders' ],
      SELLER: [
        '/dashboard',
       
        '/dashboard/customers',
        '/dashboard/customers/new',
        '/dashboard/customers/update/:path*',
        '/dashboard/orders',
        '/dashboard/orders/new',
        '/dashboard/orders/update/:path*',
        '/dashboard/wallet',
        '/dashboard/settings',
        '/dashboard/store',
      ],
      FARMER: [
        '/dashboard',
       
        '/dashboard/customers',
        '/dashboard/customers/new',
        '/dashboard/customers/update/:path*',
        '/dashboard/farmers',
        '/dashboard/farmers/new',
        '/dashboard/farmers/update/:path*',
        '/dashboard/orders',
        '/dashboard/staff',
        '/dashboard/staff/new',
        '/dashboard/staff/update/:path*',
        '/dashboard/settings',
        '/dashboard/store',
      ],
      ADMIN: [
        '/dashboard',
       
        '/dashboard/customers',
        '/dashboard/customers/new',
        '/dashboard/customers/update/:path*',
        '/dashboard/products',
        '/dashboard/categories',
        '/dashboard/categories/new',
        '/dashboard/categories/update/:path*',
        '/dashboard/products/new',
        '/dashboard/products/update/:path*',
        '/dashboard/markets',
        '/dashboard/markets/new',
        '/dashboard/markets/update/:path*',
        '/dashboard/banners',
        '/dashboard/banners/new',
        '/dashboard/banners/update/:path*',
        '/dashboard/farmers',
        '/dashboard/farmers/new',
        '/dashboard/farmers/update/:path*',
        '/dashboard/orders',
        '/dashboard/orders/new',
        '/dashboard/orders/update/:path*',
        '/dashboard/staff',
        '/dashboard/staff/new',
        '/dashboard/staff/update/:path*',
        '/dashboard/community',
        '/dashboard/community/new',
        '/dashboard/community/update/:path*',
        '/dashboard/wallet',
        '/dashboard/settings',
        '/dashboard/store',
      ],
      MODERATOR: [
        '/dashboard',
       
        '/dashboard/customers',
        '/dashboard/customers/new',
        '/dashboard/customers/update/:path*',
        '/dashboard/products',
        '/dashboard/categories',
        '/dashboard/categories/new',
        '/dashboard/categories/update/:path*',
        '/dashboard/products/new',
        '/dashboard/products/update/:path*',
        '/dashboard/markets',
        '/dashboard/markets/new',
        '/dashboard/markets/update/:path*',
        '/dashboard/banners',
        '/dashboard/banners/new',
        '/dashboard/banners/update/:path*',
        '/dashboard/farmers',
        '/dashboard/farmers/new',
        '/dashboard/farmers/update/:path*',
        '/dashboard/orders',
        '/dashboard/orders/new',
        '/dashboard/orders/update/:path*',
        '/dashboard/staff',
        '/dashboard/staff/new',
        '/dashboard/staff/update/:path*',
        '/dashboard/community',
        '/dashboard/community/new',
        '/dashboard/community/update/:path*',
        '/dashboard/wallet',
        '/dashboard/settings',
        '/dashboard/store',
      ],
      CUSTOMER: [
        '/dashboard/orders',
        '/dashboard/wallet',
        '/dashboard/settings',
      ],
    };
    
   

    // Allow access to authentication-related routes
    if (path.startsWith('/api/auth/:path*')) {
      console.log('Auth route, allowing access');
      return NextResponse.next();
    }

    // Allow access to registration and login endpoints
    if (
      path === '/api/login' ||
      path === '/api/register-seller' ||
      path === '/api/register-farmer' ||
      path === '/api/register'
    ) {
      console.log('Registration/login route, allowing access');
      return NextResponse.next();
    }

    // Allow public paths without authentication
    if (!token && isPublicPath) {
      console.log('Public path, allowing access');
      return NextResponse.next();
    }

    // If the user is not authenticated and trying to access a protected route, redirect to login page
    if (!token && !isPublicPath) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // If authenticated, handle redirection logic
    if (token && isPublicPath) {
      
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Check if the user's role has permission to access the requested path
    const userHasAccess = rolePermissions[token?.role]?.some((allowedPath) => {
      const regex = new RegExp(`^${allowedPath.replace(/:path\*/g, '.*')}$`);
      const matches = regex.test(path);
     
      return matches;
    });

    if (userHasAccess) {
      
      return NextResponse.next();
    }

    // If the user's role doesn't have permission, redirect 
   
    return NextResponse.redirect(new URL('/', request.nextUrl));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard',
   
    '/dashboard/customers',
    '/dashboard/customers/new',
    '/dashboard/customers/update/:path*',
    '/dashboard/products',
    '/dashboard/categories',
    '/dashboard/categories/new',
    '/dashboard/categories/update/:path*',
    '/dashboard/products/new',
    '/dashboard/products/update/:path*',
    '/dashboard/markets',
    '/dashboard/markets/new',
    '/dashboard/markets/update/:path*',
    '/dashboard/banners',
    '/dashboard/banners/new',
    '/dashboard/banners/update/:path*',
    '/dashboard/farmers',
    '/dashboard/farmers/new',
    '/dashboard/farmers/update/:path*',
    '/dashboard/orders',
    '/dashboard/orders/new',
    '/dashboard/orders/update/:path*',
    '/dashboard/staff',
    '/dashboard/staff/new',
    '/dashboard/staff/update/:path*',
    '/dashboard/community',
    '/dashboard/community/new',
    '/dashboard/community/update/:path*',
    '/dashboard/wallet',
    '/dashboard/settings',
    '/dashboard/store',
  ],
};
