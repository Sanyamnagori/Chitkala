export const COLORS = {
  vermillion: "#E34234",
  deepRed: "#A71714",
  white: "#FFFFFF",
  gray: "#D9D9D9",
  textDark: "#2D2D2D",
  textMuted: "#505050",
  highlightWash: "rgba(167, 23, 20, 0.2)",
} as const;

export const FLOWER_REVEAL_ORDER = [
  "blue-lotus",
  "lotus",
  "mango",
  "jasmine",
  "ashoka",
] as const;

export type FlowerId = (typeof FLOWER_REVEAL_ORDER)[number];

/** SVG illustration layers in the hand — revealed on scroll, one per flower. */
export const FLOWER_ILLUSTRATIONS: Record<
  FlowerId,
  {
    src: string;
    left: string;
    top: string;
    width: string;
    zIndex: number;
  }
> = {
  "blue-lotus": {
    src: "/images/asset-4.svg",
    left: "42.9%",
    top: "38.3%",
    width: "11.5%",
    zIndex: 22,
  },
  lotus: {
    src: "/images/asset-3.svg",
    left: "49.6%",
    top: "35.6%",
    width: "10%",
    zIndex: 23,
  },
  mango: {
    src: "/images/hand-branch.svg",
    left: "50.36%",
    top: "51.57%",
    width: "8.39%",
    zIndex: 24,
  },
  jasmine: {
    src: "/images/asset-5.svg",
    left: "40.4%",
    top: "44.7%",
    width: "12.6%",
    zIndex: 25,
  },
  ashoka: {
    src: "/images/asset-6.svg",
    left: "40.6%",
    top: "52.2%",
    width: "11.5%",
    zIndex: 26,
  },
};

export const FLOWERS: Record<
  FlowerId,
  {
    name: string;
    image: string;
    ticket: string;
    left: string;
    top: string;
    width: string;
    height: string;
    labelLeft: string;
    labelTop: string;
    ticketLeft: string;
    ticketTop: string;
  }
> = {
  "blue-lotus": {
    name: "Blue Lotus",
    image: "/images/flower-blue-lotus.png",
    ticket: "Something catches your attention.",
    left: "42.9%",
    top: "18.1%",
    width: "9.4%",
    height: "13.5%",
    labelLeft: "48%",
    labelTop: "15.4%",
    ticketLeft: "42.9%",
    ticketTop: "32.1%",
  },
  lotus: {
    name: "Lotus",
    image: "/images/flower-lotus.png",
    ticket: "What if...?",
    left: "62.2%",
    top: "38.5%",
    width: "7.6%",
    height: "16.7%",
    labelLeft: "67.4%",
    labelTop: "35.8%",
    ticketLeft: "62.2%",
    ticketTop: "56.2%",
  },
  mango: {
    name: "Mango Blossom",
    image: "/images/flower-mango.png",
    ticket: "Let's build this.",
    left: "58.3%",
    top: "67.8%",
    width: "9.4%",
    height: "10%",
    labelLeft: "61.1%",
    labelTop: "65.1%",
    ticketLeft: "58.1%",
    ticketTop: "78.7%",
  },
  jasmine: {
    name: "Jasmine",
    image: "/images/flower-jasmine.png",
    ticket: "This feels right.",
    left: "29.1%",
    top: "42.5%",
    width: "9.4%",
    height: "10%",
    labelLeft: "35%",
    labelTop: "40.1%",
    ticketLeft: "29%",
    ticketTop: "53.1%",
  },
  ashoka: {
    name: "Ashoka",
    image: "/images/flower-ashoka.png",
    ticket: "It's alive.",
    left: "31.9%",
    top: "65.1%",
    width: "9.4%",
    height: "13.6%",
    labelLeft: "38.2%",
    labelTop: "62.6%",
    ticketLeft: "31.9%",
    ticketTop: "79.3%",
  },
};

export const DECORATIVE_FACES = [
  {
    id: "top-left",
    png: "/images/face-top-left.png",
    gif: "/images/face-top-left.gif",
    left: "-4.6%",
    top: "24.0%",
    width: "16.0%",
    leftEye: { x: "43.4%", y: "36.7%" },
    rightEye: { x: "59.0%", y: "36.7%" },
    gifTransform: "scale(1.3) translateY(-6%)",
  },
  {
    id: "bottom-left",
    png: "/images/face-bottom-left-107a4b.png",
    gif: "/images/face-bottom-left.gif",
    left: "-4.6%",
    top: "65.0%",
    width: "16.0%",
    leftEye: { x: "40.1%", y: "51.2%" },
    rightEye: { x: "55.7%", y: "51.2%" },
    gifTransform: "scale(1.31) translateY(4.5%)",
  },
  {
    id: "top-right",
    png: "/images/face-top-right.png",
    gif: "/images/face-top-right.gif",
    left: "88.6%",
    top: "24.0%",
    width: "16.0%",
    leftEye: { x: "46.9%", y: "44.6%" },
    rightEye: { x: "62.5%", y: "44.6%" },
    gifTransform: "scale(1.3)",
  },
  {
    id: "bottom-right",
    png: "/images/face-bottom-right.png",
    gif: "/images/face-bottom-right.gif",
    left: "88.6%",
    top: "65.0%",
    width: "16.0%",
    leftEye: { x: "44.4%", y: "46.4%" },
    rightEye: { x: "60.0%", y: "46.4%" },
    gifTransform: "scale(1.29)",
  },
] as const;

export const WIZARD_STEPS = [
  {
    key: "name" as const,
    label: "Name",
    icon: "/images/step-swan.svg",
    illustration: "Swan",
    postcard: "/images/postcard-1.png",
    prompt: "Who's behind this postcard?",
    fieldLabel: "Name:",
    placeholder: "Type your name here",
    field: "name" as const,
  },
  {
    key: "organization" as const,
    label: "Org.",
    icon: "/images/step-tree.svg",
    illustration: "Tree",
    postcard: "/images/postcard-2.png",
    prompt: "Your HQ, hideout, or creative corner?",
    fieldLabel: "Organization Name",
    placeholder: "Type here",
    field: "organization" as const,
  },
  {
    key: "contact" as const,
    label: "Contact",
    icon: "/images/step-house.svg",
    illustration: "House",
    postcard: "/images/postcard-3.png",
    prompt: "Where should our reply land?",
    fieldLabel: "Email",
    placeholder: "Type your mail id here",
    field: "email" as const,
  },
  {
    key: "services" as const,
    label: "Services",
    icon: "/images/step-mountains.svg",
    illustration: "Mountains",
    postcard: "/images/postcard-3.png",
    prompt: "What services are you interested in?",
    field: "services" as const,
  },
  {
    key: "notes" as const,
    label: "Notes",
    icon: "/images/step-sun.svg",
    illustration: "Sun",
    postcard: "/images/postcard-3.png",
    prompt: "Anything else we should know?",
    fieldLabel: "Notes:",
    placeholder:
      "Please share anything that will help prepare for our meeting.",
    field: "notes" as const,
  },
];
