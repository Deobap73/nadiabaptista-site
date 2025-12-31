/*
  Warnings:

  - Changed the type of `content` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "public"."ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "sendError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "public"."ContactMessage"("createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_status_idx" ON "public"."ContactMessage"("status");
