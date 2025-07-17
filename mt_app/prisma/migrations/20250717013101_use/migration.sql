/*
  Warnings:

  - The primary key for the `package_bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_ibfk_2`;

-- AlterTable
ALTER TABLE `package_bookings` DROP PRIMARY KEY,
    MODIFY `booking_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`booking_id`);

-- AlterTable
ALTER TABLE `payment` MODIFY `booking_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `package_bookings`(`booking_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
