/**
 * Sanitizes error messages to prevent information disclosure.
 * Maps technical error details to user-friendly messages.
 */
export function getSafeErrorMessage(error: unknown, fallback: string = "An error occurred. Please try again."): string {
  if (!error) return fallback;

  const message = error instanceof Error 
    ? error.message 
    : typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message: unknown }).message)
      : String(error);

  // Map known safe/expected errors to user-friendly messages
  const lowerMessage = message.toLowerCase();

  // Auth-related errors
  if (lowerMessage.includes('jwt') || lowerMessage.includes('token')) {
    return 'Authentication failed. Please sign in again.';
  }
  if (lowerMessage.includes('invalid login') || lowerMessage.includes('invalid email or password')) {
    return 'Invalid email or password.';
  }
  if (lowerMessage.includes('email not confirmed')) {
    return 'Please confirm your email address.';
  }
  if (lowerMessage.includes('rate limit') || lowerMessage.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  // Magic-link / OAuth redirect configuration errors (safe to show)
  if (
    lowerMessage.includes('redirect') &&
    (lowerMessage.includes('not allowed') || lowerMessage.includes('invalid'))
  ) {
    return 'Sign-in link is blocked by auth settings. Add this site URL and /auth/callback to the allowed redirect URLs, then try again.';
  }

  // Permission/RLS errors
  if (lowerMessage.includes('rls') || lowerMessage.includes('permission denied') || lowerMessage.includes('policy')) {
    return 'Access denied. You may not have permission for this action.';
  }

  // Not found errors
  if (lowerMessage.includes('not found') || lowerMessage.includes('does not exist')) {
    return 'The requested resource was not found.';
  }

  // Network errors
  if (lowerMessage.includes('network') || lowerMessage.includes('fetch') || lowerMessage.includes('failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Validation errors - these are often safe to pass through
  if (lowerMessage.includes('invalid') && lowerMessage.includes('format')) {
    return 'Invalid input format. Please check your data.';
  }

  // For known safe Supabase auth errors, pass through
  const safeAuthPatterns = [
    'email already registered',
    'signup is disabled',
    'password should be',
    'email rate limit exceeded',
    'user already registered',
  ];
  
  for (const pattern of safeAuthPatterns) {
    if (lowerMessage.includes(pattern)) {
      return message; // Safe to pass through
    }
  }

  // Default: return generic message to avoid leaking internals
  return fallback;
}

/**
 * Validates that a redirect URL is safe (internal path only).
 * Prevents open redirect attacks including protocol-relative URLs.
 */
export function getSafeRedirectPath(rawPath: string | null, defaultPath: string = "/"): string {
  if (!rawPath) return defaultPath;
  
  const trimmed = rawPath.trim();
  
  // Must start with single "/" but NOT "//" (protocol-relative URL)
  // Also block any path that could be parsed as a URL
  if (
    trimmed.startsWith("/") && 
    !trimmed.startsWith("//") &&
    !trimmed.includes("://") &&
    !trimmed.includes("\\")
  ) {
    return trimmed;
  }
  
  return defaultPath;
}
