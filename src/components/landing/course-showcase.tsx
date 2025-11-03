import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { BookOpen, Clock, Users, Star, TrendingUp } from 'lucide-react';

export function CourseShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const visibleCourses = [
    featuredCourses[currentIndex],
    featuredCourses[(currentIndex + 1) % featuredCourses.length],
    featuredCourses[(currentIndex + 2) % featuredCourses.length],
  ];

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden" id="courses">
      {/* Background decoration - static for performance */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-400">Popular Courses</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Top Courses
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Learn from industry experts and build real-world skills
          </p>
        </motion.div>

        {/* Animated course cards */}
        <div className="relative h-[500px] lg:h-[400px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {visibleCourses.map((course, index) => (
              <motion.div
                key={`${course.id}-${currentIndex}-${index}`}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 150 : -150,
                  y: 50,
                  scale: 0.7,
                  rotateY: direction > 0 ? 45 : -45,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateY: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -150 : 150,
                  y: -50,
                  scale: 0.7,
                  rotateY: direction > 0 ? -45 : 45,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: -5,
                  transition: { duration: 0.3 },
                }}
                className="relative group cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-teal-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-teal-500/20 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                {/* Card content */}
                <div className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-white/30 transition-all duration-300">
                  {/* Category badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-4"
                  >
                    <span className="text-xs text-indigo-400">{course.category}</span>
                  </motion.div>

                  <h3 className="text-xl text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <BookOpen className="w-4 h-4 text-teal-400" />
                      <span className="text-sm">{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {course.progress}% enrolled
                  </p>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                    >
                      View Course
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-12">
          {featuredCourses.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-500'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const featuredCourses = [
  {
    id: 1,
    title: 'Full-Stack Web Development',
    description: 'Master modern web development with React, Node.js, and PostgreSQL',
    category: 'Development',
    duration: '12 weeks',
    students: '2.5K',
    lessons: 48,
    rating: '4.9',
    progress: 85,
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    description: 'Learn ML algorithms, neural networks, and real-world applications',
    category: 'AI & ML',
    duration: '10 weeks',
    students: '1.8K',
    lessons: 36,
    rating: '4.8',
    progress: 72,
  },
  {
    id: 3,
    title: 'UI/UX Design Mastery',
    description: 'Create stunning user interfaces and exceptional user experiences',
    category: 'Design',
    duration: '8 weeks',
    students: '3.2K',
    lessons: 32,
    rating: '4.9',
    progress: 91,
  },
  {
    id: 4,
    title: 'Data Science with Python',
    description: 'Analyze data, build models, and derive insights using Python',
    category: 'Data Science',
    duration: '14 weeks',
    students: '2.1K',
    lessons: 52,
    rating: '4.7',
    progress: 68,
  },
  {
    id: 5,
    title: 'Mobile App Development',
    description: 'Build native iOS and Android apps with React Native',
    category: 'Development',
    duration: '10 weeks',
    students: '1.5K',
    lessons: 40,
    rating: '4.8',
    progress: 79,
  },
  {
    id: 6,
    title: 'Cloud Architecture',
    description: 'Master AWS, Azure, and cloud-native application design',
    category: 'Cloud',
    duration: '12 weeks',
    students: '1.3K',
    lessons: 44,
    rating: '4.9',
    progress: 64,
  },
];
