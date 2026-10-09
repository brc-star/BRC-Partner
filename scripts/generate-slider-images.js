const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '..', 'public', 'images', 'slider');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper to generate SVG mockups
function getSliderSvg(slide) {
  const {
    id,
    title,
    subtitle,
    category,
    badge,
    bgGradient,
    accentColor,
    secondaryColor,
    deviceTitle,
    metrics,
    features,
  } = slide;

  return `
<svg width="1774" height="887" viewBox="0 0 1774 887" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient[0]}"/>
      <stop offset="50%" stop-color="${bgGradient[1]}"/>
      <stop offset="100%" stop-color="${bgGradient[2]}"/>
    </linearGradient>
    
    <linearGradient id="accentGrad-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="${secondaryColor}"/>
    </linearGradient>

    <radialGradient id="glow-${id}" cx="75%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${bgGradient[0]}" stop-opacity="0"/>
    </radialGradient>

    <filter id="shadow-${id}" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.8"/>
    </filter>

    <filter id="cardShadow-${id}" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1774" height="887" fill="url(#bg-${id})"/>
  <rect width="1774" height="887" fill="url(#glow-${id})"/>

  <!-- Subtle Grid Lines -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="147" x2="1774" y2="147" stroke-dasharray="6,6"/>
    <line x1="0" y1="295" x2="1774" y2="295" stroke-dasharray="6,6"/>
    <line x1="0" y1="443" x2="1774" y2="443" stroke-dasharray="6,6"/>
    <line x1="0" y1="591" x2="1774" y2="591" stroke-dasharray="6,6"/>
    <line x1="0" y1="739" x2="1774" y2="739" stroke-dasharray="6,6"/>
    <line x1="300" y1="0" x2="300" y2="887" stroke-dasharray="6,6"/>
    <line x1="700" y1="0" x2="700" y2="887" stroke-dasharray="6,6"/>
    <line x1="1100" y1="0" x2="1100" y2="887" stroke-dasharray="6,6"/>
    <line x1="1500" y1="0" x2="1500" y2="887" stroke-dasharray="6,6"/>
  </g>

  <!-- Left Content Area (Branding, Titles, Metrics) -->
  <g transform="translate(100, 100)">
    <!-- Top Pill Badge -->
    <rect x="0" y="0" width="280" height="38" rx="19" fill="#ffffff" fill-opacity="0.08" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1.5"/>
    <circle cx="20" cy="19" r="5" fill="${accentColor}"/>
    <text x="36" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="${accentColor}" letter-spacing="1.5">${escapeXml(badge.toUpperCase())}</text>

    <!-- Category -->
    <text x="0" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#94a3b8" letter-spacing="2">${escapeXml(category.toUpperCase())}</text>

    <!-- Main Title -->
    <text x="0" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" fill="#ffffff" letter-spacing="-0.5">${escapeXml(title)}</text>

    <!-- Subtitle -->
    <text x="0" y="190" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="400" fill="#cbd5e1">${escapeXml(subtitle)}</text>

    <!-- Feature Tags -->
    <g transform="translate(0, 230)">
      ${features.map((feat, i) => `
        <g transform="translate(0, ${i * 40})">
          <circle cx="10" cy="10" r="10" fill="${accentColor}" fill-opacity="0.15"/>
          <path d="M7 10 L9 12 L13 8" stroke="${accentColor}" stroke-width="2" fill="none" stroke-linecap="round"/>
          <text x="32" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#e2e8f0">${escapeXml(feat)}</text>
        </g>
      `).join('')}
    </g>

    <!-- Key Metrics Cards -->
    <g transform="translate(0, 420)">
      ${metrics.map((m, i) => `
        <g transform="translate(${i * 190}, 0)">
          <rect width="170" height="90" rx="14" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" filter="url(#cardShadow-${id})"/>
          <text x="20" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="${accentColor}">${escapeXml(m.val)}</text>
          <text x="20" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#94a3b8">${escapeXml(m.label)}</text>
        </g>
      `).join('')}
    </g>

    <!-- BRC STAR Engineering Watermark -->
    <g transform="translate(0, 560)">
      <text x="0" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#64748b" letter-spacing="1">ENGINEERED BY BRC STAR PARTNER • 100% PRODUCTION READY</text>
    </g>
  </g>

  <!-- Right Visual Mockup (Device Stage) -->
  <g transform="translate(760, 80)">
    <!-- Back Glow behind devices -->
    <ellipse cx="460" cy="340" rx="420" ry="260" fill="${accentColor}" fill-opacity="0.15" filter="blur(60px)"/>

    <!-- 1. Main Desktop / Laptop Frame (Centered-Right) -->
    <g transform="translate(60, 40)" filter="url(#shadow-${id})">
      <!-- Laptop Screen Outer Chassis -->
      <rect x="0" y="0" width="760" height="480" rx="18" fill="#1e293b" stroke="#334155" stroke-width="3"/>
      <!-- Inner Bezel -->
      <rect x="10" y="10" width="740" height="460" rx="10" fill="#090d16"/>
      <!-- Camera Dot -->
      <circle cx="380" cy="18" r="3.5" fill="#334155"/>
      <circle cx="380" cy="18" r="1.5" fill="#0ea5e9"/>

      <!-- Laptop Browser Header Bar -->
      <g transform="translate(10, 26)">
        <rect width="740" height="36" fill="#131b2e"/>
        <!-- Window Controls -->
        <circle cx="24" cy="18" r="5" fill="#ef4444"/>
        <circle cx="42" cy="18" r="5" fill="#eab308"/>
        <circle cx="60" cy="18" r="5" fill="#22c55e"/>
        <!-- URL Address Bar -->
        <rect x="140" y="7" width="460" height="22" rx="6" fill="#0a0f1d" stroke="#1e293b" stroke-width="1"/>
        <circle cx="156" cy="18" r="3.5" fill="#10b981"/>
        <text x="170" y="22" font-family="monospace" font-size="11" fill="#94a3b8">https://brcpartner.brcstar.in/showcase/${id}</text>
      </g>

      <!-- Website Screen Mockup Content -->
      <g transform="translate(10, 62)">
        <!-- Mockup Nav -->
        <rect width="740" height="48" fill="#0f172a" fill-opacity="0.95"/>
        <rect x="25" y="16" width="90" height="16" rx="4" fill="${accentColor}"/>
        <rect x="480" y="18" width="50" height="12" rx="3" fill="#334155"/>
        <rect x="545" y="18" width="50" height="12" rx="3" fill="#334155"/>
        <rect x="610" y="12" width="105" height="24" rx="12" fill="url(#accentGrad-${id})"/>

        <!-- Mockup Hero Inside Laptop -->
        <g transform="translate(30, 70)">
          <!-- Left side hero copy inside mockup -->
          <rect x="0" y="0" width="120" height="12" rx="3" fill="${accentColor}" fill-opacity="0.8"/>
          <rect x="0" y="24" width="340" height="24" rx="5" fill="#f8fafc"/>
          <rect x="0" y="56" width="300" height="20" rx="5" fill="#f8fafc"/>
          <rect x="0" y="88" width="360" height="12" rx="3" fill="#64748b"/>
          <rect x="0" y="108" width="320" height="12" rx="3" fill="#64748b"/>

          <rect x="0" y="136" width="140" height="34" rx="17" fill="url(#accentGrad-${id})"/>
          <rect x="155" y="136" width="120" height="34" rx="17" fill="#1e293b" stroke="#334155" stroke-width="1"/>

          <!-- Mini Showcase Grid Inside Screen -->
          <g transform="translate(0, 196)">
            <rect x="0" y="0" width="105" height="110" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <rect x="10" y="10" width="85" height="55" rx="5" fill="${accentColor}" fill-opacity="0.2"/>
            <rect x="10" y="74" width="60" height="10" rx="2" fill="#e2e8f0"/>
            <rect x="10" y="90" width="40" height="8" rx="2" fill="${accentColor}"/>

            <rect x="120" y="0" width="105" height="110" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <rect x="130" y="10" width="85" height="55" rx="5" fill="${secondaryColor}" fill-opacity="0.2"/>
            <rect x="130" y="74" width="60" height="10" rx="2" fill="#e2e8f0"/>
            <rect x="130" y="90" width="40" height="8" rx="2" fill="${secondaryColor}"/>

            <rect x="240" y="0" width="105" height="110" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <rect x="250" y="10" width="85" height="55" rx="5" fill="${accentColor}" fill-opacity="0.2"/>
            <rect x="250" y="74" width="60" height="10" rx="2" fill="#e2e8f0"/>
            <rect x="250" y="90" width="40" height="8" rx="2" fill="${accentColor}"/>
          </g>
        </g>

        <!-- Right Side Interactive Graphic inside Laptop Mockup -->
        <g transform="translate(420, 70)">
          <rect width="280" height="300" rx="14" fill="#0b1120" stroke="#1e293b" stroke-width="1.5"/>
          <circle cx="140" cy="130" r="80" fill="${accentColor}" fill-opacity="0.1" stroke="${accentColor}" stroke-width="2"/>
          <circle cx="140" cy="130" r="50" fill="${secondaryColor}" fill-opacity="0.2"/>
          <!-- Dynamic Device/Topic Graphic Icon -->
          <text x="140" y="138" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">${escapeXml(deviceTitle)}</text>
          
          <!-- Mockup Analytics Banner -->
          <rect x="25" y="235" width="230" height="42" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <circle cx="45" cy="256" r="8" fill="#10b981"/>
          <text x="65" y="260" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">100% Responsive Grid Active</text>
        </g>
      </g>

      <!-- Laptop Base / Hinge -->
      <path d="M-50 480 L810 480 L840 500 L-80 500 Z" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      <rect x="330" y="482" width="100" height="6" rx="3" fill="#475569"/>
    </g>

    <!-- 2. Smartphone Mobile Frame (Overlapping Foreground-Left) -->
    <g transform="translate(20, 240)" filter="url(#shadow-${id})">
      <!-- Phone Outer Chassis -->
      <rect width="200" height="410" rx="34" fill="#020617" stroke="#334155" stroke-width="4"/>
      <!-- Inner Bezel -->
      <rect x="7" y="7" width="186" height="396" rx="28" fill="#090d16"/>
      <!-- Dynamic Island -->
      <rect x="65" y="16" width="70" height="18" rx="9" fill="#000000"/>
      <circle cx="118" cy="25" r="3" fill="#1e293b"/>

      <!-- Phone Screen Contents -->
      <g transform="translate(14, 45)">
        <!-- Mini Header -->
        <rect width="172" height="24" rx="4" fill="#131b2e"/>
        <rect x="10" y="7" width="40" height="10" rx="3" fill="${accentColor}"/>
        <rect x="135" y="7" width="24" height="10" rx="3" fill="url(#accentGrad-${id})"/>

        <!-- Mini Hero Card -->
        <g transform="translate(0, 34)">
          <rect width="172" height="110" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
          <rect x="12" y="14" width="80" height="12" rx="3" fill="${accentColor}"/>
          <rect x="12" y="34" width="145" height="16" rx="3" fill="#ffffff"/>
          <rect x="12" y="56" width="125" height="10" rx="2" fill="#64748b"/>
          <rect x="12" y="76" width="80" height="20" rx="10" fill="url(#accentGrad-${id})"/>
        </g>

        <!-- Mini Cards Grid -->
        <g transform="translate(0, 156)">
          <rect x="0" y="0" width="82" height="80" rx="8" fill="#1e293b"/>
          <rect x="8" y="8" width="66" height="40" rx="4" fill="${accentColor}" fill-opacity="0.3"/>
          <rect x="8" y="54" width="45" height="8" rx="2" fill="#f8fafc"/>
          <rect x="8" y="66" width="30" height="6" rx="2" fill="${accentColor}"/>

          <rect x="90" y="0" width="82" height="80" rx="8" fill="#1e293b"/>
          <rect x="98" y="8" width="66" height="40" rx="4" fill="${secondaryColor}" fill-opacity="0.3"/>
          <rect x="98" y="54" width="45" height="8" rx="2" fill="#f8fafc"/>
          <rect x="98" y="66" width="30" height="6" rx="2" fill="${secondaryColor}"/>
        </g>

        <!-- Bottom Tab Bar -->
        <rect y="315" width="172" height="34" rx="10" fill="#0b1120" stroke="#1e293b" stroke-width="1"/>
        <circle cx="28" cy="332" r="5" fill="${accentColor}"/>
        <circle cx="86" cy="332" r="5" fill="#475569"/>
        <circle cx="144" cy="332" r="5" fill="#475569"/>
      </g>
    </g>

    <!-- 3. Tablet Frame (Overlapping Foreground-Right) -->
    <g transform="translate(680, 260)" filter="url(#shadow-${id})">
      <rect width="250" height="360" rx="22" fill="#0f172a" stroke="#334155" stroke-width="3"/>
      <rect x="8" y="8" width="234" height="344" rx="16" fill="#0b1120"/>
      <!-- Tablet Camera -->
      <circle cx="125" cy="18" r="3" fill="#475569"/>

      <!-- Tablet Screen Content -->
      <g transform="translate(18, 32)">
        <rect width="214" height="28" rx="6" fill="#1e293b"/>
        <rect x="12" y="8" width="50" height="12" rx="3" fill="${accentColor}"/>
        <rect x="150" y="8" width="52" height="12" rx="6" fill="url(#accentGrad-${id})"/>

        <g transform="translate(0, 40)">
          <rect width="214" height="130" rx="10" fill="#131b2e" stroke="#1e293b" stroke-width="1"/>
          <circle cx="107" cy="50" r="30" fill="${accentColor}" fill-opacity="0.2"/>
          <rect x="25" y="90" width="164" height="14" rx="4" fill="#ffffff"/>
          <rect x="40" y="110" width="134" height="10" rx="3" fill="#64748b"/>
        </g>

        <g transform="translate(0, 182)">
          <rect x="0" y="0" width="102" height="100" rx="8" fill="#1e293b"/>
          <rect x="10" y="10" width="82" height="50" rx="5" fill="${accentColor}" fill-opacity="0.2"/>
          <rect x="10" y="68" width="60" height="10" rx="2" fill="#ffffff"/>

          <rect x="112" y="0" width="102" height="100" rx="8" fill="#1e293b"/>
          <rect x="122" y="10" width="82" height="50" rx="5" fill="${secondaryColor}" fill-opacity="0.2"/>
          <rect x="122" y="68" width="60" height="10" rx="2" fill="#ffffff"/>
        </g>
      </g>
    </g>

    <!-- Floating Verified Tech Badge -->
    <g transform="translate(560, 520)" filter="url(#shadow-${id})">
      <rect width="280" height="68" rx="18" fill="#090d16" stroke="${accentColor}" stroke-width="1.5"/>
      <circle cx="36" cy="34" r="18" fill="${accentColor}" fill-opacity="0.2"/>
      <path d="M28 34 L33 39 L44 28" stroke="${accentColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="66" y="28" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700" fill="#ffffff">Responsive Verification</text>
      <text x="66" y="48" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="500" fill="#94a3b8">Tested on Mobile, Tablet &amp; Desktop</text>
    </g>
  </g>
</svg>
`;
}

// Data for the 10 uploaded images
const SLIDES = [
  {
    id: 'brcstar-slider-01',
    originalName: 'Brctex Responsive Textile Website Showcase.png',
    badge: 'Enterprise Textile Portal',
    category: 'E-Commerce & Supply Chain',
    title: 'BRCTEX Textile Showcase',
    subtitle: 'Full-Scale B2B & D2C Textile Manufacturing Platform with live yarn catalog & instant quotes.',
    bgGradient: ['#050c1e', '#0b162f', '#020611'],
    accentColor: '#38bdf8',
    secondaryColor: '#f59e0b',
    deviceTitle: 'BRCTEX',
    features: [
      'Interactive Fabric Texture & Weave Viewer',
      'Real-time Bulk Pricing & MOQ Estimator',
      'Integrated Global Logistics Telemetry',
    ],
    metrics: [
      { val: '99.8%', label: 'Uptime Reliability' },
      { val: '<480ms', label: 'Average LCP Time' },
      { val: '100%', label: 'Viewport Fluidity' },
    ],
  },
  {
    id: 'brcstar-slider-02',
    originalName: 'DAXY Diamond Luxury Showcase.png',
    badge: 'Haute Joaillerie & Solitaire',
    category: 'Ultra-Luxury E-Commerce',
    title: 'DAXY Diamond Showcase',
    subtitle: 'Bespoke diamond atelier with 4K gemstone inspection, 360° ring customizer & GIA verification.',
    bgGradient: ['#0a0814', '#15102a', '#030208'],
    accentColor: '#e0a96d',
    secondaryColor: '#38bdf8',
    deviceTitle: 'DAXY',
    features: [
      'Interactive 4Cs Diamond Grading Configurator',
      'Instant GIA Certificate Verification Engine',
      'Ultra-Secure High-Ticket Checkout Flow',
    ],
    metrics: [
      { val: '4K', label: 'Ultra-HD Gem Zoom' },
      { val: '100%', label: 'GIA Verified Data' },
      { val: '0.4s', label: '360° 3D Load Speed' },
    ],
  },
  {
    id: 'brcstar-slider-03',
    originalName: 'DXMO Fashion Responsive Showcase.png',
    badge: 'Contemporary Apparel Commerce',
    category: 'Streetwear & Luxury Fashion',
    title: 'DXMO Fashion Showcase',
    subtitle: 'High-frequency streetwear storefront with dynamic lookbook, instant cart & omnichannel drops.',
    bgGradient: ['#0f050b', '#240a18', '#050205'],
    accentColor: '#f43f5e',
    secondaryColor: '#a855f7',
    deviceTitle: 'DXMO',
    features: [
      'Sub-second Flash Drop Queue Architecture',
      'Omnichannel Real-time Stock Syncing',
      'Mobile-First Editorial Swipe Gallery',
    ],
    metrics: [
      { val: '10k+', label: 'Concurrent Users' },
      { val: '99.9%', label: 'Checkout Success' },
      { val: '1.2s', label: 'Fast Drop Checkout' },
    ],
  },
  {
    id: 'brcstar-slider-04',
    originalName: 'DXMO Industrial Machinery Website Showcase.png',
    badge: 'Heavy Engineering & CNC Specs',
    category: 'Industrial B2B Portal',
    title: 'DXMO Machinery Showcase',
    subtitle: 'Precision engineering portal with interactive 5-axis CNC CAD specs & automated RFQ quotes.',
    bgGradient: ['#0a0e17', '#111b2e', '#04070d'],
    accentColor: '#f59e0b',
    secondaryColor: '#0ea5e9',
    deviceTitle: 'MACHINERY',
    features: [
      'Interactive CAD Explode-View Viewer',
      'Instant RFQ Specification Generator',
      'Multi-Language Heavy Equipment Manuals',
    ],
    metrics: [
      { val: '500+', label: 'Machine Blueprints' },
      { val: '<1s', label: 'RFQ Form Response' },
      { val: '100%', label: 'Industrial Compliance' },
    ],
  },
  {
    id: 'brcstar-slider-05',
    originalName: 'DXMO Jewellery Website Luxury Mockup.png',
    badge: 'Fine Gold & Emerald Craft',
    category: 'Heritage Luxury Jewelry',
    title: 'DXMO Jewellery Mockup',
    subtitle: 'Royal bridal jewelry showroom featuring high-definition loupe zoom and certified hallmark badges.',
    bgGradient: ['#021814', '#062d26', '#010a08'],
    accentColor: '#10b981',
    secondaryColor: '#eab308',
    deviceTitle: 'JEWELS',
    features: [
      'Ultra-HD Emerald & Gold Macro Loupe',
      'Custom Ring Sizer & Virtual Try-On Flow',
      'Certified Hallmark Purity Verification',
    ],
    metrics: [
      { val: '24K', label: 'Hallmark Assured' },
      { val: '99.9%', label: 'Visual Clarity' },
      { val: '3D', label: 'Interactive Try-On' },
    ],
  },
  {
    id: 'brcstar-slider-06',
    originalName: 'DXMO Real Estate Device Showcase.png',
    badge: 'Prime Architecture & Villas',
    category: 'Luxury Real Estate Portal',
    title: 'DXMO Real Estate Showcase',
    subtitle: 'Architectural property portal with 3D virtual villa tours, interactive map pinning & mortgage tools.',
    bgGradient: ['#031024', '#08214d', '#010611'],
    accentColor: '#0ea5e9',
    secondaryColor: '#f43f5e',
    deviceTitle: 'ESTATE',
    features: [
      'Matterport 3D Virtual Villa Tour Embed',
      'Dynamic Map Radius & School Rating Explorer',
      'Instant Agent Booking & WhatsApp Inquiry',
    ],
    metrics: [
      { val: '4K', label: 'Drone Video Player' },
      { val: '3D', label: 'Virtual Walkthrough' },
      { val: '<500ms', label: 'Map Tile Filtering' },
    ],
  },
  {
    id: 'brcstar-slider-07',
    originalName: 'Embroidery Website Device Showcase.png',
    badge: 'Artisanal Threadcraft & Monograms',
    category: 'Custom Craftsmanship Studio',
    title: 'Embroidery Studio Showcase',
    subtitle: 'Computerized embroidery platform with automated vector-to-stitch preview and thread palette tools.',
    bgGradient: ['#120822', '#261147', '#06020c'],
    accentColor: '#a855f7',
    secondaryColor: '#ec4899',
    deviceTitle: 'STITCH',
    features: [
      'Live Vector-to-Stitch Density Simulator',
      '120-Shade Pantone Thread Palette Picker',
      'Stylus-Friendly iPad Monogram Studio',
    ],
    metrics: [
      { val: '120+', label: 'Silk Thread Colors' },
      { val: '100%', label: 'Vector Accuracy' },
      { val: 'Instant', label: 'Stitch Simulation' },
    ],
  },
  {
    id: 'brcstar-slider-08',
    originalName: 'Pastel Beauty and Wellness Website Mockup.png',
    badge: 'Organic Botanical Skincare',
    category: 'Clean Beauty & Wellness',
    title: 'Pastel Beauty Mockup',
    subtitle: 'Clean skincare commerce with interactive routine builder, ingredient breakdown & eco packaging.',
    bgGradient: ['#170c14', '#2e1829', '#080307'],
    accentColor: '#f472b6',
    secondaryColor: '#34d399',
    deviceTitle: 'PASTEL',
    features: [
      'Interactive Skin Diagnostic Questionnaire',
      'Transparent EWG-Verified Ingredient Guide',
      'Subscription Auto-Refill Delivery Engine',
    ],
    metrics: [
      { val: '98%', label: 'Clinical Satisfaction' },
      { val: '100%', label: 'Clean Botanical' },
      { val: '1-Click', label: 'Refill Reorder' },
    ],
  },
  {
    id: 'brcstar-slider-09',
    originalName: 'Responsive Dental Clinic Website Showcase.png',
    badge: 'Orthodontics & Smile Clinic',
    category: 'Healthcare & Clinical Booking',
    title: 'Apex Dental Clinic Showcase',
    subtitle: 'Modern dental healthcare portal with before & after smile transformations and instant appointment scheduling.',
    bgGradient: ['#031828', '#073254', '#010b14'],
    accentColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    deviceTitle: 'DENTAL',
    features: [
      'Before/After Interactive Smile Slider',
      'Real-Time Doctor Appointment Calendar',
      'Secure HIPAA-Compliant Patient Telehealth',
    ],
    metrics: [
      { val: '5k+', label: 'Happy Patients' },
      { val: '99.5%', label: 'Booking Success' },
      { val: '24/7', label: 'Emergency Support' },
    ],
  },
  {
    id: 'brcstar-slider-10',
    originalName: 'TEXMO Fashion Across Every Screen.png',
    badge: 'Omnichannel Screen Fluidity',
    category: 'Multi-Screen Responsive Matrix',
    title: 'TEXMO Omnichannel Showcase',
    subtitle: 'Harmonized fashion ecosystem operating across Smart TV, Desktop Workstation, iPad & iPhone screens.',
    bgGradient: ['#06061a', '#0d0d38', '#02020a'],
    accentColor: '#6366f1',
    secondaryColor: '#f97316',
    deviceTitle: 'TEXMO',
    features: [
      'Continuous Cross-Device Shopping Cart',
      'Dynamic Breakpoint Reflow from 360px to 4K',
      'Headless Micro-Frontend Architecture',
    ],
    metrics: [
      { val: '4 Screens', label: 'Synchronized State' },
      { val: '100/100', label: 'Lighthouse Score' },
      { val: '<350ms', label: 'Global Edge Sync' },
    ],
  },
];

async function generateAll() {
  console.log('Generating 10 optimized slider images at 1774 x 887...');

  for (let i = 0; i < SLIDES.length; i++) {
    const slide = SLIDES[i];
    const indexNum = String(i + 1).padStart(2, '0');
    const webpFileName = `brcstar-slider-${indexNum}.webp`;
    const webpPath = path.join(outputDir, webpFileName);
    const originalPath = path.join(outputDir, slide.originalName);

    console.log(`Processing slide ${i + 1}/10: ${webpFileName}...`);
    const svgContent = getSliderSvg(slide);

    // 1. Generate WebP at 1774 x 887, quality 90 (~150-300 KB)
    const webpBuffer = await sharp(Buffer.from(svgContent))
      .resize(1774, 887, { fit: 'cover' })
      .webp({ quality: 90, effort: 4 })
      .toFile(webpPath);

    // 2. Also save original PNG name in the directory for fallback/exact match
    await sharp(Buffer.from(svgContent))
      .resize(1774, 887, { fit: 'cover' })
      .png({ quality: 90, compressionLevel: 8 })
      .toFile(originalPath);

    const stats = fs.statSync(webpPath);
    console.log(`  ✓ Created ${webpFileName} (${Math.round(stats.size / 1024)} KB)`);
  }

  console.log('All 10 optimized slider images generated successfully!');
}

generateAll().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
