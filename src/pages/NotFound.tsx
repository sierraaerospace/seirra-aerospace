import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary relative overflow-hidden">
      <div className="relative z-10 text-center px-4">
        <h1 className="font-heading text-7xl md:text-9xl font-bold text-foreground mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-2">Page not found</p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="gold" size="lg" asChild>
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
