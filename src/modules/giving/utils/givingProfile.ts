// Reads the giving-related parts of the church profile (the object
// the app loads at startup from /portal/Ministry/{tenantId}/profile).
//
// This backend fills unset text fields with the literal string
// "null" in places (e.g. "aka": "null", "headPastorName": "null"),
// so "empty" has to include that, or it would be shown to people as
// if it were real text.
export const cleanText = (
  value: unknown
): string => {
  if (
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return "";
  }

  const text = String(value).trim();

  const lower = text.toLowerCase();

  return text &&
    lower !== "null" &&
    lower !== "undefined"
    ? text
    : "";
};

export interface BankAccount {
  // Unique per list entry — safe to use as a React key.
  key: string;

  bankName: string;

  accountNumber: string;

  accountName: string;

  description: string;
}

// An entry with no account number can't be paid into, so it's
// dropped rather than shown as an empty card. accountName and
// description are optional and often null in real data.
export const toBankAccounts = (
  raw: unknown
): BankAccount[] =>
  (Array.isArray(raw) ? raw : [])
    .map(
      (item: any, index: number) => ({
        key: `${
          cleanText(item?.id) ||
          "bank"
        }-${index}`,

        bankName:
          cleanText(
            item?.bankName
          ) || "Bank account",

        accountNumber: cleanText(
          item?.accountNumber
        ),

        accountName: cleanText(
          item?.accountName
        ),

        description: cleanText(
          item?.description
        ),
      })
    )
    .filter(
      bank => bank.accountNumber
    );

// Two different hosted pages, both on the church's profile:
//   pledgePromiseUrl -> make a new pledge
//   pledgeDueUrl     -> pay (redeem) a pledge already made
// (The old Classic pledges screen sent BOTH of its buttons to the
// first one.) An empty string means that action isn't available.
export const getPledgeLinks = (
  profile: any
) => ({
  make: cleanText(
    profile?.pledgePromiseUrl
  ),

  pay: cleanText(
    profile?.pledgeDueUrl
  ),
});
