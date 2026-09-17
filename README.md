# ExploreUs - Premium AI Tool Directory

![ExploreUs Preview](https://via.placeholder.com/1200x600/000000/FFFFFF?text=ExploreUs+AI+Directory)

**Live Demo:** [https://explore-us.vercel.app/](https://explore-us.vercel.app/)

**ExploreUs** is a beautifully crafted, modern directory for discovering and organizing the best Artificial Intelligence tools available today. Built with a focus on stunning aesthetics, it features a premium glassmorphism UI, fluid animations, and a rich dark/light mode experience.

## Features

- **Premium UI/UX:** Built with Tailwind CSS and Framer Motion for smooth, dynamic animations, hover effects, and a modern glassmorphism design.
- **Dark/Light Mode:** Seamlessly switch between a deep, rich dark theme and a clean, elegant light theme.
- **Advanced Search & Filtering:** Instantly search for AI tools by name, description, or tags, and filter by categories like Text & Writing, Image Generation, Code & Dev, Video & Audio, and more.
- **Favorites System:** Save your most-used AI tools to your favorites for quick access later.
- **Collections:** Create custom collections to organize tools based on your specific workflows (e.g., "Content Creation Workflow", "Developer Stack").
- **Trending Tools:** Discover what's hot in the AI space with a dedicated trending section.
- **Fully Responsive:** Carefully designed to look and work perfectly on desktop, tablet, and mobile devices.

## Tech Stack

This project is built using modern web development technologies:

- **Framework:** [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **State Management:** React Context API (Favorites & Collections)

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/hello-ashish/Explore-Us.git
   cd ExploreUs
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open the app:**
   Visit `http://localhost:8080` in your browser to see the application running.

## Project Structure

```
ExploreUs/
├── src/
│   ├── components/      # Reusable UI components (Cards, Modals, Search, etc.)
│   ├── contexts/        # React Context providers (Favorites, Collections)
│   ├── data/            # Static data (AI tools, Categories)
│   ├── pages/           # Page views (Home, Index, etc.)
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main application component & routing
│   └── index.css        # Global CSS, Tailwind directives, and Theme Tokens
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project metadata and dependencies
```

## Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](../../issues) if you want to contribute.

## License

This project is open-source and available under the [MIT License](LICENSE).
