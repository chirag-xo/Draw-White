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
      "A harmonious blend of nature-inspired design and contemporary luxury. The Verde Residence reimagines urban living through biophilic elements, natural stone textures, and a palette of deep greens and warm neutrals that create an atmosphere of refined tranquility.",
    challenge:
      "The client desired a space that felt connected to nature while maintaining the sophistication of a modern urban home. The existing layout was compartmentalized and lacked natural light flow.",
    solution:
      "We opened up the floor plan to create seamless transitions between living areas, introduced floor-to-ceiling windows framed in blackened steel, and layered natural materials — travertine, walnut, and hand-troweled plaster — to evoke organic warmth throughout.",
    gallery: ["/images/projects/DSC06981.jpg", "/images/projects/DSC07091.jpg"],
  },
  {
    slug: "toni-&-guy",
    title: "Toni & Guy",
    tagline: "A masterclass in restrained opulence atop Delhi's prestigious addresses.",
    location: "Faridabad",
    year: "2023",
    img: "/images/projects/DSC07329.jpg",
    category: "Commercial",
    area: "6,800 sq ft",
    description:
      "Perched atop one of Delhi's most prestigious addresses, this penthouse is a masterclass in restrained opulence. Every surface, from the book-matched marble to the custom bronze hardware, was selected to create an environment of effortless grandeur.",
    challenge:
      "The expansive open-plan space risked feeling cold and impersonal. The client wanted distinct zones for entertaining, relaxation, and private retreat — all while maintaining visual continuity.",
    solution:
      "We introduced sculptural partitions in fluted glass and blackened oak, creating intimate pockets within the grand volume. A curated palette of ivory, champagne, and deep charcoal ties every zone together with quiet sophistication.",
    gallery: ["/images/projects/DSC07329.jpg", "/images/projects/DSC07337.jpg"],
  },
  {
    slug: "timeless-fitness-gym",
    title: "Timeless Fitness Gym",
    tagline: "A coastal sanctuary where the boundaries between indoors and outdoors dissolve.",
    location: "Delhi",
    year: "2024",
    img: "/images/projects/House%206.jpg",
    category: "Commercial",
    area: "5,500 sq ft",
    description:
      "A coastal sanctuary where the boundaries between indoors and outdoors dissolve. Azure channels the spirit of the Arabian Sea through its open pavilion architecture, sun-bleached textures, and a flowing spatial narrative that follows the rhythm of the tides.",
    challenge:
      "Designing for the aggressive coastal climate while preserving a sense of barefoot luxury. Materials needed to withstand salt air and monsoon humidity without sacrificing aesthetics.",
    solution:
      "We specified teak, terrazzo, and hand-poured concrete — materials that age gracefully in marine environments. Retractable glass walls open the living spaces to an infinity pool that appears to merge with the horizon.",
    gallery: ["/images/projects/House%206.jpg", "/images/projects/Malani%20Marble%20(40).jpg"],
  },
  {
    slug: "naraina-vihar",
    title: "Naraina Vihar",
    tagline: "Conceived as a gallery for living, treating every surface as artistic expression.",
    location: "Gurgaon",
    year: "2023",
    img: "/images/projects/TGP03936-HDR-1.jpg",
    category: "Residential",
    area: "3,800 sq ft",
    description:
      "Conceived as a gallery for living, this apartment treats every wall, niche, and surface as an opportunity for artistic expression. The architecture recedes to let a world-class contemporary art collection take center stage.",
    challenge:
      "The client's growing art collection demanded museum-quality display conditions — precise lighting, climate control, and flexible hanging systems — within a space that still felt like home.",
    solution:
      "We designed a gallery-track lighting system integrated into recessed ceiling channels, paired with movable wall panels that allow the collection to be rehung seasonally. Furnishings in muted tones ensure the art always commands attention.",
    gallery: ["/images/projects/TGP03936-HDR-1.jpg", "/images/projects/Copy%20of%20TGP04029-HDR-1.jpg"],
  },
  {
    slug: "poineer-araya-residence",
    title: "Poineer Araya Residence",
    tagline: "A sophisticated living space anchored by emerald-green and brass accents.",
    location: "Gurgaon",
    year: "2024",
    img: "/images/projects/TONY%20_%20GUY%20AGRA%20(20).jpg",
    category: "Residential",
    area: "3,200 sq ft",
    description:
      "A sophisticated living space anchored by emerald-green tufted seating and brass accents. The Emerald Lounge balances warmth and glamour through layered textures, geometric coffee tables, and bespoke pendant lighting.",
    challenge:
      "The client wanted a living room that felt both inviting for family evenings and impressive enough for formal entertaining, without resorting to two separate spaces.",
    solution:
      "We designed a dual-purpose layout with movable accent furniture. Rich green velvet, geometric mosaic surfaces, and a warm metallic palette unify the space while allowing easy reconfiguration.",
    gallery: ["/images/projects/TONY%20_%20GUY%20AGRA%20(20).jpg", "/images/projects/tng-1%20-%20Edited.jpg"],
  },
  {
    slug: "the-artisan-bar",
    title: "The Artisan Bar & Nook",
    tagline: "A compact yet expressive bar and lounge nook with a boutique hotel feel.",
    location: "Chandigarh",
    year: "2024",
    img: "/images/projects/DSC07091.jpg",
    category: "Residential",
    area: "1,800 sq ft",
    description:
      "A compact yet expressive bar and lounge nook featuring statement artwork, wooden ceiling beams, and striped marble flooring. Every corner is curated to feel like a boutique hotel experience at home.",
    challenge:
      "Transforming a narrow, underutilized corridor space into a functional and visually striking home bar without major structural modifications.",
    solution:
      "We introduced a marble-top bar counter with integrated shelving, paired with a bold portrait painting as a focal anchor. Geometric pendant lights and sheer curtains soften the proportions.",
    gallery: ["/images/projects/DSC07091.jpg", "/images/projects/DSC07329.jpg"],
  },
  {
    slug: "the-shukrana-residence",
    title: "The Shukrana Residence",
    tagline: "Celebrating Indian craftsmanship through a contemporary luxury lens.",
    location: "New Delhi",
    year: "2023",
    img: "/images/projects/DSC07337.jpg",
    category: "Luxury Residential",
    area: "2,400 sq ft",
    description:
      "A formal dining room where cascading gold chandeliers meet sapphire-blue velvet chairs and hand-painted elephant-motif upholstery. The space celebrates Indian craftsmanship through a contemporary lens.",
    challenge:
      "The double-height dining area needed visual warmth and intimacy despite its grand proportions and abundance of hard surfaces.",
    solution:
      "A cascading gold chandelier draws the eye downward, anchoring the space. Rich blue upholstery, a classic buffet console, and curated wall art create layers of visual interest at human scale.",
    gallery: ["/images/projects/DSC07337.jpg", "/images/projects/House%206.jpg"],
  },
  {
    slug: "malani-marble-showroom",
    title: "Malani Marble Showroom",
    tagline: "A monumental showcase of natural stone as architectural sculpture.",
    location: "Kishangarh",
    year: "2023",
    img: "/images/projects/Malani%20Marble%20(40).jpg",
    category: "Commercial",
    area: "12,000 sq ft",
    description:
      "A monumental showroom designed to showcase natural stone not just as material, but as architectural sculpture. The space uses scale and light to dramatize the inherent beauty of marble and granite.",
    challenge:
      "Displaying thousands of heavy stone slabs in a way that feels curated and light, rather than industrial or overwhelming.",
    solution:
      "We created a series of monolithic display walls and integrated dramatic overhead lighting that mimics natural daylight, allowing the stones' textures and colors to be seen in their true state.",
    gallery: ["/images/projects/Malani%20Marble%20(40).jpg", "/images/projects/DSC06981.jpg"],
  },
  {
    slug: "urban-art-gallery",
    title: "Urban Art Gallery",
    tagline: "A minimalist canvas where architecture recedes to empower the art.",
    location: "New Delhi",
    year: "2024",
    img: "/images/projects/Copy%20of%20TGP04029-HDR-1.jpg",
    category: "Cultural",
    area: "5,800 sq ft",
    description:
      "A minimalist gallery space designed as a silent canvas. High ceilings, seamless white surfaces, and precision lighting create an environment where the architecture empowers the art without competing with it.",
    challenge:
      "Creating a space that is flexible enough for large-scale installations while maintaining an intimate feel for smaller works.",
    solution:
      "We implemented a system of modular wall panels and a programmable DALI lighting grid, allowing the gallery's layout and atmosphere to be completely transformed for each exhibition.",
    gallery: ["/images/projects/Copy%20of%20TGP04029-HDR-1.jpg", "/images/projects/TGP03936-HDR-1.jpg"],
  },
  {
    slug: "tg-studio-workspace",
    title: "T&G Studio Workspace",
    tagline: "A high-performance creative hub blending industrial grit with luxury finish.",
    location: "Mumbai",
    year: "2023",
    img: "/images/projects/tng-1%20-%20Edited.jpg",
    category: "Workspace",
    area: "2,500 sq ft",
    description:
      "A creative hub designed for high-performance artistic work. The studio blends industrial elements like exposed ceilings with luxury finishes like fluted oak and polished brass.",
    challenge:
      "Balancing the technical requirements of a high-end salon workspace with the comfort and privacy of a luxury lounge.",
    solution:
      "We designed bespoke workstations with integrated storage and lighting, using semi-transparent partitions to maintain an open feel while providing necessary acoustic and visual privacy.",
    gallery: ["/images/projects/tng-1%20-%20Edited.jpg", "/images/projects/TONY%20_%20GUY%20AGRA%20(20).jpg"],
  },
];

export const featuredProjects = projects.slice(0, 3);

