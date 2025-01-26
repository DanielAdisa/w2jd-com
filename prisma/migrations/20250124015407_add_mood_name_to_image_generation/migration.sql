-- CreateTable
CREATE TABLE "ImageGeneration" (
    "id" SERIAL NOT NULL,
    "moodId" TEXT NOT NULL,
    "moodName" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageGeneration_pkey" PRIMARY KEY ("id")
);
