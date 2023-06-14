/*
  Warnings:

  - You are about to drop the column `place_category` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to alter the column `place_activity` on the `UserPreference` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `latitude` on the `UserPreference` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `longitude` on the `UserPreference` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- DropForeignKey
ALTER TABLE `UserPreference` DROP FOREIGN KEY `UserPreference_user_id_fkey`;

-- AlterTable
ALTER TABLE `UserPreference` DROP COLUMN `place_category`,
    MODIFY `place_activity` ENUM('OUTDOOR', 'INDOOR') NOT NULL,
    MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `UserPlaceCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user_prefId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPreference` ADD CONSTRAINT `UserPreference_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlaceCategory` ADD CONSTRAINT `UserPlaceCategory_user_prefId_fkey` FOREIGN KEY (`user_prefId`) REFERENCES `UserPreference`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
