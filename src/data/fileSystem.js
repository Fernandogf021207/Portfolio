export const projectFiles = {
  root: [
    { id: 'portfolio', name: 'Portfolio_v1', type: 'folder', icon: 'folder' },
    { id: 'horror_game', name: 'Dark_Signal_Game', type: 'folder', icon: 'folder' },
    { id: 'ecommerce', name: 'Retro_Shop', type: 'folder', icon: 'folder' }
  ],
  portfolio: [
    { id: 'p_doc', name: 'read_me.doc', type: 'file', contentId: 'portfolio_details' },
    { id: 'p_img', name: 'preview.jpg', type: 'image' } 
  ],
  horror_game: [
    { id: 'h_doc', name: 'concept_art.doc', type: 'file', contentId: 'game_details' },
    { id: 'h_exe', name: 'DEMO.EXE', type: 'executable', link: 'https://github.com/fernando/dark-signal' }
  ],
  ecommerce: [
    { id: 'e_doc', name: 'specs.doc', type: 'file', contentId: 'shop_details' }
  ]
};

export const fileContents = {
  portfolio_details: {
    title: "Portfolio Development Log",
    body: "This site was built using React Three Fiber to simulate a 3D desktop environment. It features a retro Windows 95 aesthetic using styled-components and react95.",
    image: "/models/old_computer.glb" // Placeholder, using an existing asset path or just a string
  },
  game_details: {
    title: "Dark Signal - GDD",
    body: "A survival horror game in development. Players must navigate a dark facility while avoiding entities that react to sound. Built with Unity.",
    image: ""
  },
  shop_details: {
    title: "Retro Shop Specs",
    body: "A full-stack e-commerce platform with real-time inventory management. Built using Next.js, Node.js, and PostgreSQL.",
    image: ""
  }
};
