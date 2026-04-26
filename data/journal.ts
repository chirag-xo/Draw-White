export type PostCategory = 'Architecture' | 'Interior' | 'Design' | 'Process';

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: PostCategory;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  featured?: boolean;
}

export const journalPosts: JournalPost[] = [
  {
    id: '1',
    slug: 'the-economics-of-restraint',
    title: 'The Economics of Restraint',
    excerpt: 'Why removing elements from a design — not adding them — is the most expensive thing you can do.',
    date: '12 March 2024',
    readTime: '6 min read',
    category: 'Design',
    image: '/images/projects/DSC06981.jpg',
    author: { name: 'Theodore Reginald' },
    featured: true,
  },
  {
    id: '2',
    slug: 'material-honesty-in-hospitality',
    title: 'Material Honesty in Hospitality',
    excerpt: 'Hotel interiors increasingly fake authenticity with laminate and veneer. Here is why that fails — and what works instead.',
    date: '28 January 2024',
    readTime: '8 min read',
    category: 'Interior',
    image: '/images/projects/TGP03936-HDR-1.jpg',
    author: { name: 'Seraphina Isabella' },
    featured: false,
  },
  {
    id: '3',
    slug: 'designing-for-light-not-views',
    title: 'Designing for Light, Not Views',
    excerpt: 'A view is a painting that never changes. Light is a material that transforms every room, every hour.',
    date: '15 December 2023',
    readTime: '5 min read',
    category: 'Process',
    image: '/images/projects/DSC07091.jpg',
    author: { name: 'Maximilian Bartholomew' },
    featured: false,
  },
  {
    id: '4',
    slug: 'the-monolith-house',
    title: 'The Monolith House: A Study in Concrete',
    excerpt: 'How we used cast-in-situ concrete to create a sense of permanence in a shifting coastal landscape.',
    date: '05 November 2023',
    readTime: '10 min read',
    category: 'Architecture',
    image: '/images/projects/DSC07329.jpg',
    author: { name: 'Anastasia Evangeline' },
    featured: false,
  },
  {
    id: '5',
    slug: 'tactile-memory',
    title: 'Tactile Memory: Why We Still Draw by Hand',
    excerpt: 'The digital world is precise, but the physical world is felt. Why hand-sketching remains our most vital tool.',
    date: '20 October 2023',
    readTime: '4 min read',
    category: 'Process',
    image: '/images/projects/tng-1 - Edited.jpg',
    author: { name: 'Theodore Reginald' },
    featured: false,
  },
  {
    id: '6',
    slug: 'adaptive-reuse-mumbai',
    title: 'Adaptive Reuse in South Mumbai',
    excerpt: 'Converting a 1920s warehouse into a contemporary art gallery while preserving its industrial heritage.',
    date: '12 September 2023',
    readTime: '12 min read',
    category: 'Architecture',
    image: '/images/projects/House 6.jpg',
    author: { name: 'Seraphina Isabella' },
    featured: false,
  },
  {
    id: '7',
    slug: 'sculpting-voids',
    title: 'Sculpting Voids: The Architecture of Absence',
    excerpt: 'Thinking about what is not there is often more important than thinking about what is.',
    date: '30 August 2023',
    readTime: '7 min read',
    category: 'Design',
    image: '/images/projects/Malani Marble (40).jpg',
    author: { name: 'Maximilian Bartholomew' },
    featured: false,
  },
  {
    id: '8',
    slug: 'interior-as-narrative',
    title: 'The Interior as Narrative',
    excerpt: 'How every piece of furniture, every textile, and every light contributes to the story of a home.',
    date: '15 July 2023',
    readTime: '5 min read',
    category: 'Interior',
    image: '/images/projects/TONY _ GUY AGRA (20).jpg',
    author: { name: 'Anastasia Evangeline' },
    featured: false,
  }
];
