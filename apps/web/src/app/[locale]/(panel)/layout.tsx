/**
 * Signed-in panels: dispatch, driver, customer account, live trip.
 *
 * Deliberately bare. Everything a panel needs — the navigation rail, the top
 * bar, the sign-out control — comes from `PanelShell`, which each page renders
 * itself. Wrapping these routes in the public header and footer is what made
 * them read as website pages rather than as an application.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <div id="main">{children}</div>;
}
