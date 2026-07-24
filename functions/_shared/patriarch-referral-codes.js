export const DEFAULT_PATRIARCH_REFERRAL_AUTHORITIES = [
  {
    name: "Ryan Ridgley",
    title: "Elder/Co-Founder",
    source: "YAH's Misfits",
    code: "RYAN-RIDGLEY",
  },
  {
    name: "Ed Janicki",
    title: "Elder/Co-Founder",
    source: "YAH's Misfits",
    code: "ED-JANICKI",
  },
  {
    name: "Jared Cheshire",
    title: "Elder",
    source: "YAH's Misfits",
    code: "JARED-CHESHIRE",
  },
  {
    name: "Samuel Barnes",
    title: "Elder",
    source: "YAH's Misfits",
    code: "SAMUEL-BARNES",
  },
  {
    name: "David Stephan",
    title: "Elder",
    source: "YAH's Misfits",
    code: "DAVID-STEPHAN",
  },
  {
    name: "Paul Preston",
    title: "Deacon",
    source: "YAH's Misfits",
    code: "PAUL-PRESTON",
  },
  {
    name: "Pete Rambo",
    title: "Outside Authority",
    source: "External Referral",
    code: "PETE-RAMBO",
  },
  {
    name: "Abrie Killian",
    title: "Outside Authority",
    source: "External Referral",
    code: "ABRIE-KILLIAN",
  },
];

export function normalizePatriarchReferralCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function configuredCustomAuthorities(env) {
  return String(env.PATRIARCH_REFERRAL_CODES || "")
    .split(/[\n,;]/g)
    .map(normalizePatriarchReferralCode)
    .filter(Boolean)
    .map((code) => ({
      name: "Configured Referral Code",
      title: "Additional Authorized Code",
      source: "Site Configuration",
      code,
    }));
}

export function configuredPatriarchReferralAuthorities(env) {
  const authorities = [
    ...DEFAULT_PATRIARCH_REFERRAL_AUTHORITIES.map((authority) => ({ ...authority })),
    ...configuredCustomAuthorities(env),
  ];
  const seen = new Set();
  return authorities.filter((authority) => {
    const code = normalizePatriarchReferralCode(authority.code);
    if (!code || seen.has(code)) return false;
    seen.add(code);
    authority.code = code;
    return true;
  });
}

export function patriarchReferralAuthorityForCode(code, env) {
  const normalizedCode = normalizePatriarchReferralCode(code);
  return configuredPatriarchReferralAuthorities(env)
    .find((authority) => authority.code === normalizedCode) || null;
}

export function patriarchReferralCodeAllowed(code, env) {
  return Boolean(patriarchReferralAuthorityForCode(code, env));
}
