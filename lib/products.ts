export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  claim?: string;
  rating?: number;
  reviewCount?: number;
  bestSeller?: boolean;
  freeShipping?: boolean;
  stockCount?: number;
  description: string;
  image: string;
  imageAlt: string;
  gallery?: string[];
  benefits: string[];
  ingredients?: string[];
  suitedFor?: string;
  howToUse?: string[];
  faqs?: { question: string; answer: string }[];
  highlights?: { icon: string; label: string }[];
  specs: {
    absorptionSpeed: string;
    bioavailability: string;
    dosePrecision: string;
    shelfLife: string;
    extraction: string;
  };
  fullDescription: string;
}

export const products: Product[] = [
  {
    id: "cordyceps-powder",
    name: "Cordyceps Potency Powder",
    category: "Powder",
    price: 1000,
    originalPrice: 1200,
    claim: "100% Fruiting Body",
    rating: 4.5,
    reviewCount: 1247,
    bestSeller: true,
    freeShipping: true,
    stockCount: 34,
    description: "Engineered for sustained vitality and performance optimization",
    image: "/images/products/powder.avif",
    imageAlt: "Cordyceps Potency Powder",
    benefits: [
      "20-45 mins absorption",
      "Moderate bioavailability",
      "Enhances stamina and energy",
      "Supports cognitive clarity",
      "Immune system optimization",
    ],
    // NOTE (Arata-style detail page): content below is reused from existing
    // product copy or derived strictly from facts already stated in this file.
    // No new health/efficacy claims were invented. Verify ingredient
    // declarations against the actual label before treating as compliance copy.
    gallery: [
      "/images/products/powder.avif",
      "/images/products/powder-lifestyle.avif",
      "/images/products/powder-close.avif",
      "/images/products/powder-mixed.avif",
      "/images/products/powder-package.avif",
      "/images/products/powder-spoon.avif",
    ],
    ingredients: [
      "Cordyceps militaris fruiting body extract (100%)",
      "Standardised to 30% beta-glucan",
      "Net weight: 30 g",
    ],
    suitedFor:
      "Best for a daily, sustained-energy ritual — active individuals and busy professionals who prefer a versatile powder they can mix into food and drinks.",
    howToUse: [
      "Start with 1 teaspoon, increasing gradually to 1-2 teaspoons daily.",
      "Mix into water, coffee, smoothies, or tea.",
      "Best taken with meals for optimal absorption.",
      "Use consistently every day for best results.",
    ],
    highlights: [
      { icon: "zap", label: "Cellular Energy" },
      { icon: "shield", label: "Adaptogenic Balance" },
      { icon: "leaf", label: "100% Fruiting Body" },
      { icon: "flask", label: "Lab Tested" },
    ],
    faqs: [
      {
        question: "What's the difference between Powder and Tincture?",
        answer:
          "Powder absorbs in 20-45 mins with moderate bioavailability, giving a gradual sustained release. The Tincture absorbs in 2-5 mins via sublingual delivery. Choose powder for a food-based daily ritual.",
      },
      {
        question: "How often should I take it?",
        answer:
          "The powder is designed as a daily ritual. Start with the recommended dose and adjust based on your response.",
      },
      {
        question: "How should I store it?",
        answer:
          "Keep the powder in a cool, dry place. Shelf life is 6-12 months.",
      },
    ],
    specs: {
      absorptionSpeed: "20-45 mins",
      bioavailability: "Moderate",
      dosePrecision: "Approximate",
      shelfLife: "6-12 months",
      extraction: "Often single-extract or varies",
    },
    fullDescription: `Our Cordyceps Potency Powder delivers the complete biochemical intelligence of Cordyceps Militaris in powder form. Perfect for those seeking a traditional consumption method with proven efficacy.

Key Compounds:
• Cordycepin (3'-deoxyadenosine) - Drives energy metabolism
• Beta-D-glucans - Immunomodulatory polysaccharides
• Mannitol & Cordycepic Acid - Kidney and respiratory support
• Ergosterol - Vitamin D2 precursor with antioxidant properties

Multi-System Benefits:
• Physical: Enhanced stamina at mitochondrial level
• Cognitive: Reduced cerebral oxidative stress, sustained focus
• Systemic: Bidirectional immune regulation, metabolic support
• Respiratory: Improved airway dilation and oxygen utilization`,
  },
  {
    id: "performance-tincture",
    name: "Cordyceps Endurance Tincture",
    category: "Tincture",
    price: 1000,
    originalPrice: 1200,
    claim: "Alcohol-Free Dual Extract",
    rating: 4.5,
    reviewCount: 1247,
    bestSeller: false,
    freeShipping: true,
    stockCount: 28,
    description: "Sublingual dual-extract for rapid, sustained performance enhancement",
    image: "/images/products/tincture-real.avif",
    imageAlt: "Cordyceps Endurance Tincture",
    benefits: [
      "2-5 mins rapid absorption",
      "High bioavailability - Bypasses digestion",
      "Full-spectrum dual-extract",
      "Adjustable dosing by drop",
      "3-5 years shelf life",
    ],
    // NOTE: reused/derived from existing copy only — no new claims invented.
    gallery: [
      "/images/products/tincture-real.avif",
      "/images/products/tincture-lifestyle.avif",
      "/images/products/tincture-spoon.avif",
      "/images/products/tincture-dropper.avif",
      "/images/products/tincture-bottle.avif",
      "/images/products/tincture-back.avif",
    ],
    ingredients: [
      "Cordyceps militaris dual extract (1:10 fruiting body)",
      "Alcohol-free formulation",
      "Net volume: 30 ml",
    ],
    suitedFor:
      "Best for rapid, on-the-go support — performance athletes and busy professionals who want fast sublingual absorption and drop-by-drop dosing.",
    howToUse: [
      "Shake well before use.",
      "Place 10-20 drops under the tongue.",
      "Hold for 30-60 seconds, then swallow.",
      "Best on an empty stomach or as directed; adjust to your response.",
    ],
    highlights: [
      { icon: "zap", label: "Rapid Absorption" },
      { icon: "droplet", label: "Sublingual Delivery" },
      { icon: "leaf", label: "Dual Extract" },
      { icon: "flask", label: "Lab Tested" },
    ],
    faqs: [
      {
        question: "What's the difference between Tincture and Powder?",
        answer:
          "The Tincture absorbs in 2-5 mins with high bioavailability via sublingual delivery, bypassing digestion. Powder absorbs in 20-45 mins. Choose the tincture for rapid, precise dosing.",
      },
      {
        question: "Is this suitable for athletes?",
        answer:
          "Yes. The Endurance Tincture is engineered for athletes seeking rapid absorption and drop-by-drop dosing without synthetic stimulants.",
      },
      {
        question: "How should I store it?",
        answer:
          "Store away from direct sunlight in its dark bottle. Shelf life is 3-5 years with alcohol-free preservation.",
      },
    ],
    specs: {
      absorptionSpeed: "2-5 mins",
      bioavailability: "High - Bypasses digestion",
      dosePrecision: "Adjustable by the drop",
      shelfLife: "3-5 years via alcohol preservation",
      extraction: "Full-Spectrum Dual-Extract",
    },
    fullDescription: `The Ethnobotanical Cordyceps Endurance Tincture represents 2,000 years of Himalayan wisdom combined with modern bioavailability science. Our dual-extraction process captures both water-soluble and fat-soluble active compounds.

Extraction Intelligence:
• Hot Water Extraction: Captures Beta-D-glucans and immune-modulating polysaccharides
• Alcohol Extraction: Captures Cordycepin, Adenosine, and key metabolic actives
• Result: The Full-Spectrum Tincture honoring the entire biochemical profile

Why Sublingual Delivery?
• 2-5 minute absorption vs 20-45 mins for powder
• Bypasses digestive inefficiencies
• Direct delivery to systemic circulation
• Perfect for performance athletes and busy professionals

Multi-System Vitality Wheel:
• Stamina: ATP synthesis without caffeine crash
• Performance: V02 max, lactate threshold, post-exercise recovery
• Libido: Testosterone regulation, stress-induced hormonal balance
• Clarity: Eliminates brain fog, sustains cognitive endurance
• Focus: Deep work capability without stimulant jitters`,
  },
];

export const faqItems = [
  {
    question: "What is Cordyceps Militaris?",
    answer: "Cordyceps Militaris is a caterpillar fungus that has been used for 2,000 years in Himalayan medicine. It contains powerful bioactive compounds like Cordycepin, Beta-D-glucans, and Adenosine that support energy, immunity, and performance.",
  },
  {
    question: "What's the difference between Powder and Tincture?",
    answer: "Powder absorbs in 20-45 mins with moderate bioavailability. The Tincture absorbs in 2-5 mins with high bioavailability via sublingual delivery, bypassing digestion. Choose powder for gradual sustained release, tincture for rapid performance needs.",
  },
  {
    question: "How often should I take these products?",
    answer: "Both products are designed as a daily ritual. Start with the recommended dose and adjust based on your response. The tincture allows drop-by-drop adjustment for precise dosing.",
  },
  {
    question: "Are there any side effects?",
    answer: "These are pure botanical extracts with no known contraindications. Some users report improved sleep and energy, which may require adjustment of consumption timing.",
  },
  {
    question: "Is this suitable for athletes?",
    answer: "Yes. Our Cordyceps Endurance Tincture is specifically engineered for athletes seeking enhanced V02 max, lactate threshold improvement, and post-exercise recovery without synthetic performance enhancers.",
  },
  {
    question: "How should I store these?",
    answer: "Keep powder in a cool, dry place (shelf life 6-12 months). Tincture should be stored away from direct sunlight in a dark bottle (shelf life 3-5 years with alcohol preservation).",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "The Intelligence of Nature: Why Cordyceps Militaris is the Ultimate Adaptogen",
    excerpt: "Discover why this 2,000-year-old Himalayan fungus is disrupting the modern performance supplement space.",
    date: "May 18, 2026",
    image: "/blog/cordyceps-intelligence.jpg",
  },
  {
    id: 2,
    title: "Dual-Extract Technology: Capturing the Complete Biochemical Profile",
    excerpt: "Learn how our dual-extraction process honors both water-soluble and fat-soluble bioactives for maximum effect.",
    date: "May 15, 2026",
    image: "/blog/dual-extract.jpg",
  },
  {
    id: 3,
    title: "Performance Without the Crash: Understanding ATP Synthesis and Sustained Energy",
    excerpt: "Why Cordyceps provides clean, sustainable energy that coffee and energy drinks cannot match.",
    date: "May 10, 2026",
    image: "/blog/sustained-energy.jpg",
  },
];
