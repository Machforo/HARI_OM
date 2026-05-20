import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, UserRole } from "@/types/crm";
import { MoreHorizontal, Trash2, Edit2, Plus } from "lucide-react";

export default function RoleManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    role: "team" as UserRole,
  });

  // Load users from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("vd_users");
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load users", e);
        initializeDefaultUsers();
      }
    } else {
      initializeDefaultUsers();
    }
  }, []);

  const initializeDefaultUsers = () => {
    const defaultUsers: User[] = [
      {
        id: "user_1",
        username: "master_admin",
        password: "admin123",
        email: "master@divine.com",
        role: "master_admin",
        name: "Master Admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user_2",
        username: "admin",
        password: "admin123",
        email: "admin@divine.com",
        role: "admin",
        name: "Admin User",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user_3",
        username: "team_member",
        password: "team123",
        email: "team@divine.com",
        role: "team",
        name: "Team Member",
        createdAt: new Date().toISOString(),
      },
    ];
    setUsers(defaultUsers);
    localStorage.setItem("vd_users", JSON.stringify(defaultUsers));
  };

  const handleAddUser = () => {
    if (!formData.username || !formData.email || !formData.name || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      // Update existing user
      const updated = users.map((u) =>
        u.id === editingId
          ? {
              ...u,
              username: formData.username,
              email: formData.email,
              name: formData.name,
              password: formData.password,
              role: formData.role,
            }
          : u
      );
      setUsers(updated);
      localStorage.setItem("vd_users", JSON.stringify(updated));
    } else {
      // Add new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: formData.role,
        name: formData.name,
        createdAt: new Date().toISOString(),
      };
      const updated = [...users, newUser];
      setUsers(updated);
      localStorage.setItem("vd_users", JSON.stringify(updated));
    }

    // Reset form
    setFormData({
      username: "",
      email: "",
      name: "",
      password: "",
      role: "team",
    });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (user: User) => {
    setFormData({
      username: user.username,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    });
    setEditingId(user.id);
    setIsOpen(true);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updated = users.filter((u) => u.id !== userId);
      setUsers(updated);
      localStorage.setItem("vd_users", JSON.stringify(updated));
    }
  };

  const getRoleColor = (role: UserRole) => {
    const colors: Record<UserRole, string> = {
      master_admin: "bg-purple-50 text-purple-700",
      admin: "bg-blue-50 text-blue-700",
      team: "bg-green-50 text-green-700",
    };
    return colors[role];
  };

  const getRoleLabel = (role: UserRole) => {
    const labels: Record<UserRole, string> = {
      master_admin: "Master Admin",
      admin: "Admin",
      team: "Team Member",
    };
    return labels[role];
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Manage users and their roles</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    username: "",
                    email: "",
                    name: "",
                    password: "",
                    role: "team",
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Update user information and role"
                    : "Create a new user account with a role"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value as UserRole })
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="master_admin">Master Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="team">Team Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddUser} className="w-full">
                  {editingId ? "Update User" : "Add User"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={`${getRoleColor(user.role)} cursor-default`}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(user)}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Role Permissions</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <strong>Master Admin:</strong> Full access - view, create, edit, delete leads,
                manage roles and users
              </p>
              <p>
                <strong>Admin:</strong> View, create, edit, delete leads, export and view reports
              </p>
              <p>
                <strong>Team Member:</strong> View, create, and edit leads only
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
