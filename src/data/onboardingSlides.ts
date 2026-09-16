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
        "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=1200",

      title: "Grow in Faith",

      description:
        "Daily devotionals and media resources to nourish your spiritual journey and connect with the community.",
    },

    {
      id: "2",

      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",

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
        "https://images.unsplash.com/photo-1602522752887-4c0f5f3a4d5b?q=80&w=1200",

      centerIcon:
        "heart-hand",

      title: "Live Generously",

      description:
        "Support your parish and make an impact with secure, easy giving options.",
    },
  ];