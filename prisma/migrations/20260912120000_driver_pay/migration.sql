-- The amount the desk agrees to pay the driver for a ride. Nullable: rides
-- assigned before this column existed settle to the fare as they always did.
ALTER TABLE "Booking" ADD COLUMN "driverPay" DECIMAL(10,2);
