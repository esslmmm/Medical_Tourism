/*
  Warnings:

  - The primary key for the `places` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `package_places` DROP FOREIGN KEY `package_places_ibfk_2`;

-- DropForeignKey
ALTER TABLE `place_image` DROP FOREIGN KEY `place_image_ibfk_2`;

-- AlterTable
ALTER TABLE `package_places` MODIFY `place_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `place_image` MODIFY `place_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `places` DROP PRIMARY KEY,
    MODIFY `place_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`place_id`);

-- AddForeignKey
ALTER TABLE `package_places` ADD CONSTRAINT `package_places_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places`(`place_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `place_image` ADD CONSTRAINT `place_image_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places`(`place_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
