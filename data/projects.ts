export interface Project {
  slug: string;
  title: string;
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
];

export const featuredProjects = projects.slice(0, 3);
