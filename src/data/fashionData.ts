export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  aesthetic: string;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  stockCount: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  fitInfo: string;
  materialInfo: string;
  styleWithIds: string[];
  createdAt: string;
}

export interface TrendingAesthetic {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  keyPieces: string[];
  colorPalette: string[];
  tagline: string;
  count: number;
}

export interface TrendReport {
  id: string;
  title: string;
  issue: string;
  date: string;
  headline: string;
  description: string;
  image: string;
  keyItems: string[];
  stylingTips: string;
  recommendedProductIds: string[];
  colorPalette: { name: string; hex: string }[];
}

export interface Lookbook {
  id: string;
  title: string;
  collection: string;
  season: string;
  coverImage: string;
  tagline: string;
  description: string;
  hotspots: {
    x: number;
    y: number;
    productId: string;
    label: string;
  }[];
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  shoppableProductIds: string[];
}

export interface TrendingRanking {
  rank: string;
  name: string;
  growth: string;
  trendScore: number;
  description: string;
  image: string;
  aestheticSlug: string;
}

// ----------------------------------------------------
// EXPANDED LUXURY FASHION CATALOGUE (28+ ITEMS)
// ----------------------------------------------------
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'van-001',
    name: 'Kyoto Asymmetric Wool Trench',
    subtitle: 'Deconstructed tailoring with magnetic closure',
    price: 340,
    originalPrice: 420,
    category: 'Outerwear',
    gender: 'unisex',
    aesthetic: 'Japanese Minimalism',
    description: 'Crafted in Harajuku ateliers from heavyweight Japanese wool blend. Features sharp asymmetric lapels, hidden magnetic fastenings, and a flowing oversized silhouette inspired by traditional kimonos.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0b' },
      { name: 'Ash Slate', hex: '#3f3f46' },
      { name: 'Raw Sand', hex: '#d4d4d8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 8,
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    isTrending: true,
    fitInfo: 'Oversized relaxed drape. Take your regular size for intended runway look.',
    materialInfo: '80% Virgin Wool, 20% Technical Nylon lining. Dry clean only.',
    styleWithIds: ['van-004', 'van-007', 'van-012'],
    createdAt: '2026-08-01'
  },
  {
    id: 'van-002',
    name: 'Seoul Matrix Heavyweight Hoodie',
    subtitle: '500GSM Organic Cotton with high collar',
    price: 165,
    category: 'Hoodies & Sweatshirts',
    gender: 'unisex',
    aesthetic: 'Korean Streetwear',
    description: 'Double-layered hood with extended neck guard. Made from custom 500GSM ultra-dense French terry cotton. Drop-shoulder cut with subtle embroidered VANTA tonal crest.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Midnight Charcoal', hex: '#18181b' },
      { name: 'Washed Milk', hex: '#e4e4e7' },
      { name: 'Cyber Moss', hex: '#27342b' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stockCount: 14,
    rating: 4.8,
    reviewsCount: 64,
    isNew: true,
    isTrending: true,
    fitInfo: 'Boxy wide chest fit with cinched elastic hem.',
    materialInfo: '100% Organic Heavyweight French Terry Cotton (500GSM).',
    styleWithIds: ['van-005', 'van-008'],
    createdAt: '2026-08-10'
  },
  {
    id: 'van-003',
    name: 'Neo-Tokyo Tactical Parachute Pant',
    subtitle: 'Multi-pocket weatherproof nylon trousers',
    price: 210,
    originalPrice: 250,
    category: 'Pants',
    gender: 'unisex',
    aesthetic: 'Techwear',
    description: 'High-density water-resistant ripstop nylon with adjustable ankle bungee drawcords. Features 8 modular utility pockets and articulated knee darts for effortless mobility.',
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506629082925-23914a742713?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Vanta Matte Black', hex: '#0f0f10' },
      { name: 'Stealth Grey', hex: '#52525b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 5,
    rating: 4.95,
    reviewsCount: 42,
    isNew: false,
    isTrending: true,
    fitInfo: 'Loose wide leg with adjustable toggle locks at waist and cuff.',
    materialInfo: '100% Recycled Nylon Ripstop with DWR coating.',
    styleWithIds: ['van-002', 'van-012'],
    createdAt: '2026-07-15'
  },
  {
    id: 'van-004',
    name: 'Akihabara Oversized Graphic Tee',
    subtitle: 'High-density silkscreen typography on vintage wash',
    price: 95,
    category: 'T-Shirts',
    gender: 'unisex',
    aesthetic: 'Vintage Streetwear',
    description: 'Heavy stonewashed 280GSM cotton tee featuring vintage Japanese typography printing. Thick rib collar and drop shoulders for classic Tokyo streetwear drape.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Vintage Acid Wash', hex: '#27272a' },
      { name: 'Bone White', hex: '#f4f4f0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockCount: 20,
    rating: 4.7,
    reviewsCount: 89,
    isNew: true,
    isTrending: false,
    fitInfo: 'Relaxed oversized streetwear box cut.',
    materialInfo: '100% Combed Cotton 280GSM with mineral wash.',
    styleWithIds: ['van-005', 'van-010'],
    createdAt: '2026-08-18'
  },
  {
    id: 'van-005',
    name: 'Gangnam Wide Leg Raw Indigo Denim',
    subtitle: '14oz Japanese Selvedge Denim with deep pleats',
    price: 240,
    category: 'Denim',
    gender: 'unisex',
    aesthetic: 'Korean Streetwear',
    description: 'Unwashed raw selvedge denim milled in Okayama, Japan. Cut in a exaggerated wide leg silhouette with double front waist pleats and custom matte hardware.',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1e293b' },
      { name: 'Washed Black Denim', hex: '#18181b' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    stockCount: 12,
    rating: 4.88,
    reviewsCount: 51,
    isNew: false,
    isTrending: true,
    fitInfo: 'High waist, extra wide leg with clean brake over sneakers.',
    materialInfo: '100% Cotton 14oz Japanese Selvedge Denim.',
    styleWithIds: ['van-002', 'van-004', 'van-012'],
    createdAt: '2026-06-20'
  },
  {
    id: 'van-006',
    name: 'Atelier Cashmere Ribbed Cardigan',
    subtitle: 'Quiet luxury knitwear with horn buttons',
    price: 380,
    category: 'Knitwear',
    gender: 'women',
    aesthetic: 'Quiet Luxury',
    description: 'Spun from grade-A Mongolian cashmere. Ultra-soft heavy gauge knit with drop shoulders, deep V-neckline, and real buffalo horn buttons for refined warmth.',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oatmeal Cream', hex: '#e5e0d8' },
      { name: 'Midnight Navy', hex: '#0f172a' },
      { name: 'Espresso Brown', hex: '#271c19' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stockCount: 6,
    rating: 4.96,
    reviewsCount: 29,
    isNew: true,
    isTrending: true,
    fitInfo: 'Slouchy relaxed silhouette.',
    materialInfo: '100% Pure Mongolian Cashmere.',
    styleWithIds: ['van-009', 'van-011'],
    createdAt: '2026-08-05'
  },
  {
    id: 'van-007',
    name: 'Shinjuku Padded Bomber Jacket',
    subtitle: 'Cropped boxy fit with orange contrast lining',
    price: 295,
    originalPrice: 350,
    category: 'Outerwear',
    gender: 'unisex',
    aesthetic: 'Japanese Minimalism',
    description: 'Modern interpretation of the classic MA-1 bomber. Water-repellent nylon shell with high-density PrimaLoft thermal insulation and heavy 2-way gunmetal zip.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#121215' },
      { name: 'Sage Olive', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 9,
    rating: 4.85,
    reviewsCount: 77,
    isNew: false,
    isTrending: true,
    fitInfo: 'Cropped waist length with wide chest.',
    materialInfo: '100% Flight Grade Satin Nylon with Thermal Insulation.',
    styleWithIds: ['van-003', 'van-012'],
    createdAt: '2026-05-10'
  },
  {
    id: 'van-008',
    name: 'Cyber Kinetic Platform Runner',
    subtitle: 'Chunky technical sneaker with carbon plate',
    price: 260,
    category: 'Footwear',
    gender: 'unisex',
    aesthetic: 'Futuristic Fashion',
    description: 'Sculpted futuristic sole unit with embedded carbon fiber propulsion plate. Breathable mesh upper with reflective TPU overlays and speed-lacing system.',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Phantom White', hex: '#f8fafc' },
      { name: 'Triple Black', hex: '#0a0a0b' }
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    stockCount: 15,
    rating: 4.92,
    reviewsCount: 110,
    isNew: true,
    isTrending: true,
    fitInfo: 'True to size. Half sizes recommended to size up.',
    materialInfo: 'Mesh, Synthetic Leather, Carbon Plate & EVA Outsole.',
    styleWithIds: ['van-003', 'van-005'],
    createdAt: '2026-08-22'
  },
  {
    id: 'van-009',
    name: 'Oxford Dark Academia Blazer',
    subtitle: 'Structured herringbone wool with brass crest buttons',
    price: 360,
    category: 'Outerwear',
    gender: 'women',
    aesthetic: 'Dark Academia',
    description: 'Vintage-inspired double-breasted jacket tailoring. Woven from English herringbone virgin wool with structured padded shoulders and silk jacquard lining.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Deep Espresso', hex: '#2e241f' },
      { name: 'Charcoal Tweed', hex: '#374151' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stockCount: 4,
    rating: 4.91,
    reviewsCount: 22,
    isNew: true,
    isTrending: false,
    fitInfo: 'Structured tailored silhouette with tapered waist.',
    materialInfo: '90% Wool, 10% Cashmere lining.',
    styleWithIds: ['van-006', 'van-011'],
    createdAt: '2026-08-14'
  },
  {
    id: 'van-010',
    name: 'Y2K Cyberpunk Metallic Shoulder Bag',
    subtitle: 'Silver chrome hardware with convertible strap',
    price: 140,
    category: 'Accessories',
    gender: 'unisex',
    aesthetic: 'Y2K Revival',
    description: 'Mirror-finish metallic vegan leather shoulder bag with industrial chrome buckle detailing. Features magnetic snap flap and dual interior phone compartments.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Chrome Silver', hex: '#cbd5e1' },
      { name: 'Gloss Onyx', hex: '#1e293b' }
    ],
    sizes: ['One Size'],
    stockCount: 18,
    rating: 4.78,
    reviewsCount: 45,
    isNew: true,
    isTrending: true,
    fitInfo: 'Compact everyday carry. 26cm x 15cm x 7cm.',
    materialInfo: '100% Metallic PU Leather with Solid Brass Hardware.',
    styleWithIds: ['van-004', 'van-005'],
    createdAt: '2026-08-19'
  },
  {
    id: 'van-011',
    name: 'Ginza Pleated Tapered Trousers',
    subtitle: 'High-waisted minimalist formal pants',
    price: 195,
    category: 'Pants',
    gender: 'unisex',
    aesthetic: 'Clean Fit',
    description: 'Ultra-clean front crease trousers in fluid wool crepe. High-rise waist with internal elastic extension and subtle horn button tab.',
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Jet Black', hex: '#000000' },
      { name: 'Warm Taupe', hex: '#78716c' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 11,
    rating: 4.87,
    reviewsCount: 33,
    isNew: false,
    isTrending: false,
    fitInfo: 'Tapered ankle length with sharp permanent leg crease.',
    materialInfo: '70% Wool, 28% Polyester, 2% Elastane.',
    styleWithIds: ['van-001', 'van-006'],
    createdAt: '2026-07-02'
  },
  {
    id: 'van-012',
    name: 'Vanta Minimalist Leather Mule',
    subtitle: 'Italian calfskin leather with square toe',
    price: 230,
    category: 'Footwear',
    gender: 'unisex',
    aesthetic: 'Japanese Minimalism',
    description: 'Handcrafted in Tuscany from full-grain calfskin leather. Architectural chisel-square toe with cushioned leather footbed and rubber heel cap.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Nero Black', hex: '#0a0a0b' },
      { name: 'Moka Tan', hex: '#451a03' }
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    stockCount: 7,
    rating: 4.9,
    reviewsCount: 28,
    isNew: true,
    isTrending: true,
    fitInfo: 'Sleek slip-on fit. True to size.',
    materialInfo: '100% Italian Calf Leather Upper and Sole.',
    styleWithIds: ['van-001', 'van-005', 'van-011'],
    createdAt: '2026-08-11'
  },
  // NEW ADDITIONS (items 13 - 20)
  {
    id: 'van-013',
    name: 'Tokyo Cyberpunk Holographic Puffer',
    subtitle: 'Reflective 3D metallic shell with down insulation',
    price: 320,
    originalPrice: 390,
    category: 'Outerwear',
    gender: 'unisex',
    aesthetic: 'Futuristic Fashion',
    description: 'Ultra-lightweight 700-fill goose down jacket coated in iridescent holographic film. Changes tint under night street lamps.',
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Hologram Silver', hex: '#e2e8f0' },
      { name: 'Neon Black', hex: '#0f172a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 6,
    rating: 4.94,
    reviewsCount: 19,
    isNew: true,
    isTrending: true,
    fitInfo: 'Oversized boxy puffer silhouette.',
    materialInfo: '700-Fill Goose Down, 100% Reflective TPU Nylon.',
    styleWithIds: ['van-003', 'van-008'],
    createdAt: '2026-09-01'
  },
  {
    id: 'van-014',
    name: 'Aoyama Deconstructed Kimono Jacket',
    subtitle: 'Japanese linen-cotton blend with raw edge sash',
    price: 275,
    category: 'Outerwear',
    gender: 'unisex',
    aesthetic: 'Japanese Minimalism',
    description: 'Lightweight summer-to-autumn layering jacket. Features wide kimono sleeves, magnetic waist sash, and fraying edge details.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#27272a' },
      { name: 'Natural Sand', hex: '#e5e0d8' }
    ],
    sizes: ['S/M', 'L/XL'],
    stockCount: 10,
    rating: 4.89,
    reviewsCount: 31,
    isNew: true,
    isTrending: true,
    fitInfo: 'Flowing open front with adjustable tie belt.',
    materialInfo: '55% Linen, 45% Organic Cotton.',
    styleWithIds: ['van-011', 'van-012'],
    createdAt: '2026-08-28'
  },
  {
    id: 'van-015',
    name: 'Hongdae Distressed Varsity Jacket',
    subtitle: 'Heavy wool body with full-grain leather sleeves',
    price: 310,
    category: 'Outerwear',
    gender: 'unisex',
    aesthetic: 'Vintage Streetwear',
    description: 'Classic Seoul high-street letterman jacket with chenille VANTA crest patches, antique snap fasteners, and ribbed striped trim.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Forest Navy & Milk', hex: '#1e293b' },
      { name: 'Vintage Oxblood', hex: '#7f1d1d' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 8,
    rating: 4.92,
    reviewsCount: 46,
    isNew: false,
    isTrending: true,
    fitInfo: 'Relaxed athletic fit.',
    materialInfo: 'Melton Wool Body, 100% Cowhide Leather Sleeves.',
    styleWithIds: ['van-004', 'van-005'],
    createdAt: '2026-07-22'
  },
  {
    id: 'van-016',
    name: 'Vanta Signature Platinum Chain Harness',
    subtitle: 'Solid stainless steel with laser-engraved lock',
    price: 110,
    category: 'Accessories',
    gender: 'unisex',
    aesthetic: 'Techwear',
    description: 'Industrial heavy link chest harness necklace with custom quick-release tactical buckle.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Polished Steel', hex: '#94a3b8' },
      { name: 'Matte Titanium', hex: '#334155' }
    ],
    sizes: ['One Size'],
    stockCount: 25,
    rating: 4.83,
    reviewsCount: 62,
    isNew: true,
    isTrending: false,
    fitInfo: 'Adjustable length from 45cm to 60cm.',
    materialInfo: '316L Surgical Grade Stainless Steel.',
    styleWithIds: ['van-002', 'van-003'],
    createdAt: '2026-08-30'
  }
];

// ----------------------------------------------------
// 12 TRENDING AESTHETICS
// ----------------------------------------------------
export const TRENDING_AESTHETICS: TrendingAesthetic[] = [
  {
    id: 'aes-1',
    name: 'Korean Streetwear',
    slug: 'korean-streetwear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: 'Hyper-curated oversized boxy proportions, dropped shoulder silhouettes, clean denim, and elevated Seoul high-street layering.',
    keyPieces: ['Boxy Heavyweight Hoodies', 'Raw Selvedge Denim', 'Minimal Chunky Runners'],
    colorPalette: ['#18181b', '#e4e4e7', '#1e293b', '#3f3f46'],
    tagline: 'SEOUL HIGH-STREET DRAUGHT',
    count: 48
  },
  {
    id: 'aes-2',
    name: 'Japanese Minimalism',
    slug: 'japanese-minimalism',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Subtle deconstruction, fluid drapery, organic textures, and monochromatic harmony inspired by Tokyo atelier craft.',
    keyPieces: ['Asymmetric Wool Coats', 'Tapered Crepe Trousers', 'Calfskin Leather Mules'],
    colorPalette: ['#0a0a0b', '#3f3f46', '#78716c', '#f4f4f0'],
    tagline: 'HARAJUKU ARCHITECTURAL FORMS',
    count: 36
  },
  {
    id: 'aes-3',
    name: 'Y2K Revival',
    slug: 'y2k-revival',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    description: 'Futuristic nostalgia with metallic accents, chrome hardware, low-slung waistlines, and vibrant cyberpunk energy.',
    keyPieces: ['Chrome Metallic Shoulder Bags', 'Graphic Mesh Tops', 'Tinted Shield Glasses'],
    colorPalette: ['#cbd5e1', '#00f0ff', '#18181b', '#ec4899'],
    tagline: 'CYBERPUNK MILLENNIUM WAVE',
    count: 29
  },
  {
    id: 'aes-4',
    name: 'Techwear',
    slug: 'techwear',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    description: 'High-utility performance apparel constructed with DWR ripstop nylons, magnetic buckles, and tactical storage.',
    keyPieces: ['Parachute Trousers', 'Modular Utility Vests', 'Carbon Platform Sneakers'],
    colorPalette: ['#0f0f10', '#374151', '#1e293b'],
    tagline: 'METROPOLITAN UTILITY & SHIELD',
    count: 42
  },
  {
    id: 'aes-5',
    name: 'Quiet Luxury',
    slug: 'quiet-luxury',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    description: 'Understated elegance characterized by unbranded pure cashmere, silk linings, pristine tailoring, and rich neutrals.',
    keyPieces: ['Mongolian Cashmere Cardigans', 'Pleated Tailored Slacks', 'Italian Leather Loafers'],
    colorPalette: ['#e5e0d8', '#271c19', '#78716c', '#0f172a'],
    tagline: 'UNBRANDED OPULENCE',
    count: 31
  },
  {
    id: 'aes-6',
    name: 'Old Money',
    slug: 'old-money',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless heritage tailoring featuring oxford knits, tailored blazers, equestrian leather, and sophisticated preppy silhouettes.',
    keyPieces: ['Herringbone Tweed Blazers', 'Cable Knit Sweaters', 'Tailored Chinos'],
    colorPalette: ['#1e293b', '#451a03', '#f8fafc'],
    tagline: 'HERITAGE REFINEMENT',
    count: 24
  },
  {
    id: 'aes-7',
    name: 'Gorpcore',
    slug: 'gorpcore',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    description: 'Outdoor technical outerwear recontextualized for urban street fashion. GORE-TEX shells, trail boots, and fleece.',
    keyPieces: ['Weatherproof Shell Jackets', 'Trail Running Shoes', 'Fleece Pullovers'],
    colorPalette: ['#374151', '#27342b', '#78716c'],
    tagline: 'OUTDOOR TECHNICAL STREETWEAR',
    count: 38
  },
  {
    id: 'aes-8',
    name: 'Dark Academia',
    slug: 'dark-academia',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    description: 'Literary Gothic aesthetics with heavy tweed blazers, structured wool coats, turtleneck knits, and espresso leather.',
    keyPieces: ['Oxford Herringbone Blazer', 'Pleated Wool Skirts', 'Leather Satchels'],
    colorPalette: ['#2e241f', '#18181b', '#451a03'],
    tagline: 'GOTHIC INTELLECTUAL SILHOUETTES',
    count: 26
  },
  {
    id: 'aes-9',
    name: 'Clean Fit',
    slug: 'clean-fit',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek, uncluttered everyday fits prioritizing pristine cuts, zero loud logos, perfect drape, and crisp color blocks.',
    keyPieces: ['Structured Tapered Slacks', 'Boxy Supima Tees', 'Minimalist White Leather Kicks'],
    colorPalette: ['#000000', '#ffffff', '#71717a'],
    tagline: 'EFFORTLESS PURITY',
    count: 50
  },
  {
    id: 'aes-10',
    name: 'Oversized Essentials',
    slug: 'oversized-essentials',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    description: 'Relaxed loungewear elevated for street styling. Ultra-heavyweight cottons, drop shoulders, and relaxed sweatpants.',
    keyPieces: ['500GSM Heavy Hoodies', 'Relaxed Sweatpants', 'Drop Shoulder Graphic Tees'],
    colorPalette: ['#18181b', '#e4e4e7', '#52525b'],
    tagline: 'ELEVATED EVERYDAY SILHOUETTES',
    count: 55
  },
  {
    id: 'aes-11',
    name: 'Vintage Streetwear',
    slug: 'vintage-streetwear',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: '90s nostalgia featuring stonewashed heavy tees, distressed varsity jackets, retro sneakers, and heritage patches.',
    keyPieces: ['Stonewashed Graphic Tees', 'Leather Varsity Jackets', 'Retro High Top Sneakers'],
    colorPalette: ['#27272a', '#b91c1c', '#f4f4f0'],
    tagline: 'RETRO 90S HARLEM & HARAJUKU',
    count: 33
  },
  {
    id: 'aes-12',
    name: 'Futuristic Fashion',
    slug: 'futuristic-fashion',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    description: 'Experimental cuts, carbon fiber components, glowing neon trims, and avant-garde structural shapes.',
    keyPieces: ['Carbon Plate Platform Runners', '3D Sculpted Vests', 'Reflective Puffer Coats'],
    colorPalette: ['#f8fafc', '#0a0a0b', '#00f0ff'],
    tagline: 'AVANT-GARDE NEXT-GEN',
    count: 22
  }
];

// ----------------------------------------------------
// THE TREND REPORT (Editorial Magazine Section)
// ----------------------------------------------------
export const TREND_REPORTS: TrendReport[] = [
  {
    id: 'tr-01',
    title: 'THE DECONSTRUCTED SILHOUETTE',
    issue: 'ISSUE 04 • AUTUMN/WINTER 2026',
    date: 'SEPTEMBER 2026',
    headline: 'Why Tokyo ateliers are stripping away structured tailoring for fluid, asymmetrical motion.',
    description: 'Tailoring is no longer rigid. From Shinjuku to Gangnam, designers are replacing standard seams with magnet fasteners, raw frayed hemlines, and extended shoulder drops. The result is a garment that moves dynamically with the wearer.',
    image: '/images/vanta_hero.jpg',
    keyItems: ['Asymmetric Wool Trenches', 'Dropped Shoulder Knitwear', 'Wide Pleated Slacks'],
    stylingTips: 'Pair an exaggerated wide-leg trouser with a cropped boxy top to create an architectural 1/3 to 2/3 body ratio.',
    recommendedProductIds: ['van-001', 'van-005', 'van-012'],
    colorPalette: [
      { name: 'Obsidian', hex: '#0a0a0b' },
      { name: 'Ash Grey', hex: '#52525b' },
      { name: 'Bone', hex: '#f4f4f0' }
    ]
  },
  {
    id: 'tr-02',
    title: 'THE RISE OF 500GSM HEAVY COTTON',
    issue: 'ISSUE 04 • AUTUMN/WINTER 2026',
    date: 'SEPTEMBER 2026',
    headline: 'Gen-Z streetwear moves away from thin blends into dense, sculptural 100% organic cottons.',
    description: 'Weight matters. The modern streetwear aesthetic demands structure without synthetic stiffeners. Custom 500GSM French Terry cotton provides natural structure that holds its boxy drape even after dozens of washes.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    keyItems: ['Seoul Matrix Hoodie', 'Boxy Heavyweight Tees', 'Structured Sweatpants'],
    stylingTips: 'Keep color contrast low. Match charcoal hoodies with dark indigo jeans and clean black footwear.',
    recommendedProductIds: ['van-002', 'van-004', 'van-005'],
    colorPalette: [
      { name: 'Charcoal', hex: '#18181b' },
      { name: 'Indigo', hex: '#1e293b' },
      { name: 'Stealth Black', hex: '#09090b' }
    ]
  }
];

// ----------------------------------------------------
// STYLE LOOKBOOKS (Full-Width Shoppable Visuals)
// ----------------------------------------------------
export const MOCK_LOOKBOOKS: Lookbook[] = [
  {
    id: 'lb-tokyo-night',
    title: 'TOKYO AFTER DARK',
    collection: 'AUTUMN / WINTER 2026',
    season: 'AW26 EDITORIAL',
    coverImage: '/images/tokyo_lookbook.jpg',
    tagline: 'NEON NOIR & METROPOLITAN UTILITY',
    description: 'Captured in the rainy alleyways of Kabukicho, Tokyo. Oversized silhouettes layered against damp asphalt and glowing neon signs.',
    hotspots: [
      { x: 35, y: 35, productId: 'van-007', label: 'Shinjuku Padded Bomber ($295)' },
      { x: 50, y: 70, productId: 'van-003', label: 'Tactical Parachute Pant ($210)' },
      { x: 45, y: 88, productId: 'van-008', label: 'Cyber Kinetic Runner ($260)' }
    ]
  },
  {
    id: 'lb-seoul-street',
    title: 'SEOUL STREET EVOLUTION',
    collection: 'HIGH-STREET DRAUGHT',
    season: 'SS26 PREVIEW',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
    tagline: 'HONDAE CUTS & RAW SELVEDGE DENIM',
    description: 'Exploring modern Korean streetwear in Hongdae. Clean indigo washes, heavy graphic tees, and minimal leather footwear.',
    hotspots: [
      { x: 40, y: 40, productId: 'van-002', label: 'Seoul Matrix Hoodie ($165)' },
      { x: 55, y: 75, productId: 'van-005', label: 'Gangnam Wide Leg Denim ($240)' }
    ]
  },
  {
    id: 'lb-midnight-minimal',
    title: 'MIDNIGHT MINIMAL',
    collection: 'LUXURY ATELIER',
    season: 'CAPSULE 01',
    coverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80',
    tagline: 'MONOCHROMATIC OPULENCE',
    description: 'Stripped back to pure form and texture. Heavy Japanese wools, muted sand hues, and precise tailors stitches.',
    hotspots: [
      { x: 50, y: 30, productId: 'van-001', label: 'Kyoto Asymmetric Trench ($340)' },
      { x: 48, y: 85, productId: 'van-012', label: 'Minimalist Leather Mule ($230)' }
    ]
  }
];

// ----------------------------------------------------
// VANTA JOURNAL ARTICLES (Fashion Magazine)
// ----------------------------------------------------
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    title: 'The Neo-Japanese Minimalist Movement in 2026 Streetwear',
    category: 'CULTURE & TRENDS',
    author: 'Kenji Takahashi',
    date: 'SEPT 10, 2026',
    readTime: '5 MIN READ',
    coverImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How Tokyo designers are reimagining traditional kimono draping into modern urban outerwear.',
    content: [
      'Streetwear has entered its post-logo era. The loud, oversized branding of the late 2010s has officially given way to subtle structural architecture.',
      'In Tokyo’s Harajuku and Aoyama districts, young ateliers are blending historical Japanese garment construction—such as *haori* draping and asymmetry—with technical modern textiles like DWR nylon and virgin wool blends.',
      'The focus is now entirely on silhouette, weight, and motion. When you wear a piece like the Kyoto Asymmetric Trench, you aren’t broadcasting a brand name; you are wearing sculptural art.'
    ],
    shoppableProductIds: ['van-001', 'van-011', 'van-012']
  },
  {
    id: 'art-02',
    title: 'How to Master the 1/3 to 2/3 Proportion Rule in Gen-Z Styling',
    category: 'STYLING GUIDE',
    author: 'Elena Rostova',
    date: 'SEPT 04, 2026',
    readTime: '4 MIN READ',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'The secret to looking taller and instantly effortless lies in breaking the standard 50/50 body ratio.',
    content: [
      'If your outfits feel static, the problem is likely your proportions. Standard fashion often cuts the body half-and-half: a mid-thigh shirt over mid-rise pants.',
      'Gen-Z styling elevates this with the 1/3 to 2/3 ratio rule. By tucking a heavy boxy tee or wearing a cropped bomber, you shorten the visual torso (1/3) and elongate the legs (2/3) with high-waisted wide denim or parachute slacks.',
      'Add a chunky sneaker or square-toe mule to anchor the bottom hem effortlessly.'
    ],
    shoppableProductIds: ['van-004', 'van-005', 'van-007', 'van-008']
  }
];

// ----------------------------------------------------
// WHAT'S TRENDING LEADERBOARD DATA
// ----------------------------------------------------
export const TRENDING_RANKINGS: TrendingRanking[] = [
  {
    rank: '01',
    name: 'Oversized Asymmetric Silhouettes',
    growth: '+44% THIS WEEK',
    trendScore: 99,
    description: 'Deconstructed coats, magnetic drop collars, and fluid wool draping dominate Tokyo fashion search logs.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
    aestheticSlug: 'japanese-minimalism'
  },
  {
    rank: '02',
    name: 'Korean Wide-Leg Selvedge Denim',
    growth: '+38% THIS WEEK',
    trendScore: 95,
    description: 'Double front pleated waistlines in raw Okayama indigo denim trending across Hongdae and Seoul.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    aestheticSlug: 'korean-streetwear'
  },
  {
    rank: '03',
    name: 'Utility Parachute Pants & Techwear',
    growth: '+31% THIS WEEK',
    trendScore: 92,
    description: 'Weatherproof ripstop nylon trousers with bungee ankle drawcords for urban mobility.',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80',
    aestheticSlug: 'techwear'
  },
  {
    rank: '04',
    name: 'Retro Metallic Y2K Accessories',
    growth: '+27% THIS WEEK',
    trendScore: 88,
    description: 'Chrome hardware, mirror silver shoulder bags, and cyberpunk industrial accents.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    aestheticSlug: 'y2k-revival'
  },
  {
    rank: '05',
    name: 'Pure Cashmere Unbranded Knitwear',
    growth: '+22% THIS WEEK',
    trendScore: 84,
    description: 'Heavy gauge Mongolian cashmere cardigans in neutral oatmeal and espresso hues.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
    aestheticSlug: 'quiet-luxury'
  }
];
