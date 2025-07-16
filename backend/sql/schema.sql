CREATE DATABASE IF NOT EXISTS hotel_management;
USE hotel_management;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(10) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  features TEXT,
  status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available'
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guest_name VARCHAR(100),
  guest_email VARCHAR(100),
  guest_phone VARCHAR(20),
  guest_count INT DEFAULT 1,
  payment_method VARCHAR(50) DEFAULT 'cash',
  special_requests TEXT,
  status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
  total_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Parking Slots Table (Directly includes type, price, features)
CREATE TABLE IF NOT EXISTS parking_slots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slot_number VARCHAR(10) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,  -- Example: 'Valet', 'VIP', 'Basement'
  price_per_day DECIMAL(10,2) NOT NULL,
  location VARCHAR(100),
  max_vehicles INT DEFAULT 1,
  features TEXT,
  image VARCHAR(255),
  status ENUM('available', 'occupied', 'maintenance', 'reserved') DEFAULT 'available'
);

-- Parking Bookings Table
CREATE TABLE IF NOT EXISTS parking_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  parking_slot_id INT NOT NULL,
  vehicle_number VARCHAR(20),
  vehicle_type VARCHAR(50),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'cash',
  status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (parking_slot_id) REFERENCES parking_slots(id)
); 