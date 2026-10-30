// AS218883 — static operator inventory, not live routing telemetry.
//
// Sources checked read-only on 2026-10-22 UTC:
// - melspectrum-noc @ ce44791c7b908eaf0c4009fa964da043df3c66c5:
//   config/network.yaml, config/visibility.yaml and config/incidents/.
// - wg-enroll @ 25d7c6b1ebc2a4da781483c6161715ce6c3d3537:
//   addressing.yaml and pops.yaml.
//
// GOVERNANCE (do not relax these when editing):
// 1. Registry, configured announcements, and measured reachability are separate
//    facts. Provider management addresses and unannounced address-plan reserves
//    must not appear in originatedPrefixes. It covers the primary address space;
//    legacy announcements are tracked separately, not silently declared gone.
// 2. An inventory date is NOT a collector observation or a first-announced date.
//    A visibility figure needs its own dated evidence scoped to its exact prefix
//    (see `ris`), and must be re-measured, not carried over, when edited.
// 3. Do not infer registration, ownership or validation status from this inventory.
//    2a0e:4001:3000::/40 is RIPE space LEASED via ipam.dgtl.tech, and
//    2602:f92a:a463::/48 is a reassignment out of MoeDove's ARIN /32. Neither is
//    "our allocation" — never describe either that way anywhere on the site.
// 4. Static data only; no public API calls at runtime.
// 5. This website is served by GitHub Pages, not AS218883. A configured production
//    address does not establish that a visitor-facing hostname serves it.
//    directService needs DNS and service checks behind it; set it back to null
//    if they stop holding. 2026-10-05 UTC: Google Public DNS answers
//    v6.pianotuner.top AAAA 2a0e:4001:3010:400::80 (= productionHost) and
//    A 192.255.139.83; HTTPS over IPv6 returned 200 from 14/14 Globalping probes.
//    It is dual-stack: only IPv6 visitors reach it through AS218883.
//    2026-10-30 UTC: v6.pianotuner.top was deleted (DNS + vhost) when PianoTuner
//    production moved to web2, which is reached only via Cloudflare Tunnel.
//    directService is therefore null until a checked direct service exists again.
// 6. Presence and backbone links follow the NOC inventory, not transit coverage.

export const networkSnapshot = {
  asn: 218883,
  legalName: 'Melspectrum Technology Co., Ltd.',
  rir: 'RIPE',
  inventoryAsOf: '2026-10-22',
  primaryPrefix: '2a0e:4001:3000::/40',

  // Configured primary-space announcements; not a live RIS/RIB observation.
  originatedPrefixes: [
    { prefix: '2a0e:4001:3000::/40', rir: 'RIPE', role: '聚合宣告', roleEn: 'Aggregate' },
    { prefix: '2a0e:4001:3010::/44', rir: 'RIPE', role: '美国区域', roleEn: 'US region' },
    { prefix: '2a0e:4001:3010::/48', rir: 'RIPE', role: '美国生产服务', roleEn: 'US production' },
    { prefix: '2a0e:4001:3011::/48', rir: 'RIPE', role: '美国网络设施', roleEn: 'US infrastructure' },
    { prefix: '2a0e:4001:3018::/48', rir: 'RIPE', role: '美国终端接入', roleEn: 'US access' },
    { prefix: '2a0e:4001:3020::/44', rir: 'RIPE', role: '香港区域', roleEn: 'HK region' },
    { prefix: '2a0e:4001:3030::/44', rir: 'RIPE', role: '欧洲区域', roleEn: 'EU region' },
    { prefix: '2a0e:4001:3031::/48', rir: 'RIPE', role: '欧洲网络设施', roleEn: 'EU infrastructure' },
    { prefix: '2a0e:4001:3042::/48', rir: 'RIPE', role: '中国计算网络', roleEn: 'CN compute' },
    { prefix: '2a0e:4001:3048::/48', rir: 'RIPE', role: '中国终端接入', roleEn: 'CN access' },
    { prefix: '2a0e:4001:3060::/44', rir: 'RIPE', role: '台湾区域', roleEn: 'TW region' },
    { prefix: '2a0e:4001:30a0::/44', rir: 'RIPE', role: '日本区域', roleEn: 'JP region' },
    { prefix: '2a0e:4001:30a1::/48', rir: 'RIPE', role: '日本网络设施', roleEn: 'JP infrastructure' },
  ],
  legacyPrefixes: [
    { prefix: '2a13:c8c3:e803::/48', rir: 'RIPE', status: '已撤回（2026-09-28）；AMS 已退役', statusEn: 'Withdrawn (2026-09-28); AMS retired' },
    { prefix: '2602:f92a:a463::/48', rir: 'ARIN', status: '退役中', statusEn: 'Retiring' },
  ],

  // RIPEstat routing-status, query_time 2026-10-22T00:00Z. Scoped to the /40 only.
  ris: {
    prefix: '2a0e:4001:3000::/40',
    source: 'RIPE RIS',
    observedAt: '2026-10-22',
    visible: 153,
    total: 153,
    firstSeen: '2026-09-28',
  },

  // addressing.yaml + NOC reach_targets; AAAA and PTR agree (FCrDNS, 2026-10-02).
  productionHost: {
    host: 'web1.lax.us.net.melspectrum.com',
    address: '2a0e:4001:3010:400::80',
  },
  directService: null,

  routingPresence: [
    { code: 'LAX', region: '洛杉矶', regionEn: 'Los Angeles', coords: [34.05, -118.24] },
    { code: 'SLC', region: '盐湖城', regionEn: 'Salt Lake City', coords: [40.76, -111.89], backboneTo: 'LAX' },
    { code: 'HKG', region: '香港', regionEn: 'Hong Kong', coords: [22.32, 114.17], backboneTo: 'LAX' },
    { code: 'LON', region: '伦敦', regionEn: 'London', coords: [51.51, -0.13], backboneTo: 'LAX' },
    { code: 'STL', region: '圣路易斯', regionEn: 'St. Louis', coords: [38.63, -90.20], backboneTo: 'LAX' },
    { code: 'TYO', region: '东京', regionEn: 'Tokyo', coords: [35.68, 139.69], backboneTo: 'LAX' },
    { code: 'TPE', region: '台北', regionEn: 'Taipei', coords: [25.03, 121.57], backboneTo: 'LAX' },
    { code: 'FRA', region: '法兰克福', regionEn: 'Frankfurt', coords: [50.11, 8.68], backboneTo: 'LAX' },
  ],
};

export const networkLinks = [
  { label: 'Status', href: 'https://status.melspectrum.com' },
  { label: 'Looking Glass', href: 'https://lg.melspectrum.com' },
  { label: 'RIPEstat', href: 'https://stat.ripe.net/AS218883' },
  { label: 'PeeringDB', href: 'https://www.peeringdb.com/asn/218883' },
  { label: 'bgp.tools', href: 'https://bgp.tools/as/218883' },
  { label: 'Hurricane Electric', href: 'https://bgp.he.net/AS218883' },
  { label: 'ipinfo', href: 'https://ipinfo.io/AS218883' },
];
