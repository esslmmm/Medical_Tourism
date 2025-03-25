-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `emailVerified` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
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

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `hospital_code` VARCHAR(20) NULL,
    `location` VARCHAR(255) NULL,
    `city` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `contact_info` VARCHAR(255) NULL,
    `rating` FLOAT NULL,
    `image` VARCHAR(255) NULL,
    `logo` VARCHAR(255) NOT NULL,
    `createAt` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital_Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospitalId` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hospitalId`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital_Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `hospitalId` INTEGER NOT NULL,
    `rating` FLOAT NULL,
    `review_title` TEXT NULL,
    `comment` TEXT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `hospitalId`(`hospitalId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `specialization` VARCHAR(255) NULL,
    `hospitalId` INTEGER NULL,
    `experience` INTEGER NULL,
    `description` VARCHAR(200) NULL,
    `image` VARCHAR(255) NULL,
    `createAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `hospitalId`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor_Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NULL,
    `field_of_study` VARCHAR(255) NULL,
    `institution` VARCHAR(255) NULL,
    `year` INTEGER NULL,

    INDEX `doctorId`(`doctorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor_Education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NULL,
    `field_of_study` VARCHAR(255) NULL,
    `institution` VARCHAR(255) NULL,
    `year` INTEGER NULL,

    INDEX `doctorId`(`doctorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor_Language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NULL,
    `languages` VARCHAR(255) NULL,

    INDEX `doctorId`(`doctorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medical_Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospitalId` INTEGER NULL,
    `service_name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    INDEX `hospitalId`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageId` INTEGER NOT NULL,
    `description` TEXT NULL,
    `total_price` FLOAT NULL,

    INDEX `packageId`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place_In_Trip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tourId` INTEGER NULL,
    `placeId` INTEGER NULL,
    `date` DATE NULL,
    `start` TIMESTAMP(0) NULL,
    `end` TIMESTAMP(0) NULL,

    INDEX `placeId`(`placeId`),
    INDEX `tourId`(`tourId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_name` VARCHAR(100) NULL,
    `contact_info` VARCHAR(255) NULL,
    `location` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `fee` FLOAT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place_Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placeId` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `PlaceId`(`placeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel_Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hotelId`(`hotelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel_Facility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` INTEGER NULL,
    `facility_name` VARCHAR(100) NULL,
    `description` TEXT NULL,

    INDEX `hotelId`(`hotelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room_In_Hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` INTEGER NULL,
    `room_type` VARCHAR(100) NULL,
    `price_per_night` FLOAT NULL,
    `capacity` VARCHAR(200) NULL,
    `description` TEXT NULL,
    `image` VARCHAR(255) NULL,

    INDEX `hotelId`(`hotelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room_Facility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NULL,
    `facility_name` VARCHAR(100) NULL,
    `description` TEXT NULL,

    INDEX `roomId`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room_Aggregate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NULL,
    `bookingId` INTEGER NULL,
    `amount` INTEGER NOT NULL,

    INDEX `booking_id`(`bookingId`),
    INDEX `roomId`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room_Image` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    INDEX `roomId`(`roomId`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel_Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `hotelId` INTEGER NOT NULL,
    `rating` FLOAT NULL,
    `title_review` TEXT NULL,
    `comment` TEXT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `hotelId`(`hotelId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interpreter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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
    `native_language` ENUM('English', 'Arabic', 'Burmese') NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreterId` INTEGER NULL,
    `language_name` VARCHAR(100) NULL,
    `proficiency` ENUM('Basic', 'Conversational', 'Fluent', 'Native') NULL,

    INDEX `interpreterId`(`interpreterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interpreter_Education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreterId` INTEGER NULL,
    `degree` VARCHAR(50) NULL,
    `field_of_study` VARCHAR(255) NULL,
    `institution` VARCHAR(100) NULL,

    INDEX `interpreterId`(`interpreterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interpreter_Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `interpreterId` INTEGER NOT NULL,
    `rating` FLOAT NULL,
    `title_review` TEXT NULL,
    `comment` TEXT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `interpreterId`(`interpreterId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_name` VARCHAR(255) NOT NULL,
    `package_type` ENUM('Medical&Tourism', 'Medical Service Only') NOT NULL,
    `hospitalId` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `detail` VARCHAR(100) NOT NULL,
    `duration` INTEGER NOT NULL,
    `expired_date` DATE NOT NULL,
    `create_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `hospitalId`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package_Description` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageId` INTEGER NULL,
    `details` VARCHAR(255) NULL,

    INDEX `packageId`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package_Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageId` INTEGER NULL,
    `images` VARCHAR(255) NULL,

    INDEX `packageId`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor_In_Package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageId` INTEGER NULL,
    `doctorId` INTEGER NULL,

    INDEX `doctorId`(`doctorId`),
    INDEX `packageId`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package_Hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageId` INTEGER NULL,
    `hotelId` INTEGER NULL,

    INDEX `hotelId`(`hotelId`),
    INDEX `packageId`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package_Interpreter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageId` INTEGER NULL,
    `interpreterId` INTEGER NULL,

    INDEX `interpreterId`(`interpreterId`),
    INDEX `packageId`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package_Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `packageId` INTEGER NOT NULL,
    `tourism_bookingId` INTEGER NOT NULL,
    `appointmentId` INTEGER NOT NULL,
    `hotel_bookingId` INTEGER NOT NULL,
    `user_contactId` INTEGER NOT NULL,
    `interpreter_bookingId` INTEGER NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled') NOT NULL,

    INDEX `appointmentId`(`appointmentId`),
    INDEX `userContactId`(`user_contactId`),
    INDEX `hotelBookingId`(`hotel_bookingId`),
    INDEX `InterpreterBookingId`(`interpreter_bookingId`),
    INDEX `packageId`(`packageId`),
    INDEX `tourismBookingId`(`tourism_bookingId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NULL,
    `timeslot` VARCHAR(255) NULL,
    `patientId` INTEGER NULL,
    `description` TEXT NULL,
    `doctorId` INTEGER NULL,
    `file_name` VARCHAR(255) NULL,
    `file_path` VARCHAR(255) NULL,
    `upload_date` TIMESTAMP(0) NULL,

    INDEX `doctorId`(`doctorId`),
    INDEX `patientId`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tourism_Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NULL,
    `carId` INTEGER NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected') NULL,

    INDEX `carId`(`carId`),
    INDEX `tripId`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel_Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` INTEGER NULL,
    `check_in_date` DATE NULL,
    `check_out_date` DATE NULL,
    `guest_children` INTEGER NULL,
    `guest_adult` INTEGER NULL,
    `total_price` FLOAT NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected', 'Cancelled') NULL,

    INDEX `hotelId`(`hotelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interpreter_Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interpreterId` INTEGER NULL,
    `start` DATE NULL,
    `end` DATE NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected', 'Cancelled') NULL,

    INDEX `interpreterId`(`interpreterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bookingId` INTEGER NOT NULL,
    `payment_date` DATETIME(0) NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 0) NOT NULL,
    `payment_status` ENUM('successful', 'Failed', 'Peding', 'Refund') NOT NULL,
    `transaction_id` VARCHAR(50) NOT NULL,

    INDEX `bookingId`(`bookingId`),
    INDEX `uer_id`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Contact_Detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `phone` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient_Detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `gender` ENUM('Male', 'Female') NULL,
    `dateofbirth` DATE NULL,
    `nationality` VARCHAR(255) NULL,
    `passport_number` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Action_History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type_action` ENUM('Add', 'Remove', 'Update') NULL,
    `timestamp` TIMESTAMP(0) NULL,
    `action` VARCHAR(255) NULL,
    `objectId` INTEGER NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user1Id` INTEGER NOT NULL,
    `user2Id` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user2Id`(`user2Id`),
    INDEX `user1Id`(`user1Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `chatId` INTEGER NOT NULL,
    `senderId` INTEGER NULL,
    `receiverId` INTEGER NULL,
    `message` TEXT NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `receiverId`(`receiverId`),
    INDEX `senderId`(`senderId`),
    INDEX `chatId`(`chatId`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact_Us` (
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

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hospital_Image` ADD CONSTRAINT `hospital_images_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Hospital_Review` ADD CONSTRAINT `review_hospital_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Hospital_Review` ADD CONSTRAINT `review_hospital_ibfk_2` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Doctor_Certificate` ADD CONSTRAINT `doc_certificate_ibfk_1` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Doctor_Education` ADD CONSTRAINT `doc_education_ibfk_1` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Doctor_Language` ADD CONSTRAINT `doc_language_ibfk_1` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Medical_Service` ADD CONSTRAINT `medical_services_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Place_In_Trip` ADD CONSTRAINT `package_places_ibfk_1` FOREIGN KEY (`tourId`) REFERENCES `Trip`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Place_In_Trip` ADD CONSTRAINT `package_places_ibfk_2` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Place_Image` ADD CONSTRAINT `place_image_ibfk_2` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Hotel_Image` ADD CONSTRAINT `hotel_images_ibfk_1` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Hotel_Facility` ADD CONSTRAINT `hotel_facilities_ibfk_1` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Room_In_Hotel` ADD CONSTRAINT `hotel_rooms_ibfk_1` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Room_Facility` ADD CONSTRAINT `hotel_room_facilities_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Room_In_Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Room_Aggregate` ADD CONSTRAINT `room_aggregate_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Room_In_Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Room_Aggregate` ADD CONSTRAINT `room_aggregate_ibfk_2` FOREIGN KEY (`bookingId`) REFERENCES `Hotel_Booking`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Room_Image` ADD CONSTRAINT `room_image_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Room_In_Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Hotel_Review` ADD CONSTRAINT `review_hotel_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Hotel_Review` ADD CONSTRAINT `review_hotel_ibfk_2` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Language` ADD CONSTRAINT `languages_ibfk_1` FOREIGN KEY (`interpreterId`) REFERENCES `Interpreter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Interpreter_Education` ADD CONSTRAINT `inter_education_ibfk_1` FOREIGN KEY (`interpreterId`) REFERENCES `Interpreter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Interpreter_Review` ADD CONSTRAINT `review_inter_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Interpreter_Review` ADD CONSTRAINT `review_inter_ibfk_2` FOREIGN KEY (`interpreterId`) REFERENCES `Interpreter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package` ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Description` ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Image` ADD CONSTRAINT `package_image_ibfk_1` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Doctor_In_Package` ADD CONSTRAINT `package_doc_ibfk_1` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Doctor_In_Package` ADD CONSTRAINT `package_doc_ibfk_2` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Hotel` ADD CONSTRAINT `package_hotels_ibfk_1` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Hotel` ADD CONSTRAINT `package_hotels_ibfk_2` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Interpreter` ADD CONSTRAINT `package_interpreters_ibfk_1` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Interpreter` ADD CONSTRAINT `package_interpreters_ibfk_2` FOREIGN KEY (`interpreterId`) REFERENCES `Interpreter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Booking` ADD CONSTRAINT `package_bookings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Booking` ADD CONSTRAINT `package_bookings_ibfk_2` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Booking` ADD CONSTRAINT `package_bookings_ibfk_3` FOREIGN KEY (`tourism_bookingId`) REFERENCES `Tourism_Booking`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Booking` ADD CONSTRAINT `package_bookings_ibfk_4` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Booking` ADD CONSTRAINT `package_bookings_ibfk_5` FOREIGN KEY (`hotel_bookingId`) REFERENCES `Hotel_Booking`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Booking` ADD CONSTRAINT `package_bookings_ibfk_6` FOREIGN KEY (`user_contactId`) REFERENCES `User_Contact_Detail`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Booking` ADD CONSTRAINT `package_bookings_ibfk_7` FOREIGN KEY (`interpreter_bookingId`) REFERENCES `Interpreter_Booking`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `Patient_Detail`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Tourism_Booking` ADD CONSTRAINT `tourism_bookings_ibfk_1` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Tourism_Booking` ADD CONSTRAINT `tourism_bookings_ibfk_2` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Hotel_Booking` ADD CONSTRAINT `hotel_bookings_ibfk_1` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Interpreter_Booking` ADD CONSTRAINT `inter_bookings_ibfk_1` FOREIGN KEY (`interpreterId`) REFERENCES `Interpreter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`bookingId`) REFERENCES `Package_Booking`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Action_History` ADD CONSTRAINT `action_history_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user1Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user2Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
