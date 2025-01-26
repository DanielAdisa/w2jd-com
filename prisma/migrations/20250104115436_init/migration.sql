/*
  Warnings:

  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Testimony` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "Vote";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "testimonyId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_testimonyId_idx" ON "Comment"("testimonyId");

-- CreateIndex
CREATE UNIQUE INDEX "Testimony_title_key" ON "Testimony"("title");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_testimonyId_fkey" FOREIGN KEY ("testimonyId") REFERENCES "Testimony"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
