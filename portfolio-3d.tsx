"use client"
import { useState, useRef, useEffect } from "react"
import * as THREE from "three"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  Calendar,
  Users,
  Zap,
  Code,
  Database,
  Settings,
  Globe,
  LucideIcon,
} from "lucide-react"

// Type definitions
interface Project {
  title: string
  period: string
  tech: string[]
  highlights: string[]
  liveUrl: string
  githubUrl: string
  description: string
}

interface Experience {
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  skills: string[]
}

interface Skills {
  Programming: string[]
  Frontend: string[]
  Backend: string[]
  Tools: string[]
}

interface ThreeJSRefs {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  shapes: THREE.Mesh[]
}

interface NavButtonProps {
  section: string
  icon: LucideIcon
  label: string
  isActive: boolean
  onClick: (section: string) => void
}

interface SkillCardProps {
  category: string
  skillList: string[]
}

interface ProjectCardProps {
  project: Project
}

type SectionType = "home" | "skills" | "projects" | "experience"

// Component definitions
const NavButton: React.FC<NavButtonProps> = ({ section, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(section)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
        : "bg-white/10 text-white/80 hover:bg-white/20 hover:scale-105"
    }`}
    type="button"
    aria-label={`Navigate to ${label}`}
  >
    <Icon size={18} />
    <span className="hidden md:inline">{label}</span>
  </button>
)

const SkillCard: React.FC<SkillCardProps> = ({ category, skillList }) => (
  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
      <Code className="mr-2" size={20} />
      {category}
    </h3>
    <div className="flex flex-wrap gap-2">
      {skillList.map((skill, index) => (
        <span
          key={`${category}-${skill}-${index}`}
          className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm text-white border border-white/20"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
)

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-white">{project.title}</h3>
      <span className="text-sm text-white/70 flex items-center">
        <Calendar size={14} className="mr-1" />
        {project.period}
      </span>
    </div>

    <p className="text-white/80 text-sm mb-4">{project.description}</p>

    <div className="flex flex-wrap gap-2 mb-4">
      {project.tech.map((tech, index) => (
        <span
          key={`${project.title}-tech-${tech}-${index}`}
          className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded text-xs text-white border border-white/20"
        >
          {tech}
        </span>
      ))}
    </div>

    <ul className="space-y-2 mb-6">
      {project.highlights.map((highlight, index) => (
        <li key={`${project.title}-highlight-${index}`} className="text-white/80 text-sm flex items-start">
          <Zap size={12} className="mr-2 mt-1 text-yellow-400 flex-shrink-0" />
          {highlight}
        </li>
      ))}
    </ul>

    <div className="flex space-x-3 pt-4 border-t border-white/10">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-white text-sm"
        aria-label={`View live demo of ${project.title}`}
      >
        <Globe size={16} />
        <span>Live Demo</span>
        <ExternalLink size={12} />
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-white text-sm"
        aria-label={`View source code of ${project.title} on GitHub`}
      >
        <Github size={16} />
        <span>Code</span>
        <ExternalLink size={12} />
      </a>
    </div>
  </div>
)

const Portfolio3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<ThreeJSRefs | null>(null)
  const [activeSection, setActiveSection] = useState<SectionType>("home")
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const animationRef = useRef<number | null>(null)


  // Data constants
  const skills: Skills = {
    Programming: ["C/C++", "Python", "JavaScript", "TypeScript", "MATLAB"],
    Frontend: ["React.JS", "Next.JS", "Tailwind CSS"],
    Backend: ["Node.JS", "Express.JS", "PostgreSQL", "MongoDB"],
    Tools: ["VS Code", "Docker", "Git", "GitHub", "Postman"],
  }

  const projects: Project[] = [
    {
      title: "Social Media Web Application",
      period: "Dec 2024 – Jan 2025",
      tech: ["React.JS", "React Query", "TypeScript", "Tailwind CSS"],
      highlights: [
        "90%+ Lighthouse scores in performance/accessibility",
        "25% improvement in sync speed with React Query",
        "<2s load time across all devices",
      ],
      liveUrl: "https://social-media-demo.vercel.app",
      githubUrl: "https://github.com/shubhamnagar/social-media-app",
      description: "A modern social media platform with real-time features and optimized performance.",
    },
    {
      title: "Food Ordering Web Application",
      period: "June 2024 – July 2025",
      tech: ["React.JS", "Redux", "Node.JS", "Express.JS", "MongoDB"],
      highlights: [
        "Real-time order tracking system",
        "1.8s page load time optimization",
        "Supports 200+ concurrent users",
      ],
      liveUrl: "https://food-ordering-demo.vercel.app",
      githubUrl: "https://github.com/shubhamnagar/food-ordering-app",
      description: "Full-stack food ordering platform with real-time tracking and payment integration.",
    },
    {
      title: "Weather App",
      period: "Oct 2023 – Nov 2023",
      tech: ["React", "TypeScript", "Open Weather API", "Tailwind CSS"],
      highlights: [
        "Real-time forecasts with geolocation",
        "<2s page load time",
        "Responsive design with reusable components",
      ],
      liveUrl: "https://weather-app-demo.vercel.app",
      githubUrl: "https://github.com/shubhamnagar/weather-app",
      description: "Beautiful weather application with location-based forecasts and interactive UI.",
    },
  ]

  const experience: Experience = {
    title: "Project Intern",
    company: "Hindustan Petroleum Corporation Limited",
    period: "May 2025 – Present",
    location: "Delhi, India",
    achievements: [
      "Python-based vision pipeline with >95% accuracy",
      "Integrated sensor-triggered capture with multithreading",
      "Engineered lightweight database system for inspection logs",
    ],
    skills: ["Python", "OpenCV", "NumPy", "Image Processing", "Automation"],
  }

  // Navigation handler
  const handleSectionChange = (section: string): void => {
    setActiveSection(section as SectionType)
  }

  // Three.js setup and animation
  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = []
    const geometries: THREE.BufferGeometry[] = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.ConeGeometry(0.5, 1, 8),
      new THREE.OctahedronGeometry(0.7),
    ]

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        transparent: true,
        opacity: 0.7,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      shapes.push(mesh)
      scene.add(mesh)
    }

    camera.position.z = 15
    sceneRef.current = { scene, camera, renderer, shapes }

    // Animation loop
    const animate = (): void => {
      animationRef.current = requestAnimationFrame(animate)

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.001
        shape.rotation.y += 0.01 + index * 0.001
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
      })

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = (): void => {
      if (!sceneRef.current) return
      
      const { camera, renderer } = sceneRef.current
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    setIsLoaded(true)

    return () => {
      window.removeEventListener("resize", handleResize)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      // Clean up Three.js resources
      shapes.forEach((shape) => {
        shape.geometry.dispose()
        if (Array.isArray(shape.material)) {
          shape.material.forEach((material) => material.dispose())
        } else {
          shape.material.dispose()
        }
      })
      
      geometries.forEach((geometry) => geometry.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex justify-center space-x-2">
                <NavButton
                  section="home"
                  icon={Users}
                  label="Home"
                  isActive={activeSection === "home"}
                  onClick={handleSectionChange}
                />
                <NavButton
                  section="skills"
                  icon={Code}
                  label="Skills"
                  isActive={activeSection === "skills"}
                  onClick={handleSectionChange}
                />
                <NavButton
                  section="projects"
                  icon={Settings}
                  label="Projects"
                  isActive={activeSection === "projects"}
                  onClick={handleSectionChange}
                />
                <NavButton
                  section="experience"
                  icon={Award}
                  label="Experience"
                  isActive={activeSection === "experience"}
                  onClick={handleSectionChange}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Home Section */}
            {activeSection === "home" && (
              <section className="text-center space-y-8 animate-fade-in">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                    SN
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                    SHUBHAM NAGAR
                  </h1>

                  <p className="text-xl md:text-2xl text-white/80 mb-8">
                    Electronics & Communication Engineering Student
                  </p>

                  <div className="text-white/70 space-y-2 mb-8">
                    <p className="flex items-center justify-center">
                      <MapPin size={16} className="mr-2" />
                      IIIT Jabalpur | CPI: 8.5
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="mailto:shubhamnagar5000@gmail.com"
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
                      aria-label="Send email to Shubham Nagar"
                    >
                      <Mail size={20} />
                      <span>Email</span>
                    </a>
                    <a
                      href="https://github.com/shubhamnagar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
                      aria-label="Visit Shubham Nagar's GitHub profile"
                    >
                      <Github size={20} />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/shubhamnagar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
                      aria-label="Visit Shubham Nagar's LinkedIn profile"
                    >
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                {/* Achievement Highlight */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/20">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="text-yellow-400 mr-3" size={24} />
                    <h2 className="text-xl font-bold text-white">Latest Achievement</h2>
                  </div>
                  <p className="text-white/90 text-center">
                    <strong>Finalist (Top 15)</strong> in HPCL's HP Power Lab 2025
                    <br />
                    Selected from <strong>129,000+ individuals</strong> and <strong>99,000+ teams</strong>
                    <br />
                    <span className="text-yellow-400">Technological Innovation Domain</span>
                  </p>
                </div>

                {/* Quick Project Links */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4 text-center">Featured Projects</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    {projects.slice(0, 3).map((project, index) => (
                      <a
                        key={`featured-${project.title}-${index}`}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-white border border-white/20"
                        aria-label={`View ${project.title} project`}
                      >
                        <Globe size={16} />
                        <span className="text-sm">{project.title}</span>
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setActiveSection("projects")}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      type="button"
                    >
                      View All Projects →
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Skills Section */}
            {activeSection === "skills" && (
              <section className="space-y-8 animate-fade-in">
                <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-12">
                  Technical Skills
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <SkillCard key={category} category={category} skillList={skillList} />
                  ))}
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Database className="mr-2" size={20} />
                    Courses & Soft Skills
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white/80 font-semibold mb-2">Academic Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Data Structures & Algorithms", "Operating Systems", "OOPs"].map((course, index) => (
                          <span
                            key={`course-${course}-${index}`}
                            className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full text-sm text-white border border-white/20"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/80 font-semibold mb-2">Soft Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Leadership", "Communication", "Team Collaboration"].map((skill, index) => (
                          <span
                            key={`soft-skill-${skill}-${index}`}
                            className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full text-sm text-white border border-white/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Projects Section */}
            {activeSection === "projects" && (
              <section className="space-y-8 animate-fade-in">
                <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-12">
                  Featured Projects
                </h2>

                <div className="grid gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard key={`project-${project.title}-${index}`} project={project} />
                  ))}
                </div>

                <div className="text-center">
                  <a
                    href="https://github.com/shubhamnagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-white text-lg font-semibold"
                    aria-label="View all projects on GitHub"
                  >
                    <Github size={24} />
                    <span>View All Projects on GitHub</span>
                    <ExternalLink size={20} />
                  </a>
                </div>
              </section>
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <section className="space-y-8 animate-fade-in">
                <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-12">
                  Work Experience
                </h2>

                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                      <p className="text-xl text-blue-400 mb-2">{experience.company}</p>
                      <p className="text-white/70 flex items-center mb-2">
                        <MapPin size={16} className="mr-2" />
                        {experience.location}
                      </p>
                    </div>
                    <span className="text-white/70 flex items-center bg-white/10 px-4 py-2 rounded-lg">
                      <Calendar size={16} className="mr-2" />
                      {experience.period}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                    <ul className="space-y-3">
                      {experience.achievements.map((achievement, index) => (
                        <li key={`achievement-${index}`} className="text-white/80 flex items-start">
                          <Zap size={16} className="mr-3 mt-1 text-yellow-400 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, index) => (
                        <span
                          key={`exp-skill-${skill}-${index}`}
                          className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full text-sm text-white border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
                  <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                      <p className="text-xl text-blue-400 mb-2">Indian Institute of Information Technology, Jabalpur</p>
                      <p className="text-white/80 mb-2">B. Tech, Electronics and Communication Engineering</p>
                      <p className="text-white/70">CPI: 8.5</p>
                    </div>
                    <span className="text-white/70 flex items-center bg-white/10 px-4 py-2 rounded-lg">
                      <Calendar size={16} className="mr-2" />
                      Nov 2022 – Present
                    </span>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Portfolio3D