import { useState } from 'react';
import { LandingPage } from './components/landing/landing-page';
import { AuthPage } from './components/auth/auth-page';
import { DashboardLayout } from './components/shared/dashboard-layout';
import { StudentDashboard } from './components/dashboard/student-dashboard';
import { TeacherDashboard } from './components/dashboard/teacher-dashboard';
import { AdminDashboard } from './components/dashboard/admin-dashboard';
import { CourseViewer } from './components/courses/course-viewer';
import { PeerFinder } from './components/peers/peer-finder';
import { SkillPortfolio } from './components/portfolio/skill-portfolio';
import { ProjectsPage } from './components/projects/projects-page';
import { NotesScanner } from './components/notes/notes-scanner';
import { CourseGrid } from './components/dashboard/course-grid';
import { PaymentModal } from './components/payment/payment-modal';
import { Toaster } from './components/ui/sonner';
import {
  currentUser as mockCurrentUser,
  mockCourses,
  mockLessons,
  mockRoadmap,
  mockPeerMatches,
  mockSkills,
  mockCertificates,
  mockProjects,
  User,
  Course,
} from './lib/mock-data';

type Page =
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'courses'
  | 'course-viewer'
  | 'projects'
  | 'peers'
  | 'portfolio'
  | 'notes'
  | 'students'
  | 'analytics'
  | 'content'
  | 'users'
  | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [courseForPayment, setCourseForPayment] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleCourseClick = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    
    // Check if course requires payment and user hasn't enrolled
    if (course && !course.isFree && !enrolledCourses.has(courseId)) {
      setCourseForPayment(course);
      setPaymentModalOpen(true);
    } else {
      setSelectedCourseId(courseId);
      setCurrentPage('course-viewer');
    }
  };

  const handlePaymentSuccess = (courseId: string) => {
    setEnrolledCourses(prev => new Set([...prev, courseId]));
    setPaymentModalOpen(false);
    setSelectedCourseId(courseId);
    setCurrentPage('course-viewer');
  };

  const handleBackFromCourse = () => {
    setSelectedCourseId(null);
    setCurrentPage('courses');
  };

  const selectedCourse = mockCourses.find(c => c.id === selectedCourseId);

  // Landing page
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage onGetStarted={(role) => setCurrentPage('auth')} />
        <Toaster />
      </>
    );
  }

  // Auth page
  if (currentPage === 'auth') {
    return (
      <>
        <AuthPage
          onLogin={handleLogin}
          onBack={() => setCurrentPage('landing')}
        />
        <Toaster />
      </>
    );
  }

  // Dashboard pages (requires login)
  if (!user) {
    setCurrentPage('landing');
    return null;
  }

  // Course viewer
  if (currentPage === 'course-viewer' && selectedCourse) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
          <CourseViewer
            course={selectedCourse}
            lessons={mockLessons}
            onBack={handleBackFromCourse}
          />
        </div>
        <Toaster />
      </>
    );
  }

  // Render page content based on current page and user role
  const renderPageContent = () => {
    // Student pages
    if (user.role === 'student') {
      switch (currentPage) {
        case 'dashboard':
          return (
            <StudentDashboard
              courses={mockCourses}
              roadmap={mockRoadmap}
              onCourseClick={handleCourseClick}
              onStartLesson={(courseId) => handleCourseClick(courseId)}
            />
          );
        case 'courses':
          return (
            <CourseGrid
              courses={mockCourses}
              onCourseClick={handleCourseClick}
              title="All Courses"
              showProgress={true}
            />
          );
        case 'projects':
          return <ProjectsPage projects={mockProjects} />;
        case 'peers':
          return <PeerFinder matches={mockPeerMatches} />;
        case 'portfolio':
          return (
            <SkillPortfolio
              skills={mockSkills}
              certificates={mockCertificates}
              projects={mockProjects}
              userName={user.name}
            />
          );
        case 'notes':
          return <NotesScanner />;
        default:
          return (
            <StudentDashboard
              courses={mockCourses}
              roadmap={mockRoadmap}
              onCourseClick={handleCourseClick}
              onStartLesson={(courseId) => handleCourseClick(courseId)}
            />
          );
      }
    }

    // Teacher pages
    if (user.role === 'teacher') {
      switch (currentPage) {
        case 'dashboard':
          return <TeacherDashboard courses={mockCourses} />;
        case 'courses':
          return (
            <CourseGrid
              courses={mockCourses}
              onCourseClick={handleCourseClick}
              title="My Courses"
              showProgress={false}
            />
          );
        case 'students':
          return (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl text-white mb-6">Students</h1>
              <div className="p-12 text-center text-gray-400">
                Student management interface would go here
              </div>
            </div>
          );
        case 'analytics':
          return (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl text-white mb-6">Analytics</h1>
              <div className="p-12 text-center text-gray-400">
                Detailed analytics and insights would go here
              </div>
            </div>
          );
        case 'content':
          return (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl text-white mb-6">Create Content</h1>
              <div className="p-12 text-center text-gray-400">
                Course creation and content management would go here
              </div>
            </div>
          );
        default:
          return <TeacherDashboard courses={mockCourses} />;
      }
    }

    // Admin pages
    if (user.role === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl text-white mb-6">User Management</h1>
              <div className="p-12 text-center text-gray-400">
                User management interface would go here
              </div>
            </div>
          );
        case 'courses':
          return (
            <CourseGrid
              courses={mockCourses}
              onCourseClick={handleCourseClick}
              title="All Platform Courses"
              showProgress={false}
            />
          );
        case 'analytics':
          return (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl text-white mb-6">Platform Analytics</h1>
              <div className="p-12 text-center text-gray-400">
                Platform-wide analytics would go here
              </div>
            </div>
          );
        case 'settings':
          return (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl text-white mb-6">Platform Settings</h1>
              <div className="p-12 text-center text-gray-400">
                Platform configuration would go here
              </div>
            </div>
          );
        default:
          return <AdminDashboard />;
      }
    }

    return null;
  };

  return (
    <>
      <DashboardLayout
        user={user}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      >
        {renderPageContent()}
      </DashboardLayout>
      
      {/* Payment Modal */}
      {courseForPayment && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => {
            setPaymentModalOpen(false);
            setCourseForPayment(null);
          }}
          course={courseForPayment}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      
      <Toaster />
    </>
  );
}
