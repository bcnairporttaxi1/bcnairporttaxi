-- What the passenger asked for, kept apart from the car that is sent.
ALTER TABLE "Booking" ADD COLUMN "requestedVehicleId" TEXT;

ALTER TABLE "Booking"
  ADD CONSTRAINT "Booking_requestedVehicleId_fkey"
  FOREIGN KEY ("requestedVehicleId") REFERENCES "Vehicle"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

-- Backfill: for a ride with no driver yet, vehicleId IS still the request.
-- For one already assigned it is the driver's car and the original choice is
-- gone, so this is the closest truth available rather than a reconstruction.
UPDATE "Booking" SET "requestedVehicleId" = "vehicleId" WHERE "vehicleId" IS NOT NULL;

-- A driver added from a ride has a name and a phone and often nothing else.
ALTER TABLE "Driver" ALTER COLUMN "licenseNumber" DROP NOT NULL;
