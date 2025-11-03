import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// AI Study Buddy simulation with RAG-like functionality
export async function getAIResponse(message: string, lessonContext?: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
  
  const lowerMessage = message.toLowerCase();
  
  // Quiz generation
  if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
    return `Here's a comprehensive 5-question quiz on ${lessonContext || 'this topic'}:

**Quiz: ${lessonContext || 'Current Lesson'}**

1. **Question:** What is the main purpose of React components?
   **Answer:** To break down the UI into reusable, independent pieces that manage their own state and can be composed together

2. **Question:** What hook is used for managing state in functional components?
   **Answer:** useState hook, which returns a state variable and a setter function

3. **Question:** Are props mutable or immutable in React?
   **Answer:** Immutable (read-only) - components cannot modify props they receive

4. **Question:** What does JSX stand for and why is it useful?
   **Answer:** JavaScript XML - it allows writing HTML-like code in JavaScript, making component structure more intuitive

5. **Question:** How do you pass data from parent to child component?
   **Answer:** Using props (properties) passed as attributes to the child component

**Scoring Guide:**
• 5/5: Excellent understanding
• 4/5: Good grasp of concepts
• 3/5: Review recommended
• <3/5: Revisit lesson materials

💡 **Tip:** Test yourself without looking at answers first!

Would you like me to create flashcards or generate more practice questions?`;
  }
  
  // Flashcard generation
  if (lowerMessage.includes('flashcard')) {
    return `Here are 10 flashcards for ${lessonContext || 'this topic'}:

**Flashcard Set Generated** 📚
Context: ${lessonContext || 'General Learning'}

1. Q: What is a React component? | A: A reusable piece of UI that can manage its own state and render logic
2. Q: What is useState? | A: A hook for managing state in functional components
3. Q: What are props? | A: Data passed from parent to child components (read-only)
4. Q: What is JSX? | A: A syntax extension for JavaScript that looks like HTML
5. Q: What is the virtual DOM? | A: A lightweight copy of the actual DOM for efficient updates
6. Q: What is a React hook? | A: Functions that let you use React features in functional components
7. Q: What is useEffect? | A: A hook for side effects in functional components (data fetching, subscriptions, etc.)
8. Q: What is component composition? | A: Building complex UIs from smaller, reusable components
9. Q: What is state? | A: Data that changes over time in a component
10. Q: What are keys in React? | A: Unique identifiers for list items to help React track changes

**Study Tips:**
• Review flashcards daily for best retention
• Shuffle the order when practicing
• Focus on cards you get wrong

Export as JSON or CSV to use with other flashcard apps!`;
  }
  
  // Example generation
  if (lowerMessage.includes('example') || lowerMessage.includes('show me')) {
    return `Here's a practical example with detailed explanation:

\`\`\`jsx
// Interactive Counter Component with Multiple Features
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  
  // Update double count whenever count changes
  useEffect(() => {
    setDoubleCount(count * 2);
  }, [count]);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
\`\`\`

**Step-by-Step Explanation:**

1. **State Management:** We use useState to create two state variables
   - \`count\`: tracks the main counter value
   - \`doubleCount\`: stores the doubled value

2. **Side Effects:** useEffect runs when \`count\` changes
   - Automatically updates \`doubleCount\`
   - Demonstrates reactive programming

3. **Event Handlers:** Three buttons with different actions
   - Increment: adds 1 to count
   - Decrement: subtracts 1 from count
   - Reset: sets count back to 0

4. **Rendering:** JSX displays both values dynamically

**Key Concepts:**
• State updates trigger re-renders
• useEffect manages side effects
• Event handlers update state
• Component re-renders when state changes

**Practice Challenge:** Try adding a "multiply by 3" feature!

Need another example or ready for a quiz?`;
  }
  
  // Explanation
  if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does')) {
    return `Let me break this down clearly for you:

**Understanding React Components** ${lessonContext ? `(Context: ${lessonContext})` : ''}

Think of components like LEGO blocks - each piece serves a specific purpose, and you can combine them to build something bigger.

**Core Concepts:**

🔹 **Components are Reusable**
   • Write once, use everywhere
   • Reduces code duplication
   • Makes maintenance easier

🔹 **Components Accept Props**
   • Props are like function parameters
   • They're read-only (immutable)
   • Passed from parent to child

🔹 **Components Manage State**
   • State is internal data that changes
   • When state changes, component re-renders
   • Use useState hook for state management

🔹 **Components Return JSX**
   • JSX looks like HTML but it's JavaScript
   • Gets compiled to React.createElement() calls
   • Makes UI code more readable

**Step-by-Step Process:**

1. **Create:** Write a JavaScript function
   \`\`\`jsx
   function MyComponent() { ... }
   \`\`\`

2. **Return JSX:** Define what to display
   \`\`\`jsx
   return <div>Hello!</div>;
   \`\`\`

3. **Use Props:** Accept and use data
   \`\`\`jsx
   function Greeting({ name }) {
     return <h1>Hello, {name}!</h1>;
   }
   \`\`\`

4. **Compose:** Use components together
   \`\`\`jsx
   <App>
     <Greeting name="Alex" />
   </App>
   \`\`\`

**Real-World Analogy:**
A Button component is like a cookie cutter - you define the shape once, then use it to create many cookies (button instances) with different decorations (props).

**Benefits:**
✅ Code reusability
✅ Better organization
✅ Easier testing
✅ Faster development
✅ Better collaboration

Would you like a practical code example, flashcards to memorize these concepts, or a quiz to test yourself?`;
  }

  // Practice problems
  if (lowerMessage.includes('practice') || lowerMessage.includes('problem') || lowerMessage.includes('challenge')) {
    return `Here are 3 practice problems to strengthen your skills:

**Practice Problems** 🎯

**Problem 1: Easy**
Create a component that displays a greeting message based on the time of day (morning, afternoon, evening).

**Hints:**
• Use JavaScript Date object
• Use conditional rendering
• Display different messages based on hour

---

**Problem 2: Medium**
Build a TodoList component that:
• Displays a list of tasks
• Allows adding new tasks
• Can mark tasks as complete
• Shows total number of tasks

**Hints:**
• Use useState for task array
• Use array.map() to render tasks
• Handle form submission
• Use checkboxes for completion status

---

**Problem 3: Advanced**
Create a SearchableList component that:
• Displays a list of items
• Has a search input that filters the list
• Shows "No results" when nothing matches
• Highlights matching text

**Hints:**
• Maintain two pieces of state (items, searchTerm)
• Use array.filter() for searching
• Use toLowerCase() for case-insensitive search
• Consider using useEffect for debouncing

**Ready to check your solutions?**
Paste your code and I'll review it, or ask for the solution to any problem!`;
  }
  
  // Default helpful response
  return `I'm your AI Study Buddy! 🤖✨

I can help you learn more effectively by providing:

📚 **Explanations**
   • Break down complex topics in simple terms
   • Provide step-by-step guidance
   • Use real-world analogies

📝 **Quizzes & Tests**
   • Generate custom quizzes on any topic
   • Create practice questions
   • Include answer explanations

🗂️ **Flashcards**
   • Generate study flashcards
   • Export as JSON or CSV
   • Perfect for spaced repetition

💻 **Code Examples**
   • Show practical implementations
   • Explain code line-by-line
   • Provide working examples

🎯 **Practice Problems**
   • Generate coding challenges
   • Review your solutions
   • Offer hints and guidance

**Quick Commands:**
• "Explain [topic]" - Get detailed explanations
• "Create a quiz" - Generate practice quiz
• "Generate flashcards" - Create study cards
• "Show me an example" - See code examples
• "Give me practice problems" - Get coding challenges

What would you like to learn about today?`;
}

// OCR processing simulation
export async function processOCR(file: File): Promise<{
  cleanText: string;
  summary: string;
  flashcards: Array<{ question: string; answer: string }>;
}> {
  // Simulate OCR processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    cleanText: `# Machine Learning Fundamentals

## Introduction
Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## Key Concepts

### Supervised Learning
- Uses labeled training data
- Learns mapping from inputs to outputs
- Examples: Classification, Regression

### Unsupervised Learning
- Works with unlabeled data
- Finds hidden patterns
- Examples: Clustering, Dimensionality Reduction

### Neural Networks
- Inspired by biological neurons
- Multiple layers of interconnected nodes
- Deep learning uses many layers

## Important Algorithms
1. Linear Regression
2. Logistic Regression
3. Decision Trees
4. Random Forests
5. Support Vector Machines
6. K-Means Clustering

## Applications
- Image Recognition
- Natural Language Processing
- Recommendation Systems
- Autonomous Vehicles`,
    summary: `Key points from your notes:
• Machine learning enables systems to learn from experience
• Two main types: Supervised (labeled data) and Unsupervised (unlabeled data)
• Neural networks are inspired by biological neurons and power deep learning
• Common algorithms include Linear/Logistic Regression, Decision Trees, Random Forests, SVM, and K-Means
• Applications span image recognition, NLP, recommendations, and autonomous vehicles`,
    flashcards: [
      { question: 'What is Machine Learning?', answer: 'A subset of AI that enables systems to learn from experience without explicit programming' },
      { question: 'What is Supervised Learning?', answer: 'Learning from labeled training data to map inputs to outputs' },
      { question: 'What is Unsupervised Learning?', answer: 'Finding hidden patterns in unlabeled data' },
      { question: 'What are Neural Networks inspired by?', answer: 'Biological neurons in the human brain' },
      { question: 'Name three ML applications', answer: 'Image recognition, NLP, recommendation systems' },
      { question: 'What is Deep Learning?', answer: 'Neural networks with many layers for complex pattern recognition' }
    ]
  };
}

// Peer matching algorithm simulation
export function calculateMatchScore(student1: any, student2: any): number {
  // Simple scoring based on common topics, skill level, and timezone
  let score = 0;
  
  // Common topics (0-50 points)
  const commonTopics = student1.topics?.filter((t: string) => 
    student2.topics?.includes(t)
  ).length || 0;
  score += Math.min(commonTopics * 15, 50);
  
  // Skill level match (0-30 points)
  if (student1.skillLevel === student2.skillLevel) {
    score += 30;
  } else {
    score += 15;
  }
  
  // Timezone match (0-20 points)
  if (student1.timezone === student2.timezone) {
    score += 20;
  } else {
    score += 10;
  }
  
  return Math.min(score, 100);
}

// Generate PDF export (simulation)
export function generatePortfolioPDF(data: any): void {
  // In a real app, this would use a library like jsPDF
  console.log('Generating PDF with data:', data);
  
  // Simulate PDF generation
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Progress calculation
export function calculateOverallProgress(courses: any[]): number {
  if (courses.length === 0) return 0;
  const total = courses.reduce((sum, course) => sum + course.progress, 0);
  return Math.round(total / courses.length);
}

// Format date
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Time ago
export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
