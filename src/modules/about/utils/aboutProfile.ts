import { cleanText } from "@/modules/giving/utils/givingProfile";

// Reads the church profile (the raw /portal/Ministry/{tenantId}/profile
// object the app loads at startup) into things the About screen can
// show. Every function tolerates missing / malformed data and returns
// empty values rather than throwing, and treats this backend's literal
// "null" strings as empty (see cleanText).

// ---------- small shared helpers ----------

const httpUrl = (
  value: unknown
): string => {
  const text = cleanText(value);

  return /^https?:\/\/\S+$/i.test(
    text
  )
    ? text
    : "";
};

// Pure string parsing on purpose: React Native's URL class has
// historically not implemented most of its getters.
const parseUrl = (
  url: string
): {
  host: string;
  segments: string[];
} | null => {
  const match =
    /^https?:\/\/([^/?#]+)([^?#]*)/i.exec(
      url
    );

  if (!match) {
    return null;
  }

  return {
    host: match[1]
      .toLowerCase()
      .replace(/^www\./, ""),

    segments: match[2]
      .split("/")
      .filter(Boolean),
  };
};

export const displayHost = (
  url: string
): string =>
  parseUrl(url)?.host ?? url;

// ---------- contact ----------

export const toPhoneHref = (
  phone: string
): string => {
  const digits = phone.replace(
    /[^\d+]/g,
    ""
  );

  return /\d{5,}/.test(digits)
    ? `tel:${digits}`
    : "";
};

export const isEmail = (
  value: string
): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );

// A website field is expected to hold a domain or URL, so a bare
// "church.org" is fine here (unlike social handles, where "a.b" is
// just as likely to be a username).
export const toWebsiteUrl = (
  value: unknown
): string => {
  const text = cleanText(value);

  if (!text || /\s/.test(text)) {
    return "";
  }

  if (/^https?:\/\//i.test(text)) {
    return httpUrl(text);
  }

  return /^[^/\s]+\.[^/\s]+/.test(
    text
  ) && !/^[a-z][a-z0-9+.-]*:/i.test(text)
    ? `https://${text}`
    : "";
};

export const toMapsUrl = (
  address: string
): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

export interface ChurchContact {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  website: string;
  address: string;
  addressHref: string;
}

export const getChurchContact = (
  profile: any
): ChurchContact => {
  const phone = cleanText(
    profile?.phoneNumber
  );

  const email = cleanText(
    profile?.email
  );

  const address = cleanText(
    profile?.address
  );

  return {
    phone,

    phoneHref: phone
      ? toPhoneHref(phone)
      : "",

    email,

    emailHref: isEmail(email)
      ? `mailto:${email}`
      : "",

    website: toWebsiteUrl(
      profile?.websiteUrl
    ),

    address,

    addressHref: address
      ? toMapsUrl(address)
      : "",
  };
};

// ---------- social media ----------

export type SocialPlatform =
  | "x"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "whatsapp"
  | "telegram"
  | "linkedin"
  | "other";

export interface SocialLink {
  key: string;
  platform: SocialPlatform;
  label: string;
  // What to show under the label, e.g. "@Lag_archdiocese".
  handle: string;
  url: string;
}

const LABELS: Record<
  Exclude<SocialPlatform, "other">,
  string
> = {
  x: "X (Twitter)",
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  linkedin: "LinkedIn",
};

const HOSTS: [RegExp, SocialPlatform | "youtube"][] = [
  [/(^|\.)(x|twitter)\.com$/, "x"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(facebook|fb)\.com$|(^|\.)fb\.me$/, "facebook"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)wa\.me$|(^|\.)whatsapp\.com$/, "whatsapp"],
  [/(^|\.)(t\.me|telegram\.me)$/, "telegram"],
  [/(^|\.)linkedin\.com$/, "linkedin"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
];

const platformFromHost = (
  host: string
): SocialPlatform | "youtube" | null => {
  for (const [pattern, platform] of HOSTS) {
    if (pattern.test(host)) {
      return platform;
    }
  }

  return null;
};

// What the admin called the entry ("twitter handle", "Instagram",
// "youtube channel ID") — checked first, because a bare handle has no
// host to look at.
const platformFromName = (
  name: string
): SocialPlatform | "youtube" | null => {
  const n = name.toLowerCase();

  if (/youtube|youtu\.be/.test(n)) {
    return "youtube";
  }

  if (/\b(twitter|x)\b/.test(n)) {
    return "x";
  }

  if (/instagram|\big\b/.test(n)) {
    return "instagram";
  }

  if (/facebook|\bfb\b/.test(n)) {
    return "facebook";
  }

  if (/tiktok/.test(n)) {
    return "tiktok";
  }

  if (/whats\s?app/.test(n)) {
    return "whatsapp";
  }

  if (/telegram/.test(n)) {
    return "telegram";
  }

  if (/linkedin/.test(n)) {
    return "linkedin";
  }

  return null;
};

// "twitter handle" -> "Twitter"; used only for platforms not listed
// above, whose link was given as a full URL.
const prettyName = (
  name: string
): string => {
  const base =
    name
      .replace(
        /\b(handle|page|account|link|url)\b/gi,
        ""
      )
      .replace(/\s+/g, " ")
      .trim() || "Link";

  return base.replace(
    /\b\w/g,
    c => c.toUpperCase()
  );
};

// A known-domain URL typed without its scheme: "instagram.com/x".
const withScheme = (
  value: string
): string => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const host = value
    .split(/[/?#]/)[0]
    .toLowerCase();

  return platformFromHost(
    host.replace(/^www\./, "")
  )
    ? `https://${value}`
    : "";
};

const HANDLE = /^[A-Za-z0-9._-]{1,60}$/;

const urlFromHandle = (
  platform: SocialPlatform,
  value: string
): string => {
  if (platform === "whatsapp") {
    const digits = value.replace(
      /[^\d]/g,
      ""
    );

    return /^\+?[\d\s()-]{7,20}$/.test(
      value
    ) && digits.length >= 7
      ? `https://wa.me/${digits}`
      : "";
  }

  const handle = value
    .replace(/^@/, "")
    .replace(/\/+$/, "");

  if (!HANDLE.test(handle)) {
    return "";
  }

  switch (platform) {
    case "x":
      return `https://x.com/${handle}`;

    case "instagram":
      return `https://www.instagram.com/${handle}/`;

    case "facebook":
      return `https://www.facebook.com/${handle}`;

    case "tiktok":
      return `https://www.tiktok.com/@${handle}`;

    case "telegram":
      return `https://t.me/${handle}`;

    // LinkedIn needs to know person vs. company, and an unknown
    // platform has no URL scheme to build — so a bare handle for
    // those is skipped rather than guessed.
    default:
      return "";
  }
};

const displayHandle = (
  platform: SocialPlatform,
  url: string
): string => {
  const parsed = parseUrl(url);

  if (!parsed) {
    return url;
  }

  const first = (
    parsed.segments[0] ?? ""
  ).replace(/^@/, "");

  if (
    platform === "whatsapp" &&
    first
  ) {
    return `+${first.replace(/\D/g, "")}`;
  }

  if (
    (platform === "x" ||
      platform === "instagram" ||
      platform === "tiktok" ||
      platform === "telegram") &&
    first &&
    HANDLE.test(first)
  ) {
    return `@${first}`;
  }

  if (
    platform === "facebook" &&
    first &&
    first !== "profile.php"
  ) {
    return first;
  }

  return parsed.host;
};

// YouTube is deliberately excluded: the church's channel is already
// surfaced through the Media tab, and its "url" field holds a bare
// channel ID rather than a link anyway.
export const toSocialLinks = (
  raw: unknown
): SocialLink[] => {
  const seen = new Set<string>();

  const links: SocialLink[] = [];

  (Array.isArray(raw) ? raw : []).forEach(
    (item: any, index: number) => {
      const name = cleanText(
        item?.name
      );

      const value = cleanText(
        item?.url
      );

      if (!value) {
        return;
      }

      const urlLike = withScheme(
        value
      );

      const hostPlatform = urlLike
        ? platformFromHost(
            parseUrl(urlLike)
              ?.host ?? ""
          )
        : null;

      const platform =
        platformFromName(name) ??
        hostPlatform;

      if (platform === "youtube") {
        return;
      }

      // Either the entry already is a link, or it's a handle that
      // can be turned into one for a platform we know.
      let url = urlLike
        ? httpUrl(urlLike)
        : platform
        ? urlFromHandle(
            platform,
            value
          )
        : "";

      if (!url) {
        return;
      }

      // The name said one thing and the link another (e.g. an entry
      // named "instagram" pointing at youtube.com) — trust the link.
      const finalPlatform =
        hostPlatform &&
        hostPlatform !== "youtube"
          ? hostPlatform
          : platform ?? "other";

      if (
        hostPlatform === "youtube"
      ) {
        return;
      }

      if (seen.has(url)) {
        return;
      }

      seen.add(url);

      links.push({
        key: `${finalPlatform}-${index}`,

        platform: finalPlatform,

        label:
          finalPlatform === "other"
            ? prettyName(name)
            : LABELS[finalPlatform],

        handle: displayHandle(
          finalPlatform,
          url
        ),

        url,
      });
    }
  );

  return links;
};

// ---------- about sections, leadership, branches ----------

export interface AboutSection {
  key: string;
  title: string;
  details: string;
  imageUrl: string;
}

// Sorted by the admin's own `order`, not by however the API happened
// to list them. A section with neither text nor an image has nothing
// to show and is dropped.
export const toAboutSections = (
  raw: unknown
): AboutSection[] =>
  (Array.isArray(raw) ? raw : [])
    .map((item: any, index: number) => {
      const order = Number(
        item?.order
      );

      return {
        sortKey: [
          Number.isFinite(order)
            ? order
            : index,

          index,
        ],

        section: {
          key:
            cleanText(
              item?.customAboutId
            ) || `about-${index}`,

          title: cleanText(
            item?.title
          ),

          details: cleanText(
            item?.details
          ),

          imageUrl: httpUrl(
            item?.imageUrl
          ),
        },
      };
    })
    .filter(
      ({ section }) =>
        section.details ||
        section.imageUrl
    )
    .sort(
      (a, b) =>
        a.sortKey[0] -
          b.sortKey[0] ||
        a.sortKey[1] - b.sortKey[1]
    )
    .map(({ section }) => section);

export interface HeadPastor {
  name: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  photoUrl: string;
}

export const getHeadPastor = (
  profile: any
): HeadPastor => {
  const phone = cleanText(
    profile?.headPastorPhone
  );

  const email = cleanText(
    profile?.headPastorEmail
  );

  return {
    name: cleanText(
      profile?.headPastorName
    ),

    phone,

    phoneHref: phone
      ? toPhoneHref(phone)
      : "",

    email,

    emailHref: isEmail(email)
      ? `mailto:${email}`
      : "",

    photoUrl: httpUrl(
      profile?.headPastorPhoto
    ),
  };
};

export interface Pastor {
  key: string;
  name: string;
  bio: string;
  photoUrl: string;
}

export const toPastors = (
  raw: unknown
): Pastor[] =>
  (Array.isArray(raw) ? raw : [])
    .map((item: any, index: number) => ({
      key: `pastor-${index}`,

      name: cleanText(item?.name),

      bio: cleanText(item?.bio),

      photoUrl: httpUrl(
        item?.photoUrl
      ),
    }))
    .filter(pastor => pastor.name);

export interface Branch {
  key: string;
  name: string;
  address: string;
  pastorName: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

// The raw API names these branchPhone / branchEmail. (The Classic
// code remaps them to phone / email — reading those names from the
// raw profile, as this screen first did, found nothing.) Both are
// accepted so either shape works.
export const toBranches = (
  raw: unknown
): Branch[] =>
  (Array.isArray(raw) ? raw : [])
    .map((item: any, index: number) => {
      const phone =
        cleanText(
          item?.branchPhone
        ) || cleanText(item?.phone);

      const email =
        cleanText(
          item?.branchEmail
        ) || cleanText(item?.email);

      return {
        key: `branch-${index}`,

        name: cleanText(
          item?.branchName
        ),

        address: cleanText(
          item?.address
        ),

        pastorName: cleanText(
          item?.pastorName
        ),

        phone,

        phoneHref: phone
          ? toPhoneHref(phone)
          : "",

        email,

        emailHref: isEmail(email)
          ? `mailto:${email}`
          : "",
      };
    })
    .filter(
      branch =>
        branch.name || branch.address
    );
