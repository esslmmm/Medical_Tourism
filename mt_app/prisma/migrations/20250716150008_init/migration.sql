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
CREATE TABLE `files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `cloudinaryId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `category` ENUM('CHAT_ATTACHMENT', 'MEDICAL_REPORT', 'DOCUMENT') NOT NULL,
    `description` VARCHAR(191) NULL,

    INDEX `files_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appointmentId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `appointment_files_appointmentId_fkey`(`appointmentId`),
    INDEX `appointment_files_fileId_fkey`(`fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chatId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `chat_files_chatId_fkey`(`chatId`),
    INDEX `chat_files_fileId_fkey`(`fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `appointment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NULL,
    `timeslot` VARCHAR(255) NULL,
    `patient_id` INTEGER NULL,
    `description` TEXT NULL,
    `doctor_id` INTEGER NULL,
    `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled') NOT NULL DEFAULT 'In_Progress',

    INDEX `patient_id`(`patient_id`),
    INDEX `doctor_id`(`doctor_id`),
    PRIMARY KEY (`appointment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `description` (
    `description_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NOT NULL,
    `details` VARCHAR(255) NOT NULL,
    `title` VARCHAR(100) NOT NULL,

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
    `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled') NULL DEFAULT 'In_Progress',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `hotel_bookings_ibfk_1`(`hotel_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_facilities` (
    `facility_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_id` INTEGER NULL,
    `facility_name` VARCHAR(100) NULL,
    `description` TEXT NULL,

    INDEX `hotel_facilities_ibfk_1`(`hotel_id`),
    PRIMARY KEY (`facility_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_images` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_id` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hotel_images_ibfk_1`(`hotel_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_room_facilities` (
    `room_facilitiy_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `facility_name` VARCHAR(100) NULL,
    `description` TEXT NULL,

    INDEX `hotel_room_facilities_ibfk_1`(`room_id`),
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

    INDEX `hotel_rooms_ibfk_1`(`hotel_id`),
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
    `check_in_time` VARCHAR(10) NOT NULL DEFAULT '1 PM',
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
    `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled') NULL DEFAULT 'In_Progress',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `inter_bookings_ibfk_1`(`interpreter_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inter_education` (
    `education_id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreter_id` INTEGER NULL,
    `degree` VARCHAR(50) NULL,
    `field_of_study` VARCHAR(255) NULL,
    `institution` VARCHAR(100) NULL,

    INDEX `inter_education_ibfk_1`(`interpreter_id`),
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

    PRIMARY KEY (`interpreter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `languages` (
    `lang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreter_id` INTEGER NULL,
    `language_name` VARCHAR(100) NULL,
    `proficiency` ENUM('Basic', 'Conversational', 'Fluent', 'Native') NULL,

    INDEX `languages_ibfk_1`(`interpreter_id`),
    PRIMARY KEY (`lang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_services` (
    `service_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_id` INTEGER NULL,
    `service_name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    INDEX `medical_services_ibfk_1`(`hospital_id`),
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

    INDEX `messages_ibfk_1`(`sender_id`),
    INDEX `messages_ibfk_2`(`receiver_id`),
    INDEX `messages_ibfk_3`(`chat_id`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_bookings` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `tourism_booking_id` INTEGER NULL,
    `appointment_id` INTEGER NULL,
    `hotel_booking_id` INTEGER NULL,
    `contact_id` INTEGER NULL,
    `inter_booking_id` INTEGER NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('In_Progress', 'Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled') NOT NULL DEFAULT 'In_Progress',

    INDEX `package_bookings_ibfk_1`(`user_id`),
    INDEX `package_bookings_ibfk_2`(`package_id`),
    INDEX `package_bookings_ibfk_3`(`tourism_booking_id`),
    INDEX `package_bookings_ibfk_4`(`appointment_id`),
    INDEX `package_bookings_ibfk_5`(`hotel_booking_id`),
    INDEX `package_bookings_ibfk_6`(`contact_id`),
    INDEX `package_bookings_ibfk_7`(`inter_booking_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_doc` (
    `doc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `doctor_id` INTEGER NULL,

    INDEX `package_doc_ibfk_1`(`package_id`),
    INDEX `package_doc_ibfk_2`(`doctor_id`),
    PRIMARY KEY (`doc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_hotels` (
    `packhotel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `hotel_id` INTEGER NULL,

    INDEX `package_hotels_ibfk_1`(`package_id`),
    INDEX `package_hotels_ibfk_2`(`hotel_id`),
    PRIMARY KEY (`packhotel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_image` (
    `images` VARCHAR(255) NULL,
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `detail` TEXT NOT NULL,
    `title` TEXT NOT NULL,

    INDEX `package_image_ibfk_1`(`package_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_interpreters` (
    `inter_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_id` INTEGER NULL,
    `interpreter_id` INTEGER NULL,

    INDEX `package_interpreters_ibfk_1`(`package_id`),
    INDEX `package_interpreters_ibfk_2`(`interpreter_id`),
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

    INDEX `package_places_ibfk_1`(`tour_id`),
    INDEX `package_places_ibfk_2`(`place_id`),
    PRIMARY KEY (`packplace_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages` (
    `package_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_name` VARCHAR(255) NOT NULL,
    `package_type` ENUM('Medical_Tourism', 'Medical_Service_Only') NOT NULL,
    `hospital_id` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `detail` VARCHAR(100) NOT NULL,
    `duration` INTEGER NOT NULL,
    `expired_date` DATE NOT NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `packages_ibfk_1`(`hospital_id`),
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

    INDEX `payment_ibfk_1`(`user_id`),
    INDEX `payment_ibfk_2`(`booking_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `place_image` (
    `image` VARCHAR(255) NULL,
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` INTEGER NULL,

    INDEX `place_image_ibfk_2`(`place_id`),
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

    INDEX `review_hospital_ibfk_1`(`user_id`),
    INDEX `review_hospital_ibfk_2`(`hospital_id`),
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

    INDEX `review_hotel_ibfk_1`(`user_id`),
    INDEX `review_hotel_ibfk_2`(`hotel_id`),
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

    INDEX `review_inter_ibfk_1`(`user_id`),
    INDEX `review_inter_ibfk_2`(`interpreter_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_aggregate` (
    `amount` INTEGER NOT NULL,
    `aggregate_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NULL,
    `room_id` INTEGER NULL,

    INDEX `room_aggregate_ibfk_1`(`room_id`),
    INDEX `room_aggregate_ibfk_2`(`booking_id`),
    PRIMARY KEY (`aggregate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_image` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NULL,
    `room_id` INTEGER NULL,

    INDEX `room_image_ibfk_1`(`room_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tourism_bookings` (
    `tourism_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tour_id` INTEGER NULL,
    `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected') NULL DEFAULT 'In_Progress',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `tourism_bookings_ibfk_1`(`tour_id`),
    PRIMARY KEY (`tourism_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospital_images` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_id` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hospital_images_ibfk_1`(`hospital_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat` (
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user1_id` INTEGER NOT NULL,
    `user2_id` INTEGER NULL,

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

    INDEX `trips_ibfk_1`(`package_id`),
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

    UNIQUE INDEX `Contact_Us_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(255) NOT NULL,
    `nationality` VARCHAR(255) NULL,
    `password` VARCHAR(191) NULL,
    `image` VARCHAR(2048) NULL,
    `role` ENUM('customer', 'staff', 'admin') NOT NULL DEFAULT 'customer',
    `otp` VARCHAR(10) NULL,
    `otp_expiry` DATETIME(3) NULL,
    `is_email_verified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_contact_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `phone` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
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

    INDEX `Account_userId_fkey`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `action_history` ADD CONSTRAINT `action_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment_files` ADD CONSTRAINT `appointment_files_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `appointments`(`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment_files` ADD CONSTRAINT `appointment_files_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_files` ADD CONSTRAINT `chat_files_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `chat`(`chat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_files` ADD CONSTRAINT `chat_files_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_6` FOREIGN KEY (`contact_id`) REFERENCES `user_contact_detail`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE `hospital_images` ADD CONSTRAINT `hospital_images_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
