import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useLeads } from "@/context/AuthContext";
import { LogOut, Users, BarChart3, FileText } from "lucide-react";

export default function CRMDashboard() {
  const navigate = useNavigate();
  const { user, logout, hasPermission } = useAuth();
  const { leads } = useLeads();

  const handleLogout = () => {
    logout();
    navigate("/crm/login");
  };

  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;
  const conversionRate = leads.length > 0 ? ((convertedCount / leads.length) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">CRM Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Welcome, <span className="font-semibold">{user?.name}</span> ({user?.role.replace("_", " ")})
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-slate-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">New Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{newLeadsCount}</div>
              <p className="text-xs text-slate-500 mt-1">Awaiting follow-up</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Converted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{convertedCount}</div>
              <p className="text-xs text-slate-500 mt-1">Successful bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{conversionRate}%</div>
              <p className="text-xs text-slate-500 mt-1">Success ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* All Leads Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                All Leads
              </CardTitle>
              <CardDescription>View and manage all website leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-slate-900">{leads.length}</div>
              <Button onClick={() => navigate("/crm/leads")} className="w-full">
                View All Leads
              </Button>
            </CardContent>
          </Card>

          {/* Role Management Card (Master Admin & Admin only) */}
          {hasPermission("manage_roles") && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Role Management
                </CardTitle>
                <CardDescription>Manage users and their roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Create and manage user accounts with different role permissions
                </p>
                <Button onClick={() => navigate("/crm/roles")} className="w-full">
                  Manage Roles
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Reports Card (Admin & Master Admin) */}
          {hasPermission("view_reports") && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Reports
                </CardTitle>
                <CardDescription>View leads and conversion analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Analyze lead sources, conversion rates, and performance metrics
                </p>
                <Button onClick={() => navigate("/crm/reports")} className="w-full">
                  View Reports
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Last 5 leads submitted</CardDescription>
          </CardHeader>
          <CardContent>
            {leads.slice(0, 5).length === 0 ? (
              <p className="text-slate-500 text-sm">No leads yet</p>
            ) : (
              <div className="space-y-3">
                {leads.slice(0, 5).map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    onClick={() => navigate(`/crm/leads/${lead.id}`)}
                  >
                    <div>
                      <p className="font-medium text-slate-900">{lead.name}</p>
                      <p className="text-sm text-slate-600">{lead.email}</p>
                    </div>
                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {leads.length > 0 && (
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => navigate("/crm/leads")}
              >
                View All Leads
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
