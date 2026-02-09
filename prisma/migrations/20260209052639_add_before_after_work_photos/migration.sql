-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "afterWorkPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "beforeWorkPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[];
