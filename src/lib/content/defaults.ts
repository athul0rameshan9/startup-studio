import type { Content } from "@/lib/content/schema";

/**
 * The seed content of the site — a verbatim transcription of the
 * "Startup Studio Website" reference design. Everything here is editable from
 * the admin panel; this file is what a fresh install (or a "reset to default"
 * in the admin) falls back to.
 */
export const defaultContent: Content = {
  settings: {
    palette: "lime",
    rhythm: "Balanced",
    heroLayout: "Centered",
    stackDisplay: "Marquee",
    marqueeSpeed: 1,
  },

  site: {
    brandName: "Startup Studio",
    metaTitle: "Startup Studio — Software that does the boring parts",
    metaDescription:
      "Automation, AI-powered tools and custom software for small and mid-sized businesses still running on spreadsheets and slow follow-up.",
    navLinks: [
      { label: "What we do", href: "#services" },
      { label: "How it works", href: "#process" },
      { label: "Stack", href: "#stack" },
      { label: "Work", href: "#work" },
      { label: "FAQ", href: "#faq" },
    ],
    headerGhostCta: { label: "WhatsApp", href: "#whatsapp" },
    headerPrimaryCta: { label: "Book a call", href: "#book" },
    footerLinks: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "FAQ", href: "#faq" },
      { label: "Book a call", href: "#book" },
    ],
    footerCopyright: "© 2026 Startup Studio",
  },

  hero: {
    eyebrow: "FOR SMALL & MID-SIZED BUSINESSES",
    title: "Software that does the boring parts.",
    subtitle:
      "Automation, AI-powered tools and custom software for businesses still running on spreadsheets and slow follow-up. Two of us, from the first call to the thing working on Monday morning.",
    primaryCta: { label: "Book a free consultation", href: "#book" },
    secondaryCta: { label: "Message us on WhatsApp", href: "#whatsapp" },
    note: "Free 30 minutes. No pitch deck. You leave with a plan either way.",
    stats: [
      { value: "10 min", label: "Quote turnaround, down from two days" },
      { value: "3", label: "Named clients live in production" },
      { value: "1 team", label: "Strategy, build, launch and support" },
      { value: "4 weeks", label: "Typical time to a first working version" },
    ],
  },

  trustedBy: {
    enabled: true,
    label: "TRUSTED BY",
    note: "",
    logos: [
      {
        name: "Sealitup Packing Solutions",
        width: 48,
        image: "/images/clients/sealitup.png",
      },
      {
        name: "BareBloom Innerwear",
        width: 89,
        image: "/images/clients/barebloom.png",
      },
    ],
  },

  problems: {
    eyebrow: "SOUND FAMILIAR?",
    heading: "Most owners we meet arrive with one of these three problems",
    intro:
      "If you recognise your own week in one of them, the call is worth half an hour.",
    items: [
      {
        number: "01",
        title: "Drowning in manual work",
        body: "Someone on your payroll spends their morning retyping quotes, chasing invoices and copying data between two systems that should talk to each other.",
      },
      {
        number: "02",
        title: "Leaking leads",
        body: "Enquiries land in an inbox nobody owns. Follow-up depends on who remembers. By the time you reply, they've booked someone else.",
      },
      {
        number: "03",
        title: "No software that fits",
        body: "The business runs on spreadsheets, a paper diary and an off-the-shelf tool you've bent into a shape it was never meant to take.",
      },
    ],
  },

  services: {
    eyebrow: "WHAT WE DO",
    heading: "Four things, described as what you get",
    intro:
      "We build with AI where it saves you money and with plain software where it doesn't. You get the outcome; the technology is our problem.",
    cards: [
      {
        icon: "/images/service-automation.svg",
        title: "Automation",
        body: "Stop paying people to do repetitive work. Quotes, invoices, data entry, scheduling — handled while you're doing something else.",
      },
      {
        icon: "/images/service-ai.svg",
        title: "AI-powered solutions",
        body: "Assistants that answer enquiries, read documents and draft replies in your own words — used where it saves real money, not because it sounds impressive.",
      },
      {
        icon: "/images/service-custom-software.svg",
        title: "Custom software",
        body: "Replace the spreadsheets and the paper with a tool built for how your business actually runs, not how software vendors assume it does.",
      },
    ],
    addon: {
      icon: "/images/service-marketing.svg",
      eyebrow: "ALSO AVAILABLE",
      title: "AI marketing content",
      body: "Keep a modern, visible presence without hiring a marketing team. Usually added on once the build is live.",
    },
    callout: {
      title: "Not sure which of these you need? That's what the call is for.",
      cta: { label: "Book a free consultation", href: "#book" },
    },
  },

  stack: {
    eyebrow: "WHAT WE BUILD WITH",
    heading: "Proven tools, not experiments",
    intro:
      "We pick from platforms your business can keep running after we hand it over — the same stack enterprise IT teams use, sized for a company your size.",
    rows: [
      {
        duration: 26,
        direction: "l",
        items: [
          { name: "Power Automate", mark: "PA", type: "mono", tint: "#0066FF" },
          { name: "n8n", mark: "n8n", type: "logo", tint: "#EA4B71" },
          { name: "Copilot Studio", mark: "CS", type: "mono", tint: "#7A5CFA" },
          { name: "Zapier", mark: "zapier", type: "logo", tint: "#FF4F00" },
          { name: "Make", mark: "make", type: "logo", tint: "#6D00CC" },
        ],
      },
      {
        duration: 30,
        direction: "r",
        items: [
          { name: "AWS", mark: "aws", type: "mono", tint: "#FF9900" },
          { name: "Azure", mark: "AZ", type: "mono", tint: "#35A2F0" },
          {
            name: "Google Cloud",
            mark: "googlecloud",
            type: "logo",
            tint: "#4285F4",
          },
          { name: "Vercel", mark: "vercel", type: "logo", tint: "#FFFFFF" },
          { name: "Cloud Run", mark: "CR", type: "mono", tint: "#4285F4" },
          { name: "Blob Storage", mark: "BS", type: "mono", tint: "#35A2F0" },
          { name: "AKS", mark: "K8", type: "mono", tint: "#35A2F0" },
        ],
      },
      {
        duration: 34,
        direction: "l",
        items: [
          { name: "Python", mark: "python", type: "logo", tint: "#FFD845" },
          { name: "OpenAI", mark: "AI", type: "mono", tint: "#FFFFFF" },
          {
            name: "Anthropic Claude",
            mark: "anthropic",
            type: "logo",
            tint: "#E0A88A",
          },
          {
            name: "Gemini",
            mark: "googlegemini",
            type: "logo",
            tint: "#8E9BFF",
          },
          { name: "Azure AI Foundry", mark: "AF", type: "mono", tint: "#35A2F0" },
          {
            name: "Google AI Studio",
            mark: "googlegemini",
            type: "logo",
            tint: "#8E9BFF",
          },
          { name: "AWS Bedrock", mark: "BR", type: "mono", tint: "#FF9900" },
        ],
      },
    ],
  },

  process: {
    eyebrow: "HOW IT WORKS",
    heading: "Four steps, and you know the price after the second one",
    steps: [
      {
        label: "STEP 01",
        title: "Free consultation",
        body: "Thirty minutes. You describe the week that annoys you. We tell you whether we can fix it.",
      },
      {
        label: "STEP 02",
        title: "Fixed scope and quote",
        body: "A written plan: what gets built, what it costs, when it lands. No open-ended hourly meter.",
      },
      {
        label: "STEP 03",
        title: "Build in the open",
        body: "You see working software every week, not a status report. Course corrections are free early and expensive late.",
      },
      {
        label: "STEP 04",
        title: "Launch and support",
        body: "We train your staff, watch the first month closely, and stay reachable after it.",
      },
    ],
  },

  work: {
    eyebrow: "FEATURED WORK",
    heading: "Two days of quoting turned into ten minutes",
    blocks: [
      {
        label: "THE SITUATION",
        body: "A family-run fabrication business priced every job by hand in a spreadsheet. Quotes went out two days late and half of them were never followed up.",
        emphasis: "",
      },
      {
        label: "WHAT WE BUILT",
        body: "A quoting tool with their real price list built in, connected to WhatsApp for instant delivery and automatic follow-up three days later.",
        emphasis: "",
      },
      {
        label: "THE RESULT",
        body: "Quote turnaround from two days to ten minutes.",
        emphasis: "Replace with the real number before launch.",
      },
    ],
    cta: { label: "See all three case studies →", href: "#book" },
    image: {
      src: "/images/work-featured.jpg",
      alt: "Client team at work",
    },
  },

  why: {
    eyebrow: "WHY STARTUP STUDIO",
    heading: "Three reasons owners pick us over an agency",
    reasons: [
      {
        title: "Value for money",
        body: "Meaningfully less than an agency or a full-time hire for the same outcome — because we're small and we don't rebuild from scratch what we've already solved.",
      },
      {
        title: "End-to-end ownership",
        body: "One team from strategy through build, launch and support. Nobody hands you to an account manager and nobody blames another vendor.",
      },
      {
        title: "One place, several problems",
        body: "Automation, software and the marketing around it under one roof — so the tool and the way you sell it are built by people who've spoken to each other.",
      },
    ],
  },

  team: {
    eyebrow: "THE TEAM",
    quote:
      "\"We started this because we kept meeting good businesses losing hours a day to work a computer should be doing. Not one of them needed an AI strategy. They needed one thing fixed, properly, for a price they could say yes to.\"",
    members: [
      {
        name: "Sree Vidya",
        role: "Co-founder — strategy and build",
        photo: "/images/founder-strategy.jpeg",
      },
      {
        name: "Second founder",
        role: "Co-founder — delivery and support",
        photo: "/images/founder-delivery.jpeg",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "The questions we get before every first call",
    items: [
      {
        question: "What does a project cost?",
        answer:
          "Most of what we build lands between ₹1L and ₹8L depending on scope. We don't publish a price list because a quoting tool for one business is a week and for another it's two months — but you get a written fixed quote after the second conversation, before you commit to anything.",
      },
      {
        question: "How long until it's actually working?",
        answer:
          "Four weeks is typical for a first working version you can put in front of staff. Bigger builds ship in stages, so something useful is live long before the whole thing is finished.",
      },
      {
        question: "Do we need technical staff to run it?",
        answer:
          "No. If your team can use WhatsApp and a browser, they can use what we build. We train your people during launch and stay reachable after.",
      },
      {
        question: "What happens to our data?",
        answer:
          "It stays yours. We host it in your accounts where we can, hand over every login at the end, and never train anything on your business data.",
      },
      {
        question: "We already have some software. Do we throw it out?",
        answer:
          "Usually not. Most of our work connects what you already pay for so it stops needing a human in the middle. Replacing a tool is a last resort, not a starting point.",
      },
      {
        question: "What if it doesn't work out?",
        answer:
          "The first call is free and the scope is fixed in writing. If we don't think software solves your problem, we'll tell you on that call rather than take the work.",
      },
    ],
  },

  booking: {
    eyebrow: "BOOK A CALL",
    heading: "Half an hour. No charge. No pitch.",
    body: "Tell us what's eating the time. We'll say whether software fixes it, roughly what it costs, and how long it takes. If we're the wrong people, we'll say that too.",
    whatsappCta: {
      label: "Prefer WhatsApp? Message us instead",
      href: "#whatsapp",
    },
    form: {
      nameLabel: "Your name",
      namePlaceholder: "Priya Menon",
      businessLabel: "Business",
      businessPlaceholder: "What you do, in a few words",
      contactEnabled: false,
      contactLabel: "Email or WhatsApp number",
      contactPlaceholder: "priya@example.com",
      budgetLabel: "Budget range",
      budgetOptions: [
        "Not sure yet",
        "Under ₹1L",
        "₹1L – ₹3L",
        "₹3L – ₹8L",
        "₹8L+",
      ],
      timelineLabel: "Timeline",
      timelineOptions: [
        "As soon as possible",
        "Next month or two",
        "This quarter",
        "Just exploring",
      ],
      messageLabel: "What are you trying to fix?",
      messagePlaceholder: "We quote everything by hand and it takes two days.",
      submitLabel: "Pick a time →",
      note: "We reply within one working day.",
      successMessage:
        "Thanks — that's with us. We'll come back to you within one working day.",
    },
  },
};
