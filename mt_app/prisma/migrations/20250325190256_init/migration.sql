/*
  Warnings:

  - The primary key for the `action_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `objectId` on the `action_history` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `action_history` table. All the data in the column will be lost.
  - The primary key for the `chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `user1Id` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `messages` table. All the data in the column will be lost.
  - The primary key for the `package_image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `package_image` table. All the data in the column will be lost.
  - You are about to drop the column `packageId` on the `package_image` table. All the data in the column will be lost.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookingId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `payment` table. All the data in the column will be lost.
  - The primary key for the `place_image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `place_image` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `place_image` table. All the data in the column will be lost.
  - The primary key for the `room_aggregate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookingId` on the `room_aggregate` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `room_aggregate` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `room_aggregate` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `room_image` table. All the data in the column will be lost.
  - You are about to drop the `appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor_certificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor_education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor_in_package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor_language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospital_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospital_review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotel_booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotel_facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotel_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotel_review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interpreter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interpreter_booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interpreter_education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interpreter_review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical_service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_description` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_interpreter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patient_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `place_in_trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room_facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room_in_hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tourism_booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `action_id` to the `action_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `action_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1_id` to the `chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2_id` to the `chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `package_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `place_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aggregate_id` to the `room_aggregate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `action_history` DROP FOREIGN KEY `action_history_ibfk_1`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `chat_ibfk_1`;

-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `chat_ibfk_2`;

-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `doctors_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doctor_certificate` DROP FOREIGN KEY `doc_certificate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doctor_education` DROP FOREIGN KEY `doc_education_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doctor_in_package` DROP FOREIGN KEY `package_doc_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doctor_in_package` DROP FOREIGN KEY `package_doc_ibfk_2`;

-- DropForeignKey
ALTER TABLE `doctor_language` DROP FOREIGN KEY `doc_language_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hospital_image` DROP FOREIGN KEY `hospital_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hospital_review` DROP FOREIGN KEY `review_hospital_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hospital_review` DROP FOREIGN KEY `review_hospital_ibfk_2`;

-- DropForeignKey
ALTER TABLE `hotel_booking` DROP FOREIGN KEY `hotel_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hotel_facility` DROP FOREIGN KEY `hotel_facilities_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hotel_image` DROP FOREIGN KEY `hotel_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hotel_review` DROP FOREIGN KEY `review_hotel_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hotel_review` DROP FOREIGN KEY `review_hotel_ibfk_2`;

-- DropForeignKey
ALTER TABLE `interpreter_booking` DROP FOREIGN KEY `inter_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `interpreter_education` DROP FOREIGN KEY `inter_education_ibfk_1`;

-- DropForeignKey
ALTER TABLE `interpreter_review` DROP FOREIGN KEY `review_inter_ibfk_1`;

-- DropForeignKey
ALTER TABLE `interpreter_review` DROP FOREIGN KEY `review_inter_ibfk_2`;

-- DropForeignKey
ALTER TABLE `language` DROP FOREIGN KEY `languages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `medical_service` DROP FOREIGN KEY `medical_services_ibfk_1`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_ibfk_2`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_ibfk_3`;

-- DropForeignKey
ALTER TABLE `package` DROP FOREIGN KEY `packages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_booking` DROP FOREIGN KEY `package_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_booking` DROP FOREIGN KEY `package_bookings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `package_booking` DROP FOREIGN KEY `package_bookings_ibfk_3`;

-- DropForeignKey
ALTER TABLE `package_booking` DROP FOREIGN KEY `package_bookings_ibfk_4`;

-- DropForeignKey
ALTER TABLE `package_booking` DROP FOREIGN KEY `package_bookings_ibfk_5`;

-- DropForeignKey
ALTER TABLE `package_booking` DROP FOREIGN KEY `package_bookings_ibfk_6`;

-- DropForeignKey
ALTER TABLE `package_booking` DROP FOREIGN KEY `package_bookings_ibfk_7`;

-- DropForeignKey
ALTER TABLE `package_description` DROP FOREIGN KEY `description_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_hotel` DROP FOREIGN KEY `package_hotels_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_hotel` DROP FOREIGN KEY `package_hotels_ibfk_2`;

-- DropForeignKey
ALTER TABLE `package_image` DROP FOREIGN KEY `package_image_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_interpreter` DROP FOREIGN KEY `package_interpreters_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_interpreter` DROP FOREIGN KEY `package_interpreters_ibfk_2`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `place_image` DROP FOREIGN KEY `place_image_ibfk_2`;

-- DropForeignKey
ALTER TABLE `place_in_trip` DROP FOREIGN KEY `package_places_ibfk_1`;

-- DropForeignKey
ALTER TABLE `place_in_trip` DROP FOREIGN KEY `package_places_ibfk_2`;

-- DropForeignKey
ALTER TABLE `room_aggregate` DROP FOREIGN KEY `room_aggregate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `room_aggregate` DROP FOREIGN KEY `room_aggregate_ibfk_2`;

-- DropForeignKey
ALTER TABLE `room_facility` DROP FOREIGN KEY `hotel_room_facilities_ibfk_1`;

-- DropForeignKey
ALTER TABLE `room_image` DROP FOREIGN KEY `room_image_ibfk_1`;

-- DropForeignKey
ALTER TABLE `room_in_hotel` DROP FOREIGN KEY `hotel_rooms_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tourism_booking` DROP FOREIGN KEY `tourism_bookings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tourism_booking` DROP FOREIGN KEY `tourism_bookings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `trip` DROP FOREIGN KEY `trips_ibfk_1`;

-- DropIndex
DROP INDEX `userId` ON `action_history`;

-- DropIndex
DROP INDEX `user1Id` ON `chat`;

-- DropIndex
DROP INDEX `user2Id` ON `chat`;

-- DropIndex
DROP INDEX `chatId` ON `messages`;

-- DropIndex
DROP INDEX `receiverId` ON `messages`;

-- DropIndex
DROP INDEX `senderId` ON `messages`;

-- DropIndex
DROP INDEX `packageId` ON `package_image`;

-- DropIndex
DROP INDEX `bookingId` ON `payment`;

-- DropIndex
DROP INDEX `uer_id` ON `payment`;

-- DropIndex
DROP INDEX `PlaceId` ON `place_image`;

-- DropIndex
DROP INDEX `booking_id` ON `room_aggregate`;

-- DropIndex
DROP INDEX `roomId` ON `room_aggregate`;

-- DropIndex
DROP INDEX `roomId` ON `room_image`;

-- AlterTable
ALTER TABLE `action_history` DROP PRIMARY KEY,
    DROP COLUMN `objectId`,
    DROP COLUMN `userId`,
    ADD COLUMN `action_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `id` INTEGER NULL,
    ADD PRIMARY KEY (`action_id`);

-- AlterTable
ALTER TABLE `chat` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `user1Id`,
    DROP COLUMN `user2Id`,
    ADD COLUMN `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user1_id` INTEGER NOT NULL,
    ADD COLUMN `user2_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`chat_id`);

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `chatId`,
    DROP COLUMN `receiverId`,
    DROP COLUMN `senderId`,
    ADD COLUMN `chat_id` INTEGER NOT NULL,
    ADD COLUMN `receiver_id` INTEGER NULL,
    ADD COLUMN `sender_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `package_image` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `packageId`,
    ADD COLUMN `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `package_id` INTEGER NULL,
    ADD PRIMARY KEY (`image_id`);

-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    DROP COLUMN `bookingId`,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `booking_id` INTEGER NOT NULL,
    ADD COLUMN `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`payment_id`);

-- AlterTable
ALTER TABLE `place_image` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `placeId`,
    ADD COLUMN `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `place_id` INTEGER NULL,
    ADD PRIMARY KEY (`image_id`);

-- AlterTable
ALTER TABLE `room_aggregate` DROP PRIMARY KEY,
    DROP COLUMN `bookingId`,
    DROP COLUMN `id`,
    DROP COLUMN `roomId`,
    ADD COLUMN `aggregate_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `booking_id` INTEGER NULL,
    ADD COLUMN `room_id` INTEGER NULL,
    ADD PRIMARY KEY (`aggregate_id`);

-- AlterTable
ALTER TABLE `room_image` DROP COLUMN `roomId`,
    ADD COLUMN `room_id` INTEGER NULL;

-- DropTable
DROP TABLE `appointment`;

-- DropTable
DROP TABLE `car`;

-- DropTable
DROP TABLE `doctor`;

-- DropTable
DROP TABLE `doctor_certificate`;

-- DropTable
DROP TABLE `doctor_education`;

-- DropTable
DROP TABLE `doctor_in_package`;

-- DropTable
DROP TABLE `doctor_language`;

-- DropTable
DROP TABLE `hospital`;

-- DropTable
DROP TABLE `hospital_image`;

-- DropTable
DROP TABLE `hospital_review`;

-- DropTable
DROP TABLE `hotel`;

-- DropTable
DROP TABLE `hotel_booking`;

-- DropTable
DROP TABLE `hotel_facility`;

-- DropTable
DROP TABLE `hotel_image`;

-- DropTable
DROP TABLE `hotel_review`;

-- DropTable
DROP TABLE `interpreter`;

-- DropTable
DROP TABLE `interpreter_booking`;

-- DropTable
DROP TABLE `interpreter_education`;

-- DropTable
DROP TABLE `interpreter_review`;

-- DropTable
DROP TABLE `language`;

-- DropTable
DROP TABLE `medical_service`;

-- DropTable
DROP TABLE `package`;

-- DropTable
DROP TABLE `package_booking`;

-- DropTable
DROP TABLE `package_description`;

-- DropTable
DROP TABLE `package_hotel`;

-- DropTable
DROP TABLE `package_interpreter`;

-- DropTable
DROP TABLE `patient_detail`;

-- DropTable
DROP TABLE `place`;

-- DropTable
DROP TABLE `place_in_trip`;

-- DropTable
DROP TABLE `room_facility`;

-- DropTable
DROP TABLE `room_in_hotel`;

-- DropTable
DROP TABLE `tourism_booking`;

-- DropTable
DROP TABLE `trip`;

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

-- CreateIndex
CREATE INDEX `user_id` ON `action_history`(`user_id`);

-- CreateIndex
CREATE INDEX `user2_id` ON `chat`(`user2_id`);

-- CreateIndex
CREATE INDEX `user_id` ON `chat`(`user1_id`);

-- CreateIndex
CREATE INDEX `receiver_id` ON `messages`(`receiver_id`);

-- CreateIndex
CREATE INDEX `sender_id` ON `messages`(`sender_id`);

-- CreateIndex
CREATE INDEX `chat_id` ON `messages`(`chat_id`);

-- CreateIndex
CREATE INDEX `package_id` ON `package_image`(`package_id`);

-- CreateIndex
CREATE INDEX `booking_id` ON `payment`(`booking_id`);

-- CreateIndex
CREATE INDEX `uer_id` ON `payment`(`user_id`);

-- CreateIndex
CREATE INDEX `Place_id` ON `place_image`(`place_id`);

-- CreateIndex
CREATE INDEX `booking_id` ON `room_aggregate`(`booking_id`);

-- CreateIndex
CREATE INDEX `room_id` ON `room_aggregate`(`room_id`);

-- CreateIndex
CREATE INDEX `room_id` ON `room_image`(`room_id`);

-- AddForeignKey
ALTER TABLE `action_history` ADD CONSTRAINT `action_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

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
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`chat_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_3` FOREIGN KEY (`tourism_booking_id`) REFERENCES `tourism_bookings`(`tourism_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_4` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`appointment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_5` FOREIGN KEY (`hotel_booking_id`) REFERENCES `hotel_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_6` FOREIGN KEY (`contact_id`) REFERENCES `User_Contact_Detail`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `package_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `place_image` ADD CONSTRAINT `place_image_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places`(`place_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hospital` ADD CONSTRAINT `review_hospital_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hospital` ADD CONSTRAINT `review_hospital_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hotel` ADD CONSTRAINT `review_hotel_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hotel` ADD CONSTRAINT `review_hotel_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`hotel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_inter` ADD CONSTRAINT `review_inter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
