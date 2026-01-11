-- CreateTable
CREATE TABLE "public"."PostReaction" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PostReactionVote" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "voterHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostReactionVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostReaction_postId_idx" ON "public"."PostReaction"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostReaction_postId_emoji_key" ON "public"."PostReaction"("postId", "emoji");

-- CreateIndex
CREATE INDEX "PostReactionVote_postId_idx" ON "public"."PostReactionVote"("postId");

-- CreateIndex
CREATE INDEX "PostReactionVote_voterHash_idx" ON "public"."PostReactionVote"("voterHash");

-- CreateIndex
CREATE UNIQUE INDEX "PostReactionVote_postId_emoji_voterHash_key" ON "public"."PostReactionVote"("postId", "emoji", "voterHash");

-- AddForeignKey
ALTER TABLE "public"."PostReaction" ADD CONSTRAINT "PostReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PostReactionVote" ADD CONSTRAINT "PostReactionVote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
