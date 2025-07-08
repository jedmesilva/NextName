# NextName Domain Availability Checker

## Overview

NextName is a domain availability checker application built with a modern full-stack architecture. The application allows users to check domain availability and provides intelligent suggestions for alternative domain names. It features a sleek, dark-themed UI inspired by modern design systems and provides real-time domain availability checking.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, Vite as the build tool
- **Backend**: Express.js with TypeScript
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: Built on shadcn/ui with comprehensive UI components
- **Styling System**: Tailwind CSS with custom CSS variables for consistent theming
- **State Management**: TanStack Query for API state management and caching
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Backend Architecture
- **API Framework**: Express.js with TypeScript for type safety
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **Session Management**: Built-in session handling with connect-pg-simple
- **Error Handling**: Centralized error handling middleware
- **Development Tools**: Hot reloading with tsx, structured logging

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Drizzle-Zod integration for runtime type checking
- **Migrations**: Drizzle Kit for database schema management

## Data Flow

1. **User Input**: Users enter domain names through the main search interface
2. **API Validation**: Client-side validation before API requests
3. **Domain Checking**: Backend processes domain availability checks
4. **Response Caching**: TanStack Query caches results for performance
5. **UI Updates**: Real-time UI updates with loading states and error handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight client-side routing
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production

## Deployment Strategy

The application is configured for production deployment with:

- **Build Process**: Vite builds the client, esbuild bundles the server
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Production Server**: Node.js with optimized bundle
- **Database**: PostgreSQL with Drizzle migrations
- **Static Assets**: Served from dist/public directory

### Build Commands
- `npm run dev`: Development mode with hot reloading
- `npm run build`: Production build for client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 08, 2025. Initial setup