-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;
