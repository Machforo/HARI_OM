# User Journey & Workflow Guide

## New Divine Pathfinders User Experience

### Primary User Journey: Service Selection Flow

#### Step-by-Step Workflow

```
Landing Page (Home)
        ↓
    [Service Cards visible]
        ↓
 Click on Service Card
 (VIP Darshan, Puja, Prasad, etc.)
        ↓
Service is SELECTED & HIGHLIGHTED
        ↓
Temple Selection Section APPEARS
 (Automatically scrolls to this section)
        ↓
Browse Temples where this Service Available
        ↓
Click "Select" on preferred Temple
        ↓
Redirected to Booking Form
 (Service & Temple pre-filled)
        ↓
Fill Booking Details
        ↓
Submit Booking Request
        ↓
Team Callback within 30 minutes
```

---

## Navigation Paths

### From Home Page
1. **Service Cards** → Click any service → Temple selection
2. **"View All Services" Button** → Full services page → Select service → Choose temple
3. **Explore Temples** → Browse temples → View details → See services

### From Services Page (New Dedicated Page)
1. **Interactive Service Grid** → Click service → Temple selection appears
2. **Temple Cards** → Select temple → Booking page
3. **View Details** → Full temple page → Services section → Back to services

### From Temple Detail Page
1. **Booking Form** (sidebar) → Direct booking
2. **"Explore All Services"** (footer section) → Services page
3. **Service Browse** → Full list of services available at this temple

### From About Page
1. **Explore Services** Button → Services page with workflow
2. **Book Darshan Now** → Direct to booking

### Direct Links
- `/services` - Full services page with workflow
- `/temples` - Browse and search all temples
- `/book` - Direct booking form (no pre-selection)
- `/book?service=vip-darshan` - Booking with service pre-selected
- `/book?service=vip-darshan&temple=kashi` - Fully pre-filled

---

## Key Features

### Services Page (Redesigned)

**Before**: Static list of services with single CTA
**After**: Interactive workflow with 3 key improvements

1. **Service Selection**
   - Click any service to select it
   - Visual feedback: border + background highlight
   - Selected service shows benefits list
   - "Change Service" option available

2. **Temple Browsing**
   - Only appears after service is selected
   - Shows 6 most popular temples for that service
   - Temple cards include:
     - Image preview
     - Location & description
     - Two action buttons:
       - "Select" → Go to booking
       - "View Details" → Full temple page
   - Smooth scroll to this section

3. **Workflow Explanation**
   - Step-by-step guide visible when no service selected
   - Shows the 3-step process clearly
   - Educates new users

### Header Enhancements

**Logo Size**: 33% larger (from 12×12 to 16×16)
- Much more prominent and professional
- Type size adjusted to maintain header height
- Better visual hierarchy

**Scroll Effect**: Dynamic header styling
- Light/transparent at top
- Solid/opaque when scrolling
- Smooth 300ms transitions
- Better visual feedback

---

## Service Workflow Details

### Service Options Available

1. **VIP Darshan** (`vip-darshan`)
   - Priority entry, minimal wait
   - Family-friendly
   - On-ground coordination

2. **Puja & Hawan** (`puja-hawan`)
   - Priest coordination
   - Sankalp video
   - All ritual types

3. **Prasad Delivery** (`prasad-delivery`)
   - Temple-authentic
   - Pan-India shipping
   - Fresh packaging

4. **Chadhava & Offerings** (`chadhava-offerings`)
   - Photo proof
   - Video documentation
   - Premium options

5. **Yatra Packages** (`yatra-packages`)
   - Complete planning
   - Travel included
   - Local guides

6. **Special Assistance** (`special-assistance`)
   - Wheelchair access
   - Senior support
   - Customized needs

### Temple Integration

Each temple page now displays:
- "Beyond Darshan" section
- Quick access to all service options
- Visual service cards (✨🕯️🙏💝)
- Link to full services page

---

## Data Flow

### URL Parameters

When a user selects a service and temple:

```
/book?service=vip-darshan&temple=kashi
```

**Parameters**:
- `service`: ID of selected service
- `temple`: Slug of selected temple

**Booking Form Can**:
- Pre-fill service dropdown
- Pre-fill temple selection
- Pre-load temple-specific details
- Show service-specific questions

### Session Flow

```
User Flow → Service Selected → Temple Chosen → Booking Page
     ↓              ↓               ↓              ↓
  (/)         (/services)     (redirect)      (/book)
             setState()     navigate()      readParams()
```

---

## User Experience Improvements

### Before
- Services were static cards
- No clear path from services to temples
- Booking form required manual entry

### After
- Services are interactive
- Guided workflow with visual feedback
- Booking form can be pre-populated
- Clear next steps at each stage
- Mobile-responsive throughout

---

## Mobile Responsiveness

- ✅ Logo visible and appropriately sized
- ✅ Service cards stack on mobile
- ✅ Temple selection responsive
- ✅ Touch-friendly buttons
- ✅ Smooth scrolling on all devices
- ✅ Header scroll effect works smoothly

---

## Conversion Optimization

### Friction Points Addressed

1. **Discovery**: Services now link from multiple pages
2. **Selection**: Interactive workflow replaces static lists
3. **Guidance**: Step-by-step workflow clearly shown
4. **Booking**: Pre-filled forms reduce friction
5. **Trust**: Detailed temple information visible

### Call-to-Actions

- In Header: "Book Darshan" button
- On Services Card: "Explore" link
- On Home: "View All Services" button
- On Home: "Explore Temples" button
- On Services: "Select Temple" button
- On Temples: "Explore Services" footer link
- Multiple paths to booking

---

## Video Background (When Added)

Currently uses static image, but is ready for video:

**Benefits When Video Added**:
- More dynamic landing page
- Shows actual darshan/puja activities
- Increases emotional connection
- Better visual engagement
- Professional appearance

**Instructions**: See `ADDING_VIDEO_GUIDE.md`

---

## Analytics Opportunities

With current setup, you can track:
- Service selection → temple selection → booking conversion
- Drop-off points in workflow
- Most popular services
- Most clicked temples
- A/B testing different service orders
- User engagement with video (when added)

---

## Summary

The new user experience creates a **guided, interactive journey** from service discovery to booking, with clear visual feedback and multiple entry points throughout the website. Users no longer have to manually search and combine information—the website does the heavy lifting for them.
