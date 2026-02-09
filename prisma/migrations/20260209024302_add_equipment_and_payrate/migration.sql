/*
  Warnings:

  - Made the column `cost` on table `WorkOrderEquipment` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EquipmentApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'EQUIPMENT_APPROVAL_REQUIRED';
ALTER TYPE "NotificationType" ADD VALUE 'EQUIPMENT_APPROVED';
ALTER TYPE "NotificationType" ADD VALUE 'EQUIPMENT_REJECTED';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "entityId" TEXT,
ADD COLUMN     "entityType" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultPayRate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WorkOrderEquipment" ADD COLUMN     "addedByTechnicianId" TEXT,
ADD COLUMN     "approvalStatus" "EquipmentApprovalStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" TEXT,
ADD COLUMN     "equipmentId" TEXT,
ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receiptUrl" TEXT,
ADD COLUMN     "rejectionReason" TEXT,
ALTER COLUMN "cost" SET NOT NULL;

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "minRange" DOUBLE PRECISION,
    "maxRange" DOUBLE PRECISION,
    "vendor" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");

-- AddForeignKey
ALTER TABLE "WorkOrderEquipment" ADD CONSTRAINT "WorkOrderEquipment_addedByTechnicianId_fkey" FOREIGN KEY ("addedByTechnicianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderEquipment" ADD CONSTRAINT "WorkOrderEquipment_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderEquipment" ADD CONSTRAINT "WorkOrderEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
