/*
  Warnings:

  - You are about to drop the `Action_History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact_Us` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor_Certificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor_Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor_In_Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor_Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital_Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_Facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interpreter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interpreter_Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interpreter_Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interpreter_Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medical_Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Description` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Interpreter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient_Detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Place_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Place_In_Trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room_Aggregate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room_Facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room_In_Hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tourism_Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Contact_Detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Action_History` DROP FOREIGN KEY `action_history_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `appointments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `appointments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `chat_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `chat_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `doctors_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doctor_Certificate` DROP FOREIGN KEY `doc_certificate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doctor_Education` DROP FOREIGN KEY `doc_education_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doctor_In_Package` DROP FOREIGN KEY `package_doc_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doctor_In_Package` DROP FOREIGN KEY `package_doc_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Doctor_Language` DROP FOREIGN KEY `doc_language_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hospital_Image` DROP FOREIGN KEY `hospital_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hospital_Review` DROP FOREIGN KEY `review_hospital_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hospital_Review` DROP FOREIGN KEY `review_hospital_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Hotel_Booking` DROP FOREIGN KEY `hotel_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_Facility` DROP FOREIGN KEY `hotel_facilities_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_Image` DROP FOREIGN KEY `hotel_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_Review` DROP FOREIGN KEY `review_hotel_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_Review` DROP FOREIGN KEY `review_hotel_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Interpreter_Booking` DROP FOREIGN KEY `inter_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Interpreter_Education` DROP FOREIGN KEY `inter_education_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Interpreter_Review` DROP FOREIGN KEY `review_inter_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Interpreter_Review` DROP FOREIGN KEY `review_inter_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Language` DROP FOREIGN KEY `languages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Medical_Service` DROP FOREIGN KEY `medical_services_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `messages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `messages_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `messages_ibfk_3`;

-- DropForeignKey
ALTER TABLE `Package` DROP FOREIGN KEY `packages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Booking` DROP FOREIGN KEY `package_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Booking` DROP FOREIGN KEY `package_bookings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Package_Booking` DROP FOREIGN KEY `package_bookings_ibfk_3`;

-- DropForeignKey
ALTER TABLE `Package_Booking` DROP FOREIGN KEY `package_bookings_ibfk_4`;

-- DropForeignKey
ALTER TABLE `Package_Booking` DROP FOREIGN KEY `package_bookings_ibfk_5`;

-- DropForeignKey
ALTER TABLE `Package_Booking` DROP FOREIGN KEY `package_bookings_ibfk_6`;

-- DropForeignKey
ALTER TABLE `Package_Booking` DROP FOREIGN KEY `package_bookings_ibfk_7`;

-- DropForeignKey
ALTER TABLE `Package_Description` DROP FOREIGN KEY `description_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Hotel` DROP FOREIGN KEY `package_hotels_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Hotel` DROP FOREIGN KEY `package_hotels_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Package_Image` DROP FOREIGN KEY `package_image_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Interpreter` DROP FOREIGN KEY `package_interpreters_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Interpreter` DROP FOREIGN KEY `package_interpreters_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `payment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `payment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Place_Image` DROP FOREIGN KEY `place_image_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Place_In_Trip` DROP FOREIGN KEY `package_places_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Place_In_Trip` DROP FOREIGN KEY `package_places_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Room_Aggregate` DROP FOREIGN KEY `room_aggregate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Room_Aggregate` DROP FOREIGN KEY `room_aggregate_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Room_Facility` DROP FOREIGN KEY `hotel_room_facilities_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Room_Image` DROP FOREIGN KEY `room_image_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Room_In_Hotel` DROP FOREIGN KEY `hotel_rooms_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Tourism_Booking` DROP FOREIGN KEY `tourism_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Tourism_Booking` DROP FOREIGN KEY `tourism_bookings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Trip` DROP FOREIGN KEY `trips_ibfk_1`;

-- DropIndex
DROP INDEX `Account_userId_fkey` ON `Account`;

-- DropTable
DROP TABLE `Action_History`;

-- DropTable
DROP TABLE `Appointment`;

-- DropTable
DROP TABLE `Car`;

-- DropTable
DROP TABLE `Chat`;

-- DropTable
DROP TABLE `Contact_Us`;

-- DropTable
DROP TABLE `Doctor`;

-- DropTable
DROP TABLE `Doctor_Certificate`;

-- DropTable
DROP TABLE `Doctor_Education`;

-- DropTable
DROP TABLE `Doctor_In_Package`;

-- DropTable
DROP TABLE `Doctor_Language`;

-- DropTable
DROP TABLE `Hospital`;

-- DropTable
DROP TABLE `Hospital_Image`;

-- DropTable
DROP TABLE `Hospital_Review`;

-- DropTable
DROP TABLE `Hotel`;

-- DropTable
DROP TABLE `Hotel_Booking`;

-- DropTable
DROP TABLE `Hotel_Facility`;

-- DropTable
DROP TABLE `Hotel_Image`;

-- DropTable
DROP TABLE `Hotel_Review`;

-- DropTable
DROP TABLE `Interpreter`;

-- DropTable
DROP TABLE `Interpreter_Booking`;

-- DropTable
DROP TABLE `Interpreter_Education`;

-- DropTable
DROP TABLE `Interpreter_Review`;

-- DropTable
DROP TABLE `Language`;

-- DropTable
DROP TABLE `Medical_Service`;

-- DropTable
DROP TABLE `Messages`;

-- DropTable
DROP TABLE `Package`;

-- DropTable
DROP TABLE `Package_Booking`;

-- DropTable
DROP TABLE `Package_Description`;

-- DropTable
DROP TABLE `Package_Hotel`;

-- DropTable
DROP TABLE `Package_Image`;

-- DropTable
DROP TABLE `Package_Interpreter`;

-- DropTable
DROP TABLE `Patient_Detail`;

-- DropTable
DROP TABLE `Payment`;

-- DropTable
DROP TABLE `Place`;

-- DropTable
DROP TABLE `Place_Image`;

-- DropTable
DROP TABLE `Place_In_Trip`;

-- DropTable
DROP TABLE `Room_Aggregate`;

-- DropTable
DROP TABLE `Room_Facility`;

-- DropTable
DROP TABLE `Room_Image`;

-- DropTable
DROP TABLE `Room_In_Hotel`;

-- DropTable
DROP TABLE `Tourism_Booking`;

-- DropTable
DROP TABLE `Trip`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `User_Contact_Detail`;

-- CreateTable
CREATE TABLE `action_history` (
    `id` INTEGER NULL,
    `type_action` ENUM('Add', 'Remove', 'Update') NULL,
    `timestamp` TIMESTAMP(0) NULL,
    `action` VARCHAR(255) NULL,
    `action_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `appointment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NULL,
    `timeslot` VARCHAR(255) NULL,
    `patient_id` INTEGER NULL,
    `description` TEXT NULL,
    `doctor_id` INTEGER NULL,
    `file_name` VARCHAR(255) NULL,
    `file_path` VARCHAR(255) NULL,
    `upload_date` TIMESTAMP(0) NULL,

    INDEX `doctor_id`(`doctor_id`),
    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`appointment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars` (
    `car_id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_name` VARCHAR(50) NULL,
    `phone` INTEGER NULL,
    `email` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `fee` FLOAT NULL,
    `capacity` INTEGER NULL,
    `guide_license` VARCHAR(255) NULL,

    PRIMARY KEY (`car_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `description` (
    `description_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `details` VARCHAR(255) NULL,

    INDEX `package_id`(`package_id`),
    PRIMARY KEY (`description_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doc_certificate` (
    `cerfiticate_id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NULL,
    `field_of_study` VARCHAR(255) NULL,
    `institution` VARCHAR(255) NULL,
    `year` INTEGER NULL,

    INDEX `doctor_id`(`doctor_id`),
    PRIMARY KEY (`cerfiticate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doc_education` (
    `education_id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NULL,
    `field_of_study` VARCHAR(255) NULL,
    `institution` VARCHAR(255) NULL,
    `year` INTEGER NULL,

    INDEX `doctor_id`(`doctor_id`),
    PRIMARY KEY (`education_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doc_language` (
    `language_id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NULL,
    `languages` VARCHAR(255) NULL,

    INDEX `doctor_id`(`doctor_id`),
    PRIMARY KEY (`language_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctors` (
    `doctor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `specialization` VARCHAR(255) NULL,
    `hospital_id` INTEGER NULL,
    `experience` INTEGER NULL,
    `description` VARCHAR(200) NULL,
    `image` VARCHAR(255) NULL,
    `create_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `hospital_id`(`hospital_id`),
    PRIMARY KEY (`doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospitals` (
    `hospital_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `hospital_code` VARCHAR(20) NULL,
    `location` VARCHAR(255) NULL,
    `city` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `contact_info` VARCHAR(255) NULL,
    `rating` FLOAT NULL,
    `image` VARCHAR(255) NULL,
    `logo` VARCHAR(255) NOT NULL,
    `create_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`hospital_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_bookings` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_id` INTEGER NULL,
    `check_in_date` DATE NULL,
    `check_out_date` DATE NULL,
    `guest_children` INTEGER NULL,
    `guest_adult` INTEGER NULL,
    `total_price` FLOAT NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected', 'Cancelled') NULL,

    INDEX `hotel_id`(`hotel_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_facilities` (
    `facility_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_id` INTEGER NULL,
    `facility_name` VARCHAR(100) NULL,
    `description` TEXT NULL,

    INDEX `hotel_id`(`hotel_id`),
    PRIMARY KEY (`facility_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_images` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_id` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hotel_id`(`hotel_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_room_facilities` (
    `room_facilitiy_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `facility_name` VARCHAR(100) NULL,
    `description` TEXT NULL,

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`room_facilitiy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_rooms` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_id` INTEGER NULL,
    `room_type` VARCHAR(100) NULL,
    `price_per_night` FLOAT NULL,
    `capacity` VARCHAR(200) NULL,
    `description` TEXT NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hotel_id`(`hotel_id`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotels` (
    `hotel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `hotel_code` VARCHAR(20) NULL,
    `location` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `rating` FLOAT NULL,
    `email` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `image` VARCHAR(255) NULL,
    `contact_info` VARCHAR(255) NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`hotel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inter_bookings` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreter_id` INTEGER NULL,
    `start` DATE NULL,
    `end` DATE NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected', 'Cancelled') NULL,

    INDEX `interpreter_id`(`interpreter_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inter_education` (
    `education_id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreter_id` INTEGER NULL,
    `degree` VARCHAR(50) NULL,
    `field_of_study` VARCHAR(255) NULL,
    `institution` VARCHAR(100) NULL,

    INDEX `interpreter_id`(`interpreter_id`),
    PRIMARY KEY (`education_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interpreters` (
    `interpreter_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `rating` FLOAT NOT NULL,
    `nationality` VARCHAR(100) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `birthofday` DATE NOT NULL,
    `experience` DATE NOT NULL DEFAULT ('2025-02-02'),
    `address` TEXT NOT NULL,
    `profile_summary` TEXT NOT NULL,
    `language` ENUM('English', 'Arabic', 'Burmese') NOT NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`interpreter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `languages` (
    `lang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreter_id` INTEGER NULL,
    `language_name` VARCHAR(100) NULL,
    `proficiency` ENUM('Basic', 'Conversational', 'Fluent', 'Native') NULL,

    INDEX `interpreter_id`(`interpreter_id`),
    PRIMARY KEY (`lang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_services` (
    `service_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_id` INTEGER NULL,
    `service_name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    INDEX `hospital_id`(`hospital_id`),
    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `chat_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NULL,
    `sender_id` INTEGER NULL,

    INDEX `receiver_id`(`receiver_id`),
    INDEX `sender_id`(`sender_id`),
    INDEX `chat_id`(`chat_id`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_bookings` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `tourism_booking_id` INTEGER NOT NULL,
    `appointment_id` INTEGER NOT NULL,
    `hotel_booking_id` INTEGER NOT NULL,
    `contact_id` INTEGER NOT NULL,
    `inter_booking_id` INTEGER NOT NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled') NOT NULL,

    UNIQUE INDEX `package_bookings_contact_id_key`(`contact_id`),
    INDEX `appointment_id`(`appointment_id`),
    INDEX `contact_id`(`contact_id`),
    INDEX `hotel_booking_id`(`hotel_booking_id`),
    INDEX `inter_booking_id`(`inter_booking_id`),
    INDEX `package_id`(`package_id`),
    INDEX `tourism_booking_id`(`tourism_booking_id`),
    INDEX `user_id`(`user_id`),
    UNIQUE INDEX `unique_contact_per_booking`(`contact_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_doc` (
    `doc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `doctor_id` INTEGER NULL,

    INDEX `doctor_id`(`doctor_id`),
    INDEX `package_id`(`package_id`),
    PRIMARY KEY (`doc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_hotels` (
    `packhotel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `hotel_id` INTEGER NULL,

    INDEX `hotel_id`(`hotel_id`),
    INDEX `package_id`(`package_id`),
    PRIMARY KEY (`packhotel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_image` (
    `images` VARCHAR(255) NULL,
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,

    INDEX `package_id`(`package_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_interpreters` (
    `inter_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `interpreter_id` INTEGER NULL,

    INDEX `interpreter_id`(`interpreter_id`),
    INDEX `package_id`(`package_id`),
    PRIMARY KEY (`inter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_places` (
    `packplace_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tour_id` INTEGER NULL,
    `place_id` INTEGER NULL,
    `date` INTEGER NOT NULL,
    `start` VARCHAR(10) NOT NULL,
    `end` VARCHAR(10) NOT NULL,

    INDEX `place_id`(`place_id`),
    INDEX `tour_id`(`tour_id`),
    PRIMARY KEY (`packplace_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages` (
    `package_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_name` VARCHAR(255) NOT NULL,
    `package_type` ENUM('Medical&Tourism', 'Medical Service Only') NOT NULL,
    `hospital_id` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `detail` VARCHAR(100) NOT NULL,
    `duration` INTEGER NOT NULL,
    `expired_date` DATE NOT NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `hospital_id`(`hospital_id`),
    PRIMARY KEY (`package_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `payment_date` DATETIME(0) NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 0) NOT NULL,
    `payment_status` ENUM('successful', 'Failed', 'Peding', 'Refund') NOT NULL,
    `transaction_id` VARCHAR(50) NOT NULL,
    `booking_id` INTEGER NOT NULL,
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `booking_id`(`booking_id`),
    INDEX `uer_id`(`user_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `place_image` (
    `image` VARCHAR(255) NULL,
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` INTEGER NULL,

    INDEX `Place_id`(`place_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `places` (
    `place_id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_name` VARCHAR(100) NULL,
    `contact_info` VARCHAR(255) NULL,
    `location` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `fee` FLOAT NULL,

    PRIMARY KEY (`place_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_hospital` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `hospital_id` INTEGER NOT NULL,
    `rating` FLOAT NULL,
    `title_review` TEXT NULL,
    `comment` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `hospital_id`(`hospital_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_hotel` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `hotel_id` INTEGER NOT NULL,
    `rating` FLOAT NULL,
    `title_review` TEXT NULL,
    `comment` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `hotel_id`(`hotel_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_inter` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `interpreter_id` INTEGER NOT NULL,
    `rating` FLOAT NULL,
    `title_review` TEXT NULL,
    `comment` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `interpreter_id`(`interpreter_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_aggregate` (
    `amount` INTEGER NOT NULL,
    `aggregate_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NULL,
    `room_id` INTEGER NULL,

    INDEX `booking_id`(`booking_id`),
    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`aggregate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_image` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NULL,
    `room_id` INTEGER NULL,

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tourism_bookings` (
    `tourism_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tour_id` INTEGER NULL,
    `car_id` INTEGER NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected') NULL,

    INDEX `car_id`(`car_id`),
    INDEX `tour_id`(`tour_id`),
    PRIMARY KEY (`tourism_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospital_images` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_id` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hospital_id`(`hospital_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat` (
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user1_id` INTEGER NOT NULL,
    `user2_id` INTEGER NOT NULL,

    INDEX `user2_id`(`user2_id`),
    INDEX `user_id`(`user1_id`),
    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_details` (
    `patient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `gender` ENUM('Male', 'Female') NULL,
    `dateofbirth` DATE NULL,
    `nationality` VARCHAR(255) NULL,
    `passport_number` VARCHAR(255) NULL,

    PRIMARY KEY (`patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trips` (
    `tour_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NOT NULL,
    `description` TEXT NULL,
    `total_price` FLOAT NULL,

    INDEX `package_id`(`package_id`),
    PRIMARY KEY (`tour_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_us` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(255) NULL,
    `password` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('customer', 'staff', 'admin') NOT NULL DEFAULT 'customer',
    `emailVerified` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_contact_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `phone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `action_history` ADD CONSTRAINT `action_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_details`(`patient_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `description` ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doc_certificate` ADD CONSTRAINT `doc_certificate_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doc_education` ADD CONSTRAINT `doc_education_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doc_language` ADD CONSTRAINT `doc_language_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hotel_bookings` ADD CONSTRAINT `hotel_bookings_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hotel_facilities` ADD CONSTRAINT `hotel_facilities_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hotel_images` ADD CONSTRAINT `hotel_images_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hotel_room_facilities` ADD CONSTRAINT `hotel_room_facilities_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `hotel_rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hotel_rooms` ADD CONSTRAINT `hotel_rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inter_bookings` ADD CONSTRAINT `inter_bookings_ibfk_1` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreters`(`interpreter_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inter_education` ADD CONSTRAINT `inter_education_ibfk_1` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreters`(`interpreter_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `languages` ADD CONSTRAINT `languages_ibfk_1` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreters`(`interpreter_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medical_services` ADD CONSTRAINT `medical_services_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`chat_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_3` FOREIGN KEY (`tourism_booking_id`) REFERENCES `tourism_bookings`(`tourism_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_4` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`appointment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_5` FOREIGN KEY (`hotel_booking_id`) REFERENCES `hotel_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `user_contact_detail`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_7` FOREIGN KEY (`inter_booking_id`) REFERENCES `inter_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_doc` ADD CONSTRAINT `package_doc_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_doc` ADD CONSTRAINT `package_doc_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_hotels` ADD CONSTRAINT `package_hotels_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_hotels` ADD CONSTRAINT `package_hotels_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_image` ADD CONSTRAINT `package_image_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_interpreters` ADD CONSTRAINT `package_interpreters_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_interpreters` ADD CONSTRAINT `package_interpreters_ibfk_2` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreters`(`interpreter_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_places` ADD CONSTRAINT `package_places_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `trips`(`tour_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_places` ADD CONSTRAINT `package_places_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places`(`place_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `package_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `place_image` ADD CONSTRAINT `place_image_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places`(`place_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hospital` ADD CONSTRAINT `review_hospital_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hospital` ADD CONSTRAINT `review_hospital_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hotel` ADD CONSTRAINT `review_hotel_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hotel` ADD CONSTRAINT `review_hotel_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_inter` ADD CONSTRAINT `review_inter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_inter` ADD CONSTRAINT `review_inter_ibfk_2` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreters`(`interpreter_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room_aggregate` ADD CONSTRAINT `room_aggregate_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `hotel_rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room_aggregate` ADD CONSTRAINT `room_aggregate_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `hotel_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room_image` ADD CONSTRAINT `room_image_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `hotel_rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tourism_bookings` ADD CONSTRAINT `tourism_bookings_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `trips`(`tour_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tourism_bookings` ADD CONSTRAINT `tourism_bookings_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars`(`car_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hospital_images` ADD CONSTRAINT `hospital_images_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
