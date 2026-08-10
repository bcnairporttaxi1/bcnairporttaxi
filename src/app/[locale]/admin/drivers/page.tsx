import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PanelShell } from '@/components/panel-shell';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';
import { addDriver, toggleDriverActive } from '../actions';
import { ADMIN_TABS } from '../tabs';

export const metadata: Metadata = {
  title: { absolute: 'Drivers | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const field = 'w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-sm';

export default async function AdminDriversPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const [drivers, vehicles] = await Promise.all([
    prisma.driver.findMany({
      include: { vehicle: true, _count: { select: { bookings: true } } },
      orderBy: [{ active: 'desc' }, { name: 'asc' }],
    }),
    prisma.vehicle.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
  ]);

  return (
    <PanelShell
      title="Drivers"
      subtitle="Add drivers and assign them a vehicle. Giving an email and password also creates their panel login."
      userName={user.name}
      locale={locale}
      tabs={ADMIN_TABS}
      activeHref="/admin/drivers"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section>
          <h2 className="font-display text-xl font-extrabold">
            {drivers.length} driver{drivers.length === 1 ? '' : 's'}
          </h2>

          {drivers.length === 0 ? (
            <p className="mt-5 rounded-card border border-hairline bg-white p-10 text-center text-muted">
              No drivers yet. Add your first one on the right.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {drivers.map((d) => (
                <li
                  key={d.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-hairline bg-white p-5"
                >
                  <div>
                    <p className="font-display font-bold">
                      {d.name}
                      {!d.active && (
                        <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-700">
                          inactive
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted">
                      {d.phone} · licence {d.licenseNumber}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {d.vehicle?.name ?? 'No vehicle'} · {d._count.bookings} trip
                      {d._count.bookings === 1 ? '' : 's'}
                      {d.userId ? ' · has login' : ' · no login'}
                    </p>
                  </div>

                  <form action={toggleDriverActive}>
                    <input type="hidden" name="driverId" value={d.id} />
                    <input type="hidden" name="locale" value={locale} />
                    <button
                      type="submit"
                      className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-porcelain"
                    >
                      {d.active ? 'Deactivate' : 'Reactivate'}
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside>
          <form
            action={addDriver}
            className="rounded-card border border-hairline bg-white p-6 lg:sticky lg:top-24"
          >
            <h2 className="font-display text-lg font-extrabold">Add a driver</h2>
            <input type="hidden" name="locale" value={locale} />

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Name</span>
                <input name="name" required className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Phone</span>
                <input name="phone" type="tel" required className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Licence number</span>
                <input name="licenseNumber" required className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Vehicle</span>
                <select name="vehicleId" defaultValue="" className={field}>
                  <option value="">Not assigned</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="rounded-lg border border-hairline p-4">
                <legend className="px-1 text-sm font-medium">Panel login (optional)</legend>
                <label className="block">
                  <span className="mb-1.5 block text-sm">Email</span>
                  <input name="email" type="email" className={field} />
                </label>
                <label className="mt-3 block">
                  <span className="mb-1.5 block text-sm">Password</span>
                  <input name="password" type="password" minLength={8} className={field} />
                </label>
                <p className="mt-2 text-xs text-muted">
                  Leave blank to add a dispatch-only record. You can grant access later.
                </p>
              </fieldset>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-accent px-5 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep"
            >
              Add driver
            </button>
          </form>
        </aside>
      </div>
    </PanelShell>
  );
}
