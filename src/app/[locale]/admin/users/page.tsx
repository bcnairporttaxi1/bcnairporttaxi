import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PanelShell } from '@/components/panel-shell';
import { NewUserForm } from '@/components/admin-new-user-form';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';
import { ADMIN_TABS } from '../tabs';
import { createUserAccount, resetUserPassword, setUserBlocked } from '../actions';

export const metadata: Metadata = {
  title: { absolute: 'Users | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function UsersPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const admin = await requireRole(['ADMIN'], locale);

  const day = (d: Date | null) =>
    d
      ? new Intl.DateTimeFormat(locale, {
          dateStyle: 'medium',
          timeZone: 'Europe/Madrid',
        }).format(d)
      : '—';

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 300,
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      blocked: true,
      blockedReason: true,
      mustChangePassword: true,
      lastSeenAt: true,
      createdAt: true,
      _count: { select: { bookings: true } },
    },
  });

  return (
    <PanelShell
      title="Users"
      subtitle="Accounts you open here get a generated password by email and must replace it on first sign-in."
      userName={admin.name}
      locale={locale}
      tabs={ADMIN_TABS}
      activeHref="/admin/users"
    >
      <section className="mb-12 max-w-xl">
        <h2 className="font-display text-xl font-extrabold">Open an account</h2>
        <div className="mt-4">
          <NewUserForm locale={locale} action={createUserAccount} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-extrabold">All accounts ({users.length})</h2>
        {users.length === 0 ? (
          <p className="mt-4 rounded-card border border-hairline bg-white p-10 text-center text-muted">
            No accounts yet. Open one above, or wait for a passenger to register.
          </p>
        ) : (
        <div className="mt-4 overflow-x-auto rounded-card border border-hairline bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-hairline text-left text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Rides</th>
                <th className="p-3">Last seen</th>
                <th className="p-3">State</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-hairline last:border-0">
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-muted">{u.email}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-porcelain px-2 py-1 text-xs font-bold">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{u._count.bookings}</td>
                  <td className="p-3 whitespace-nowrap">{day(u.lastSeenAt)}</td>
                  <td className="p-3">
                    {u.blocked ? (
                      <span
                        className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-900"
                        title={u.blockedReason ?? undefined}
                      >
                        Suspended
                      </span>
                    ) : u.mustChangePassword ? (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-900">
                        Temp password
                      </span>
                    ) : (
                      <span className="text-xs text-muted">Active</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <form action={resetUserPassword}>
                        <input type="hidden" name="userId" value={u.id} />
                        <input type="hidden" name="locale" value={locale} />
                        <button className="rounded-lg border border-hairline px-3 py-1.5 text-xs font-bold hover:border-ink">
                          Email new password
                        </button>
                      </form>
                      {/* An admin cannot lock themselves out of their own panel. */}
                      {u.id !== admin.id && (
                        <form action={setUserBlocked}>
                          <input type="hidden" name="userId" value={u.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <input
                            type="hidden"
                            name="blocked"
                            value={u.blocked ? '0' : '1'}
                          />
                          <button
                            className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
                              u.blocked
                                ? 'border-hairline hover:border-ink'
                                : 'border-red-300 text-red-800 hover:border-red-700'
                            }`}
                          >
                            {u.blocked ? 'Restore' : 'Suspend'}
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>
    </PanelShell>
  );
}
