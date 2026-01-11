/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."PostLang" AS ENUM ('pt', 'en');

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "content",
DROP COLUMN "excerpt",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "public"."PostTranslation" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "lang" "public"."PostLang" NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostTranslation_lang_idx" ON "public"."PostTranslation"("lang");

-- CreateIndex
CREATE INDEX "PostTranslation_postId_idx" ON "public"."PostTranslation"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostTranslation_postId_lang_key" ON "public"."PostTranslation"("postId", "lang");

-- AddForeignKey
ALTER TABLE "public"."PostTranslation" ADD CONSTRAINT "PostTranslation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
