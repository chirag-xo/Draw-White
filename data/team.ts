export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    id: '01',
    name: 'Ananya Sharma',
    role: 'Founding Principal',
    bio: 'Trained at the Architectural Association, London. Believes that great interiors are discovered, not designed.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85',
  },
  {
    id: '02',
    name: 'Vikram Nair',
    role: 'Design Lead',
    bio: 'Former partner at a Milan studio. Specialises in material research and spatial sequencing.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=85',
  },
  {
    id: '03',
    name: 'Leila Desai',
    role: 'Interior Architect',
    bio: 'Architect with a background in conservation. She ensures every new project understands its site before speaking.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85',
  },
];
