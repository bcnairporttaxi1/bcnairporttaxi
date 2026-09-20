-- The flight to track, and the link between the two legs of a return.
ALTER TABLE "Booking" ADD COLUMN "flightNumber" TEXT;
ALTER TABLE "Booking" ADD COLUMN "groupId" TEXT;
CREATE INDEX "Booking_groupId_idx" ON "Booking"("groupId");
