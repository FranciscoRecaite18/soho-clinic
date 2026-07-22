export default function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const separatorIndex = decoded.indexOf(':');
      const password = separatorIndex === -1 ? decoded : decoded.slice(separatorIndex + 1);
      if (password === process.env.SITE_PIN) {
        return;
      }
    }
  }

  return new Response('Acceso restringido — Soho Beauty Clinic', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Soho Beauty Clinic"' },
  });
}

export const config = {
  matcher: '/((?!favicon.ico).*)',
};
