/*
  Warnings:

  - You are about to drop the column `colorCode` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `currentBankAccount` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `colorCode` on the `TaskArchive` table. All the data in the column will be lost.
  - You are about to drop the column `currentBankAccount` on the `TaskArchive` table. All the data in the column will be lost.
  - Added the required column `bankAccount` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankAccount` to the `TaskArchive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `colorCode`,
    DROP COLUMN `currentBankAccount`,
    ADD COLUMN `bankAccount` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TaskArchive` DROP COLUMN `colorCode`,
    DROP COLUMN `currentBankAccount`,
    ADD COLUMN `bankAccount` VARCHAR(191) NOT NULL;
