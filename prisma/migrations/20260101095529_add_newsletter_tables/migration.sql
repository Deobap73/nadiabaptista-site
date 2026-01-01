-- CreateEnum
CREATE TYPE "public"."NewsletterSubscriberStatus" AS ENUM ('PENDING', 'ACTIVE', 'UNSUBSCRIBED');

-- CreateEnum
CREATE TYPE "public"."NewsletterEventKind" AS ENUM ('POST', 'ACADEMIC_PROJECT', 'ACHIEVEMENT', 'CONFERENCE', 'PRACTICAL_EXPERIENCE');

-- CreateTable
CREATE TABLE "public"."Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "status" "public"."NewsletterSubscriberStatus" NOT NULL DEFAULT 'PENDING',
    "confirmTokenHash" TEXT,
    "confirmExpiresAt" TIMESTAMP(3),
    "unsubTokenHash" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsletterEvent" (
    "id" TEXT NOT NULL,
    "kind" "public"."NewsletterEventKind" NOT NULL,
    "entityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsletterDelivery" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "providerId" TEXT,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "public"."Subscriber"("email");

-- CreateIndex
CREATE INDEX "Subscriber_status_idx" ON "public"."Subscriber"("status");

-- CreateIndex
CREATE INDEX "Subscriber_createdAt_idx" ON "public"."Subscriber"("createdAt");

-- CreateIndex
CREATE INDEX "NewsletterEvent_createdAt_idx" ON "public"."NewsletterEvent"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterEvent_kind_entityId_key" ON "public"."NewsletterEvent"("kind", "entityId");

-- CreateIndex
CREATE INDEX "NewsletterDelivery_createdAt_idx" ON "public"."NewsletterDelivery"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterDelivery_eventId_subscriberId_key" ON "public"."NewsletterDelivery"("eventId", "subscriberId");

-- AddForeignKey
ALTER TABLE "public"."NewsletterDelivery" ADD CONSTRAINT "NewsletterDelivery_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."NewsletterEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NewsletterDelivery" ADD CONSTRAINT "NewsletterDelivery_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "public"."Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
