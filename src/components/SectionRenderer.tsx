import { SectionConfig } from "@/types/app-config";

import DevotionSection from "./sections/DevotionSection";
import MediaSection from "./sections/MediaSection";
import DonationSection from "./sections/DonationSection";
import CommunitySection from "./sections/CommunitySection";

interface HomeData {
  devotional?: {
    title: string;

    mediaUrl: string;
  };

  video?: any;

  feed?: any;
}

interface Props {
  section: SectionConfig;

  data: HomeData;

  onDevotionPress: () => void;

  onMediaPress: () => void;

  onMediaShare: () => void;

  onDonationPress: () => void;

  onCommunityPress: () => void;
}

// One place that decides "given this section's type, which
// component renders it, and which slice of Home's data does it
// get". Add a new SectionType here + its component and it's
// available to the config immediately.
export default function SectionRenderer({
  section,
  data,
  onDevotionPress,
  onMediaPress,
  onMediaShare,
  onDonationPress,
  onCommunityPress,
}: Props) {
  if (!section.enabled) {
    return null;
  }

  switch (section.type) {
    case "devotion":
      return (
        <DevotionSection
          devotional={
            data.devotional
          }
          onPress={
            onDevotionPress
          }
        />
      );

    case "media":
      return (
        <MediaSection
          video={data.video}
          onPress={onMediaPress}
          onShare={onMediaShare}
        />
      );

    case "donation":
      return (
        <DonationSection
          title={
            section.data
              ?.title ??
            "Give"
          }
          body={
            section.data
              ?.body ?? ""
          }
          ctaLabel={
            section.data
              ?.ctaLabel ??
            "Give Online"
          }
          onPress={
            onDonationPress
          }
        />
      );

    case "community":
      return (
        <CommunitySection
          feed={data.feed}
          onPress={
            onCommunityPress
          }
        />
      );

    default:
      return null;
  }
}