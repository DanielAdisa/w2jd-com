/*
  Warnings:

  - You are about to drop the column `image` on the `Testimony` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Testimony" DROP COLUMN "image",
ALTER COLUMN "category" SET DEFAULT 'General';

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "isGood" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);
