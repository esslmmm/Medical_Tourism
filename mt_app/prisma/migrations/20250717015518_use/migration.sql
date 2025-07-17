/*
  Warnings:

  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `packages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tourism_bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_contact_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `appointment_files` DROP FOREIGN KEY `appointment_files_appointmentId_fkey`;

-- DropForeignKey
ALTER TABLE `description` DROP FOREIGN KEY `description_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_bookings` DROP FOREIGN KEY `package_bookings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `package_bookings` DROP FOREIGN KEY `package_bookings_ibfk_3`;

-- DropForeignKey
ALTER TABLE `package_bookings` DROP FOREIGN KEY `package_bookings_ibfk_4`;

-- DropForeignKey
ALTER TABLE `package_bookings` DROP FOREIGN KEY `package_bookings_ibfk_6`;

-- DropForeignKey
ALTER TABLE `package_doc` DROP FOREIGN KEY `package_doc_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_hotels` DROP FOREIGN KEY `package_hotels_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_image` DROP FOREIGN KEY `package_image_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_interpreters` DROP FOREIGN KEY `package_interpreters_ibfk_1`;

-- DropForeignKey
ALTER TABLE `trips` DROP FOREIGN KEY `trips_ibfk_1`;

-- AlterTable
ALTER TABLE `appointment_files` MODIFY `appointmentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `appointments` DROP PRIMARY KEY,
    MODIFY `appointment_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`appointment_id`);

-- AlterTable
ALTER TABLE `description` MODIFY `package_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `package_bookings` MODIFY `package_id` VARCHAR(191) NOT NULL,
    MODIFY `tourism_booking_id` VARCHAR(191) NULL,
    MODIFY `appointment_id` VARCHAR(191) NULL,
    MODIFY `contact_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `package_doc` MODIFY `package_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `package_hotels` MODIFY `package_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `package_image` MODIFY `package_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `package_interpreters` MODIFY `package_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `packages` DROP PRIMARY KEY,
    MODIFY `package_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`package_id`);

-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    MODIFY `payment_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`payment_id`);

-- AlterTable
ALTER TABLE `tourism_bookings` DROP PRIMARY KEY,
    MODIFY `tourism_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`tourism_id`);

-- AlterTable
ALTER TABLE `trips` MODIFY `package_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_contact_detail` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `appointment_files` ADD CONSTRAINT `appointment_files_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `appointments`(`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `description` ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_3` FOREIGN KEY (`tourism_booking_id`) REFERENCES `tourism_bookings`(`tourism_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_4` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`appointment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_bookings` ADD CONSTRAINT `package_bookings_ibfk_6` FOREIGN KEY (`contact_id`) REFERENCES `user_contact_detail`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_doc` ADD CONSTRAINT `package_doc_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_hotels` ADD CONSTRAINT `package_hotels_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_image` ADD CONSTRAINT `package_image_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_interpreters` ADD CONSTRAINT `package_interpreters_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
