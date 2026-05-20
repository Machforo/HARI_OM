# CRM - Developer Documentation

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              AuthProvider (Context)                  │  │
│  │  ├── Login/Logout                                    │  │
│  │  ├── Permission Checking                            │  │
│  │  └── User State Management                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         useLeads Hook (State Management)             │  │
│  │  ├── addLead()                                        │  │
│  │  ├── updateLead()                                    │  │
│  │  ├── deleteLead()                                    │  │
│  │  └── Sync to localStorage                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Protected Routes & CRM Pages               │  │
│  │  ├── Login, Dashboard                                │  │
│  │  ├── AllLeads, LeadDetail                           │  │
│  │  ├── RoleManagement, Reports                        │  │
│  │  └── CRMLayout (Navigation)                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Browser Storage Layer                   │  │
│  │  ├── vd_leads (Lead data)                            │  │
│  │  ├── vd_users (User accounts)                        │  │
│  │  └── vd_current_user (Session)                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Type Definitions

### Lead Type
```typescript
interface Lead {
  id: string;              // Auto-generated
  name: string;            // Contact name
  phone: string;           // Phone number
  email: string;           // Email address
  service: string;         // Service type
  temple: string;          // Temple name
  date: string;            // Booking date
  devotees: number;        // Number of devotees
  notes: string;           // Special requests
  status: LeadStatus;      // Current status
  comments: string;        // Internal notes
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
  assignedTo?: string;     // Optional: User ID
}
```

### User Type
```typescript
interface User {
  id: string;              // Auto-generated
  username: string;        // Unique username
  password: string;        // Plain text (demo only!)
  email: string;           // Email address
  role: UserRole;          // master_admin, admin, team
  name: string;            // Full name
  createdAt: string;       // ISO timestamp
}
```

### LeadStatus Type
```typescript
type LeadStatus = 
  | "new"                  // Just created
  | "contacted"            // Team reached out
  | "qualified"            // Shows interest
  | "converted"            // Booking confirmed
  | "lost"                 // Rejected/no response
  | "on_hold"              // Waiting for follow-up
```

### UserRole Type
```typescript
type UserRole = 
  | "master_admin"         // Full access
  | "admin"                // Management only
  | "team"                 // Data entry only
```

---

## 🔄 Data Flow Diagrams

### Lead Creation Flow

```
User submits
website form
    ↓
BookingForm.tsx
    ↓
useLeads.addLead()
    ↓
Create Lead object
    ↓
Update leads state
    ↓
Save to localStorage
    ↓
Navigate to /thank-you
    ↓
Lead appears in
CRM dashboard
```

### Authentication Flow

```
User enters credentials
on /crm/login
    ↓
useAuth.login()
    ↓
Find user in vd_users
    ↓
Verify password matches
    ↓
Set user state
    ↓
Save to vd_current_user
    ↓
Navigate to /crm/dashboard
    ↓
ProtectedRoute checks
isAuthenticated
    ↓
Render CRM
```

### Permission Check Flow

```
User accesses page
    ↓
ProtectedRoute checks
requiredPermission
    ↓
useAuth.hasPermission()
    ↓
Get user.role
    ↓
Look up permissions
for role
    ↓
Check if permission
in list
    ↓
Return true/false
    ↓
Allow/Redirect
```

---

## 💾 LocalStorage Schema

### vd_leads
```json
[
  {
    "id": "lead_1234567890_abc123",
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@email.com",
    "service": "VIP Darshan",
    "temple": "Varanasi",
    "date": "2025-04-25",
    "devotees": 2,
    "notes": "Senior citizens",
    "status": "contacted",
    "comments": "Called, waiting for response",
    "createdAt": "2025-04-20T10:30:00Z",
    "updatedAt": "2025-04-20T14:00:00Z"
  }
]
```

### vd_users
```json
[
  {
    "id": "user_1",
    "username": "master_admin",
    "password": "admin123",
    "email": "master@divine.com",
    "role": "master_admin",
    "name": "Master Admin",
    "createdAt": "2025-04-20T00:00:00Z"
  }
]
```

### vd_current_user
```json
{
  "id": "user_1",
  "username": "master_admin",
  "email": "master@divine.com",
  "role": "master_admin",
  "name": "Master Admin"
}
```

---

## 🎯 API Functions

### AuthContext Functions

#### login(username, password)
```typescript
const { login } = useAuth()

// Usage
const success = login("master_admin", "admin123")
if (success) {
  navigate("/crm/dashboard")
}
```

#### logout()
```typescript
const { logout } = useAuth()

// Usage
logout()
navigate("/crm/login")
```

#### hasPermission(permission)
```typescript
const { hasPermission } = useAuth()

// Usage
if (hasPermission("manage_roles")) {
  showRoleManagementMenu()
}
```

---

### useLeads Hook Functions

#### addLead(leadData)
```typescript
const { addLead } = useLeads()

// Usage
const newLead = addLead({
  name: "John Doe",
  phone: "9876543210",
  email: "john@email.com",
  service: "VIP Darshan",
  temple: "Varanasi",
  date: "2025-04-25",
  devotees: 2,
  notes: "Senior citizens",
  status: "new",
  comments: ""
})

console.log(newLead.id) // Auto-generated ID
```

#### updateLead(id, updates)
```typescript
const { updateLead } = useLeads()

// Usage - Update status only
updateLead("lead_123", {
  status: "contacted"
})

// Usage - Update multiple fields
updateLead("lead_123", {
  status: "qualified",
  comments: "Called, very interested",
  phone: "9876543211"
})
```

#### deleteLead(id)
```typescript
const { deleteLead } = useLeads()

// Usage
deleteLead("lead_123")
```

---

## 🔐 Permission Model

### Role Permissions Matrix

```typescript
const rolePermissions: Record<UserRole, Permission[]> = {
  master_admin: [
    "view_leads",
    "create_lead",
    "edit_lead",
    "delete_lead",
    "manage_roles",
    "manage_users",
    "export_leads",
    "view_reports"
  ],
  admin: [
    "view_leads",
    "create_lead",
    "edit_lead",
    "delete_lead",
    "export_leads",
    "view_reports"
  ],
  team: [
    "view_leads",
    "create_lead",
    "edit_lead"
  ]
}
```

### Checking Permissions
```typescript
const { hasPermission } = useAuth()

// Check single permission
if (hasPermission("manage_roles")) {
  // Show admin panel
}

// For conditional rendering
{hasPermission("delete_lead") && (
  <DeleteButton onClick={handleDelete} />
)}
```

---

## 🧩 Component Hierarchy

```
App
├── AuthProvider
│   ├── BrowserRouter
│   │   ├── Layout (Main website)
│   │   │   ├── Index, Temples, Services, etc.
│   │   │   └── BookingForm
│   │   ├── ProtectedRoute
│   │   │   └── CRMLayout
│   │   │       ├── Dashboard
│   │   │       ├── AllLeads
│   │   │       ├── LeadDetail
│   │   │       ├── RoleManagement
│   │   │       └── Reports
│   │   └── CRMLogin
```

---

## 🔌 Integration Points

### 1. Adding New Lead Fields

**Step 1**: Update Lead type in `src/types/crm.ts`
```typescript
interface Lead {
  // ... existing fields
  customField: string;  // Add new field
}
```

**Step 2**: Update BookingForm in `src/components/BookingForm.tsx`
```typescript
const [form, setForm] = useState({
  // ... existing fields
  customField: "",      // Add new field
})
```

**Step 3**: Update form submission
```typescript
addLead({
  // ... existing fields
  customField: form.customField,
})
```

**Step 4**: Update AllLeads table in `src/pages/crm/AllLeads.tsx`
```typescript
<TableHead>
  {/* ... existing headers */}
  <TableHead>Custom Field</TableHead>
</TableHead>
<TableCell>{lead.customField}</TableCell>
```

---

### 2. Adding New Permission

**Step 1**: Add to Permission type in `src/types/crm.ts`
```typescript
export type Permission = 
  | "view_leads"
  | "new_permission"  // Add new
```

**Step 2**: Update rolePermissions in `src/context/AuthContext.tsx`
```typescript
const rolePermissions: Record<UserRole, Permission[]> = {
  master_admin: [..., "new_permission"],
  admin: [...],
  team: [...]
}
```

**Step 3**: Use in components
```typescript
const { hasPermission } = useAuth()

if (hasPermission("new_permission")) {
  // Show feature
}
```

---

### 3. Adding New Page/Route

**Step 1**: Create page component
```typescript
// src/pages/crm/NewPage.tsx
export default function NewPage() {
  const { hasPermission } = useAuth()
  
  return <div>New Page</div>
}
```

**Step 2**: Add route in `src/App.tsx`
```typescript
<Route
  path="/crm/newpage"
  element={
    <ProtectedRoute requiredPermission="view_leads">
      <CRMLayout>
        <NewPage />
      </CRMLayout>
    </ProtectedRoute>
  }
/>
```

**Step 3**: Add to CRMLayout menu in `src/components/CRMLayout.tsx`
```typescript
const menuItems = [
  // ... existing items
  { path: "/crm/newpage", label: "New Page", icon: Icon, show: true }
]
```

---

## 🧪 Testing Guide

### Unit Test Example
```typescript
import { render, screen } from '@testing-library/react'
import { AuthProvider } from '@/context/AuthContext'
import Dashboard from '@/pages/crm/Dashboard'

describe('Dashboard', () => {
  it('displays total leads count', () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    )
    
    expect(screen.getByText(/Total Leads/i)).toBeInTheDocument()
  })
})
```

### Integration Test Example
```typescript
describe('Lead Management', () => {
  it('creates and displays a new lead', () => {
    // 1. Submit booking form
    // 2. Verify lead in localStorage
    // 3. Check CRM dashboard shows it
  })
})
```

---

## 📊 Performance Considerations

### Current Limitations
- All leads loaded in memory
- No pagination
- No virtual scrolling
- localStorage limited to ~5-10MB

### Optimization Strategies
1. **Pagination**: Load 50 leads per page
2. **Lazy Loading**: Load chart data on demand
3. **Filtering**: Pre-filter before rendering
4. **Memoization**: Use React.memo for components
5. **Debouncing**: Search with 300ms debounce

---

## 🚀 Production Migration

### Current Architecture
```
Browser → localStorage (Demo)
```

### Production Architecture
```
Browser → API Server → Database
    ↓                    ↓
  React App        PostgreSQL/MongoDB
    ↓                    ↓
Redux Store        Backup System
```

### Migration Steps
1. Create backend API (Node.js/Django/FastAPI)
2. Replace localStorage with API calls
3. Implement authentication with JWT
4. Add database (PostgreSQL/MongoDB)
5. Add API security (CORS, rate limiting, etc.)
6. Deploy to production server

---

## 📝 Code Standards

### Naming Conventions
```typescript
// Components: PascalCase
const AllLeads = () => {}

// Functions: camelCase
const handleStatusChange = () => {}

// Constants: UPPER_SNAKE_CASE
const MAX_LEADS = 1000

// Types: PascalCase with suffix
interface Lead {}
type LeadStatus = "new" | "contacted"
```

### File Organization
```
src/
├── types/          # TypeScript interfaces
├── context/        # React context providers
├── components/     # Reusable components
├── pages/          # Page components
├── hooks/          # Custom hooks
├── lib/            # Utilities
└── data/           # Static data
```

---

## 🔍 Debugging

### Enable Debug Logging
```typescript
// In any component
useEffect(() => {
  console.log('Current leads:', leads)
  console.log('Current user:', user)
}, [leads, user])
```

### Check localStorage
```javascript
// Browser console
localStorage.getItem('vd_leads')
localStorage.getItem('vd_users')
localStorage.getItem('vd_current_user')
```

### Monitor State Changes
```typescript
// In AuthContext or useLeads
console.log('State updated:', {
  leads,
  user,
  permissions
})
```

---

## 🎓 Learning Resources

- React Documentation: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs
- shadcn/ui: https://ui.shadcn.com
- React Router: https://reactrouter.com
- Recharts: https://recharts.org

---

## ✅ Development Checklist

- [ ] Local environment setup
- [ ] Code dependencies installed
- [ ] Dev server running
- [ ] All routes accessible
- [ ] Demo accounts working
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Performance acceptable
- [ ] Code follows standards
- [ ] Ready for production migration

---

**Document Version**: 1.0
**Last Updated**: April 20, 2026
**Status**: Complete
