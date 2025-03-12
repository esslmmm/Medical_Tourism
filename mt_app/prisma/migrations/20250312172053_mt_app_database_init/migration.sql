-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `contact_info` VARCHAR(191) NOT NULL,
    `role` ENUM('customer', 'staff', 'admin') NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login` (
    `login_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `login_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`login_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctors` (
    `doctor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `hospital_id` INTEGER NOT NULL,
    `experience` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospitals` (
    `hospital_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hospital_code` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `contact_info` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`hospital_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medical_services` (
    `service_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_id` INTEGER NOT NULL,
    `service_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Packages` (
    `package_id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_name` VARCHAR(191) NOT NULL,
    `package_type` ENUM('MedicalAndTourism', 'MedicalServiceOnly') NOT NULL,
    `hospital_id` INTEGER NOT NULL,
    `tour_id` INTEGER NULL,
    `image` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `expired_date` DATETIME(3) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`package_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `login_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctors` ADD CONSTRAINT `Doctors_hospital_id_fkey` FOREIGN KEY (`hospital_id`) REFERENCES `Hospitals`(`hospital_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_services` ADD CONSTRAINT `Medical_services_hospital_id_fkey` FOREIGN KEY (`hospital_id`) REFERENCES `Hospitals`(`hospital_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Packages` ADD CONSTRAINT `Packages_hospital_id_fkey` FOREIGN KEY (`hospital_id`) REFERENCES `Hospitals`(`hospital_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
