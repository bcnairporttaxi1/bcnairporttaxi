/**
 * @bcn/core — the shared booking rules.
 *
 * Consumers import from the barrel (`@bcn/core`) or from a specific module
 * (`@bcn/core/pricing`) when they want only one thing. Both are configured in
 * the package exports.
 */

export * from './domain';
export * from './tariffs';
export * from './pricing';
export * from './rides';
export * from './format';
export * from './fleet';
export * from './destinations';
export * from './destination-photos';
export * from './landing-pages';
export * from './legal';
export * from './blog';
export * from './site';
