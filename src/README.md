# LearnHub - Online Learning Platform with Personalized Learning Paths

A modern, full-stack online learning platform built with React, TypeScript, Tailwind CSS, and Framer Motion. This platform features AI-powered personalized learning, peer collaboration, skill portfolio building, and smart note scanning.

## 🚀 Features

### For Students
- **Personalized Learning Roadmaps** - AI-generated custom learning paths based on diagnostic quiz results
- **AI Study Buddy (Enhanced!)** - Floating chatbot assistant that:
  - Explains topics in simple language with analogies
  - Answers questions with contextual, RAG-powered responses
  - Creates comprehensive quizzes with scoring guides
  - Generates flashcards exportable as JSON/CSV
  - Provides code examples with detailed explanations
  - Gives practice problems and coding challenges
  - Available globally via floating button with pulsing glow effect
- **Course Catalog (Free & Paid)** - Browse courses with:
  - Smart filtering by price (Free/Paid) and category
  - Visual pricing badges on each course card
  - 10 courses across multiple categories
  - 4 FREE courses (Data Structures, UI/UX, Python, Programming Basics)
  - 6 PAID courses with competitive pricing ($89-$149)
- **Peer Partner Finder** - Match with study partners by topic, skill level, timezone, and availability
- **Skill Portfolio** - Auto-builds a skills CV as you complete lessons, with PDF export and public sharing
- **Real-World Projects** - Apply skills to practical projects with rubrics and submission system
- **Smart Notes Scanner** - Upload handwritten notes and convert them to digital text with OCR, plus AI-generated summaries and flashcards

### For Teachers/Instructors
- **Course Management** - Create and manage courses, lessons, and quizzes
- **Student Analytics** - Track student progress and engagement
- **Content Creation** - Build engaging course content with rich media

### For Admins
- **Platform Management** - Oversee all users, courses, and system settings
- **Analytics Dashboard** - Monitor platform-wide metrics and growth
- **User Management** - Manage users and permissions

## 🎨 Design Features

- **Glassmorphism UI** - Frosted glass cards with gradient borders and soft shadows
- **Dark Theme** - Beautiful dark background with neon accent gradients (indigo → violet → teal)
- **Framer Motion Animations** - Smooth entrance animations, hover effects, and transitions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Micro-interactions** - Button hover lifts, card scale effects, ripple animations

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS v4.0
- Framer Motion for animations
- ShadCN UI components
- Lucide React icons

### Backend (Ready to Connect)
The frontend is built with mock data and ready to connect to your backend:
- Node.js/Express
- PostgreSQL with Prisma ORM
- Redis for job queues
- Vector DB (Pinecone/Weaviate) for embeddings
- OCR (Tesseract/Google Vision API)

## 📦 Project Structure

```
/
├── components/
│   ├── ai/              # AI Study Buddy components
│   ├── auth/            # Authentication pages
│   ├── courses/         # Course viewer and related components
│   ├── dashboard/       # Dashboard components for all user roles
│   ├── landing/         # Landing page components
│   ├── notes/           # OCR notes scanner
│   ├── peers/           # Peer finder components
│   ├── portfolio/       # Skill portfolio components
│   ├── projects/        # Projects page
│   ├── shared/          # Shared components (Layout, etc.)
│   └── ui/              # ShadCN UI components
├── lib/
│   ├── mock-data.ts     # Mock data for development
│   └── utils.ts         # Utility functions
├── styles/
│   └── globals.css      # Global styles and theme
└── App.tsx              # Main application component
```

## 🎯 Getting Started

### Current State
The application is fully functional with mock data. You can:

1. **Try Different User Roles**
   - Student: Full learning experience with roadmap, courses, AI buddy, peers, portfolio
   - Teacher: Course management and student analytics
   - Admin: Platform overview and management

2. **Test Key Features**
   - Navigate through the personalized roadmap
   - Browse and "enroll" in courses
   - Chat with the AI Study Buddy
   - Find study partners
   - View your skill portfolio
   - Upload notes for OCR processing (simulated)

### User Flow
1. **Landing Page** → Click "Start Learning" or "I'm a Teacher"
2. **Auth Page** → Select your role (Student/Teacher/Admin) and sign in
3. **Dashboard** → Explore features based on your role

## 🔌 Connecting to Your Backend

To connect this frontend to your actual backend:

1. **Replace Mock Data**
   - Replace functions in `lib/mock-data.ts` with API calls
   - Use fetch/axios to connect to your backend endpoints

2. **Authentication**
   - Integrate with your auth system in `components/auth/auth-page.tsx`
   - Store JWT tokens and manage sessions

3. **API Integration Points**
   - Courses: GET /api/courses, GET /api/courses/:id
   - Lessons: GET /api/courses/:id/lessons
   - AI Chat: POST /api/ai/chat (with lesson context)
   - OCR: POST /api/ocr/process (file upload)
   - Peer Matching: GET /api/peers/matches (with filters)
   - Portfolio: GET /api/users/:id/portfolio

4. **Real-time Features**
   - Use WebSockets for live updates
   - Integrate with your Redis pub/sub for notifications

## 🎨 Customization

### Theme Colors
Edit `styles/globals.css` to customize the color scheme:
- Primary gradient: indigo → purple → teal
- Background: slate-950 to purple-950
- Accent: purple-500

### Animations
Framer Motion animations are configured in individual components. Adjust timing and easing in the `transition` props.

## 📝 Mock Data

The application uses comprehensive mock data including:
- **10 sample courses** across different categories
  - 4 FREE courses (Data Structures, UI/UX, Python for Data Science, Programming Basics)
  - 6 PAID courses ranging from $89.99 to $149.99
  - Categories: AI & ML, Web Development, Computer Science, Design, Cloud & DevOps, Data Science, Security, Mobile Development
- Personalized learning roadmap with 5 items
- 3 lessons per course (expandable)
- 4 projects (various states)
- 3 peer matches
- 8 skills with progress
- 2 earned certificates
- Enhanced AI Study Buddy with RAG-like contextual responses

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Railway/Render)
Set up your Node.js backend with:
- Environment variables for API keys
- PostgreSQL database
- Redis instance
- Vector database for AI features

## 🔐 Important Notes

- This is a prototype/educational project
- Not designed for collecting PII or securing sensitive production data
- Replace mock API calls with real endpoints before production use
- Add proper authentication, authorization, and data validation
- Implement rate limiting and security best practices

## 🎓 Educational Use

This project is perfect for:
- College/university projects
- Learning modern React patterns
- Understanding UI/UX design principles
- Practicing full-stack integration
- Building a portfolio piece

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Framer Motion
