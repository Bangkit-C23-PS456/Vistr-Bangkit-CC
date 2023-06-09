/*
  Warnings:

  - You are about to drop the column `colseTime` on the `OpeningHours` table. All the data in the column will be lost.
  - Added the required column `closeTime` to the `OpeningHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OpeningHours` DROP COLUMN `colseTime`,
    ADD COLUMN `closeTime` INTEGER NOT NULL;
