import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Clock, Users, BookOpen, Play, Filter, DollarSign } from 'lucide-react';
import { Course } from '../../lib/mock-data';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { unsplash_tool } from '../../lib/unsplash-helper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CourseGridProps {
  courses: Course[];
  onCourseClick: (courseId: string) => void;
  title?: string;
  showProgress?: boolean;
}

export function CourseGrid({ courses, onCourseClick, title = 'All Courses', showProgress = true }: CourseGridProps) {
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(courses.map(c => c.category))];
  
  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesPrice = 
      priceFilter === 'all' || 
      (priceFilter === 'free' && course.isFree) ||
      (priceFilter === 'paid' && !course.isFree);
    
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    return matchesPrice && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl text-white">{title}</h2>
        
        {/* Filters */}
        <div className="flex items-center gap-3">
          <Select value={priceFilter} onValueChange={(value: any) => setPriceFilter(value)}>
            <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10">
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="free">Free Only</SelectItem>
              <SelectItem value="paid">Paid Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10">
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ 
              delay: index * 0.08, 
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{ 
              y: -12, 
              scale: 1.03,
              rotateY: 2,
              transition: { duration: 0.3 }
            }}
            className="group relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            />
            
            <Card className="relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop`}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Price tag */}
                <Badge className={`absolute top-3 left-3 text-white border-0 ${
                  course.isFree 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                }`}>
                  {course.isFree ? 'FREE' : `${course.price}`}
                </Badge>
                
                <Badge className="absolute top-3 right-3 bg-purple-500/90 text-white border-0">
                  {course.difficulty}
                </Badge>
                {showProgress && course.progress > 0 && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/90">{course.progress}% Complete</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5 bg-white/20" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <Badge variant="outline" className="border-purple-400/50 text-purple-400 mb-2">
                    {course.category}
                  </Badge>
                  <h3 className="text-white mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{course.description}</p>
                </div>

                <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  {course.enrolledStudents && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{course.enrolledStudents.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-white/10 text-gray-300 border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-400">by {course.instructor}</p>
                    {!course.isFree && (
                      <div className="flex items-center gap-1 text-xs text-purple-400">
                        <DollarSign className="w-3 h-3" />
                        <span>${course.price?.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onCourseClick(course.id)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-white/20"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    {course.progress > 0 ? 'Continue' : course.isFree ? 'Start' : 'Enroll'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
