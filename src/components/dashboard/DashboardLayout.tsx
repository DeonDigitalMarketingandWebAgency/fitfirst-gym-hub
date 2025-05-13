
import { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  Calendar,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
  userType?: 'user' | 'admin';
}

const DashboardLayout = ({ children, userType = 'user' }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, this would be an API call to log the user out
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const userMenuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Package size={20} />, label: 'My Packages', path: '/dashboard/packages' },
    { icon: <Calendar size={20} />, label: 'Booking History', path: '/dashboard/booking-history' },
    { icon: <User size={20} />, label: 'Profile', path: '/dashboard/profile' },
    { icon: <Settings size={20} />, label: 'Change Password', path: '/dashboard/change-password' },
  ];

  const adminMenuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Package size={20} />, label: 'Categories', path: '/admin/categories' },
    { icon: <Package size={20} />, label: 'Package Types', path: '/admin/package-types' },
    { icon: <Package size={20} />, label: 'Packages', path: '/admin/packages' },
    { icon: <CreditCard size={20} />, label: 'Bookings', path: '/admin/bookings' },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <Calendar size={20} />, label: 'Reports', path: '/admin/reports' },
    { icon: <User size={20} />, label: 'Profile', path: '/admin/profile' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  const menuItems = userType === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gym-blue text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">
                Fitness<span className="text-gym-orange">First</span>
              </span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gym-orange"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar menu */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-700 hover:text-gym-orange"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gym-blue">
                        {userType === 'admin' ? 'Admin User' : 'John Doe'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {userType === 'admin' ? 'Administrator' : 'Member'}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gym-blue flex items-center justify-center text-white">
                      <User size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
