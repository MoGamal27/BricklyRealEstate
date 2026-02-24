# Brickly Real Estate API Presentation
## PowerPoint/Google Slides Design Guide

---

## 🎨 **DESIGN SYSTEM**

### Color Palette
```
Primary Blue:     #4A90E2  (RGB: 74, 144, 226)
Cream/Beige:      #F5E6D3  (RGB: 245, 230, 211)
Dark Blue Text:   #2C3E50  (RGB: 44, 62, 80)
White:            #FFFFFF
Light Gray Text:  #7F8C8D  (RGB: 127, 140, 141)
```

### Typography
- **Headings:** Montserrat Bold or Poppins Bold (48-60pt)
- **Subheadings:** Montserrat SemiBold (32-36pt)
- **Body Text:** Open Sans or Roboto Regular (18-20pt)
- **Small Text:** Open Sans or Roboto Regular (14-16pt)

### Design Elements
- **Rounded Corners:** 15-20px radius
- **Shadows:** Soft drop shadow (0px 4px 12px rgba(0,0,0,0.08))
- **Spacing:** Generous padding (40-60px margins)
- **Card Padding:** 30-40px inside cards
- **Icon Size:** 48-64px

### HTTP Method Badge Colors
- **GET:** Green (#27AE60)
- **POST:** Red/Orange (#E74C3C)
- **PUT:** Orange (#F39C12)
- **DELETE:** Red (#C0392B)

---

## 📊 **SLIDE 0: API Management Overview**

### Layout Structure
**Slide Size:** 16:9 (Widescreen)

### Background
- Color: Soft cream (#F5E6D3)
- Optional: Very subtle diagonal pattern or texture (10% opacity)

### Header Section (Top 20% of slide)
1. **Main Title**
   - Text: "API Management System"
   - Font: Montserrat Bold, 60pt
   - Color: Dark Blue (#2C3E50)
   - Alignment: Center
   - Position: Top center, 60px from top

2. **Subtitle**
   - Text: "Brickly Real Estate Platform"
   - Font: Montserrat SemiBold, 28pt
   - Color: Primary Blue (#4A90E2)
   - Alignment: Center
   - Position: 20px below main title

### Main Content Area (Middle 60% of slide)
**4 Feature Cards in 2×2 Grid**

**Grid Specifications:**
- Gap between cards: 40px horizontal, 30px vertical
- Card dimensions: ~380px width × 220px height
- Total grid centered on slide

**Card Design (All 4 cards):**
- Background: White (#FFFFFF)
- Border: 2px solid Primary Blue (#4A90E2)
- Border Radius: 20px
- Shadow: 0px 4px 12px rgba(0,0,0,0.08)
- Padding: 35px

**Card 1 (Top Left): Authentication & Users**
- Icon: 🔒 Lock icon (64px, Primary Blue color)
- Title: "Authentication & Users"
  - Font: Montserrat SemiBold, 24pt, Dark Blue
  - Position: Below icon, 15px spacing
- Subtitle: "7 endpoints total"
  - Font: Open Sans Regular, 16pt, Light Gray
  - Position: Below title, 10px spacing

**Card 2 (Top Right): Property Management**
- Icon: 🏢 Building icon (64px, Primary Blue color)
- Title: "Property Management"
  - Font: Montserrat SemiBold, 24pt, Dark Blue
- Subtitle: "6 endpoints with filtering"
  - Font: Open Sans Regular, 16pt, Light Gray

**Card 3 (Bottom Left): Wishlist & Bookings**
- Icon: ❤️📅 Heart + Calendar icon (64px, Primary Blue color)
- Title: "Wishlist & Bookings"
  - Font: Montserrat SemiBold, 24pt, Dark Blue
- Subtitle: "7 endpoints total"
  - Font: Open Sans Regular, 16pt, Light Gray

**Card 4 (Bottom Right): Chat & Real-time**
- Icon: 💬 Chat bubble icon (64px, Primary Blue color)
- Title: "Chat & Real-time"
  - Font: Montserrat SemiBold, 24pt, Dark Blue
- Subtitle: "REST + WebSocket"
  - Font: Open Sans Regular, 16pt, Light Gray

### Bottom Section (Bottom 20% of slide)
**4 Feature Badges - Horizontal Row**

**Badge Specifications:**
- Background: Primary Blue (#4A90E2)
- Text Color: White
- Border Radius: 12px
- Padding: 12px 24px
- Gap between badges: 20px
- Font: Open Sans SemiBold, 16pt
- Centered horizontally

**Badge Content:**
1. "✓ Role-Based Access Control (BUYER, SELLER, ADMIN)"
2. "✓ RESTful Architecture"
3. "✓ Real-time Communication"
4. "✓ Advanced Filtering & Pagination"

---

## 💻 **TECH STACK SLIDE**

### Background
- Color: Soft cream (#F5E6D3)

### Header
- Text: "Technology Stack"
- Font: Montserrat Bold, 56pt
- Color: Dark Blue (#2C3E50)
- Alignment: Center
- Position: 60px from top

### Main Content (3 Sections Vertically Stacked)

**Section 1: BACKEND**
- **Container:**
  - Background: Primary Blue (#4A90E2)
  - Border Radius: 20px
  - Padding: 40px
  - Shadow: 0px 4px 12px rgba(0,0,0,0.08)
  - Width: 80% of slide width, centered

- **Header:**
  - Text: "BACKEND"
  - Font: Montserrat Bold, 32pt
  - Color: White
  - Margin bottom: 25px

- **Items (with icons):**
  - Font: Open Sans Regular, 20pt, White
  - Line spacing: 1.6
  - Include small icons (32px) to the left of each item
  
  1. 🟢 NestJS - Enterprise Node.js Framework
  2. 🐘 PostgreSQL - Relational Database
  3. 📊 TypeORM - Type-safe ORM
  4. 🔌 WebSocket - Real-time Communication

**Section 2: FRONTEND**
- **Container:**
  - Background: White
  - Border: 2px solid Primary Blue (#4A90E2)
  - Border Radius: 20px
  - Padding: 35px
  - Width: 80% of slide width, centered
  - Margin top: 30px

- **Header:**
  - Text: "FRONTEND"
  - Font: Montserrat Bold, 32pt
  - Color: Dark Blue (#2C3E50)
  - Margin bottom: 20px

- **Items:**
  - Font: Open Sans Regular, 20pt, Dark Blue
  - Line spacing: 1.6
  
  1. ⚛️ React - Modern UI Library
  2. 🎨 Bootstrap - Responsive Framework

**Section 3: AI/ML**
- **Container:**
  - Background: Primary Blue (#4A90E2)
  - Border Radius: 20px
  - Padding: 35px
  - Shadow: 0px 4px 12px rgba(0,0,0,0.08)
  - Width: 80% of slide width, centered
  - Margin top: 30px

- **Header:**
  - Text: "AI/ML"
  - Font: Montserrat Bold, 32pt
  - Color: White
  - Margin bottom: 20px

- **Items:**
  - Font: Open Sans Regular, 20pt, White
  - Line spacing: 1.6
  
  1. 🧪 Flask API - Machine Learning Model Integration
  2. 🧠 Property price prediction & recommendations

---

## 🔐 **SLIDE 1: Authentication & User Management**

### Background
- Color: Soft cream (#F5E6D3)

### Header
- Text: "Authentication & User Management"
- Font: Montserrat Bold, 52pt
- Color: Dark Blue (#2C3E50)
- Alignment: Center
- Position: 50px from top

### Main Content (2-Column Layout)

**Column Spacing:**
- Gap between columns: 50px
- Each column: ~45% of slide width
- Centered horizontally

---

#### LEFT COLUMN: Authentication

**Container:**
- Background: White
- Border Radius: 20px
- Shadow: 0px 4px 12px rgba(0,0,0,0.08)
- Padding: 0 (header has separate background)

**Header Bar:**
- Background: Primary Blue (#4A90E2)
- Border Radius: 20px 20px 0 0
- Padding: 25px
- Icon: 🔒 Lock (40px, White)
- Text: "Authentication"
  - Font: Montserrat SemiBold, 28pt, White
  - Inline with icon

**Content Area:**
- Padding: 35px
- Background: White

**Endpoints (with HTTP badges):**

Each endpoint format:
- **Badge + Endpoint + Description**
- Spacing: 20px between each endpoint

1. **POST** `/auth/register` - Register new user
   - Badge: Red (#E74C3C), "POST", 14pt Bold, White text
   - Endpoint: `/auth/register`, 18pt Monospace, Dark Blue
   - Description: "Register new user", 18pt Regular, Gray

2. **POST** `/auth/login` - User login
3. **GET** `/auth/refresh` - Refresh token

**Footer Note:**
- Text: "No Auth Required"
- Font: Open Sans Italic, 14pt
- Color: Light Gray
- Position: Bottom of card, 20px padding

---

#### RIGHT COLUMN: User Management

**Container:**
- Background: Primary Blue (#4A90E2)
- Border Radius: 20px
- Shadow: 0px 4px 12px rgba(0,0,0,0.08)

**Header Bar:**
- Background: White/Cream (#F5E6D3)
- Border Radius: 20px 20px 0 0
- Padding: 25px
- Icon: 👤 User (40px, Primary Blue)
- Text: "User Management"
  - Font: Montserrat SemiBold, 28pt, Dark Blue

**Content Area:**
- Padding: 35px
- Background: Primary Blue (#4A90E2)

**Endpoints (with HTTP badges):**
- All text in White color

1. **GET** `/users/profile` - Get profile (All Roles)
2. **PUT** `/users/profile` - Update profile (All Roles)
3. **GET** `/users` - List all users (ADMIN)
4. **DELETE** `/users/:id` - Delete user (ADMIN)

**Badge Styling:**
- Same as left column but with white background for visibility
- Badge text remains colored (GET=Green, PUT=Orange, DELETE=Red)

---

## 🏠 **SLIDE 2: Property Management**

### Background
- Color: Soft cream (#F5E6D3)

### Header
- Text: "Property Management"
- Font: Montserrat Bold, 52pt
- Color: Dark Blue (#2C3E50)
- Alignment: Center
- Position: 50px from top

### Main Content Card

**Container:**
- Background: White
- Border Radius: 20px
- Shadow: 0px 4px 12px rgba(0,0,0,0.08)
- Width: 85% of slide width, centered
- Padding: 40px

**Icon:**
- 🏢 Building icon (56px, Primary Blue)
- Position: Top left of card

**Endpoints Section:**
- Margin top: 30px from icon
- Line spacing: 1.8

**Endpoints (with HTTP badges):**

1. **GET** `/properties` - Get all properties (Public)
2. **GET** `/properties/:id` - Get property details (Public)
3. **POST** `/properties` - Create property (SELLER, ADMIN)
4. **PUT** `/properties/:id` - Update property (SELLER, ADMIN)
5. **DELETE** `/properties/:id` - Delete property (SELLER, ADMIN)
6. **PUT** `/properties/:id/status` - Update status (ADMIN)

**Endpoint Formatting:**
- Badge: 60px width, 24px height, rounded
- Endpoint: 18pt Monospace, Dark Blue
- Description: 18pt Regular, Gray
- Role info: 16pt Italic, Light Gray

### Bottom Filter Section

**Container:**
- Background: Primary Blue (#4A90E2)
- Border Radius: 20px
- Padding: 30px
- Width: 85% of slide width, centered
- Margin top: 30px from main card

**Header:**
- Icon: 🔍 Filter icon (32px, White)
- Text: "Available Filters"
  - Font: Montserrat SemiBold, 24pt, White
  - Inline with icon

**Filter Tags:**
- Font: Open Sans Regular, 16pt, White
- Separated by bullets (•)
- Text: "type • status • minPrice • maxPrice • bedrooms • bathrooms • furnished • city • neighborhood • page • limit"

---

## ❤️ **SLIDE 3: Wishlist & Booking Management**

### Background
- Color: Soft cream (#F5E6D3)

### Header
- Text: "Wishlist & Booking Management"
- Font: Montserrat Bold, 52pt
- Color: Dark Blue (#2C3E50)
- Alignment: Center
- Position: 50px from top

### Main Content (2-Column Layout)

**Column Spacing:**
- Gap: 50px
- Each column: ~45% width
- Centered

---

#### LEFT COLUMN: Wishlist APIs

**Container:**
- Background: White
- Border Radius: 20px
- Shadow: 0px 4px 12px rgba(0,0,0,0.08)

**Header Bar:**
- Background: Primary Blue (#4A90E2)
- Border Radius: 20px 20px 0 0
- Padding: 25px
- Icon: ❤️ Heart (40px, White)
- Text: "Wishlist APIs"
  - Font: Montserrat SemiBold, 26pt, White

**Content Area:**
- Padding: 35px
- Background: White

**Endpoints:**

1. **GET** `/wishlists` - Get user's wishlist
2. **POST** `/wishlists/:propertyId` - Add to wishlist
3. **DELETE** `/wishlists/:propertyId` - Remove from wishlist

**Footer Note:**
- Text: "All require authentication"
- Font: Open Sans Italic, 14pt, Light Gray
- Background: Light cream (#FFF9F0)
- Padding: 12px
- Border Radius: 8px
- Margin top: 20px

---

#### RIGHT COLUMN: Booking APIs

**Container:**
- Background: Primary Blue (#4A90E2)
- Border Radius: 20px
- Shadow: 0px 4px 12px rgba(0,0,0,0.08)

**Header Bar:**
- Background: White/Cream (#F5E6D3)
- Border Radius: 20px 20px 0 0
- Padding: 25px
- Icon: 📅 Calendar (40px, Primary Blue)
- Text: "Booking APIs"
  - Font: Montserrat SemiBold, 26pt, Dark Blue

**Content Area:**
- Padding: 35px
- Background: Primary Blue (#4A90E2)
- All text in White

**Endpoints:**

1. **GET** `/bookings` - Get user's bookings
2. **GET** `/bookings/:id` - Get booking details
3. **POST** `/bookings` - Create new booking
4. **PUT** `/bookings/:id/status` - Update status

**Footer Note:**
- Text: "All require authentication"
- Font: Open Sans Italic, 14pt, White
- Background: Darker Blue (rgba(0,0,0,0.15))
- Padding: 12px
- Border Radius: 8px
- Margin top: 20px

---

## 💬 **SLIDE 4: Chat & Real-time Communication**

### Background
- Color: Soft cream (#F5E6D3)

### Header
- Text: "Chat & Real-time Communication"
- Font: Montserrat Bold, 52pt
- Color: Dark Blue (#2C3E50)
- Alignment: Center
- Position: 50px from top

### Top Section: Chat APIs

**Container:**
- Background: White
- Border Radius: 20px
- Shadow: 0px 4px 12px rgba(0,0,0,0.08)
- Width: 85% of slide width, centered
- Padding: 0

**Header Bar:**
- Background: Primary Blue (#4A90E2)
- Border Radius: 20px 20px 0 0
- Padding: 25px
- Icon: 💬 Chat bubble (40px, White)
- Text: "Chat APIs"
  - Font: Montserrat SemiBold, 28pt, White

**Content Area:**
- Padding: 35px
- Background: White

**Endpoints:**

1. **GET** `/chats` - Get user's chats
2. **GET** `/chats/:id` - Get chat details
3. **POST** `/chats` - Start new chat
4. **GET** `/chats/:chatId/messages` - Get messages

### Bottom Section: WebSocket Events

**Container:**
- Background: Primary Blue (#4A90E2)
- Border Radius: 20px
- Padding: 30px
- Width: 85% of slide width, centered
- Margin top: 30px
- **COMPACT DESIGN** (smaller height than Chat APIs section)

**Header:**
- Icon: 🔌 WebSocket icon (32px, White)
- Text: "WebSocket Events"
  - Font: Montserrat SemiBold, 24pt, White
  - Inline with icon

**Content (2-Column Layout):**
- Font: Open Sans Regular, 16pt, White
- Compact spacing

**Left Column:**
- **Client Events:**
  - join_chat
  - leave_chat
  - send_message
  - typing

**Right Column:**
- **Server Events:**
  - receive_message
  - message_sent
  - user_typing

**Formatting:**
- Use bullet points or comma-separated list
- Keep compact and concise
- Example: "Client Events: join_chat, leave_chat, send_message, typing"

---

## 📝 **QUICK TIPS FOR CREATION**

### PowerPoint/Google Slides Steps:

1. **Set Slide Size:**
   - PowerPoint: Design → Slide Size → Widescreen (16:9)
   - Google Slides: File → Page Setup → Widescreen (16:9)

2. **Install Fonts:**
   - Download Montserrat and Open Sans from Google Fonts
   - Install on your system

3. **Create Color Palette:**
   - Add custom colors to your color picker:
     - #4A90E2, #F5E6D3, #2C3E50, #7F8C8D

4. **Use Shapes:**
   - Insert → Shapes → Rounded Rectangle
   - Adjust corner rounding in Format Shape

5. **HTTP Method Badges:**
   - Create small rounded rectangles
   - Add text inside
   - Group together for reuse

6. **Icons:**
   - Use Insert → Icons (PowerPoint/Google Slides)
   - Or download from flaticon.com, icons8.com
   - Recolor to match Primary Blue (#4A90E2)

7. **Shadows:**
   - Format Shape → Shadow
   - Offset: 0pt horizontal, 4pt vertical
   - Blur: 12pt
   - Transparency: 92%

8. **Alignment:**
   - Use Align tools (Home → Arrange → Align)
   - Distribute objects evenly

### Pro Tips:
- Create the first slide completely, then duplicate and modify
- Use Master Slide for consistent backgrounds
- Group elements for easier positioning
- Save as template for future use
- Export as PDF for presenting

---

## ✅ **CHECKLIST**

- [ ] Set slide size to 16:9
- [ ] Install Montserrat and Open Sans fonts
- [ ] Add custom colors to palette
- [ ] Create Slide 0: API Management Overview
- [ ] Create Tech Stack Slide
- [ ] Create Slide 1: Authentication & User Management
- [ ] Create Slide 2: Property Management
- [ ] Create Slide 3: Wishlist & Booking Management
- [ ] Create Slide 4: Chat & Real-time Communication
- [ ] Review all slides for consistency
- [ ] Export as PDF or PPTX

---

**Good luck with your presentation! 🚀**
