export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '01',
    quote: 'The interior feels calm and perfectly balanced. Nothing is excessive, nothing is missing. It is a space that reveals its quality over time — and keeps rewarding you for noticing.',
    author: 'Arjun Mehta',
    role: 'Founder',
    company: 'Lumière Hospitality',
  },
  {
    id: '02',
    quote: 'DRAW delivered a design rooted in logic and material honesty. They understood that we did not want a showpiece — we wanted a place that would serve us well for thirty years.',
    author: 'Priya Kapoor',
    role: 'Managing Director',
    company: 'Forma Group',
  },
  {
    id: '03',
    quote: 'They listened carefully and translated our needs into a coherent architectural language. The result feels effortless, yet deeply considered. Our clients notice before we say a word.',
    author: 'Rohan Das',
    role: 'Creative Director',
    company: 'Atlas Studios',
  },
  {
    id: '04',
    quote: 'We have worked with studios across three countries. DRAW is different — they treat silence as a design material. Our home is the quietest, most beautiful space we have ever been in.',
    author: 'Meera & Siddharth Rao',
    role: 'Private Clients',
    company: 'Mumbai',
  },
];
