/*
  Warnings:

  - You are about to drop the column `estimateTotal` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `amountOnline` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fixedFare` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meterEstimate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perKmRateCharged` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('FEE_ONLY', 'FULL_PREPAID');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "estimateTotal",
ADD COLUMN     "amountOnline" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "fixedFare" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "meterEstimate" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "paymentMode" "PaymentMode" NOT NULL DEFAULT 'FEE_ONLY',
ADD COLUMN     "perKmRateCharged" DECIMAL(10,4) NOT NULL;
