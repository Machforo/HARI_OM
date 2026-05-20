# Divine Pathfinders CRM System

## Overview

A complete Customer Relationship Management (CRM) system for managing leads from your Divine Pathfinders website. The system includes lead tracking, role-based access control, and analytics.

## Features

### ✨ Core Features

1. **Lead Management**
   - View all leads in a comprehensive table
   - Sort by date (newest first/oldest first)
   - Filter by status
   - Search by name, phone, or email
   - View detailed lead information
   - Edit lead details and status
   - Add internal comments to leads
   - Delete leads (admin only)

2. **Lead Tracking**
   - Track lead status through pipeline: New → Contacted → Qualified → Converted/Lost
   - Hold leads on hold for future follow-up
   - Track all contact information and preferences
   - Automatic timestamp on creation and updates

3. **Role-Based Access Control**
   - **Master Admin**: Full system access including user management
   - **Admin**: Lead management, reports, export capabilities
   - **Team Member**: View and create leads, limited editing

4. **Role Management**
   - Create new users with specific roles
   - Edit existing user information and roles
   - Delete users from the system
   - Predefined roles with specific permissions
   - Built-in demo accounts for testing

5. **Analytics & Reports**
   - Total leads dashboard
   - Conversion rate tracking
   - Lead status distribution (pie chart)
   - Leads by service (bar chart)
   - Leads by temple (bar chart)
   - Leads over time (line chart)
   - Status breakdown summary

### 📊 Lead Fields Captured

- **S.NO.**: Serial number (descending order)
- **Name**: Full name of the lead
- **Phone Number**: Contact phone number
- **Email**: Email address
- **Service**: Type of service requested (VIP Darshan, General Darshan, Puja, etc.)
- **Temple**: Selected temple
- **Status**: Current lead status
- **Date**: Lead creation date
- **Comments**: Internal notes and comments
- **Notes**: Special requests or requirements
- **Devotees**: Number of devotees

## How to Access the CRM

### URLs
- **CRM Login**: `http://localhost:5173/crm/login`
- **CRM Dashboard**: `http://localhost:5173/crm/dashboard`

### Demo Accounts

Three demo accounts are pre-configured for testing:

#### 1. Master Admin
- **Username**: master_admin
- **Password**: admin123
- **Permissions**: Full access to all features

#### 2. Admin
- **Username**: admin
- **Password**: admin123
- **Permissions**: Lead management, reporting, no user management

#### 3. Team Member
- **Username**: team_member
- **Password**: team123
- **Permissions**: View and create leads, limited editing

## User Permissions by Role

### Master Admin
- ✅ View all leads
- ✅ Create new leads
- ✅ Edit lead information and status
- ✅ Delete leads
- ✅ Manage roles and users
- ✅ Export leads
- ✅ View reports

### Admin
- ✅ View all leads
- ✅ Create new leads
- ✅ Edit lead information and status
- ✅ Delete leads
- ✅ Export leads
- ✅ View reports
- ❌ Manage roles and users

### Team Member
- ✅ View all leads
- ✅ Create new leads
- ✅ Edit lead information and status
- ❌ Delete leads
- ❌ View reports
- ❌ Manage users

## Data Flow

### Lead Creation

1. **Website Form**: User submits booking form on `/book` page
2. **Auto-Save to CRM**: Lead is automatically saved to localStorage
3. **Dashboard**: Appears in "All Leads" with status "New"
4. **Manual Entry**: Admins can also manually add leads

### Lead Status Pipeline

```
New → Contacted → Qualified → Converted ✓
                           ↓
                          Lost ✗
                           ↓
                        On Hold ⏸️
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui with Radix UI
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Storage**: localStorage (for demo purposes)
- **Icons**: Lucide React

## File Structure

```
src/
├── types/
│   └── crm.ts                 # TypeScript types and interfaces
├── context/
│   └── AuthContext.tsx        # Authentication and leads management
├── components/
│   ├── ProtectedRoute.tsx     # Route protection wrapper
│   └── CRMLayout.tsx          # CRM navigation layout
├── pages/
│   └── crm/
│       ├── Login.tsx          # Login page
│       ├── Dashboard.tsx      # Main CRM dashboard
│       ├── AllLeads.tsx       # All leads table
│       ├── LeadDetail.tsx     # Lead details and editing
│       ├── RoleManagement.tsx # User and role management
│       └── Reports.tsx        # Analytics and reports
```

## Setup Instructions

### 1. Installation

The CRM is already integrated into the project. No additional setup needed.

### 2. First Time Setup

When you first access the CRM:
- Default users are automatically created in localStorage
- Use demo credentials to log in
- The CRM system is ready to track leads

### 3. Adding New Users

1. Login with Master Admin account
2. Navigate to "Role Management"
3. Click "Add User"
4. Fill in user details:
   - Full Name
   - Username (unique)
   - Email
   - Password
   - Role (Master Admin, Admin, or Team Member)
5. Click "Add User"

### 4. Managing Leads

**Viewing Leads**:
1. Go to "All Leads" section
2. Use search to find specific leads
3. Filter by status or sort by date

**Updating Lead Status**:
1. Open a lead or view in table
2. Click on status dropdown
3. Select new status
4. Changes are saved automatically

**Adding Comments**:
1. Open lead detail page
2. Click "Edit Lead"
3. Add comments in the comments field
4. Click "Save Changes"

**Deleting Leads**:
1. Click on lead actions menu (three dots)
2. Select "Delete"
3. Confirm deletion

## Key Use Cases

### Use Case 1: Team Manager Tracking Daily Leads
1. Login to CRM each morning
2. View "New" leads in the dashboard
3. Assign team members for follow-up
4. Track conversion progress in Reports

### Use Case 2: Team Member Creating Leads
1. Website visitor fills booking form
2. Lead automatically appears in CRM
3. Status starts as "New"
4. Team member updates status as they progress

### Use Case 3: Admin Reviewing Performance
1. Access Reports section
2. Review conversion rates
3. Analyze popular services and temples
4. Plan marketing based on data

## Important Notes

### Storage
- Currently uses **localStorage** for demonstration
- Data persists within the same browser
- **Not production-ready** - for production, integrate with a backend database

### Security
- **Demo-only**: Passwords are stored in plain text (never do this in production)
- **For Production**: Use hashed passwords and JWT tokens
- **Database**: Should use a secure backend (Node.js, Django, etc.)

### Future Enhancements
- Backend API integration
- Email notifications
- SMS alerts
- Advanced filtering and custom reports
- User activity logs
- Lead assignment workflow
- Automated follow-up reminders
- Export to Excel/PDF
- Multi-language support

## Troubleshooting

### Issue: CRM data not showing after refresh
**Solution**: Check browser's localStorage is enabled. Data is stored locally.

### Issue: Can't login with demo account
**Solution**: 
1. Clear browser cache
2. Check exact spelling of username
3. Verify password is correct (case-sensitive)

### Issue: Can't see "Role Management" option
**Solution**: You need Master Admin role. Login with master_admin account.

### Issue: Charts not loading in Reports
**Solution**: Ensure you have at least one lead in the system. Create a test lead first.

## Support & Documentation

For more information about:
- **Lead Tracking**: See the "All Leads" page help section
- **Role Management**: View the permissions table on the Role Management page
- **Reports**: Hover over charts for detailed tooltips

## License

Part of the Divine Pathfinders project.
