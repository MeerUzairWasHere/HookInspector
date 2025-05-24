/*
  Warnings:

  - Added the required column `duration` to the `IncomingRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `IncomingRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `IncomingRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncomingRequest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;
