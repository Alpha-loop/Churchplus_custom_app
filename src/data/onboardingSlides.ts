export interface OnboardingSlide {
  id: string;

  // Placeholder stock photography — swap for real brand/church
  // imagery before shipping. Referenced by URL rather than
  // bundled locally since no final assets exist yet.
  image: string;

  tag?: {
    icon: "users";

    label: string;
  };

  // Slide 3's design uses a centered circular icon over the image
  // instead of a corner tag pill — this covers that case.
  centerIcon?: "heart-hand";

  title: string;

  description: string;
}

export const onboardingSlides: OnboardingSlide[] =
  [
    {
      id: "1",

      image:
        require("../../assets/kv_asset2.jpeg"),

      title: "Grow in Faith",

      description:
        "Daily devotionals and media resources to nourish your spiritual journey and connect with the community.",
    },

    {
      id: "2",

      image:
        require("../../assets/kv_assets3.jpeg"),

      tag: {
        icon: "users",

        label: "Fellowship",
      },

      title: "Build Community",

      description:
        "Connect with fellow members and join ministry groups that share your heart. Experience the warmth of a spiritual sanctuary.",
    },

    {
      id: "3",

      image:
        require("../../assets/kv_asset4.jpeg"),

      centerIcon:
        "heart-hand",

      title: "Live Generously",

      description:
        "Support your parish and make an impact with secure, easy giving options.",
    },
  ];