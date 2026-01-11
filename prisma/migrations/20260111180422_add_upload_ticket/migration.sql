-- CreateTable
CREATE TABLE "public"."UploadTicket" (
    "id" SERIAL NOT NULL,
    "kind" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UploadTicket_kind_idx" ON "public"."UploadTicket"("kind");

-- CreateIndex
CREATE INDEX "UploadTicket_createdAt_idx" ON "public"."UploadTicket"("createdAt");
