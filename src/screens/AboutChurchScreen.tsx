import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  AtSign,
  ChevronLeft,
  ExternalLink,
  Globe,
  Link as LinkIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

import { useChurchStore } from "@/store/churchStore";

import { cleanText } from "@/modules/giving/utils/givingProfile";

import SocialIcon, {
  hasSocialIcon,
} from "../components/about/SocialIcon";

import {
  SocialPlatform,
  displayHost,
  getChurchContact,
  getHeadPastor,
  toAboutSections,
  toBranches,
  toMapsUrl,
  toPastors,
  toSocialLinks,
} from "@/modules/about/utils/aboutProfile";

const openLink = async (
  url: string
) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      "Couldn't open link",
      "Your device couldn't open this link."
    );
  }
};

// Platforms with a logo (see SocialIcon) show it. The rest —
// LinkedIn, or anything the church added that we don't recognise —
// fall back to a neutral icon, and the platform is always spelled
// out in text either way.
const socialIcon = (
  platform: SocialPlatform
) =>
  platform === "whatsapp"
    ? MessageCircle
    : platform === "telegram"
    ? Send
    : platform === "other"
    ? LinkIcon
    : AtSign;

function InfoRow({
  Icon,
  leading,
  label,
  value,
  onPress,
  external,
  divider,
}: {
  Icon?: any;
  // Replaces the default tinted icon circle (used for social logos).
  leading?: React.ReactNode;
  label: string;
  value: string;
  onPress?: () => void;
  external?: boolean;
  divider?: boolean;
}) {
  const { colors } = useTheme();

  const content = (
    <>
      {leading ?? (
        <View
          style={[
            styles.rowIcon,
            { backgroundColor: colors.primaryMuted },
          ]}
        >
          {Icon ? (
            <Icon
              size={17}
              color={colors.primary}
            />
          ) : null}
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.rowLabel,
            { color: colors.textMuted },
          ]}
        >
          {label}
        </Text>

        <Text
          style={[
            styles.rowValue,
            {
              color: onPress
                ? colors.primary
                : colors.textPrimary,
            },
          ]}
          numberOfLines={2}
        >
          {value}
        </Text>
      </View>

      {onPress ? (
        external ? (
          <ExternalLink
            size={16}
            color={colors.textMuted}
          />
        ) : null
      ) : null}
    </>
  );

  const rowStyle = [
    styles.infoRow,
    divider && {
      borderTopWidth: 1,

      borderTopColor: colors.divider,
    },
  ];

  return onPress ? (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={`${label}: ${value}`}
      style={rowStyle}
    >
      {content}
    </TouchableOpacity>
  ) : (
    <View style={rowStyle}>
      {content}
    </View>
  );
}

// Everything here is read from the church profile the app loaded at
// startup (see aboutProfile.ts). A section with nothing to show is
// left out entirely rather than rendered empty, and nothing is
// invented — no service times, no social handles that aren't there.
// (YouTube is left out of "Follow us" on purpose: it's already
// reachable through the Media tab.)
export default function AboutChurchScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const churchName = cleanText(
    fullProfile?.churchName
  );

  const aka = cleanText(
    (fullProfile as any)?.aka
  );

  const logoUrl = cleanText(
    fullProfile?.logoUrl
  );

  const contact =
    getChurchContact(fullProfile);

  const sections = toAboutSections(
    fullProfile?.customAbouts
  );

  const pastors = toPastors(
    fullProfile?.pastors
  );

  const headPastor =
    getHeadPastor(fullProfile);

  const branches = toBranches(
    fullProfile?.churchBranches
  );

  const social = toSocialLinks(
    fullProfile?.churchSocialMedia
  );

  const hasContact =
    contact.phone ||
    contact.email ||
    contact.website ||
    contact.address;

  const hasLeadership =
    pastors.length > 0 ||
    headPastor.name;

  const nothingToShow =
    !hasContact &&
    sections.length === 0 &&
    !hasLeadership &&
    branches.length === 0 &&
    social.length === 0;

  const getInitial = (
    name?: string
  ) =>
    name
      ?.trim()
      ?.[0]
      ?.toUpperCase() || "?";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.topBar,
          { backgroundColor: colors.surface },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            { color: colors.textPrimary },
          ]}
        >
          About
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,

          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={
            styles.heroWrap
          }
        >
          {logoUrl ? (
            <Image
              cachePolicy="memory-disk"
              source={{
                uri: logoUrl,
              }}
              style={
                styles.heroLogo
              }
            />
          ) : null}

          <Text
            style={[
              styles.churchName,
              { color: colors.textPrimary },
            ]}
          >
            {churchName ||
              "Our Church"}
          </Text>

          {aka ? (
            <Text
              style={[
                styles.aka,
                { color: colors.textMuted },
              ]}
            >
              {aka}
            </Text>
          ) : null}
        </View>

        {hasContact ? (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface },
            ]}
          >
            {contact.phone ? (
              <InfoRow
                Icon={Phone}
                label="Phone"
                value={
                  contact.phone
                }
                onPress={
                  contact.phoneHref
                    ? () =>
                        openLink(
                          contact.phoneHref
                        )
                    : undefined
                }
              />
            ) : null}

            {contact.email ? (
              <InfoRow
                Icon={Mail}
                label="Email"
                value={
                  contact.email
                }
                onPress={
                  contact.emailHref
                    ? () =>
                        openLink(
                          contact.emailHref
                        )
                    : undefined
                }
                divider={Boolean(
                  contact.phone
                )}
              />
            ) : null}

            {contact.website ? (
              <InfoRow
                Icon={Globe}
                label="Website"
                value={displayHost(
                  contact.website
                )}
                onPress={() =>
                  openLink(
                    contact.website
                  )
                }
                external
                divider={Boolean(
                  contact.phone ||
                    contact.email
                )}
              />
            ) : null}

            {contact.address ? (
              <InfoRow
                Icon={MapPin}
                label="Address"
                value={
                  contact.address
                }
                onPress={() =>
                  openLink(
                    contact.addressHref
                  )
                }
                external
                divider={Boolean(
                  contact.phone ||
                    contact.email ||
                    contact.website
                )}
              />
            ) : null}
          </View>
        ) : null}

        {sections.map(section => (
          <View
            key={section.key}
            style={[
              styles.card,
              { backgroundColor: colors.surface },
            ]}
          >
            {section.imageUrl ? (
              <Image
                cachePolicy="memory-disk"
                source={{
                  uri: section.imageUrl,
                }}
                contentFit="cover"
                style={
                  styles.sectionImage
                }
              />
            ) : null}

            {section.title ? (
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.textPrimary },
                ]}
              >
                {section.title}
              </Text>
            ) : null}

            {section.details ? (
              <Text
                style={[
                  styles.aboutText,
                  { color: colors.textSecondary },
                ]}
              >
                {section.details}
              </Text>
            ) : null}
          </View>
        ))}

        {hasLeadership ? (
          <>
            <Text
              style={[
                styles.sectionHeading,
                { color: colors.textPrimary },
              ]}
            >
              Pastoral Leadership
            </Text>

            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface },
              ]}
            >
              {pastors.length >
              0 ? (
                pastors.map(
                  (
                    pastor,
                    index
                  ) => (
                    <View
                      key={
                        pastor.key
                      }
                      style={[
                        styles.pastorRow,
                        index >
                          0 && {
                          borderTopWidth: 1,

                          borderTopColor:
                            colors.divider,
                        },
                      ]}
                    >
                      {pastor.photoUrl ? (
                        <Image
                          cachePolicy="memory-disk"
                          source={{
                            uri: pastor.photoUrl,
                          }}
                          style={
                            styles.pastorAvatar
                          }
                        />
                      ) : (
                        <View
                          style={[
                            styles.pastorAvatar,
                            styles.pastorAvatarPlaceholder,
                            { backgroundColor: colors.primary },
                          ]}
                        >
                          <Text
                            style={
                              styles.pastorAvatarText
                            }
                          >
                            {getInitial(
                              pastor.name
                            )}
                          </Text>
                        </View>
                      )}

                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text
                          style={[
                            styles.pastorName,
                            { color: colors.textPrimary },
                          ]}
                        >
                          {
                            pastor.name
                          }
                        </Text>

                        {pastor.bio ? (
                          <Text
                            style={[
                              styles.pastorBio,
                              { color: colors.textMuted },
                            ]}
                            numberOfLines={
                              3
                            }
                          >
                            {
                              pastor.bio
                            }
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  )
                )
              ) : (
                <>
                  <View
                    style={
                      styles.pastorRow
                    }
                  >
                    {headPastor.photoUrl ? (
                      <Image
                        cachePolicy="memory-disk"
                        source={{
                          uri: headPastor.photoUrl,
                        }}
                        style={
                          styles.pastorAvatar
                        }
                      />
                    ) : (
                      <View
                        style={[
                          styles.pastorAvatar,
                          styles.pastorAvatarPlaceholder,
                          { backgroundColor: colors.primary },
                        ]}
                      >
                        <Users
                          size={18}
                          color="#FFFFFF"
                        />
                      </View>
                    )}

                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.pastorName,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {
                          headPastor.name
                        }
                      </Text>

                      <Text
                        style={[
                          styles.pastorBio,
                          { color: colors.textMuted },
                        ]}
                      >
                        Head Pastor
                      </Text>
                    </View>
                  </View>

                  {headPastor.phone ? (
                    <InfoRow
                      Icon={Phone}
                      label="Phone"
                      value={
                        headPastor.phone
                      }
                      onPress={
                        headPastor.phoneHref
                          ? () =>
                              openLink(
                                headPastor.phoneHref
                              )
                          : undefined
                      }
                      divider
                    />
                  ) : null}

                  {headPastor.email ? (
                    <InfoRow
                      Icon={Mail}
                      label="Email"
                      value={
                        headPastor.email
                      }
                      onPress={
                        headPastor.emailHref
                          ? () =>
                              openLink(
                                headPastor.emailHref
                              )
                          : undefined
                      }
                      divider
                    />
                  ) : null}
                </>
              )}
            </View>
          </>
        ) : null}

        {branches.length > 0 ? (
          <>
            <Text
              style={[
                styles.sectionHeading,
                { color: colors.textPrimary },
              ]}
            >
              Locations
            </Text>

            {branches.map(
              branch => (
                <View
                  key={branch.key}
                  style={[
                    styles.card,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  {branch.name ? (
                    <Text
                      style={[
                        styles.branchName,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {
                        branch.name
                      }
                    </Text>
                  ) : null}

                  {branch.address ? (
                    <InfoRow
                      Icon={MapPin}
                      label="Address"
                      value={
                        branch.address
                      }
                      onPress={() =>
                        openLink(
                          toMapsUrl(
                            branch.address
                          )
                        )
                      }
                      external
                    />
                  ) : null}

                  {branch.pastorName ? (
                    <InfoRow
                      Icon={Users}
                      label="Pastor"
                      value={
                        branch.pastorName
                      }
                      divider={Boolean(
                        branch.address
                      )}
                    />
                  ) : null}

                  {branch.phone ? (
                    <InfoRow
                      Icon={Phone}
                      label="Phone"
                      value={
                        branch.phone
                      }
                      onPress={
                        branch.phoneHref
                          ? () =>
                              openLink(
                                branch.phoneHref
                              )
                          : undefined
                      }
                      divider={Boolean(
                        branch.address ||
                          branch.pastorName
                      )}
                    />
                  ) : null}

                  {branch.email ? (
                    <InfoRow
                      Icon={Mail}
                      label="Email"
                      value={
                        branch.email
                      }
                      onPress={
                        branch.emailHref
                          ? () =>
                              openLink(
                                branch.emailHref
                              )
                          : undefined
                      }
                      divider={Boolean(
                        branch.address ||
                          branch.pastorName ||
                          branch.phone
                      )}
                    />
                  ) : null}
                </View>
              )
            )}
          </>
        ) : null}

        {social.length > 0 ? (
          <>
            <Text
              style={[
                styles.sectionHeading,
                { color: colors.textPrimary },
              ]}
            >
              Follow Us
            </Text>

            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface },
              ]}
            >
              {social.map(
                (link, index) => (
                  <InfoRow
                    key={link.key}
                    Icon={socialIcon(
                      link.platform
                    )}
                    leading={
                      hasSocialIcon(
                        link.platform
                      ) ? (
                        <SocialIcon
                          platform={
                            link.platform
                          }
                        />
                      ) : undefined
                    }
                    label={
                      link.label
                    }
                    value={
                      link.handle
                    }
                    onPress={() =>
                      openLink(
                        link.url
                      )
                    }
                    external
                    divider={
                      index > 0
                    }
                  />
                )
              )}
            </View>
          </>
        ) : null}

        {nothingToShow ? (
          <Text
            style={[
              styles.emptyText,
              { color: colors.textMuted },
            ]}
          >
            This church hasn't
            added any profile
            details yet.
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 14,
  },

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",
  },

  heroWrap: {
    alignItems: "center",

    marginBottom: 24,
  },

  heroLogo: {
    width: 88,

    height: 88,

    borderRadius: 20,

    marginBottom: 14,
  },

  churchName: {
    fontSize: 22,

    fontWeight: "800",

    textAlign: "center",
  },

  aka: {
    fontSize: 13,

    marginTop: 4,

    textAlign: "center",
  },

  card: {
    borderRadius: 16,

    padding: 16,

    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    paddingVertical: 11,
  },

  rowIcon: {
    width: 36,

    height: 36,

    borderRadius: 18,

    alignItems: "center",

    justifyContent: "center",
  },

  rowLabel: {
    fontSize: 11,

    fontWeight: "600",

    marginBottom: 2,
  },

  rowValue: {
    fontSize: 14,

    fontWeight: "600",
  },

  sectionImage: {
    width: "100%",

    height: 160,

    borderRadius: 12,

    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 15,

    fontWeight: "700",

    marginBottom: 8,
  },

  aboutText: {
    fontSize: 14,

    lineHeight: 21,
  },

  sectionHeading: {
    fontSize: 17,

    fontWeight: "700",

    marginBottom: 12,

    marginTop: 4,
  },

  pastorRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    paddingVertical: 12,
  },

  pastorAvatar: {
    width: 48,

    height: 48,

    borderRadius: 24,
  },

  pastorAvatarPlaceholder: {
    alignItems: "center",

    justifyContent: "center",
  },

  pastorAvatarText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 16,
  },

  pastorName: {
    fontSize: 14,

    fontWeight: "700",
  },

  pastorBio: {
    fontSize: 12,

    marginTop: 3,
  },

  branchName: {
    fontSize: 15,

    fontWeight: "700",

    marginBottom: 6,
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    paddingVertical: 30,
  },
});
