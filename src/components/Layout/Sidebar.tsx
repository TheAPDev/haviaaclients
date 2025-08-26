import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  Shield, 
  Clock, 
  User, 
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Calendar, label: 'Booked Sessions', path: '/sessions' },
    { icon: Shield, label: 'Backup Tokens', path: '/backup-tokens', comingSoon: true },
    { icon: Clock, label: 'Quick Maids', path: '/quick-maids', comingSoon: true },
  ];

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full w-70 bg-gradient-to-b from-blue-50 to-blue-100 border-r border-blue-200 z-50 lg:z-40"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-blue-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-blue-900 font-montserrat">Haviaa</h2>
            <p className="text-xs lg:text-sm text-blue-700 mt-1">Welcome, {user?.name}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-blue-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-blue-700" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 lg:p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.path} className="relative">
              {item.comingSoon ? (
                <div className="flex items-center px-3 lg:px-4 py-2 lg:py-3 text-blue-400 cursor-not-allowed">
                  <item.icon className="w-4 lg:w-5 h-4 lg:h-5 mr-2 lg:mr-3" />
                  <span className="font-inter text-sm lg:text-base">{item.label}</span>
                  <span className="ml-auto text-xs bg-blue-200 text-blue-600 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full">
                    Soon
                  </span>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-blue-700 hover:bg-blue-200'
                    }`
                  }
                >
                  <item.icon className="w-4 lg:w-5 h-4 lg:h-5 mr-2 lg:mr-3" />
                  <span className="font-inter text-sm lg:text-base">{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Profile Settings */}
        <div className="p-3 lg:p-4 border-t border-blue-200 space-y-2">
          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-blue-700 hover:bg-blue-200'
              }`
            }
          >
            <User className="w-4 lg:w-5 h-4 lg:h-5 mr-2 lg:mr-3" />
            <span className="font-inter text-sm lg:text-base">Profile Settings</span>
            {!user?.profileComplete && (
              <span className="ml-auto w-1.5 lg:w-2 h-1.5 lg:h-2 bg-red-500 rounded-full"></span>
            )}
          </NavLink>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-4 lg:w-5 h-4 lg:h-5 mr-2 lg:mr-3" />
            <span className="font-inter text-sm lg:text-base">Logout</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;