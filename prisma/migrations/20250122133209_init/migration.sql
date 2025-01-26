-- DropIndex
DROP INDEX "Testimony_title_key";

-- CreateIndex
CREATE INDEX "Comment_testimonyId_idx" ON "Comment"("testimonyId");
