import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User, Lead, Permission, UserRole } from "@/types/crm";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Initialize from localStorage
  useEffect(() => {
    // Initialize demo users and guarantee vandan_sec exists
    const existingUsers = localStorage.getItem("vd_users");
    let usersList: User[] = [];
    if (existingUsers) {
      try {
        usersList = JSON.parse(existingUsers);
      } catch (e) {
        usersList = [];
      }
    }

    const demoUsers: User[] = [
      {
        id: "user_master_admin",
        username: "master_admin",
        password: "admin123",
        email: "master@temple.com",
        role: "master_admin",
        name: "Master Administrator",
        permissions: ["view_leads", "create_lead", "edit_lead", "delete_lead", "manage_roles", "manage_users", "export_leads", "view_reports"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "user_admin",
        username: "admin",
        password: "admin123",
        email: "admin@temple.com",
        role: "admin",
        name: "Administrator",
        permissions: ["view_leads", "create_lead", "edit_lead", "delete_lead", "export_leads", "view_reports"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "user_team",
        username: "team_member",
        password: "team123",
        email: "team@temple.com",
        role: "team",
        name: "Team Member",
        permissions: ["view_leads", "create_lead", "edit_lead"],
        createdAt: new Date().toISOString(),
      },
    ];

    const vandanUser: User = {
      id: "user_vandan",
      username: "vandan_sec",
      password: "vandan@123",
      email: "vandan@temple.com",
      role: "master_admin",
      name: "Vandan Secretary",
      permissions: ["view_leads", "create_lead", "edit_lead", "delete_lead", "manage_roles", "manage_users", "export_leads", "view_reports"],
      createdAt: new Date().toISOString(),
    };

    if (usersList.length === 0) {
      usersList = [vandanUser, ...demoUsers];
      localStorage.setItem("vd_users", JSON.stringify(usersList));
    } else {
      const hasVandan = usersList.some(u => u.username === "vandan_sec");
      if (!hasVandan) {
        usersList.push(vandanUser);
        localStorage.setItem("vd_users", JSON.stringify(usersList));
      }
    }

    const stored = localStorage.getItem("vd_current_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load user from storage", e);
      }
    }

    // Load leads from storage
    const storedLeads = localStorage.getItem("vd_leads");
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (e) {
        console.error("Failed to load leads from storage", e);
      }
    }
  }, []);

  // Role to permissions mapping
  const rolePermissions: Record<UserRole, Permission[]> = {
    master_admin: [
      "view_leads",
      "create_lead",
      "edit_lead",
      "delete_lead",
      "manage_roles",
      "manage_users",
      "export_leads",
      "view_reports",
    ],
    admin: [
      "view_leads",
      "create_lead",
      "edit_lead",
      "delete_lead",
      "export_leads",
      "view_reports",
    ],
    team: ["view_leads", "create_lead", "edit_lead"],
  };

  const login = (username: string, password: string): boolean => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("vd_users") || "[]") as User[];
    const foundUser = users.find((u) => u.username === username && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("vd_current_user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vd_current_user");
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const addLead = (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const newLead: Lead = {
      ...lead,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem("vd_leads", JSON.stringify(updated));
    return newLead;
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    const updated = leads.map((lead) =>
      lead.id === id ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead
    );
    setLeads(updated);
    localStorage.setItem("vd_leads", JSON.stringify(updated));
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((lead) => lead.id !== id);
    setLeads(updated);
    localStorage.setItem("vd_leads", JSON.stringify(updated));
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    leads,
    addLead,
    updateLead,
    deleteLead,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Hook to manage leads - uses the shared context instead of local state
export const useLeads = () => {
  const { leads, addLead, updateLead, deleteLead } = useAuth();
  return { leads, addLead, updateLead, deleteLead };
};
