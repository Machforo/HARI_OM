# CRM - Troubleshooting & FAQ

## 🆘 Troubleshooting

### Issue 1: CRM Login Page Not Loading

**Problem**: Error when accessing `/crm/login`

**Solutions**:
1. Clear browser cache: `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
2. Try a different browser
3. Check that dev server is running: `npm run dev`
4. Verify URL is correct: `http://localhost:5173/crm/login`

---

### Issue 2: Can't Login with Demo Account

**Problem**: "Invalid username or password" error

**Solutions**:
1. **Check credentials** (case-sensitive):
   - Master Admin: `master_admin` / `admin123`
   - Admin: `admin` / `admin123`
   - Team: `team_member` / `team123`

2. **Clear localStorage**:
   ```javascript
   // Open browser console (F12) and run:
   localStorage.clear()
   // Refresh page
   ```

3. **Try incognito/private mode**: Rules out cache issues

4. **Restart dev server**:
   ```bash
   npm run dev
   ```

---

### Issue 3: Leads Not Showing in CRM After Website Form Submission

**Problem**: Submit booking form but lead doesn't appear in CRM

**Solutions**:
1. **Verify form submission**: Check if "Thank You" page loads after form submit
2. **Check browser storage**: 
   - Open DevTools (F12)
   - Application → localStorage
   - Look for `vd_leads` key
3. **Manual lead creation**:
   - Go to CRM → All Leads
   - Click "Add Lead" button (if available)
4. **Check CRM is logged in**: If redirected to login, login again
5. **Verify status**: Lead might be there with "New" status

---

### Issue 4: Report Charts Not Displaying

**Problem**: Report page shows empty charts or "No data available"

**Solutions**:
1. **Create test leads first**:
   - Go to booking form
   - Submit a form
   - Go back to Reports
2. **Verify data exists**:
   - Go to "All Leads"
   - Check if leads are there
3. **Check browser console** (F12):
   - Look for JavaScript errors
   - Report any errors

---

### Issue 5: Can't See "Role Management" Menu

**Problem**: Role Management option is missing

**Reason**: You don't have permission

**Solution**:
- Login with **Master Admin** account
- Username: `master_admin`
- Password: `admin123`

---

### Issue 6: Can't Delete a Lead

**Problem**: Delete option is grayed out or not available

**Reason**: Your role doesn't have delete permission

**Solution**:
- **Team Members**: Cannot delete (contact admin)
- **Admins/Master Admins**: Should have access
- **Workaround**: Ask Master Admin to delete

---

### Issue 7: Lost Leads After Browser Close

**Problem**: All leads disappeared after closing browser

**Reason**: localStorage was cleared

**Solutions**:
1. **Check if storage is enabled**:
   - Browser → Settings → Privacy & Security
   - Ensure localStorage is allowed
2. **Don't clear cache**: Avoid "Clear browsing data"
3. **Use persistent browser**: Chrome/Firefox save storage

---

### Issue 8: Sidebar Menu Keeps Collapsing

**Problem**: Sidebar closes unintentionally

**Solution**:
- Click menu icon (☰) to toggle
- State should persist during session
- Is normal - feature is working

---

### Issue 9: Can't Edit Lead Information

**Problem**: Edit button doesn't work or fields are locked

**Solutions**:
1. **Check permissions**:
   - Team Members: Can edit
   - If no access, ask Master Admin
2. **Try opening lead in new tab**
3. **Refresh the page**: Sometimes UI doesn't update
4. **Check browser console**: Look for errors

---

### Issue 10: Search/Filter Not Working

**Problem**: Filtering or searching leads has no effect

**Solutions**:
1. **Clear search box**: Delete search text completely
2. **Check filter status**: Ensure "All Statuses" is selected
3. **Verify leads exist**: Create a test lead
4. **Try sorting**: Sort by newest/oldest first
5. **Refresh page**: Hard refresh with `Ctrl+F5`

---

## ❓ Frequently Asked Questions

### Q: How do I reset the CRM to default state?
**A**: 
```javascript
// Open browser console (F12) and run:
localStorage.removeItem('vd_leads')
localStorage.removeItem('vd_users')
localStorage.removeItem('vd_current_user')
// Refresh page
```
All users and leads will be reset to defaults.

---

### Q: Can I have multiple people using the CRM at the same time?
**A**: 
- **Current**: No - data is stored per browser
- **To Enable**: Integrate with backend/cloud database
- **Temporary Fix**: Each person uses different browser/device

---

### Q: How do I backup my leads?
**A**:
```javascript
// Open browser console and run:
const leads = JSON.parse(localStorage.getItem('vd_leads'))
console.log(JSON.stringify(leads, null, 2))
// Copy the output and save to file
```

---

### Q: Can I export leads to Excel?
**A**: 
- Feature planned for future
- **Workaround**: 
  1. Screenshot the leads table
  2. Copy-paste into Excel
  3. Or use browser's save table as CSV extension

---

### Q: How do I change a user's password?
**A**: 
- Login as Master Admin
- Go to "Role Management"
- Click Edit on user
- Change password field
- Click "Update User"

---

### Q: What's the maximum number of leads I can store?
**A**: 
- **Current**: Limited by browser storage (~5-10MB)
- **Typical capacity**: 1000-5000 leads
- **For production**: Use database (unlimited)

---

### Q: Can I access CRM from my phone?
**A**: 
- Yes! It's responsive
- Use same URL: `http://localhost:5173/crm/login`
- Works in mobile browsers (Chrome, Safari, Firefox)

---

### Q: Are leads private/secure?
**A**: 
- **Current**: Stored locally on your computer
- **Not encrypted**: Anyone on device can see
- **For production**: Implement encryption and backend security

---

### Q: Can I undo lead deletion?
**A**: 
- **Current**: No undo available
- **Prevention**: Double-check before deleting
- **Recovery**: Restore localStorage from backup

---

### Q: What if I forget the Master Admin password?
**A**: 
```javascript
// Open browser console and run:
const users = JSON.parse(localStorage.getItem('vd_users'))
console.log(users)
// Find master_admin user and note password
```

Or reset completely:
```javascript
localStorage.removeItem('vd_users')
// Refresh - defaults will reload
// Use: master_admin / admin123
```

---

### Q: Can I customize the lead form fields?
**A**: 
- **Current**: Fields are fixed
- **To customize**: Edit `src/types/crm.ts` and pages
- **Easy change**: Add fields to BookingForm and Lead interface

---

### Q: How do I contact support?
**A**: 
- Check documentation files (CRM_GUIDE.md, etc.)
- Review this troubleshooting section
- Contact project administrator
- Check browser console for error details

---

## 🔧 Developer Troubleshooting

### Build Errors

**Error**: `Type 'X' is not assignable to type 'Y'`
```bash
# Solution: Check TypeScript types in src/types/crm.ts
npm run build
```

**Error**: `Module not found`
```bash
# Solution: Verify imports
# Check: import path starts with @/
# Example: import { useLeads } from "@/context/AuthContext"
```

**Error**: `localStorage is not defined`
```bash
# Solution: Ensure code runs in browser context, not SSR
# Not in: build-time, server-side, or pre-render
```

---

### Performance Issues

**Slow Lead Table**:
1. Too many leads loaded
2. Solution: Add pagination (future feature)
3. Temporary: Filter by status or date range

**Slow Reports**:
1. Too much data
2. Check: Charts rendering all leads
3. Solution: Limit data range in Reports

---

### Testing Checklist

- [ ] Login with all 3 accounts works
- [ ] Leads appear after website form submission
- [ ] Search finds leads by name/phone/email
- [ ] Status filter works
- [ ] Lead editing saves changes
- [ ] User creation works (Master Admin)
- [ ] Reports show correct data
- [ ] Sidebar toggles smoothly
- [ ] Responsive on mobile
- [ ] No console errors

---

## 🚨 Critical Issues

### If CRM Won't Load At All

1. **Check dev server**:
   ```bash
   npm run dev
   ```

2. **Check for syntax errors**:
   ```bash
   npm run lint
   ```

3. **Clear node_modules**:
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

4. **Check port 5173 is available**:
   ```bash
   # Windows
   netstat -ano | findstr :5173
   
   # Mac/Linux
   lsof -i :5173
   ```

---

### If Leads Keep Disappearing

1. **Check localStorage is enabled**: Browser → Settings
2. **Don't clear cache**: This deletes localStorage
3. **Backup data**:
   ```javascript
   const backup = localStorage.getItem('vd_leads')
   // Save somewhere safe
   ```

---

## 📞 Quick Reference

| Component | Location | Status |
|-----------|----------|--------|
| Types | `src/types/crm.ts` | ✅ Ready |
| Auth | `src/context/AuthContext.tsx` | ✅ Ready |
| Routes | `src/App.tsx` | ✅ Ready |
| Login | `src/pages/crm/Login.tsx` | ✅ Ready |
| Dashboard | `src/pages/crm/Dashboard.tsx` | ✅ Ready |
| Leads | `src/pages/crm/AllLeads.tsx` | ✅ Ready |
| Lead Detail | `src/pages/crm/LeadDetail.tsx` | ✅ Ready |
| Roles | `src/pages/crm/RoleManagement.tsx` | ✅ Ready |
| Reports | `src/pages/crm/Reports.tsx` | ✅ Ready |

---

## 💾 Data Recovery

### Export All Data
```javascript
// Open console (F12) and run:
const data = {
  leads: JSON.parse(localStorage.getItem('vd_leads')),
  users: JSON.parse(localStorage.getItem('vd_users')),
  current_user: JSON.parse(localStorage.getItem('vd_current_user'))
}
console.log(JSON.stringify(data, null, 2))
// Copy entire output to .txt or .json file
```

### Import Data
```javascript
// If you have backup, paste this in console:
const backup = {...your_data}
localStorage.setItem('vd_leads', JSON.stringify(backup.leads))
localStorage.setItem('vd_users', JSON.stringify(backup.users))
localStorage.setItem('vd_current_user', JSON.stringify(backup.current_user))
// Refresh page
```

---

## ✅ Still Having Issues?

1. **Check all documentation**:
   - CRM_GUIDE.md
   - CRM_QUICKSTART.md
   - CRM_SUMMARY.md

2. **Review this file** thoroughly

3. **Check browser console** (F12) for errors

4. **Try incognito/private mode**

5. **Restart everything**:
   - Close browser
   - Stop dev server
   - Clear cache/storage
   - Start fresh

6. **Contact administrator** with:
   - Browser version
   - Error message
   - Steps to reproduce
   - Screenshot

---

**Last Updated**: April 20, 2026
**Version**: 1.0
**Status**: Production Ready (Frontend Demo)
