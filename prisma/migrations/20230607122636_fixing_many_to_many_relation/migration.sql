/*
  Warnings:

  - You are about to drop the `_placecategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_placecategory` DROP FOREIGN KEY `_PlaceCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_placecategory` DROP FOREIGN KEY `_PlaceCategory_B_fkey`;

-- DropTable
DROP TABLE `_placecategory`;
