import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, LayoutDashboard, Users, FileText, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

interface CRMLayoutProps {
  children: React.ReactNode;
}

export const CRMLayout: React.FC<CRMLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const handleLogout = () => {
    logout();
    navigate("/crm/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/crm/dashboard", label: "Dashboard", icon: LayoutDashboard, show: true },
    { path: "/crm/leads", label: "All Leads", icon: FileText, show: hasPermission("view_leads") },
    { path: "/crm/roles", label: "Role Management", icon: Users, show: hasPermission("manage_roles") },
    { path: "/crm/reports", label: "Reports", icon: BarChart3, show: hasPermission("view_reports") },
  ];

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile Toggle Trigger (Float top left on mobile when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-40 h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg border border-slate-700"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64 fixed md:relative inset-y-0 left-0 z-40" : "w-0 md:w-20 md:relative"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-lg overflow-hidden h-full`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>CRM</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-slate-800"
            >
              {sidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(
            (item) =>
              item.show && (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth <= 768) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                  title={!sidebarOpen ? item.label : ""}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              )
          )}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {sidebarOpen && (
            <div className="text-xs mb-3">
              <p className="text-slate-400">Logged in as</p>
              <p className="font-semibold text-white truncate">{user?.name}</p>
              <p className="text-slate-400 text-xs">
                {user?.role.replace("_", " ")}
              </p>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white"
            size={sidebarOpen ? "sm" : "icon"}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
