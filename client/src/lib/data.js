
export const products = [
  {
    id: '1',
    name: 'Fire Extinguisher ABC Powder',
    category: 'Portable Extinguishers',
    image: 'https://images.unsplash.com/photo-1582234316712-dc9555c26725?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for fire extinguisher
    description: 'Versatile fire extinguisher for Class A, B, and C fires.',
    specifications: {
      capacity: '6 kg',
      agent: 'ABC Dry Chemical',
      dischargeTime: '15 sec',
    },
    datasheet: '/documents/fire_extinguisher_abc.pdf',
  },
  {
    id: '2',
    name: 'CO2 Fire Extinguisher',
    category: 'Portable Extinguishers',
    image: 'https://images.unsplash.com/photo-1628191026904-4340d8299166?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for CO2 extinguisher
    description: 'Clean agent extinguisher for Class B and C fires.',
    specifications: {
      capacity: '2 kg',
      agent: 'Carbon Dioxide',
      dischargeTime: '9 sec',
    },
    datasheet: '/documents/co2_extinguisher.pdf',
  },
  {
    id: '3',
    name: 'Fire Hose Reel',
    category: 'Fire Fighting Systems',
    image: 'https://images.unsplash.com/photo-1621217316377-3e1149454179?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for fire hose reel
    description: 'Fixed fire fighting equipment for continuous water supply.',
    specifications: {
      hoseLength: '30 meters',
      diameter: '25 mm',
      pressure: '10 bar',
    },
    datasheet: '/documents/fire_hose_reel.pdf',
  },
  {
    id: '4',
    name: 'Fire Alarm System',
    category: 'Fire Detection Systems',
    image: 'https://images.unsplash.com/photo-1589133869107-16068d30e521?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for fire alarm system
    description: 'Comprehensive fire detection and alarm system.',
    specifications: {
      zones: '8',
      power: '24V DC',
      features: 'Addressable, Conventional',
    },
    datasheet: '/documents/fire_alarm_system.pdf',
  },
];

export const industries = [
  {
    id: '1',
    name: 'Industrial Manufacturing',
    image: 'https://images.unsplash.com/photo-1531846437976-1a86b971c26b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for industrial manufacturing
    description: 'Tailored fire safety solutions for manufacturing plants and industrial facilities.',
    products: ['1', '3', '4'], // Referring to product IDs
  },
  {
    id: '2',
    name: 'Commercial Buildings',
    image: 'https://images.unsplash.com/photo-1563214041-38e55e82b75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for commercial buildings
    description: 'Ensuring safety in offices, retail spaces, and other commercial properties.',
    products: ['1', '2', '4'],
  },
  {
    id: '3',
    name: 'Oil & Gas',
    image: 'https://images.unsplash.com/photo-1627916664539-715b3e6e8c71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for oil & gas
    description: 'Specialized fire protection for high-risk oil and gas operations.',
    products: ['1', '3'],
  },
];

export const blogPosts = [
  {
    id: '1',
    title: 'The Importance of Regular Fire Extinguisher Maintenance',
    author: 'Firman Safety Team',
    date: '2023-10-26',
    image: 'https://images.unsplash.com/photo-1620959074062-8e1e79f323e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for blog post
    excerpt: 'Regular maintenance is crucial for ensuring your fire extinguishers are always ready for use. Learn more about the benefits and best practices.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '2',
    title: 'Choosing the Right Fire Alarm System for Your Business',
    author: 'Firman Safety Team',
    date: '2023-10-20',
    image: 'https://images.unsplash.com/photo-1598275604168-9a9e3e3b3c3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for blog post
    excerpt: 'Selecting an appropriate fire alarm system is vital for early detection and warning. This guide helps you understand your options.',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  },
  {
    id: '3',
    title: 'Understanding Fire Safety Regulations in Industrial Settings',
    author: 'Firman Safety Team',
    date: '2023-10-15',
    image: 'https://images.unsplash.com/photo-1557871630-ebfcf17b07ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image for blog post
    excerpt: 'Industrial environments have specific fire safety requirements. Stay compliant with the latest regulations and best practices.',
    content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
  },
];
