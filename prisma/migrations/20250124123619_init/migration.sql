/*
  Warnings:

  - Added the required column `ipAddress` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "ipAddress" TEXT NOT NULL;
