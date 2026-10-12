const locations = [
  { name: 'Digital Penang Office', type: 'Wisma Yeap Chor Ee, Pengkalan Weld, George Town' },
  { name: 'PDL Phase 1', type: '135, Jln Masjid Negeri, George Town' },
  { name: 'PDL Phase 2', type: '123, Jln Masjid Negeri, George Town' },
  { name: 'Butterworth Digital Library', type: 'Lebuh Benggali 1, Kampung Benggali, Butterworth' },
  { name: 'Batu Maung Digital Library', type: 'Southbay Plaza, Cangkat Batu Maung, Bayan Lepas' },
]

export function ManagedLocations() {
  return (
    <div>
      <p className="eyebrow mb-4 text-center">Locations I support</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {locations.map((location) => (
          <div
            key={location.name}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3"
          >
            <p className="text-sm font-medium">{location.name}</p>
            <p className="mt-1 text-xs text-muted">{location.type}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm leading-7 text-muted">
        Network, ICT, installation, troubleshooting, vendor coordination, and cybersecurity best
        practices — with Zabbix monitoring for websites and office infrastructure, expanding across
        library sites.
      </p>
    </div>
  )
}
