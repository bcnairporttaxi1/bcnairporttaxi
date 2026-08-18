/**
 * The domain vocabulary.
 *
 * These were previously imported as types from the generated Prisma client,
 * which would have coupled this package — and therefore every mobile app that
 * consumes it — to a database client it must never bundle.
 *
 * Declaring them here inverts the dependency: the domain owns its vocabulary
 * and the schema conforms to it. `apps/web/src/lib/domain-check.ts` asserts at
 * compile time that the Prisma enums and these unions still agree, so a schema
 * change that drifts from the domain fails the build rather than going
 * unnoticed until runtime.
 */

export type Role = 'USER' | 'DRIVER' | 'ADMIN';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'ON_BOARD'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentMode = 'FEE_ONLY' | 'FULL_PREPAID';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type Tariff = 'T1' | 'T2' | 'T4' | 'T6' | 'T7';

export type PayoutMethod = 'BIZUM' | 'BANK';

export type WithdrawalStatus = 'REQUESTED' | 'APPROVED' | 'PAID' | 'REJECTED';

export type RatingDirection = 'USER_TO_DRIVER' | 'DRIVER_TO_USER';

export type ReportStatus = 'OPEN' | 'REVIEWING' | 'RESOLVED' | 'DISMISSED';
