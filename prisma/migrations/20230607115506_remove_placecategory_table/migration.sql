/*
  Warnings:

  - You are about to drop the `placecategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `placecategory` DROP FOREIGN KEY `PlaceCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `placecategory` DROP FOREIGN KEY `PlaceCategory_placeId_fkey`;

-- DropTable
DROP TABLE `placecategory`;
