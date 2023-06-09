/*
  Warnings:

  - You are about to drop the column `widht` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `width` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Photo` DROP COLUMN `widht`,
    ADD COLUMN `width` VARCHAR(191) NOT NULL;
