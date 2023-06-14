/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UserPlaceCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserPlaceCategory_name_key` ON `UserPlaceCategory`(`name`);
