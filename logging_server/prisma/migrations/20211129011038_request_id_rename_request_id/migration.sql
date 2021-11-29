/*
  Warnings:

  - You are about to drop the column `request_id` on the `log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "log" DROP COLUMN "request_id",
ADD COLUMN     "requestId" INTEGER;
