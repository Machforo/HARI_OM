# CRM Quick Start Guide

## Getting Started in 2 Minutes

### Step 1: Access the CRM
Visit: `http://localhost:5173/crm/login`

### Step 2: Login with Demo Account

Choose one of these test accounts:

**Option 1: Master Admin (Full Access)**
```
Username: master_admin
Password: admin123
```

**Option 2: Admin (Lead Management)**
```
Username: admin
Password: admin123
```

**Option 3: Team Member (Limited Access)**
```
Username: team_member
Password: team123
```

### Step 3: Explore Dashboard
After login, you'll see:
- 📊 Lead statistics
- 📝 Recent leads
- 🎯 Quick action buttons

### Step 4: View Leads
Click "View All Leads" to see:
- ✅ All leads submitted from the website
- 🔍 Search and filter options
- 📊 Sorting by date
- ✏️ Edit or delete leads

### Step 5: Manage Status
For each lead, you can update:
- **Status**: New → Contacted → Qualified → Converted/Lost
- **Comments**: Add internal notes
- **Information**: Edit contact details

### Step 6: View Reports (Admin Only)
Access analytics showing:
- 📈 Conversion rates
- 📊 Charts by service and temple
- 📉 Trends over time

### Step 7: Manage Users (Master Admin Only)
Add new team members:
1. Go to "Role Management"
2. Click "Add User"
3. Enter user details
4. Assign role
5. Save

## Common Tasks

### ❌ How to Delete a Lead?
1. Go to "All Leads"
2. Click the three dots menu
3. Select "Delete"
4. Confirm

### 📝 How to Add Comments?
1. Click on a lead
2. Click "Edit Lead"
3. Add comments in the "Comments" field
4. Click "Save Changes"

### 👤 How to Add a New Team Member?
1. Login as Master Admin
2. Go to "Role Management"
3. Click "Add User"
4. Fill in details (Name, Username, Email, Password, Role)
5. Click "Add User"

### 🔍 How to Find a Specific Lead?
1. Go to "All Leads"
2. Use the search box to enter:
   - Name
   - Phone number
   - Email
3. Results update instantly

### 📊 How to Check Performance?
1. Go to "Reports"
2. View conversion rate
3. Check service/temple popularity
4. See trends in the charts

## Dashboard Overview

```
┌─────────────────────────────────────┐
│  CRM Dashboard                      │
├─────────────────────────────────────┤
│ Total Leads    │ New Leads          │
│ 25             │ 5                  │
├─────────────────────────────────────┤
│ Converted      │ Conversion Rate    │
│ 10             │ 40%                │
├─────────────────────────────────────┤
│ All Leads      │ Role Management    │
│ [View]         │ [Manage]           │
├─────────────────────────────────────┤
│ Recent Leads                        │
│ • Lead Name 1 - 2 hours ago         │
│ • Lead Name 2 - 4 hours ago         │
└─────────────────────────────────────┘
```

## Lead Status Colors

| Status | Color | Meaning |
|--------|-------|---------|
| New | 🔵 Blue | Just submitted, no contact |
| Contacted | 🟡 Yellow | Team has reached out |
| Qualified | 🟢 Green | Lead is interested |
| Converted | 🟢✓ Green | Booking completed |
| Lost | 🔴 Red | Lead rejected or no response |
| On Hold | ⚪ Gray | Waiting for future follow-up |

## Tips & Tricks

💡 **Tip 1**: Use filters to focus on "New" leads for immediate follow-up

💡 **Tip 2**: Search by phone number to check if lead already exists

💡 **Tip 3**: Add comments for each lead update to track history

💡 **Tip 4**: Check reports regularly to measure team performance

💡 **Tip 5**: Sort by "Oldest First" to find old leads needing follow-up

## Frequently Asked Questions

**Q: Are my leads saved?**
A: Yes! Leads are saved in your browser's storage. They persist even after closing the browser.

**Q: Can I export leads?**
A: Admin feature coming soon! Currently available through Reports.

**Q: How many users can I have?**
A: Unlimited! Add as many team members as needed.

**Q: What if I forget a password?**
A: As Master Admin, go to Role Management, click edit on the user, and change password.

**Q: Can leads be deleted?**
A: Yes, but only by Admin and Master Admin roles.

**Q: Is data backed up?**
A: Data is stored locally. For production, implement database backup.

## Next Steps

1. ✅ Login to CRM
2. ✅ Explore the dashboard
3. ✅ View sample leads (if any)
4. ✅ Try updating a lead status
5. ✅ Add a team member (if Master Admin)
6. ✅ Check reports

## Need Help?

- Check the full guide: `CRM_GUIDE.md`
- Review permissions at: `Role Management` page
- Contact: Your CRM Administrator

---

**Happy Lead Tracking! 🚀**
