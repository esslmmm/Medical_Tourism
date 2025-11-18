# COMPLETE MEDICAL TOURISM APPLICATION USER FLOW
## Based on Actual Codebase Analysis

---

## MAIN USER FLOW (End-to-End)

### 1. AUTHENTICATION PHASE

**1.1 OTP Login Flow**
- **Route:** `/` (Homepage with login modal)
- **Trigger:** User clicks login, modal opens with `isLoginOpen=true`
- **Step 1:** User enters email
- **API:** System sends OTP (external service)
- **Step 2:** User navigates to verification and enters OTP
- **API:** `POST /api/auth/[...nextauth]` with credentials: `{email, otp}`
- **Validation:**
  - Email must exist in database OR auto-create user
  - OTP must match `user.otp` in database
  - OTP must not be expired (`now < user.otp_expiry`)
- **Success:**
  - User marked as verified: `updateUserVerification(email, true)`
  - OTP cleared: `otp = null, otpExpiry = null`
  - Session created: 60 minutes expiry
  - Token contains: `{userId, email, role, exp, authMethod: "otp"}`
- **Failure:**
  - Invalid OTP: Return null, reject login
  - Expired OTP: Return null, show error

**1.2 Google OAuth Login Flow**
- **Route:** `/signin`
- **Trigger:** User clicks "Sign in with Google"
- **Step 1:** Redirect to Google consent screen
- **Step 2:** Google returns access_token
- **API:** JWT callback fetches Google user info
- **Validation:**
  - Check if user exists by email
  - If existing: Update profile if name/image missing
  - If new: Create user with `isEmailVerified: true`
- **Success:**
  - Session created: 60 minutes, auto-refreshable for Google auth
  - Token contains: `{userId, email, role, exp, authMethod: "google"}`
  - Redirect to role-based page (customer → `/`, staff → `/staff/booking-management`, admin → `/admin/booking-management`)

**1.3 Session Management**
- **Expiry:** 60 minutes from login
- **Warning:** Shown 5 minutes before expiry via header `X-Session-Expiry-Warning: true`
- **Auto-refresh:** Google tokens refresh if <10 min remaining; OTP tokens do NOT refresh
- **Expired behavior:** Redirect to `/?isLoginOpen=true&expired=true` with cookies cleared

**1.4 Protected Route Access**
- **Unauthenticated access:** Redirect to `/?isLoginOpen=true&from={encoded_url}`
- **Post-login:** Redirect back to original URL from `from` parameter
- **Role-based blocking:**
  - Customer accessing `/admin/*` or `/staff/*` → Redirect to `/`
  - Staff accessing `/admin/*` → Redirect to `/staff/booking-management`
  - Admin can access all routes

---

### 2. PACKAGE SELECTION PHASE

**2.1 Homepage Browsing**
- **Route:** `/` or `/user/homeview`
- **Components:**
  - HeroSection: Search/filter
  - RecommendedPackage: Lists packages from API
  - Service: Treatment categories
  - Provider: Hospital listings
  - Reviews, FAQ, Blogs, Destinations

**2.2 Package Detail**
- **Route:** `/user/packages/{id}`
- **API:** `GET /api/services/packages/{id}`
- **Display:** Two tabs
  - Tab 1: "Medical Service" (default)
  - Tab 2: "Tourism Service"
- **Trigger:** User clicks "Next Step" on Medical tab → Auto-switch to Tourism tab

---

### 3. MEDICAL APPOINTMENT BOOKING

**3.1 Appointment Form**
- **Route:** `/user/packages/{id}` (Medical Service tab)
- **Component:** `MakeAppointment.tsx`

**Required Fields:**

1. **Select Date**
   - Generated: Next 30 days from today
   - Cannot select: Past dates
   - Format: ISO date string (e.g., "2025-11-20T00:00:00.000Z")
   - Stored in: `form.selectedDate`

2. **Select Time**
   - Options: 7:00 to 18:00 (12 slots)
   - Format: "HH:mm" (e.g., "10:00")
   - Stored in: `form.selectedTime`

3. **Patient Count**
   - Adult (16-80): Default 1, min 1
   - Child (4-15): Default 0, min 0
   - Stored in: `form.adult`, `form.child`

4. **Policy Agreement**
   - Checkbox MUST be checked
   - Message: "This package covers appointment arrangements only. All medical expenses and related costs must be paid directly to the hospital."
   - Blocks: "Next Step" button disabled if unchecked

**Data Storage:**
- **localStorage key:** `appointmentFormData`
- **Format:**
  ```json
  {
    "selectedDate": "2025-11-20T00:00:00.000Z",
    "selectedTime": "10:00",
    "adult": 1,
    "child": 0,
    "timestamp": "2025-11-18T12:34:56.789Z"
  }
  ```

**Navigation:**
- Click "Next Step" → Auto-switch to Tourism Service tab

---

### 4. TOURISM PACKAGE BOOKING

**4.1 Tourism Form**
- **Route:** `/user/packages/{id}` (Tourism Service tab)
- **Component:** `MakeBooking.tsx`

**Prerequisite Check:**
- **Required:** Must have `appointmentDate` from medical appointment
- **If missing:** Shows `<Warning />` component, blocks form access

**Required Fields:**

1. **Trip Start Date**
   - Calendar: Full month view
   - Cannot select: Past dates, appointment date, conflicting dates
   - Conflict Logic:
     ```
     tripStart = selectedDate
     tripEnd = selectedDate + tripDuration - 1
     Cannot select if: appointmentDate >= tripStart AND appointmentDate <= tripEnd
     ```
   - Auto-calculates: End date based on trip duration
   - Visual indicators:
     - Appointment date: Green (emerald-500)
     - Trip dates: Light green (emerald-100)
     - Trip start: Darker green (emerald-300)

2. **Tour Guide Language**
   - Options: Languages from `TripData.trips.languages`
   - Display: First 2 languages, "Other" modal for rest
   - Stored in: `selectedLanguage` (string)

3. **Tourist Count**
   - Adult (16-80): Default 1, per-person price shown
   - Child (4-15): Default 0, per-person price shown
   - Price breakdown displayed:
     - Adult cost: `selectedTrip.adult_price * adults`
     - Child cost: `selectedTrip.child_price * children`
     - Guide cost: `selectedTrip.guide_price` (flat)
     - Car service: `selectedTrip.car_service_price` (flat)
     - **Total:** Sum of all above

4. **Policy Agreement**
   - Same as medical appointment
   - Must check before "Complete Booking" enabled

**4.2 Booking Creation Process**

When "Complete Booking" clicked:

**Step 1: Create Appointment**
- **API:** `POST /api/booking/appointments`
- **Payload:**
  ```json
  {
    "date": "2025-11-20T00:00:00.000Z",
    "child": 0,
    "adult": 1,
    "timeslot": "10:00",
    "status": "Pending"
  }
  ```
- **Response:** `{ appointment_id: "uuid-here" }`

**Step 2: Create Guide Booking**
- **API:** `POST /api/booking/guides/submitGuideBooking`
- **Payload:**
  ```json
  {
    "language": "English",
    "start": "2025-11-22T00:00:00.000Z",
    "end": "2025-11-24T00:00:00.000Z",
    "status": "Pending"
  }
  ```
- **Response:** `{ booking_id: "uuid-here" }`

**Step 3: Create Tourism Booking**
- **API:** `POST /api/booking/trips/createtrip`
- **Payload:**
  ```json
  {
    "route_id": "route-uuid",
    "guide_booking_id": "guide-booking-uuid",
    "child": 0,
    "adult": 1,
    "start": "2025-11-22T00:00:00.000Z",
    "end": "2025-11-24T00:00:00.000Z",
    "status": "Pending"
  }
  ```
- **Response:** `{ tourism_id: "uuid-here" }`

**Step 4: Save to localStorage**
- Keys set:
  - `appointment_id`: appointment UUID
  - `TotalPrice`: calculated total
  - `tourism_id`: tourism UUID
  - `appointmentFormData`: existing data updated

**Step 5: Navigate**
- **Destination:** `/user/Form/medical_appointment/{packageId}`

**Error Handling:**
- If any API call fails: Alert shown, user can retry
- If localStorage save fails: Data lost, must restart

---

### 5. MEDICAL DETAILS & REPORT UPLOAD

**5.1 Form Route**
- **Route:** `/user/Form/medical_appointment/{packageId}`
- **Component:** `BookAnAppointment.tsx`
- **Layout:** 2/3 width form + 1/3 sidebar summary

**5.2 Prerequisite Check**
- **Required:** `appointmentFormData` must exist in localStorage
- **If missing:** Redirect back to package selection

**5.3 Form Sections**

**A. Symptoms Details (Optional)**

1. **Medical Report Upload (Optional but Recommended)**
   - **Input type:** File
   - **Accepted formats:** `.pdf, .jpeg, .jpg, .png`
   - **Max size:** 10MB
   - **Validation:**
     - Allowed MIME types: `['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']`
     - Size check: `file.size <= 10 * 1024 * 1024` (10MB)
   - **Error messages:**
     - Wrong type: "File must be PDF, JPEG, JPG, or PNG"
     - Too large: "File size must be less than 10MB"
   - **Processing:**
     - Convert to base64
     - Store in localStorage as `selectedFile`:
       ```json
       {
         "name": "medical_report.pdf",
         "size": 2048000,
         "type": "application/pdf",
         "lastModified": 1700000000000,
         "base64": "data:application/pdf;base64,JVBERi0xLjQK..."
       }
       ```

2. **Symptoms Description (Optional)**
   - **Input type:** Textarea
   - **Max length:** 1000 characters
   - **Shows:** Character counter "(123/1000)"
   - **Stored in:** `form.details`

**B. Contact Details (All Required)**

1. **First Name** *
   - **Validation:** 2-50 characters, letters/spaces/hyphens/apostrophes only
   - **Regex:** `/^[a-zA-Z\s\-']{2,50}$/`
   - **Error:** "First name must be 2-50 characters and contain only letters"

2. **Last Name** *
   - **Validation:** Same as first name
   - **Error:** "Last name must be 2-50 characters and contain only letters"

3. **Email** *
   - **Validation:** Standard email format
   - **Regex:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - **Error:** "Please enter a valid email address"

4. **Country** *
   - **Type:** Dropdown
   - **Options:** United States, UK, Thailand, India, Germany, Australia, Japan, France
   - **Action:** Auto-populates `dialCode` when selected

5. **Dial Code** *
   - **Type:** Dropdown
   - **Auto-set:** From country selection
   - **Cannot:** Manually edit if country selected

6. **Phone Number** *
   - **Validation:** 7-15 digits after removing non-digit characters
   - **Processing:** Remove all non-digits with `/\D/g`, then check length
   - **Accepted:** Numbers, spaces, hyphens, parentheses (cleaned before validation)
   - **Error:** "Please enter a valid phone number (7–15 digits)"

**C. Patient Details (All Required for Each Patient)**

Repeat for each patient (count = `form.adult + form.child`):

**Patient {index} Details:**

1. **Gender** *
   - **Type:** Radio buttons
   - **Options:** "Male" or "Female"
   - **Error:** "Please select a gender"

2. **First Name** *
   - **Validation:** Same as contact first name
   - **Regex:** `/^[a-zA-Z\s\-']{2,50}$/`

3. **Last Name** *
   - **Validation:** Same as contact last name
   - **Regex:** `/^[a-zA-Z\s\-']{2,50}$/`

4. **Date of Birth** *
   - **Type:** Date input
   - **Constraints:**
     - Cannot select future dates: `max={today}`
     - Age must be 0-150 years
   - **Validation:** `birthDate < today && calculatedAge >= 0 && calculatedAge <= 150`
   - **Error:** "Please enter a valid date of birth"

5. **Passport ID** *
   - **Validation:** 6-12 alphanumeric characters
   - **Regex:** `/^[A-Za-z0-9]{6,12}$/`
   - **Error:** "Passport ID must be 6–12 alphanumeric characters"

**5.4 Form Validation**

**Validation Trigger:** On "Continue" button click

**Validation Process:**
1. Check medical report file (if provided): Type and size
2. Check symptoms details: Max 1000 chars
3. Check all contact fields: Required + format validation
4. Check all patient fields: Required + format validation for each patient
5. If any error: Scroll to first error field, show inline error message
6. If all valid: Enable "Continue" button

**Button States:**
- Default: "Continue to Confirmation"
- Processing: "Processing..." (disabled)
- Error: "Continue to Confirmation" (re-enabled)

**5.5 Navigation**
- **On success:** Navigate to `/user/Form/BookingConfirm/{packageId}`
- **On error:** Stay on page, show error messages

---

### 6. BOOKING REVIEW & CONFIRMATION

**6.1 Confirmation Page**
- **Route:** `/user/Form/BookingConfirm/{packageId}`
- **Components:**
  - `ContactDetails.tsx`: Display contact info (read-only)
  - `PatientDetails.tsx`: Display patient info (read-only)
  - `ConfirmButton.tsx`: Execute booking creation

**6.2 Prerequisite Check**
- **Required:** `appointmentFormData` in localStorage
- **If missing:** Redirect to `/user/Form/medical_appointment/{packageId}`

**6.3 Display Format**

**Contact Details (Read-Only):**
```
First Name: John
Last Name: Doe
Country: United States
Phone: +1 1234567890
Email: john.doe@example.com
```

**Patient Details (Per Patient, Read-Only):**
```
Patient 1 Detail:
First Name: John
Last Name: Doe
Gender: Male
Nation: United States
Date of Birth: 1990-01-01
Passport ID: AB123456
```

**6.4 Confirmation Process**

When "Confirm Appointment" clicked:

**Step 1: Load Form Data**
- Retrieve `appointmentFormData` from localStorage
- Retrieve `selectedFile` from localStorage (if exists)
- Verify `appointment_id` exists in localStorage

**Step 2: Upload Medical Report (If Provided)**

**2a. Upload to Cloudinary**
- **API:** `POST https://api.cloudinary.com/v1_1/{CLOUD_NAME}/auto/upload`
- **Payload:** FormData
  ```
  file: File (converted from base64)
  upload_preset: {CLOUDINARY_PRESET}
  folder: "Medical_report/documents"
  ```
- **Response:**
  ```json
  {
    "public_id": "Medical_report/documents/abc123",
    "original_filename": "medical_report.pdf",
    "secure_url": "https://res.cloudinary.com/.../abc123.pdf",
    "format": "pdf",
    "bytes": 2048000
  }
  ```

**2b. Save File Metadata**
- **API:** `POST /api/upload/save-metadata`
- **Payload:**
  ```json
  {
    "userId": 123,
    "fileName": "medical_report.pdf",
    "originalName": "medical_report.pdf",
    "fileType": "pdf",
    "fileSize": 2048000,
    "category": "MEDICAL_REPORT",
    "cloudinaryId": "Medical_report/documents/abc123",
    "url": "https://res.cloudinary.com/.../abc123.pdf"
  }
  ```
- **Response:** `{ fileId: "file-uuid" }`

**Step 3: Create Patient Details**
- **API:** `POST /api/booking/patients`
- **Payload:** Array of patients
  ```json
  [
    {
      "appointment_id": "appointment-uuid",
      "firstname": "John",
      "lastname": "Doe",
      "gender": "Male",
      "dateofbirth": "1990-01-01T00:00:00.000Z",
      "nationality": "United States",
      "passport_number": "AB123456"
    }
  ]
  ```
- **Response:** `[{ patient_id: 1, ... }]`

**Step 4: Update Appointment Description**
- **API:** `PUT /api/booking/appointments/{appointment_id}`
- **Payload:**
  ```json
  {
    "description": "Symptoms details text here..."
  }
  ```
- **Response:** `{ appointment_id, description, ... }`

**Step 5: Link Medical Report to Appointment (If File Uploaded)**
- **API:** `POST /api/files/createAppointmentFile`
- **Payload:**
  ```json
  {
    "appointment_id": "appointment-uuid",
    "file_id": "file-uuid"
  }
  ```
- **Response:** `{ id: 1, appointmentId: "...", fileId: "..." }`

**Step 6: Create Contact Details**
- **API:** `POST /api/booking/user_contact_details`
- **Payload:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "country": "United States",
    "phone": 1234567890
  }
  ```
- **Response:** `{ id: "contact-uuid", ... }`

**Step 7: Create Package Booking**
- **API:** `POST /api/booking/packages`
- **Payload:**
  ```json
  {
    "package_id": "package-uuid",
    "contact_id": "contact-uuid",
    "price": 2500.00,
    "appointment_id": "appointment-uuid",
    "tourism_booking_id": "tourism-uuid",
    "user_id": 123,
    "status": "Pending"
  }
  ```
- **Response:** `{ booking_id: "booking-uuid", ... }`

**Step 8: Clean Up & Navigate**
- Clear localStorage keys:
  - `appointmentFormData`
  - `appointment_id`
  - `tourism_id`
  - `TotalPrice`
  - `selectedFile`
- Navigate to: `/user/profile/approval-status`

**6.5 Error Handling**

**Error Scenarios:**
1. **File upload fails:**
   - Alert: "Error uploading file: {error message}"
   - Action: User can retry by clicking "Confirm Appointment" again

2. **Patient creation fails:**
   - Alert: "Error creating patient details: {error message}"
   - Action: User can retry

3. **Appointment update fails:**
   - Alert: "Error updating appointment: {error message}"
   - Action: User can retry

4. **Contact creation fails:**
   - Alert: "Error creating contact details: {error message}"
   - Action: User can retry

5. **Package booking creation fails:**
   - Alert: "Error creating package booking: {error message}"
   - Action: User can retry

**Button States:**
- Default: "Confirm Appointment"
- Uploading file: "Uploading File and Confirming..." (disabled)
- Processing: "Confirming..." (disabled)
- Error: "Confirm Appointment" (re-enabled)

---

### 7. BOOKING STATUS TRACKING

**7.1 Status Page**
- **Route:** `/user/profile/approval-status`
- **Component:** `BookingTabs.tsx`

**7.2 Booking Status Values**
- **Enum:** `In_Progress`, `Pending`, `Approved`, `Completed`, `Rejected`, `Cancelled`

**7.3 Status Tabs**

**Tab 1: "In Process" (Pending Bookings)**
- **Filter:** `status === "Pending"`
- **Display:**
  - Package image
  - Package name
  - Booking date
  - Status badge: "Pending"
- **Actions:**
  - Button: "View More" → `/user/BookingDetail/{booking_id}`
- **Message:** None
- **Payment:** NOT available

**Tab 2: "Wait for Payment" (Approved Bookings)**
- **Filter:** `status === "Approved"`
- **Display:**
  - Package image
  - Package name
  - Booking date
  - Status badge: "Approved"
  - Warning: "Expired 3 days before the booking confirmation timeout."
- **Actions:**
  - Button: "View More" → `/user/BookingDetail/{booking_id}`
  - Button: "Pay Now" → Triggers `checkoutAction()`
- **Payment:** AVAILABLE

**Tab 3: "Completed" (Completed Bookings)**
- **Filter:** `status === "Completed"`
- **Display:**
  - Package image
  - Package name
  - Booking date
  - Status badge: "Completed"
- **Actions:**
  - Button: "View More" only
- **Payment:** NOT available (already paid)

**7.4 Status Progression**

**Initial Status:**
- Created: `Pending` (set during package booking creation)

**Admin Actions:**
- Admin views: `/admin/booking-management`
- Admin updates status: `PUT /api/admin/booking/packages`
- Available transitions:
  ```
  Pending → Approved (Allow payment)
  Pending → Rejected (Deny booking)
  Pending → Cancelled (User cancels)
  Approved → Completed (After payment)
  ```

---

### 8. STAFF/ADMIN APPROVAL WORKFLOW

**8.1 Admin Booking Management**
- **Route:** `/admin/booking-management`
- **Access:** Admin role ONLY

**8.2 View All Bookings**
- **API:** `GET /api/admin/booking/packages?status={status}&search={search}`
- **Filters:**
  - **status:** "all", "In_Progress", "Pending", "Approved", "Completed", "Rejected", "Cancelled"
  - **search:** Search by user name or package name (case-insensitive)

**Response Format:**
```json
[
  {
    "id": "booking-uuid",
    "userId": 123,
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "userNationality": "United States",
    "packageId": "package-uuid",
    "packageTitle": "Heart Surgery Package",
    "hospitalName": "Bangkok Hospital",
    "status": "pending",
    "bookingDate": "2025-11-20T00:00:00.000Z",
    "totalAmount": 2500.00,
    "createdAt": "2025-11-18T12:00:00.000Z",
    "contactDetail": {
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "phone": "+1 1234567890",
      "country": "United States"
    },
    "payments": []
  }
]
```

**8.3 Update Booking Status**
- **API:** `PUT /api/admin/booking/packages`
- **Auth:** Admin role required
- **Payload:**
  ```json
  {
    "bookingId": "booking-uuid",
    "status": "Approved"
  }
  ```
- **Validation:**
  - `bookingId` must exist
  - `status` must be valid enum value
  - User must be admin

**Response:**
```json
{
  "message": "Booking status updated successfully",
  "booking": {
    "booking_id": "booking-uuid",
    "status": "Approved",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "packages": {
      "package_name": "Heart Surgery Package"
    }
  }
}
```

**8.4 Status Transition Rules**

**Valid Transitions:**
1. `Pending` → `Approved`: Enable payment for user
2. `Pending` → `Rejected`: Deny booking request
3. `Pending` → `Cancelled`: User-initiated cancellation
4. `Approved` → `Completed`: After successful payment
5. `Approved` → `Cancelled`: User cancels before payment

**Invalid Transitions (Blocked):**
- Cannot go from `Completed` to any other status
- Cannot go from `Rejected` to `Approved` (must create new booking)
- Cannot go from `Cancelled` to `Approved` (must create new booking)

**8.5 Admin Actions**
1. View booking details (all fields)
2. Review medical reports (if uploaded)
3. View patient information
4. View contact details
5. Update booking status
6. Filter/search bookings
7. View payment history (if any)

---

### 9. PAYMENT FLOW

**9.1 Payment Eligibility**

**Payment is ONLY available when:**
1. Booking status === "Approved" (set by admin)
2. User is authenticated
3. User navigates to `/user/profile/approval-status`
4. Booking displayed in "Wait for Payment" tab

**Payment is NOT available when:**
- Status = "Pending" (waiting for approval)
- Status = "Rejected" (booking denied)
- Status = "Cancelled" (booking cancelled)
- Status = "Completed" (already paid)

**9.2 Payment Entry Point**
- **Trigger:** Click "Pay Now" button in "Wait for Payment" tab
- **Action:** Calls `checkoutAction()`
- **Navigation:** `/user/payment` (assumed, based on route structure)

**9.3 Payment Method Selection**
- **Route:** `/user/payment`
- **Component:** `SelectPayment.tsx`

**Available Payment Methods:**
1. **Card**
   - Providers: PayPal, Visa, Mastercard
   - Icon displayed for each

2. **Online Banking**
   - Banks: Bank1, Bank2, Bank3
   - Icon displayed for each

3. **QR Payment**
   - QR code generation (implementation not visible)

4. **Wallet**
   - Wallet providers (not specified)

**9.4 Card Payment Form**

**If "Card" selected:**

1. **Card Number** *
   - **Max length:** 16 digits
   - **Format:** Auto-formatted with spaces every 4 digits
   - **Validation:** 16 digits required

2. **Cardholder Name** *
   - **Validation:** Letters only
   - **Min length:** 2 characters

3. **Expiry Date** *
   - **Format:** MM/YY
   - **Validation:** Future date only

4. **CVV** *
   - **Type:** Password (masked)
   - **Length:** 3 digits
   - **Validation:** Numeric only

**9.5 Price Breakdown Display**

**Sample Breakdown:**
```
Flight:                  $500
Medical Service:         $500
Accommodation:           $500
Taxes and fee:           $500
50% discount:           -$1000
─────────────────────────────
Total:                  $1000
```

**Note:** Actual values fetched from booking data

**9.6 Payment Agreement**
- **Checkbox:** "I agree to the terms and conditions" *
- **Blocks:** "Pay now" button disabled if unchecked

**9.7 Payment Submission**

**Validation Before Submit:**
1. Payment method selected
2. If card: All card fields valid
3. Agreement checkbox checked

**Button States:**
- Default: "Pay now"
- Disabled: "Pay now" (gray, not clickable)
- Processing: "Processing..." (disabled)

**API Call:**
- **Endpoint:** `POST /api/booking/stripe/route.ts`
- **Status:** NOT FULLY IMPLEMENTED (empty handler found)
- **Expected payload:** Payment details, booking_id, amount
- **Expected response:** Payment confirmation, payment_id

**9.8 Payment Status Values**
- **Enum:** `Successful`, `Failed`, `Pending`, `Refund`

**9.9 Payment Success**
- **Route:** `/user/payment/successful/{payment_id}`
- **Display:** Confirmation message, booking details, payment receipt
- **Actions:**
  - View booking details
  - Download receipt
  - Return to homepage

**9.10 Payment Flow Summary**
```
User booking approved (status = "Approved")
    ↓
"Pay Now" button appears in profile
    ↓
Click "Pay Now" → Navigate to /user/payment
    ↓
Select payment method (Card/Banking/QR/Wallet)
    ↓
Fill payment details (if card selected)
    ↓
Check agreement checkbox
    ↓
Click "Pay now" → POST /api/booking/stripe
    ↓
[Stripe processes payment - not fully implemented]
    ↓
Payment record created (status: Successful/Failed)
    ↓
If successful: Update booking status to "Completed"
    ↓
Navigate to /user/payment/successful/{payment_id}
```

---

### 10. NAVIGATION & BLOCKING CONDITIONS

**10.1 Authentication Blocks**

**Scenario 1: Unauthenticated User → Protected Route**
```
User → /user/Form/medical_appointment/123 (not logged in)
    ↓
Middleware detects: !isAuth && isProtectedRoute
    ↓
Redirect to: /?isLoginOpen=true&from=%2Fuser%2FForm%2Fmedical_appointment%2F123
    ↓
Login modal opens automatically
    ↓
User logs in → Redirect to: /user/Form/medical_appointment/123
```

**Scenario 2: Authenticated User → Auth Page**
```
User (logged in as customer) → /signin
    ↓
Middleware detects: isAuth && isAuthPage
    ↓
Redirect to: / (homepage)
```

**10.2 Role-Based Access Blocks**

**Scenario 3: Customer → Admin Route**
```
User (role: customer) → /admin/booking-management
    ↓
Middleware detects: role !== "admin" && route === "/admin/*"
    ↓
Redirect to: /
```

**Scenario 4: Staff → Admin Route**
```
User (role: staff) → /admin/booking-management
    ↓
Middleware detects: role === "staff" && route === "/admin/*"
    ↓
Redirect to: /staff/booking-management
```

**10.3 Form Step Blocks**

**Scenario 5: Tourism Booking Without Medical Appointment**
```
User → /user/packages/{id} (Tourism tab)
    ↓
Component checks: appointmentDate prop exists?
    ↓
If NO: Show <Warning /> component, hide booking form
    ↓
User cannot proceed to tourism booking
```

**Scenario 6: Medical Details Without Appointment Data**
```
User → /user/Form/medical_appointment/{id} (direct URL)
    ↓
Component checks: localStorage.getItem("appointmentFormData") exists?
    ↓
If NO: Redirect to /user/packages/{id}
    ↓
User must complete appointment booking first
```

**Scenario 7: Confirmation Without Form Data**
```
User → /user/Form/BookingConfirm/{id} (direct URL)
    ↓
Component checks: localStorage.getItem("appointmentFormData") exists?
    ↓
If NO: Redirect to /user/Form/medical_appointment/{id}
    ↓
User must complete medical details form first
```

**10.4 Validation Blocks**

**Scenario 8: Invalid Medical Report File**
```
User uploads file > 10MB
    ↓
Validation: file.size > 10 * 1024 * 1024?
    ↓
Alert: "File size must be less than 10MB"
    ↓
File NOT stored, user must select smaller file
```

**Scenario 9: Invalid Patient Age**
```
User enters birthdate in future
    ↓
Validation: birthDate >= today?
    ↓
Error: "Please enter a valid date of birth"
    ↓
Cannot proceed until valid date entered
```

**Scenario 10: Missing Required Fields**
```
User clicks "Continue" without filling email
    ↓
Validation: email field empty?
    ↓
Error: "Please enter a valid email address"
    ↓
Form submission blocked, scroll to error field
```

**10.5 Payment Blocks**

**Scenario 11: Payment Attempt on Pending Booking**
```
User → /user/profile/approval-status
    ↓
System displays booking in "In Process" tab (status: Pending)
    ↓
"Pay Now" button NOT visible
    ↓
User cannot access payment page
```

**Scenario 12: Payment Attempt on Rejected Booking**
```
Admin updates booking status to "Rejected"
    ↓
User → /user/profile/approval-status
    ↓
Booking NOT displayed in any tab (or shown as "Rejected")
    ↓
No payment option available
```

**10.6 API Error Blocks**

**Scenario 13: Appointment Creation Fails**
```
User clicks "Complete Booking" (tourism form)
    ↓
API: POST /api/booking/appointments → 500 Error
    ↓
Alert: "Error creating appointment: {error message}"
    ↓
User cannot proceed, must retry
```

**Scenario 14: Package Booking Creation Fails**
```
User clicks "Confirm Appointment" (confirmation page)
    ↓
Steps 1-6 succeed
    ↓
Step 7: POST /api/booking/packages → 500 Error
    ↓
Alert: "Error creating package booking: {error message}"
    ↓
Data partially created (patients, contact), but booking NOT created
    ↓
User must retry
```

**10.7 Session Expiry Blocks**

**Scenario 15: Session Expires During Booking**
```
User filling medical details form
    ↓
Session expires (60 minutes passed)
    ↓
User clicks "Continue"
    ↓
Middleware detects: token.exp < currentTime
    ↓
Redirect to: /?isLoginOpen=true&expired=true&from={current_path}
    ↓
User must re-login
    ↓
After login: Redirect back to form (data preserved in localStorage)
```

**Scenario 16: OTP Session Nearing Expiry**
```
User logged in via OTP (55 minutes ago)
    ↓
User on booking confirmation page
    ↓
Middleware detects: token.exp - currentTime < 5 minutes
    ↓
Response header set: X-Session-Expiry-Warning: true
    ↓
Frontend shows warning: "Session expires in {time_left} seconds"
    ↓
User should complete booking quickly or re-login
```

---

### 11. COMPLETE BRANCHING SCENARIOS

**11.1 User Not Logged In**
- **Access homepage:** OK
- **Browse packages:** OK
- **View package details:** OK
- **Click "Book Now":** Redirect to login
- **Access /user/Form/*:** Redirect to login
- **Access /user/profile/*:** Redirect to login

**11.2 User Logged In (Customer Role)**
- **Access homepage:** OK
- **Browse/select packages:** OK
- **Complete booking flow:** OK
- **Access /staff/*:** Redirect to /
- **Access /admin/*:** Redirect to /

**11.3 User Logged In (Staff Role)**
- **Access homepage:** OK
- **Access /staff/*:** OK
- **Access /user/*:** OK
- **Access /admin/*:** Redirect to /staff/booking-management

**11.4 User Logged In (Admin Role)**
- **Access all routes:** OK
- **Manage bookings:** OK
- **Update booking status:** OK

**11.5 Booking Created, Status = Pending**
- **View in "In Process" tab:** OK
- **Click "View More":** OK
- **Access "Pay Now":** NOT visible
- **Wait for admin approval:** Required

**11.6 Booking Approved, Status = Approved**
- **View in "Wait for Payment" tab:** OK
- **Click "View More":** OK
- **Click "Pay Now":** OK, navigate to payment
- **Submit payment:** OK
- **On success:** Status → Completed

**11.7 Booking Rejected, Status = Rejected**
- **View in any tab:** May not be visible (depends on implementation)
- **Access payment:** NOT available
- **User must:** Create new booking

**11.8 Booking Completed, Status = Completed**
- **View in "Completed" tab:** OK
- **Click "View More":** OK
- **Access payment:** NOT available (already paid)
- **View payment history:** OK

**11.9 Invalid Booking ID Access**
```
User → /user/BookingDetail/invalid-uuid
    ↓
API: GET /api/booking/packages/invalid-uuid → 404 Not Found
    ↓
Display: "Booking not found" error message
    ↓
User redirected to: /user/profile/approval-status
```

**11.10 Unauthorized Booking Access**
```
User A (logged in) → /user/BookingDetail/{booking_id_of_user_B}
    ↓
API: GET /api/booking/packages/{booking_id} with auth check
    ↓
If booking.userId !== current_user.userId:
    ↓
Response: 403 Forbidden
    ↓
Display: "Unauthorized access" error
    ↓
User redirected to: /user/profile/approval-status
```

---

### 12. DATABASE STATUS VALUES

**package_bookings.status:**
- `In_Progress`
- `Pending`
- `Approved`
- `Completed`
- `Rejected`
- `Cancelled`

**appointments.status:**
- `In_Progress`
- `Pending`
- `Approved`
- `Rejected`
- `Completed`
- `Cancelled`

**tourism_bookings.status:**
- `In_Progress`
- `Pending`
- `Approved`
- `Rejected`

**guide_bookings.status:**
- `In_Progress`
- `Pending`
- `Approved`
- `Rejected`
- `Cancelled`

**payment.payment_status:**
- `Successful`
- `Failed`
- `Pending`
- `Refund`

---

### 13. KEY API ENDPOINTS

**Authentication:**
- `POST /api/auth/[...nextauth]` - OTP/Google login

**Packages:**
- `GET /api/services/packages/{id}` - Get package details

**Bookings:**
- `POST /api/booking/appointments` - Create appointment
- `PUT /api/booking/appointments/{id}` - Update appointment
- `POST /api/booking/guides/submitGuideBooking` - Create guide booking
- `POST /api/booking/trips/createtrip` - Create tourism booking
- `POST /api/booking/packages` - Create package booking
- `GET /api/booking/packages/{bookingId}` - Get booking details

**Patients:**
- `POST /api/booking/patients` - Create patient details

**Contact:**
- `POST /api/booking/user_contact_details` - Create contact details

**Files:**
- `POST /api/upload/save-metadata` - Save file metadata
- `POST /api/files/createAppointmentFile` - Link file to appointment

**Admin:**
- `GET /api/admin/booking/packages` - Get all bookings (admin only)
- `PUT /api/admin/booking/packages` - Update booking status (admin only)

**Payment:**
- `POST /api/booking/stripe` - Process payment (NOT FULLY IMPLEMENTED)

---

## END OF FLOW ANALYSIS
