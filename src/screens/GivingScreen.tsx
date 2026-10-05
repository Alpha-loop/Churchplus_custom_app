import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ArrowUpRight,
  Check,
  Copy,
  CreditCard,
  Landmark,
  Megaphone,
} from "lucide-react-native";

import useGiveAction from "@/modules/giving/hooks/useGiveAction";

import useCopyToClipboard from "@/modules/giving/hooks/useCopyToClipboard";

import {
  cleanText,
  getPledgeLinks,
  toBankAccounts,
} from "@/modules/giving/utils/givingProfile";

import GiveFundSheet from "../components/giving/GiveFundSheet";

import { useChurchStore } from "@/store/churchStore";

import { useTheme } from "@/theme/ThemeContext";

function GivingCard({
  Icon,
  title,
  subtitle,
  children,
}: {
  Icon: any;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface },
      ]}
    >
      <View
        style={
          styles.cardHeaderRow
        }
      >
        <View
          style={[
            styles.cardIcon,
            { backgroundColor: colors.primaryMuted },
          ]}
        >
          <Icon
            size={20}
            color={colors.primary}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.cardTitle,
              { color: colors.textPrimary },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.cardSubtitle,
              { color: colors.textSecondary },
            ]}
          >
            {subtitle}
          </Text>
        </View>
      </View>

      {children}
    </View>
  );
}

// Everything on this screen comes from the church profile the app
// already loaded at startup (/portal/Ministry/{tenantId}/profile):
//   onlineDonations -> Give Online   (via useGiveAction)
//   banks           -> Bank Transfer
//   pledgePromiseUrl / pledgeDueUrl -> Pledges & Campaigns
// A card with nothing to show is left out entirely rather than
// rendered empty. Not shown: a personal "giving history / total"
// summary — no endpoint for it exists, so any figure would be made up.
export default function ModernGivingScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const {
    give,
    loading,
    funds,
    sheetRef,
    openFund,
  } = useGiveAction();

  const { copiedKey, copy } =
    useCopyToClipboard();

  const banks = toBankAccounts(
    (fullProfile as any)?.banks
  );

  const pledges =
    getPledgeLinks(fullProfile);

  const churchName = cleanText(
    fullProfile?.churchName
  );

  const openPledgePage = (
    title: string,
    uri: string
  ) =>
    navigation.navigate(
      "ExternalUrl",
      {
        title,

        uri,
      }
    );

  return (
    <View
      style={{
        flex: 1,

        backgroundColor:
          colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,

          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          STEWARDSHIP
        </Text>

        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          Giving & Stewardship
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          {churchName
            ? `Support the mission and outreach of ${churchName}.`
            : "Your generosity sustains our community and its outreach programs."}
        </Text>

        <GivingCard
          Icon={CreditCard}
          title="Online Giving"
          subtitle="Give securely online."
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={give}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Give online"
            style={[
              styles.primaryButton,
              { backgroundColor: colors.primary },
            ]}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />
            ) : null}

            <Text
              style={
                styles.primaryButtonText
              }
            >
              {loading
                ? "Loading..."
                : "Give Online"}
            </Text>

            {!loading ? (
              <ArrowUpRight
                size={18}
                color="#FFFFFF"
              />
            ) : null}
          </TouchableOpacity>
        </GivingCard>

        {banks.length > 0 ? (
          <GivingCard
            Icon={Landmark}
            title="Bank Transfer"
            subtitle="Direct account transfer"
          >
            {banks.map(bank => {
              const copied =
                copiedKey ===
                bank.key;

              return (
                <View
                  key={bank.key}
                  style={[
                    styles.bankBox,
                    { backgroundColor: colors.surfaceAlt },
                  ]}
                >
                  <View
                    style={
                      styles.bankInfo
                    }
                  >
                    <Text
                      style={[
                        styles.bankName,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={
                        1
                      }
                    >
                      {bank.bankName.toUpperCase()}
                      {bank.description
                        ? `  ·  ${bank.description}`
                        : ""}
                    </Text>

                    <Text
                      selectable
                      style={[
                        styles.accountNumber,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {
                        bank.accountNumber
                      }
                    </Text>

                    {bank.accountName ? (
                      <Text
                        style={[
                          styles.accountName,
                          { color: colors.textSecondary },
                        ]}
                        numberOfLines={
                          2
                        }
                      >
                        {
                          bank.accountName
                        }
                      </Text>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                      copy(
                        bank.key,
                        bank.accountNumber
                      )
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Copy ${bank.bankName} account number`}
                    style={[
                      styles.copyButton,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    {copied ? (
                      <Check
                        size={15}
                        color={colors.primary}
                      />
                    ) : (
                      <Copy
                        size={15}
                        color={colors.primary}
                      />
                    )}

                    <Text
                      style={[
                        styles.copyText,
                        { color: colors.primary },
                      ]}
                    >
                      {copied
                        ? "Copied"
                        : "Copy"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </GivingCard>
        ) : null}

        {pledges.make ||
        pledges.pay ? (
          <GivingCard
            Icon={Megaphone}
            title="Pledges & Campaigns"
            subtitle="Make a pledge, or pay one you've already made."
          >
            {pledges.make ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  openPledgePage(
                    "Make a Pledge",
                    pledges.make
                  )
                }
                accessibilityRole="button"
                accessibilityLabel="Make a pledge"
                style={[
                  styles.tintedButton,
                  { backgroundColor: colors.primaryMuted },
                ]}
              >
                <Text
                  style={[
                    styles.tintedButtonText,
                    { color: colors.primary },
                  ]}
                >
                  Make a Pledge
                </Text>

                <ArrowUpRight
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            ) : null}

            {pledges.pay ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  openPledgePage(
                    "Pay a Pledge",
                    pledges.pay
                  )
                }
                accessibilityRole="button"
                accessibilityLabel="Pay a pledge"
                style={[
                  styles.tintedButton,
                  { backgroundColor: colors.primaryMuted },
                ]}
              >
                <Text
                  style={[
                    styles.tintedButtonText,
                    { color: colors.primary },
                  ]}
                >
                  Pay a Pledge
                </Text>

                <ArrowUpRight
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            ) : null}
          </GivingCard>
        ) : null}
      </ScrollView>

      <GiveFundSheet
        ref={sheetRef}
        funds={funds}
        onSelect={openFund}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 12,

    fontWeight: "800",

    letterSpacing: 0.6,

    marginBottom: 6,
  },

  title: {
    fontSize: 26,

    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,

    marginTop: 8,

    marginBottom: 20,

    lineHeight: 20,
  },

  card: {
    borderRadius: 18,

    padding: 18,

    marginBottom: 16,
  },

  cardHeaderRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    marginBottom: 16,
  },

  cardIcon: {
    width: 44,

    height: 44,

    borderRadius: 22,

    alignItems: "center",

    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 16,

    fontWeight: "700",
  },

  cardSubtitle: {
    fontSize: 13,

    marginTop: 2,

    lineHeight: 18,
  },

  primaryButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    borderRadius: 24,

    paddingVertical: 15,
  },

  primaryButtonText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 15,
  },

  tintedButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    borderRadius: 24,

    paddingVertical: 14,

    marginTop: 10,
  },

  tintedButtonText: {
    fontWeight: "700",

    fontSize: 14,
  },

  bankBox: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    borderRadius: 14,

    padding: 14,

    marginBottom: 10,
  },

  bankInfo: {
    flex: 1,
  },

  bankName: {
    fontSize: 11,

    fontWeight: "700",

    letterSpacing: 0.5,
  },

  accountNumber: {
    fontSize: 22,

    fontWeight: "800",

    letterSpacing: 0.5,

    marginTop: 4,
  },

  accountName: {
    fontSize: 12,

    marginTop: 4,
  },

  copyButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    borderRadius: 18,

    paddingHorizontal: 14,

    paddingVertical: 9,
  },

  copyText: {
    fontSize: 13,

    fontWeight: "700",
  },
});
