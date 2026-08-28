/**
 * Pakistani buyers read prices in Lac (100k) and Crore (10m), not millions.
 * Formatting in international units makes listings unreadable to the audience.
 */
export function formatPkr(amount: number): string {
  if (amount >= 10_000_000) {
    const crore = amount / 10_000_000;
    return `PKR ${trim(crore)} Crore`;
  }
  if (amount >= 100_000) {
    const lac = amount / 100_000;
    return `PKR ${trim(lac)} Lac`;
  }
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

function trim(n: number): string {
  return n.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}
