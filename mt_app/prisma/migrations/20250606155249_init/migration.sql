/*
  Warnings:

  - Added the required column `title` to the `description` table without a default value. This is not possible if the table is not empty.
  - Made the column `package_id` on table `description` required. This step will fail if there are existing NULL values in that column.
  - Made the column `details` on table `description` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `detail` to the `package_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `package_image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `description` DROP FOREIGN KEY `description_ibfk_1`;

-- AlterTable
ALTER TABLE `description` ADD COLUMN `title` VARCHAR(100) NOT NULL,
    MODIFY `package_id` INTEGER NOT NULL,
    MODIFY `details` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `hotel_bookings` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled') NULL DEFAULT 'In_Progress';

-- AlterTable
ALTER TABLE `inter_bookings` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled') NULL DEFAULT 'In_Progress';

-- AlterTable
ALTER TABLE `package_bookings` MODIFY `status` ENUM('Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `package_image` ADD COLUMN `detail` TEXT NOT NULL,
    ADD COLUMN `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tourism_bookings` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `status` ENUM('In_Progress', 'Pending', 'Approved', 'Rejected') NULL DEFAULT 'In_Progress';

-- AddForeignKey
ALTER TABLE `description` ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
