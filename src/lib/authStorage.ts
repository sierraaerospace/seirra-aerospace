// Clears locally persisted auth state (tokens) so the UI can’t get stuck “logged in”
// even when signOut fails or a proxy/cache causes mismatched sessions.
export function clearAuthStorage() {
  try {
    const removeFrom = (storage: Storage) => {
      const keys: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (!k) continue;
        // Supabase-js stores session under keys like: sb-<projectRef>-auth-token
        if (k.startsWith("sb-") && k.includes("-auth-token")) keys.push(k);
      }
      keys.forEach((k) => storage.removeItem(k));
    };

    removeFrom(window.localStorage);
    removeFrom(window.sessionStorage);
  } catch {
    // best-effort
  }
}
