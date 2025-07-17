/*
  Warnings:

  - The primary key for the `doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `files` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hospitals` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `appointment_files` DROP FOREIGN KEY `appointment_files_fileId_fkey`;

-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `chat_files` DROP FOREIGN KEY `chat_files_fileId_fkey`;

-- DropForeignKey
ALTER TABLE `doc_certificate` DROP FOREIGN KEY `doc_certificate_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doc_education` DROP FOREIGN KEY `doc_education_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doc_language` DROP FOREIGN KEY `doc_language_ibfk_1`;

-- DropForeignKey
ALTER TABLE `doctors` DROP FOREIGN KEY `doctors_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hospital_images` DROP FOREIGN KEY `hospital_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `medical_services` DROP FOREIGN KEY `medical_services_ibfk_1`;

-- DropForeignKey
ALTER TABLE `package_doc` DROP FOREIGN KEY `package_doc_ibfk_2`;

-- DropForeignKey
ALTER TABLE `packages` DROP FOREIGN KEY `packages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `review_hospital` DROP FOREIGN KEY `review_hospital_ibfk_2`;

-- AlterTable
ALTER TABLE `appointment_files` MODIFY `fileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `appointments` MODIFY `doctor_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `chat_files` MODIFY `fileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `doc_certificate` MODIFY `doctor_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `doc_education` MODIFY `doctor_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `doc_language` MODIFY `doctor_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `doctors` DROP PRIMARY KEY,
    MODIFY `doctor_id` VARCHAR(191) NOT NULL,
    MODIFY `hospital_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`doctor_id`);

-- AlterTable
ALTER TABLE `files` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `hospital_images` MODIFY `hospital_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `hospitals` DROP PRIMARY KEY,
    MODIFY `hospital_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`hospital_id`);

-- AlterTable
ALTER TABLE `medical_services` MODIFY `hospital_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `package_doc` MODIFY `doctor_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `packages` MODIFY `hospital_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `review_hospital` MODIFY `hospital_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `appointment_files` ADD CONSTRAINT `appointment_files_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_files` ADD CONSTRAINT `chat_files_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doc_certificate` ADD CONSTRAINT `doc_certificate_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doc_education` ADD CONSTRAINT `doc_education_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doc_language` ADD CONSTRAINT `doc_language_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medical_services` ADD CONSTRAINT `medical_services_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `package_doc` ADD CONSTRAINT `package_doc_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_hospital` ADD CONSTRAINT `review_hospital_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hospital_images` ADD CONSTRAINT `hospital_images_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`hospital_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
