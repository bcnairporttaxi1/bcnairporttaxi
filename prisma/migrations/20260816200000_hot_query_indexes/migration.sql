-- CreateIndex
CREATE INDEX "Review_driverId_direction_idx" ON "Review"("driverId", "direction");

-- CreateIndex
CREATE INDEX "Withdrawal_driverId_status_idx" ON "Withdrawal"("driverId", "status");
