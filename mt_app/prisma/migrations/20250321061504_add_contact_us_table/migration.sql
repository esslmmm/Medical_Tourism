/*
  Warnings:

  - You are about to drop the column `Place_id` on the `place_image` table. All the data in the column will be lost.
  - You are about to drop the `Action_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Appointments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact_deatils` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Description` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doc_certificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doc_education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doc_language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hopital_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospitals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_facilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_room_facilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel_rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inter_bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inter_education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interpreters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medical_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Hotels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_Interpreters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_doc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package_places` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Packages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient_deatils` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Places` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review_hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review_hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review_inter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room_aggregate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TourismServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tourism_bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `login` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appointments` DROP FOREIGN KEY `appointments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Appointments` DROP FOREIGN KEY `appointments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Description` DROP FOREIGN KEY `description_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doc_certificate` DROP FOREIGN KEY `doc_certificate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doc_education` DROP FOREIGN KEY `doc_education_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doc_language` DROP FOREIGN KEY `doc_language_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Doctors` DROP FOREIGN KEY `doctors_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hopital_images` DROP FOREIGN KEY `hopital_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_bookings` DROP FOREIGN KEY `hotel_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_facilities` DROP FOREIGN KEY `hotel_facilities_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_images` DROP FOREIGN KEY `hotel_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_room_facilities` DROP FOREIGN KEY `hotel_room_facilities_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Hotel_rooms` DROP FOREIGN KEY `hotel_rooms_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Inter_bookings` DROP FOREIGN KEY `inter_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Inter_education` DROP FOREIGN KEY `inter_education_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Languages` DROP FOREIGN KEY `languages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Medical_services` DROP FOREIGN KEY `medical_services_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `messages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `messages_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Package_Bookings` DROP FOREIGN KEY `package_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Bookings` DROP FOREIGN KEY `package_bookings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Package_Bookings` DROP FOREIGN KEY `package_bookings_ibfk_3`;

-- DropForeignKey
ALTER TABLE `Package_Bookings` DROP FOREIGN KEY `package_bookings_ibfk_4`;

-- DropForeignKey
ALTER TABLE `Package_Bookings` DROP FOREIGN KEY `package_bookings_ibfk_5`;

-- DropForeignKey
ALTER TABLE `Package_Bookings` DROP FOREIGN KEY `package_bookings_ibfk_6`;

-- DropForeignKey
ALTER TABLE `Package_Bookings` DROP FOREIGN KEY `package_bookings_ibfk_7`;

-- DropForeignKey
ALTER TABLE `Package_Hotels` DROP FOREIGN KEY `package_hotels_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Hotels` DROP FOREIGN KEY `package_hotels_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Package_Interpreters` DROP FOREIGN KEY `package_interpreters_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_Interpreters` DROP FOREIGN KEY `package_interpreters_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Package_doc` DROP FOREIGN KEY `package_doc_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_doc` DROP FOREIGN KEY `package_doc_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Package_image` DROP FOREIGN KEY `package_image_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_places` DROP FOREIGN KEY `package_places_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Package_places` DROP FOREIGN KEY `package_places_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Packages` DROP FOREIGN KEY `packages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Packages` DROP FOREIGN KEY `packages_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `payment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `payment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Review_hospital` DROP FOREIGN KEY `review_hospital_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Review_hospital` DROP FOREIGN KEY `review_hospital_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Review_hotel` DROP FOREIGN KEY `review_hotel_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Review_hotel` DROP FOREIGN KEY `review_hotel_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Review_inter` DROP FOREIGN KEY `review_inter_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Review_inter` DROP FOREIGN KEY `review_inter_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Room_aggregate` DROP FOREIGN KEY `room_aggregate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Room_aggregate` DROP FOREIGN KEY `room_aggregate_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Tourism_bookings` DROP FOREIGN KEY `tourism_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Tourism_bookings` DROP FOREIGN KEY `tourism_bookings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `login` DROP FOREIGN KEY `login_ibfk_1`;

-- DropForeignKey
ALTER TABLE `place_image` DROP FOREIGN KEY `place_image_ibfk_1`;

-- DropForeignKey
ALTER TABLE `room_image` DROP FOREIGN KEY `room_image_ibfk_1`;

-- DropIndex
DROP INDEX `Place_id` ON `place_image`;

-- AlterTable
ALTER TABLE `place_image` DROP COLUMN `Place_id`,
    ADD COLUMN `place_id` INTEGER NULL;

-- DropTable
DROP TABLE `Action_history`;

-- DropTable
DROP TABLE `Appointments`;

-- DropTable
DROP TABLE `Cars`;

-- DropTable
DROP TABLE `Contact_deatils`;

-- DropTable
DROP TABLE `Description`;

-- DropTable
DROP TABLE `Doc_certificate`;

-- DropTable
DROP TABLE `Doc_education`;

-- DropTable
DROP TABLE `Doc_language`;

-- DropTable
DROP TABLE `Doctors`;

-- DropTable
DROP TABLE `Hopital_images`;

-- DropTable
DROP TABLE `Hospitals`;

-- DropTable
DROP TABLE `Hotel_bookings`;

-- DropTable
DROP TABLE `Hotel_facilities`;

-- DropTable
DROP TABLE `Hotel_images`;

-- DropTable
DROP TABLE `Hotel_room_facilities`;

-- DropTable
DROP TABLE `Hotel_rooms`;

-- DropTable
DROP TABLE `Hotels`;

-- DropTable
DROP TABLE `Inter_bookings`;

-- DropTable
DROP TABLE `Inter_education`;

-- DropTable
DROP TABLE `Interpreters`;

-- DropTable
DROP TABLE `Languages`;

-- DropTable
DROP TABLE `Medical_services`;

-- DropTable
DROP TABLE `Messages`;

-- DropTable
DROP TABLE `Package_Bookings`;

-- DropTable
DROP TABLE `Package_Hotels`;

-- DropTable
DROP TABLE `Package_Interpreters`;

-- DropTable
DROP TABLE `Package_doc`;

-- DropTable
DROP TABLE `Package_image`;

-- DropTable
DROP TABLE `Package_places`;

-- DropTable
DROP TABLE `Packages`;

-- DropTable
DROP TABLE `Patient_deatils`;

-- DropTable
DROP TABLE `Payment`;

-- DropTable
DROP TABLE `Places`;

-- DropTable
DROP TABLE `Review_hospital`;

-- DropTable
DROP TABLE `Review_hotel`;

-- DropTable
DROP TABLE `Review_inter`;

-- DropTable
DROP TABLE `Room_aggregate`;

-- DropTable
DROP TABLE `TourismServices`;

-- DropTable
DROP TABLE `Tourism_bookings`;

-- DropTable
DROP TABLE `Users`;

-- DropTable
DROP TABLE `login`;

-- CreateTable
CREATE TABLE `action_history` (
    `action_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `type_action` ENUM('Add', 'Remove', 'Update') NULL,
    `timestamp` TIMESTAMP(0) NULL,
    `action` VARCHAR(255) NULL,
    `id` INTEGER NULL,

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
    `chat_id` INTEGER NOT NULL,
    `sender_id` INTEGER NULL,
    `receiver_id` INTEGER NULL,
    `message` TEXT NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

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

    INDEX `appointment_id`(`appointment_id`),
    INDEX `contact_id`(`contact_id`),
    INDEX `hotel_booking_id`(`hotel_booking_id`),
    INDEX `inter_booking_id`(`inter_booking_id`),
    INDEX `package_id`(`package_id`),
    INDEX `tourism_booking_id`(`tourism_booking_id`),
    INDEX `user_id`(`user_id`),
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
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `images` VARCHAR(255) NULL,

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
    `date` DATE NULL,
    `start` TIMESTAMP(0) NULL,
    `end` TIMESTAMP(0) NULL,

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
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `booking_id` INTEGER NOT NULL,
    `payment_date` DATETIME(0) NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 0) NOT NULL,
    `payment_status` ENUM('successful', 'Failed', 'Peding', 'Refund') NOT NULL,
    `transaction_id` VARCHAR(50) NOT NULL,

    INDEX `booking_id`(`booking_id`),
    INDEX `uer_id`(`user_id`),
    PRIMARY KEY (`payment_id`)
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
    `aggregate_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `booking_id` INTEGER NULL,
    `amount` INTEGER NOT NULL,

    INDEX `booking_id`(`booking_id`),
    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`aggregate_id`)
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
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'member',
    `emailVerified` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
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
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user1_id` INTEGER NOT NULL,
    `user2_id` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user2_id`(`user2_id`),
    INDEX `user_id`(`user1_id`),
    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_details` (
    `contact_id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `phone` INTEGER NULL,

    PRIMARY KEY (`contact_id`)
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
CREATE TABLE `contactform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `contactform_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Place_id` ON `place_image`(`place_id`);

-- AddForeignKey
ALTER TABLE `action_history` ADD CONSTRAINT `action_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

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
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`chat_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_3` FOREIGN KEY (`tourism_booking_id`) REFERENCES `tourism_bookings`(`tourism_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_4` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`appointment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_5` FOREIGN KEY (`hotel_booking_id`) REFERENCES `hotel_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_6` FOREIGN KEY (`contact_id`) REFERENCES `contact_details`(`contact_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `package_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `place_image` ADD CONSTRAINT `place_image_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places`(`place_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hospital` ADD CONSTRAINT `review_hospital_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hospital` ADD CONSTRAINT `review_hospital_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hotel` ADD CONSTRAINT `review_hotel_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hotel` ADD CONSTRAINT `review_hotel_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_inter` ADD CONSTRAINT `review_inter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE `Account` ADD CONSTRAINT `Account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospital_images` ADD CONSTRAINT `hospital_images_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
