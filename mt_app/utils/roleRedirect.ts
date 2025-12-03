export function getRoleBasedRedirectUrl(role: string, returnUrl?: string): string {
  console.log('🎯 getRoleBasedRedirectUrl called:', { role, returnUrl });
  
  // For staff and admin, always redirect to their dashboard regardless of return URL
  if (role === 'staff') {
    console.log('👥 Staff detected, redirecting to /staff/booking-management');
    return '/staff/booking';
  }
  if (role === 'admin') {
    console.log('👑 Admin detected, redirecting to /admin/booking-management');
    return '/admin/payment';
  }

  // For customers, if there's a valid return URL, use it
  if (returnUrl && returnUrl !== '/' && returnUrl !== '/signin' && returnUrl !== '/auth/callback') {
    // Validate the return URL is appropriate for customers
    if (isUrlAllowedForRole(returnUrl, role)) {
      console.log('👤 Customer with valid return URL:', returnUrl);
      return returnUrl;
    }
  }

  // Default redirect for customers
  console.log('👤 Customer with default redirect to /');
  return '/';
}

function isUrlAllowedForRole(url: string, role: string): boolean {
  // Admin can access everything
  if (role === 'admin') {
    return true;
  }

  // Staff can access staff and user routes (but not admin routes)
  if (role === 'staff') {
    return !url.startsWith('/admin/') && (url.startsWith('/staff/') || url.startsWith('/user/'));
  }

  // Customer can access user routes and public routes (but not admin/staff routes)
  if (role === 'customer') {
    return !url.startsWith('/admin/') && !url.startsWith('/staff/');
  }

  return false;
}

export function getDefaultDashboardUrl(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin/booking-management';
    case 'staff':
      return '/staff/booking-management';
    case 'customer':
    default:
      return '/';
  }
}
