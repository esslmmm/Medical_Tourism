-- AlterTable
ALTER TABLE `interpreters` MODIFY `experience` DATE NOT NULL DEFAULT ('2025-02-02');

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;
