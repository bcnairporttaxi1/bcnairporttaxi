-- A voluntary post-ride tip, paid separately and owed to the driver in full.
ALTER TABLE "Booking" ADD COLUMN "tipAmount" DECIMAL(10,2);
ALTER TABLE "Booking" ADD COLUMN "tipCheckoutId" TEXT;
ALTER TABLE "Booking" ADD COLUMN "tipPaidAt" TIMESTAMP(3);
