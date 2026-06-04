export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image?: string
  liveUrl?: string
  repoUrl?: string
  featured: boolean
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'design'
  level: number
  icon?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  bio: string[]
  email: string
  location: string
  avatar?: string
  resumeUrl?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}
