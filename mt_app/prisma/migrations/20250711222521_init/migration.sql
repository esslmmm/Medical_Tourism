/*
  Warnings:

  - You are about to drop the column `file_name` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `file_path` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `upload_date` on the `appointments` table. All the data in the column will be lost.
  - The values [Medical&Tourism,Medical Service Only] on the enum `packages_package_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `car_id` on the `tourism_bookings` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tourism_bookings` DROP FOREIGN KEY `tourism_bookings_ibfk_2`;

-- DropIndex
DROP INDEX `car_id` ON `tourism_bookings`;

-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `file_name`,
    DROP COLUMN `file_path`,
    DROP COLUMN `upload_date`,
    MODIFY `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled') NOT NULL DEFAULT 'In_Progress';

-- AlterTable
ALTER TABLE `package_bookings` MODIFY `status` ENUM('In_Progress', 'Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled') NOT NULL DEFAULT 'In_Progress';

-- AlterTable
ALTER TABLE `packages` MODIFY `package_type` ENUM('Medical_Tourism', 'Medical_Service_Only') NOT NULL;

-- AlterTable
ALTER TABLE `tourism_bookings` DROP COLUMN `car_id`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`,
    ADD COLUMN `is_email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `otp` VARCHAR(10) NULL,
    ADD COLUMN `otp_expiry` DATETIME(3) NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `image` VARCHAR(2048) NULL;

-- DropTable
DROP TABLE `cars`;

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

    UNIQUE INDEX `files_cloudinaryId_key`(`cloudinaryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appointmentId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `appointment_files_appointmentId_fileId_key`(`appointmentId`, `fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chatId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `chat_files_chatId_fileId_key`(`chatId`, `fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
