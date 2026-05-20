// User Roles
export type UserRole = "master_admin" | "admin" | "team";

// Lead Status
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost" | "on_hold";

// Lead interface
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  temple: string;
  date: string;
  devotees: number;
  notes: string;
  status: LeadStatus;
  comments: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string; // User ID
}

// User interface
export interface User {
  id: string;
  username: string;
  password: string; // In production, this would be hashed
  email: string;
  role: UserRole;
  name: string;
  createdAt: string;
}

// Role interface
export interface Role {
  id: string;
  name: UserRole;
  permissions: Permission[];
  createdAt: string;
}

// Permissions
export type Permission =
  | "view_leads"
  | "create_lead"
  | "edit_lead"
  | "delete_lead"
  | "manage_roles"
  | "manage_users"
  | "export_leads"
  | "view_reports";

// Auth Context
export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => Lead;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}
