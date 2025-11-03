// Mock data for the learning platform

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  timezone?: string;
  skillLevel?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  duration: string;
  lessons: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  enrolledStudents?: number;
  isFree: boolean;
  price?: number; // Price in USD, undefined if free
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  completed: boolean;
  transcript: string;
  order: number;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'skipped';
  reason?: string;
  courseId: string;
  progress: number;
  estimatedTime: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'locked' | 'available' | 'in-progress' | 'submitted' | 'completed';
  requiredCourses: string[];
  rubric: string[];
  thumbnail: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Certificate {
  id: string;
  courseName: string;
  dateEarned: string;
  instructor: string;
}

export interface PeerMatch {
  id: string;
  name: string;
  avatar: string;
  matchScore: number;
  commonTopics: string[];
  skillLevel: string;
  timezone: string;
  availability: string;
  bio: string;
}

// Current user
export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'student',
  timezone: 'UTC-5',
  skillLevel: 'intermediate'
};

// Mock courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of ML, including supervised and unsupervised learning, neural networks, and real-world applications.',
    instructor: 'Dr. Sarah Chen',
    thumbnail: 'technology learning',
    progress: 45,
    duration: '8 weeks',
    lessons: 24,
    category: 'AI & ML',
    difficulty: 'intermediate',
    tags: ['Python', 'TensorFlow', 'Neural Networks'],
    enrolledStudents: 1243,
    isFree: false,
    price: 89.99
  },
  {
    id: '2',
    title: 'Full Stack Web Development',
    description: 'Build modern web applications from scratch using React, Node.js, and PostgreSQL.',
    instructor: 'Michael Roberts',
    thumbnail: 'web development coding',
    progress: 70,
    duration: '12 weeks',
    lessons: 36,
    category: 'Web Development',
    difficulty: 'intermediate',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    enrolledStudents: 2891,
    isFree: false,
    price: 129.99
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    description: 'Master essential DSA concepts for technical interviews and efficient problem solving.',
    instructor: 'Prof. James Liu',
    thumbnail: 'coding algorithm',
    progress: 30,
    duration: '10 weeks',
    lessons: 30,
    category: 'Computer Science',
    difficulty: 'intermediate',
    tags: ['Python', 'Algorithms', 'Interview Prep'],
    enrolledStudents: 3456,
    isFree: true
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, user research, wireframing, and prototyping with industry tools.',
    instructor: 'Emily Turner',
    thumbnail: 'design interface',
    progress: 0,
    duration: '6 weeks',
    lessons: 18,
    category: 'Design',
    difficulty: 'beginner',
    tags: ['Figma', 'User Research', 'Prototyping'],
    enrolledStudents: 1876,
    isFree: true
  },
  {
    id: '5',
    title: 'Cloud Computing with AWS',
    description: 'Deploy scalable applications using AWS services like EC2, S3, Lambda, and RDS.',
    instructor: 'David Kumar',
    thumbnail: 'cloud computing',
    progress: 0,
    duration: '8 weeks',
    lessons: 20,
    category: 'Cloud & DevOps',
    difficulty: 'advanced',
    tags: ['AWS', 'DevOps', 'Deployment'],
    enrolledStudents: 987,
    isFree: false,
    price: 149.99
  },
  {
    id: '6',
    title: 'Python for Data Science',
    description: 'Analyze and visualize data using Python, Pandas, NumPy, and Matplotlib.',
    instructor: 'Dr. Lisa Wang',
    thumbnail: 'data science python',
    progress: 15,
    duration: '7 weeks',
    lessons: 21,
    category: 'Data Science',
    difficulty: 'beginner',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    enrolledStudents: 2134,
    isFree: true
  },
  {
    id: '7',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns including render props, HOCs, compound components, and hooks patterns.',
    instructor: 'Sarah Johnson',
    thumbnail: 'react coding',
    progress: 0,
    duration: '6 weeks',
    lessons: 18,
    category: 'Web Development',
    difficulty: 'advanced',
    tags: ['React', 'Hooks', 'Design Patterns'],
    enrolledStudents: 876,
    isFree: false,
    price: 99.99
  },
  {
    id: '8',
    title: 'Introduction to Programming',
    description: 'Start your coding journey with fundamental programming concepts using Python.',
    instructor: 'John Smith',
    thumbnail: 'programming basics',
    progress: 0,
    duration: '4 weeks',
    lessons: 12,
    category: 'Programming',
    difficulty: 'beginner',
    tags: ['Python', 'Basics', 'Logic'],
    enrolledStudents: 5432,
    isFree: true
  },
  {
    id: '9',
    title: 'Cybersecurity Essentials',
    description: 'Learn the fundamentals of cybersecurity, including network security, cryptography, and ethical hacking.',
    instructor: 'Dr. Marcus Lee',
    thumbnail: 'cybersecurity',
    progress: 0,
    duration: '10 weeks',
    lessons: 28,
    category: 'Security',
    difficulty: 'intermediate',
    tags: ['Security', 'Networking', 'Ethical Hacking'],
    enrolledStudents: 1654,
    isFree: false,
    price: 119.99
  },
  {
    id: '10',
    title: 'Mobile App Development with Flutter',
    description: 'Build beautiful cross-platform mobile apps using Flutter and Dart.',
    instructor: 'Amy Wilson',
    thumbnail: 'mobile development',
    progress: 0,
    duration: '9 weeks',
    lessons: 27,
    category: 'Mobile Development',
    difficulty: 'intermediate',
    tags: ['Flutter', 'Dart', 'Mobile'],
    enrolledStudents: 2098,
    isFree: false,
    price: 109.99
  }
];

// Mock roadmap
export const mockRoadmap: RoadmapItem[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms - Arrays & Strings',
    description: 'Build strong foundation in fundamental data structures',
    status: 'completed',
    courseId: '3',
    progress: 100,
    estimatedTime: '2 weeks',
    reason: 'Foundation needed for advanced topics'
  },
  {
    id: '2',
    title: 'Full Stack Web Development - React Fundamentals',
    description: 'Learn component-based architecture and state management',
    status: 'current',
    courseId: '2',
    progress: 70,
    estimatedTime: '1 week',
    reason: 'Weak area identified in diagnostic quiz'
  },
  {
    id: '3',
    title: 'Introduction to Machine Learning - Supervised Learning',
    description: 'Understand regression and classification algorithms',
    status: 'upcoming',
    courseId: '1',
    progress: 0,
    estimatedTime: '3 weeks',
    reason: 'Prerequisites completed, next logical step'
  },
  {
    id: '4',
    title: 'Python for Data Science - Data Visualization',
    description: 'Create insightful visualizations with Matplotlib and Seaborn',
    status: 'upcoming',
    courseId: '6',
    progress: 0,
    estimatedTime: '2 weeks',
    reason: 'Complements ML course, builds practical skills'
  },
  {
    id: '5',
    title: 'UI/UX Design Fundamentals',
    description: 'Skipped based on your existing design portfolio',
    status: 'skipped',
    courseId: '4',
    progress: 0,
    estimatedTime: '6 weeks',
    reason: 'You already have strong design skills'
  }
];

// Mock lessons
export const mockLessons: Lesson[] = [
  {
    id: '1',
    courseId: '2',
    title: 'Introduction to React Components',
    description: 'Learn how to create and compose React components',
    videoUrl: 'https://example.com/video1',
    duration: '15:30',
    completed: true,
    transcript: 'In this lesson, we will explore React components, the building blocks of React applications. Components allow you to split the UI into independent, reusable pieces...',
    order: 1
  },
  {
    id: '2',
    courseId: '2',
    title: 'State Management with useState',
    description: 'Master React hooks for managing component state',
    videoUrl: 'https://example.com/video2',
    duration: '22:15',
    completed: true,
    transcript: 'State is a fundamental concept in React. The useState hook allows functional components to maintain their own state...',
    order: 2
  },
  {
    id: '3',
    courseId: '2',
    title: 'Props and Component Communication',
    description: 'Pass data between components effectively',
    videoUrl: 'https://example.com/video3',
    duration: '18:45',
    completed: false,
    transcript: 'Props (short for properties) are how we pass data from parent to child components in React. They are read-only and help create reusable components...',
    order: 3
  }
];

// Mock projects
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Build a Task Management App',
    description: 'Create a full-stack task manager with authentication, CRUD operations, and real-time updates.',
    difficulty: 'intermediate',
    status: 'available',
    requiredCourses: ['2'],
    rubric: [
      'User authentication implemented',
      'CRUD operations functional',
      'Responsive UI design',
      'Clean code structure',
      'Documentation included'
    ],
    thumbnail: 'task management app'
  },
  {
    id: '2',
    title: 'ML Image Classifier',
    description: 'Build and train a convolutional neural network to classify images into different categories.',
    difficulty: 'advanced',
    status: 'locked',
    requiredCourses: ['1', '6'],
    rubric: [
      'Model achieves >85% accuracy',
      'Proper data preprocessing',
      'Model evaluation metrics included',
      'Clear documentation',
      'Deployment ready'
    ],
    thumbnail: 'machine learning neural network'
  },
  {
    id: '3',
    title: 'Algorithm Visualizer',
    description: 'Create an interactive tool to visualize sorting and searching algorithms.',
    difficulty: 'intermediate',
    status: 'in-progress',
    requiredCourses: ['3'],
    rubric: [
      'At least 5 algorithms visualized',
      'Step-by-step animation',
      'User controls for speed',
      'Code explanation panel',
      'Responsive design'
    ],
    thumbnail: 'algorithm visualization'
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'Design and develop a personal portfolio showcasing your skills and projects.',
    difficulty: 'beginner',
    status: 'completed',
    requiredCourses: ['4'],
    rubric: [
      'Professional design',
      'Project showcase section',
      'Contact form',
      'Mobile responsive',
      'Fast loading times'
    ],
    thumbnail: 'portfolio website'
  },
  {
    id: '5',
    title: 'E-Commerce Platform',
    description: 'Build a full-featured online shopping platform with cart, checkout, and payment integration.',
    difficulty: 'advanced',
    status: 'available',
    requiredCourses: ['2', '7'],
    rubric: [
      'Product catalog with search/filter',
      'Shopping cart functionality',
      'User authentication',
      'Payment gateway integration',
      'Order management system',
      'Admin dashboard'
    ],
    thumbnail: 'ecommerce shopping'
  },
  {
    id: '6',
    title: 'Real-Time Chat Application',
    description: 'Create a modern chat app with real-time messaging, file sharing, and group conversations.',
    difficulty: 'intermediate',
    status: 'available',
    requiredCourses: ['2'],
    rubric: [
      'Real-time message delivery',
      'User presence indicators',
      'Group chat support',
      'File/image sharing',
      'Message history',
      'Responsive design'
    ],
    thumbnail: 'chat messaging app'
  },
  {
    id: '7',
    title: 'Weather Forecast Dashboard',
    description: 'Build an interactive weather app with forecasts, maps, and historical data visualization.',
    difficulty: 'beginner',
    status: 'available',
    requiredCourses: ['2'],
    rubric: [
      'Current weather display',
      '7-day forecast',
      'Location search',
      'Weather maps integration',
      'Data visualization charts',
      'Mobile responsive'
    ],
    thumbnail: 'weather forecast'
  },
  {
    id: '8',
    title: 'Social Media Analytics Tool',
    description: 'Develop a data analytics platform for social media metrics with visualizations and insights.',
    difficulty: 'advanced',
    status: 'locked',
    requiredCourses: ['6', '1'],
    rubric: [
      'Multi-platform data integration',
      'Interactive dashboards',
      'Trend analysis',
      'Export reports (PDF/CSV)',
      'Predictive analytics',
      'Real-time updates'
    ],
    thumbnail: 'analytics dashboard'
  },
  {
    id: '9',
    title: 'Fitness Tracking App',
    description: 'Create a comprehensive fitness tracker with workout logging, progress charts, and goal setting.',
    difficulty: 'intermediate',
    status: 'available',
    requiredCourses: ['2', '10'],
    rubric: [
      'Workout logging',
      'Progress visualization',
      'Goal tracking',
      'Exercise library',
      'Calendar view',
      'Social sharing features'
    ],
    thumbnail: 'fitness workout'
  },
  {
    id: '10',
    title: 'Recipe Management System',
    description: 'Build a platform for saving, organizing, and sharing recipes with meal planning features.',
    difficulty: 'beginner',
    status: 'available',
    requiredCourses: ['2'],
    rubric: [
      'Recipe CRUD operations',
      'Category organization',
      'Search and filter',
      'Meal planning calendar',
      'Shopping list generator',
      'Recipe sharing'
    ],
    thumbnail: 'cooking recipes'
  },
  {
    id: '11',
    title: 'Blockchain Voting System',
    description: 'Implement a secure, transparent voting system using blockchain technology.',
    difficulty: 'advanced',
    status: 'locked',
    requiredCourses: ['5', '8'],
    rubric: [
      'Blockchain implementation',
      'Secure voter authentication',
      'Vote encryption',
      'Transparent audit trail',
      'Real-time results',
      'Smart contract integration'
    ],
    thumbnail: 'blockchain technology'
  },
  {
    id: '12',
    title: 'Music Streaming Player',
    description: 'Create a feature-rich music player with playlists, recommendations, and audio visualization.',
    difficulty: 'intermediate',
    status: 'available',
    requiredCourses: ['2'],
    rubric: [
      'Audio playback controls',
      'Playlist management',
      'Audio visualization',
      'Search functionality',
      'Favorite tracks',
      'Responsive design'
    ],
    thumbnail: 'music player'
  }
];

// Mock skills
export const mockSkills: Skill[] = [
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 70, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Programming' },
  { name: 'Data Structures', level: 65, category: 'CS Fundamentals' },
  { name: 'Algorithms', level: 60, category: 'CS Fundamentals' },
  { name: 'PostgreSQL', level: 55, category: 'Database' },
  { name: 'Machine Learning', level: 45, category: 'AI' },
  { name: 'UI/UX Design', level: 80, category: 'Design' }
];

// Mock certificates
export const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseName: 'UI/UX Design Fundamentals',
    dateEarned: '2024-08-15',
    instructor: 'Emily Turner'
  },
  {
    id: '2',
    courseName: 'Data Structures & Algorithms - Part 1',
    dateEarned: '2024-09-22',
    instructor: 'Prof. James Liu'
  }
];

// Mock peer matches
export const mockPeerMatches: PeerMatch[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    avatar: 'professional woman',
    matchScore: 95,
    commonTopics: ['React', 'Web Development', 'UI/UX'],
    skillLevel: 'Intermediate',
    timezone: 'UTC-5',
    availability: 'Evenings & Weekends',
    bio: 'Frontend developer passionate about creating beautiful user interfaces. Looking to collaborate on web projects.'
  },
  {
    id: '2',
    name: 'Kevin Patel',
    avatar: 'professional man',
    matchScore: 88,
    commonTopics: ['Machine Learning', 'Python', 'Data Science'],
    skillLevel: 'Intermediate',
    timezone: 'UTC-6',
    availability: 'Weekday Mornings',
    bio: 'ML enthusiast working on computer vision projects. Open to pair programming and study groups.'
  },
  {
    id: '3',
    name: 'Emily Chen',
    avatar: 'student learning',
    matchScore: 82,
    commonTopics: ['Algorithms', 'Problem Solving', 'Interview Prep'],
    skillLevel: 'Intermediate-Advanced',
    timezone: 'UTC-8',
    availability: 'Flexible Schedule',
    bio: 'Preparing for tech interviews. Love tackling challenging algorithm problems together!'
  }
];

// AI Chat messages
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your AI Study Buddy. I can help explain topics, answer questions, create quizzes, and generate practice problems. What would you like to learn about?",
    timestamp: new Date()
  }
];
