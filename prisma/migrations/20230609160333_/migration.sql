-- DropForeignKey
ALTER TABLE `OpeningHours` DROP FOREIGN KEY `OpeningHours_placeId_fkey`;

-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_placeId_fkey`;

-- DropForeignKey
ALTER TABLE `PlaceCategory` DROP FOREIGN KEY `PlaceCategory_placeId_fkey`;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpeningHours` ADD CONSTRAINT `OpeningHours_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaceCategory` ADD CONSTRAINT `PlaceCategory_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
