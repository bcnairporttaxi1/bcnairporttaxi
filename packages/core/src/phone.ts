/**
 * Recognising the same phone number typed two different ways.
 *
 * The desk assigns drivers by typing a name and a number, and the same driver
 * gets typed differently every time: "+34 600 111 222", "0034600111222",
 * "600 111 222". Without a normal form each spelling would create its own
 * driver record, so one person would accumulate a row per booking and their
 * balance would be split across all of them.
 */

/**
 * The digits that identify a phone number, with Spanish country codes and all
 * formatting removed.
 *
 * Spanish numbers are nine digits. A longer string beginning 34 — or 0034, or
 * +34 — is the same number with the country code attached, so the code comes
 * off. Anything else is left as its digits: an international driver's number
 * is not ours to reinterpret, and two genuinely different foreign numbers
 * must not collapse into one.
 */
export function phoneKey(phone: string): string {
  let digits = phone.replace(/\D/g, '');

  // 00 is the international prefix; drop it before looking for the country.
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length > 9 && digits.startsWith('34')) digits = digits.slice(2);

  return digits;
}

/** Whether two numbers, however they were typed, are the same line. */
export function samePhone(a: string, b: string): boolean {
  const ka = phoneKey(a);
  const kb = phoneKey(b);
  // Two empty keys are not a match: a pair of blank fields is not one driver.
  return ka.length > 0 && ka === kb;
}
