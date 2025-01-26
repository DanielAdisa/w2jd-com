-- AlterTable
ALTER TABLE "Prayer" ADD COLUMN     "category" TEXT,
ALTER COLUMN "isPublic" SET DEFAULT true;
