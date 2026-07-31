import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="text-center py-12">
      <p className="text-rk-accent font-mono text-xl mb-2">404</p>
      <p className="text-rk-muted text-sm mb-4">الصفحة دي مش موجودة.</p>
      <Link to="/" className="text-rk-accent text-sm hover:underline">
        الرجوع للـ Dashboard
      </Link>
    </div>
  );
}
