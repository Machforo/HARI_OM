import { useLeads } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const { leads } = useLeads();

  // Calculate statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const contacted = leads.filter((l) => l.status === "contacted").length;
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const lost = leads.filter((l) => l.status === "lost").length;
  const onHold = leads.filter((l) => l.status === "on_hold").length;

  const conversionRate = totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(2) : 0;

  // Group leads by service
  const serviceStats = leads.reduce(
    (acc, lead) => {
      const existing = acc.find((s) => s.service === lead.service);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ service: lead.service, count: 1 });
      }
      return acc;
    },
    [] as { service: string; count: number }[]
  );

  // Group leads by temple
  const templeStats = leads.reduce(
    (acc, lead) => {
      const existing = acc.find((t) => t.temple === lead.temple);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ temple: lead.temple, count: 1 });
      }
      return acc;
    },
    [] as { temple: string; count: number }[]
  );

  // Status distribution
  const statusData = [
    { name: "New", value: newLeads, color: "#3b82f6" },
    { name: "Contacted", value: contacted, color: "#eab308" },
    { name: "Qualified", value: qualified, color: "#10b981" },
    { name: "Converted", value: converted, color: "#059669" },
    { name: "Lost", value: lost, color: "#ef4444" },
    { name: "On Hold", value: onHold, color: "#6b7280" },
  ].filter((item) => item.value > 0);

  // Leads over time (simulated)
  const leadsOverTime = leads.reduce(
    (acc, lead) => {
      const date = new Date(lead.createdAt).toLocaleDateString();
      const existing = acc.find((l) => l.date === date);
      if (existing) {
        existing.leads += 1;
      } else {
        acc.push({ date, leads: 1 });
      }
      return acc;
    },
    [] as { date: string; leads: number }[]
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{conversionRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Converted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{converted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Follow-up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{newLeads + contacted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
            <CardDescription>Current distribution of leads by status</CardDescription>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Service</CardTitle>
            <CardDescription>Lead count for each service type</CardDescription>
          </CardHeader>
          <CardContent>
            {serviceStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Temple and Leads Over Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temple Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Temple</CardTitle>
            <CardDescription>Lead count for each temple</CardDescription>
          </CardHeader>
          <CardContent>
            {templeStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={templeStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="temple" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leads Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Over Time</CardTitle>
            <CardDescription>Daily lead submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {leadsOverTime.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={leadsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Status Summary</CardTitle>
          <CardDescription>Breakdown of leads by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{newLeads}</div>
              <div className="text-xs text-blue-600 mt-1">New</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">{contacted}</div>
              <div className="text-xs text-yellow-600 mt-1">Contacted</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{qualified}</div>
              <div className="text-xs text-green-600 mt-1">Qualified</div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-700">{converted}</div>
              <div className="text-xs text-emerald-600 mt-1">Converted</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-700">{lost}</div>
              <div className="text-xs text-red-600 mt-1">Lost</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-700">{onHold}</div>
              <div className="text-xs text-gray-600 mt-1">On Hold</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
