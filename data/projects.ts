export interface Project {
  slug: string;
  title: string;
  tagline: string;
  location: string;
  year: string;
  img: string;
  category: string;
  area: string;
  description: string;
  challenge: string;
  solution: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "ridgewood-apartment",
    title: "Ridgewood Apartment",
    tagline: "A harmonious blend of nature-inspired design and contemporary luxury.",
    location: "Gurgaon",
    year: "2024",
    img: "/images/projects/DSC06981.jpg",
    category: "Residential",
    area: "4,200 sq ft",
    description:
      "A harmonious blend of nature-inspired design and contemporary luxury. The Ridgewood Apartment reimagines urban living through biophilic elements, natural stone textures, and a palette of deep greens and warm neutrals.",
    challenge:
      "The client desired a space that felt connected to nature while maintaining the sophistication of a modern urban home. The existing layout was compartmentalized and lacked natural light flow.",
    solution:
      "We opened up the floor plan to create seamless transitions between living areas, introduced floor-to-ceiling windows framed in blackened steel, and layered natural materials — travertine, walnut, and hand-troweled plaster — to evoke organic warmth throughout.",
    gallery: [
      "/images/projects/DSC06981.jpg", 
      "/images/projects/DSC07091.jpg",
      "/images/projects/VANITY 5 (4).JPG",
      "/images/projects/House 38.jpg"
    ],
  },
  {
    slug: "toni-and-guy",
    title: "Toni & Guy",
    tagline: "A masterclass in restrained opulence atop Delhi's prestigious addresses.",
    location: "Faridabad",
    year: "2023",
    img: "/images/projects/DSC07329.jpg",
    category: "Commercial",
    area: "6,800 sq ft",
    description:
      "Perched atop one of Delhi's most prestigious addresses, this flagship salon is a masterclass in restrained opulence. Every surface, from the book-matched marble to the custom bronze hardware, was selected to create an environment of effortless grandeur.",
    challenge:
      "The expansive open-plan space risked feeling cold and impersonal. The client wanted distinct zones for different services while maintaining a unified luxury aesthetic.",
    solution:
      "We introduced sculptural partitions in fluted glass and blackened oak, creating intimate pockets within the grand volume. A curated palette of ivory, champagne, and deep charcoal ties every zone together.",
    gallery: [
      "/images/projects/DSC07329.jpg", 
      "/images/projects/DSC07337.jpg",
      "/images/projects/tng-1 - Edited.jpg",
      "/images/projects/TONY _ GUY AGRA (20).jpg"
    ],
  },
  {
    slug: "timeless-fitness-gym",
    title: "Timeless Fitness Gym",
    tagline: "A high-end wellness destination where performance meets premium design.",
    location: "Delhi",
    year: "2024",
    img: "/images/projects/House 6.jpg",
    category: "Commercial",
    area: "5,500 sq ft",
    description:
      "A high-end wellness destination where performance meets premium design. Timeless Fitness reimagines the gym experience through a minimalist industrial lens, prioritizing raw textures and cinematic lighting.",
    challenge:
      "Balancing the rugged requirements of a fitness center with the premium aesthetic of a luxury brand. The space needed to be durable yet visually sophisticated.",
    solution:
      "We specified teak, terrazzo, and hand-poured concrete — materials that age gracefully. Integrated lighting systems highlight the architectural volumes, creating an atmosphere of focus and strength.",
    gallery: [
      "/images/projects/House 6.jpg", 
      "/images/projects/Malani Marble (40).jpg",
      "/images/projects/TGP03823-HDR-1.jpg"
    ],
  },
  {
    slug: "naraina-vihar",
    title: "Naraina Vihar Residence",
    tagline: "Conceived as a gallery for living, treating every surface as artistic expression.",
    location: "New Delhi",
    year: "2023",
    img: "/images/projects/TGP03936-HDR-1.jpg",
    category: "Residential",
    area: "3,800 sq ft",
    description:
      "Conceived as a gallery for living, this apartment treats every wall, niche, and surface as an opportunity for artistic expression. The architecture recedes to let a world-class contemporary art collection take center stage.",
    challenge:
      "The client's growing art collection demanded museum-quality display conditions within a space that still felt like a warm, inviting home.",
    solution:
      "We designed a gallery-track lighting system integrated into recessed ceiling channels, paired with movable wall panels. Furnishings in muted tones ensure the art always commands attention.",
    gallery: [
      "/images/projects/TGP03936-HDR-1.jpg", 
      "/images/projects/Copy of TGP04029-HDR-1.jpg",
      "/images/projects/House 39.jpg"
    ],
  },
  {
    slug: "pioneer-araya",
    title: "Pioneer Araya",
    tagline: "A sophisticated living space anchored by emerald-green and brass accents.",
    location: "Gurgaon",
    year: "2024",
    img: "/images/projects/TONY _ GUY AGRA (20).jpg",
    category: "Residential",
    area: "3,200 sq ft",
    description:
      "A sophisticated living space anchored by emerald-green tufted seating and brass accents. Pioneer Araya balances warmth and glamour through layered textures and bespoke details.",
    challenge:
      "The client wanted a living room that felt both inviting for family evenings and impressive enough for formal entertaining.",
    solution:
      "We designed a dual-purpose layout with movable accent furniture. Rich green velvet, geometric mosaic surfaces, and a warm metallic palette unify the space.",
    gallery: [
      "/images/projects/TONY _ GUY AGRA (20).jpg", 
      "/images/projects/tng-1 - Edited.jpg",
      "/images/projects/DSC07091.jpg"
    ],
  },
  {
    slug: "the-artisan-bar",
    title: "The Artisan Bar",
    tagline: "A compact yet expressive lounge nook with a boutique hotel feel.",
    location: "Chandigarh",
    year: "2024",
    img: "/images/projects/DSC07091.jpg",
    category: "Residential",
    area: "1,800 sq ft",
    description:
      "A compact yet expressive bar and lounge nook featuring statement artwork, wooden ceiling beams, and striped marble flooring. Every corner is curated to feel like a boutique hotel experience.",
    challenge:
      "Transforming a narrow, underutilized corridor space into a functional and visually striking home bar.",
    solution:
      "We introduced a marble-top bar counter with integrated shelving, paired with a bold portrait painting as a focal anchor. Geometric pendant lights soften the proportions.",
    gallery: [
      "/images/projects/DSC07091.jpg", 
      "/images/projects/DSC07329.jpg",
      "/images/projects/VANITY 5 (4).JPG"
    ],
  },
  {
    slug: "shukrana-residence",
    title: "The Shukrana Residence",
    tagline: "Celebrating Indian craftsmanship through a contemporary luxury lens.",
    location: "New Delhi",
    year: "2023",
    img: "/images/projects/DSC07337.jpg",
    category: "Luxury Residential",
    area: "2,400 sq ft",
    description:
      "A formal dining room where cascading gold chandeliers meet sapphire-blue velvet chairs. The space celebrates Indian craftsmanship through a contemporary lens.",
    challenge:
      "The double-height dining area needed visual warmth and intimacy despite its grand proportions and abundance of hard surfaces.",
    solution:
      "A cascading gold chandelier draws the eye downward, anchoring the space. Rich blue upholstery and curated wall art create layers of visual interest.",
    gallery: [
      "/images/projects/DSC07337.jpg", 
      "/images/projects/House 6.jpg",
      "/images/projects/DSC06981.jpg"
    ],
  },
  {
    slug: "malani-marble",
    title: "Malani Marble",
    tagline: "A monumental showcase of natural stone as architectural sculpture.",
    location: "Kishangarh",
    year: "2023",
    img: "/images/projects/Malani Marble (40).jpg",
    category: "Commercial",
    area: "12,000 sq ft",
    description:
      "A monumental showroom designed to showcase natural stone not just as material, but as architectural sculpture. The space uses scale and light to dramatize the beauty of marble.",
    challenge:
      "Displaying thousands of heavy stone slabs in a way that feels curated and light, rather than industrial or overwhelming.",
    solution:
      "We created a series of monolithic display walls and integrated dramatic overhead lighting that mimics natural daylight.",
    gallery: [
      "/images/projects/Malani Marble (40).jpg", 
      "/images/projects/DSC06981.jpg",
      "/images/projects/TGP03823-HDR-1.jpg"
    ],
  },
  {
    slug: "urban-art-gallery",
    title: "Urban Art Gallery",
    tagline: "A minimalist canvas where architecture recedes to empower the art.",
    location: "New Delhi",
    year: "2024",
    img: "/images/projects/Copy of TGP04029-HDR-1.jpg",
    category: "Cultural",
    area: "5,800 sq ft",
    description:
      "A minimalist gallery space designed as a silent canvas. High ceilings, seamless white surfaces, and precision lighting create an environment where the architecture empowers the art.",
    challenge:
      "Creating a space that is flexible enough for large-scale installations while maintaining an intimate feel for smaller works.",
    solution:
      "We implemented a system of modular wall panels and a programmable DALI lighting grid, allowing for complete transformation.",
    gallery: [
      "/images/projects/Copy of TGP04029-HDR-1.jpg", 
      "/images/projects/TGP03936-HDR-1.jpg",
      "/images/projects/House 38.jpg"
    ],
  },
  {
    slug: "tg-studio",
    title: "T&G Studio",
    tagline: "A high-performance creative hub blending industrial grit with luxury finish.",
    location: "Mumbai",
    year: "2023",
    img: "/images/projects/tng-1 - Edited.jpg",
    category: "Workspace",
    area: "2,500 sq ft",
    description:
      "A creative hub designed for high-performance artistic work. The studio blends industrial elements like exposed ceilings with luxury finishes like fluted oak.",
    challenge:
      "Balancing the technical requirements of a high-end salon workspace with the comfort and privacy of a luxury lounge.",
    solution:
      "We designed bespoke workstations with integrated storage and lighting, using semi-transparent partitions to maintain an open feel.",
    gallery: [
      "/images/projects/tng-1 - Edited.jpg", 
      "/images/projects/TONY _ GUY AGRA (20).jpg",
      "/images/projects/DSC07329.jpg"
    ],
  },
];

export const featuredProjects = projects.slice(0, 3);

