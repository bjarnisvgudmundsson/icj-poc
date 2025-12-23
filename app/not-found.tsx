import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The page you are looking for does not exist.
        </p>
        <Link href="/icj">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
