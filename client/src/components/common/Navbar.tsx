import { useLocation } from 'wouter';

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="w-full h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">NextName</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-300">
          {location === '/' ? 'Home' : location === '/workspace' ? 'Workspace' : 'NextName'}
        </div>
      </div>
    </nav>
  );
}