import type * as Prisma from '@/generated/prisma/enums';
import type * as Core from '@bcn/core/domain';

/**
 * Compile-time proof that the database schema and the domain vocabulary agree.
 *
 * `@bcn/core` cannot import the generated Prisma client — it is consumed by
 * React Native apps that must never bundle a database driver — so it declares
 * the enums itself. This file is the guard rail: if someone adds a value to a
 * Prisma enum without adding it to `core/domain`, or renames one on either
 * side, the type checker fails here rather than the mismatch surfacing as a
 * runtime bug in an app that shipped weeks ago.
 *
 * Types only. Nothing is emitted and nothing runs.
 */

type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never;

/** Each line fails to compile if that pair has drifted apart. */
type _Role = Exact<Prisma.Role, Core.Role>;
type _BookingStatus = Exact<Prisma.BookingStatus, Core.BookingStatus>;
type _PaymentMode = Exact<Prisma.PaymentMode, Core.PaymentMode>;
type _PaymentStatus = Exact<Prisma.PaymentStatus, Core.PaymentStatus>;
type _Tariff = Exact<Prisma.Tariff, Core.Tariff>;
type _PayoutMethod = Exact<Prisma.PayoutMethod, Core.PayoutMethod>;
type _WithdrawalStatus = Exact<Prisma.WithdrawalStatus, Core.WithdrawalStatus>;
type _RatingDirection = Exact<Prisma.RatingDirection, Core.RatingDirection>;
type _ReportStatus = Exact<Prisma.ReportStatus, Core.ReportStatus>;

// Referencing them keeps the checks from being elided as unused.
export type DomainMatchesSchema = [
  _Role, _BookingStatus, _PaymentMode, _PaymentStatus, _Tariff,
  _PayoutMethod, _WithdrawalStatus, _RatingDirection, _ReportStatus,
];
