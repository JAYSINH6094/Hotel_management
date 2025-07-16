# Hotel Kali Demo - Minimal Project

A complete hotel management system demo with room booking and parking reservation functionality.

## 🚀 Quick Start

### 1. Setup Database
```bash
cd backend
npm install
# Update .env with your MySQL credentials
npm start
```

### 2. Access Demo
- **Frontend**: Open `index.html` in your browser
- **Backend**: http://localhost:5000

## 👤 Demo Credentials

**Admin:**
- Email: `admin`
- Password: `admin123`



## 📁 Project Structure

```
hotel management/
├── index.html              # Homepage
├── login.html              # User login
├── register.html           # Registration
├── rooms.html              # Room listing
├── booking.html            # Booking form
├── my_bookings.html        # User bookings
├── profile.html            # User profile
├── admin_login.html        # Admin login
├── admin_dashboard.html    # Admin panel
├── test-connection.html    # DB connection test
│
├── css/
│   └── style.css           # Styling
├── images/                 # Hotel & room images
├── services/
│   └── emailService.js     # Email service (root-level)
└── backend/                # Node.js server
    ├── server.js           # Main server
    ├── package.json        # Dependencies
    ├── package-lock.json   # Dependency lock
    ├── config/
    │   └── db.js           # Database config
    ├── routes/
    │   ├── bookings.js     # Booking API
    │   ├── parking.js      # Parking API
    │   ├── rooms.js        # Room API
    │   └── users.js        # User API
    ├── services/           # (empty)
    └── tests/              # (empty)
```

## ✨ Features

- **User Management**: Registration, login, profile
- **Room Booking**: Browse rooms, make reservations
- **Parking System**: Reserve parking slots
- **Admin Panel**: Manage bookings, rooms, users
- **Email Notifications**: Booking confirmations
- **Responsive Design**: Works on all devices

## 🔧 Configuration

Update `backend/.env` with your settings:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hotel_kali_demo_db
PORT=5000
JWT_SECRET=your_secret_key
```

## 📞 Demo Contact

- Email: hotelkali6094@gmail.com
- Phone: 8733803700
- Address: S.G. highway

## 🗄️ Database Setup Files

All SQL files for creating tables and inserting demo data are now located in:

```
backend/sql/
  ├── schema.sql              # Creates all tables
  ├── seed_rooms.sql          # Inserts initial room data
  └── seed_parking_slots.sql  # Inserts initial parking slot data
```

### To set up the database:
1. Run `schema.sql` to create all tables:
   - In your MySQL client:
     ```sql
     SOURCE backend/sql/schema.sql;
     ```
2. Run the seed files to insert demo data:
   - For rooms:
     ```sql
     SOURCE backend/sql/seed_rooms.sql;
     ```
   - For parking slots:
     ```sql
     SOURCE backend/sql/seed_parking_slots.sql;
     ```

---

**Hotel Kali Demo** - A complete hotel management system for demonstration purposes. 