/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserPreference` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserPreference_user_id_key` ON `UserPreference`(`user_id`);
