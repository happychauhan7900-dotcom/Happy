import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { NewsCard } from './components/NewsCard';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { Update, Category, University } from './types';
import { AlertCircle } from 'lucide-react';

// Mock Data
const MOCK_UPDATES: Update[] = [
  {
    id: '1',
    title: 'JNTUH B.Tech 4-1 Semester Regular/Supply Exams Notification - Feb 2025',
    date: 'Oct 26, 2023',
    category: Category.Notifications,
    university: University.JNTUH,
    isNew: true,
    description: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH) has released the notification for B.Tech 4-1 Semester Regular/Supplementary Examinations scheduled to commence in February 2025. Students are requested to pay the exam fee before the last date to avoid penalties.'
  },
  {
    id: '2',
    title: 'OU Degree 1st, 3rd, 5th Sem Results Released',
    date: 'Oct 25, 2023',
    category: Category.Results,
    university: University.OU,
    isNew: true,
    description: 'Osmania University has officially declared the results for Degree (BA/B.Com/B.Sc) 1st, 3rd, and 5th Semester examinations held in August 2023. Students can check their results on the official website osmania.ac.in.'
  },
  {
    id: '3',
    title: 'AU R19 Syllabus for CSE 3-2 Semester Updated',
    date: 'Oct 24, 2023',
    category: Category.Syllabus,
    university: University.AU,
    description: 'Andhra University has updated the R19 regulation syllabus for Computer Science Engineering (CSE) 3rd Year 2nd Semester. The new syllabus includes changes in electives and lab sessions effective from the 2023-24 academic year.'
  },
  {
    id: '4',
    title: 'TS EAMCET 2025 Counseling Schedule Announced',
    date: 'Oct 22, 2023',
    category: Category.Notifications,
    university: University.General,
    description: 'The Telangana State Council of Higher Education (TSCHE) has announced the schedule for TS EAMCET 2025 Counseling. Slot booking for certificate verification starts from November 1st. Check the detailed schedule here.'
  },
  {
    id: '5',
    title: 'JNTUK B.Pharmacy 2-2 Sem Time Table Released',
    date: 'Oct 20, 2023',
    category: Category.TimeTables,
    university: University.JNTUK,
    description: 'JNTU Kakinada has released the detailed time table for B.Pharmacy 2-2 Semester Regular/Supplementary Examinations. Exams will be conducted in the morning session from 10:00 AM to 1:00 PM.'
  },
  {
    id: '6',
    title: 'Revaluation Fee Notification for OU PG Courses',
    date: 'Oct 18, 2023',
    category: Category.Notifications,
    university: University.OU,
    description: 'Osmania University invites applications for Revaluation / Recounting of PG (MA/M.Sc/M.Com) results. The last date for submission of the application form along with the prescribed fee is November 10th.'
  }
];

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiContext, setAiContext] = useState<string | undefined>(undefined);

  // Filter Logic
  const filteredUpdates = useMemo(() => {
    return MOCK_UPDATES.filter(update => {
      const matchesCategory = selectedCategory === 'All' || update.category === selectedCategory;
      const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            update.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAskAI = (update: Update) => {
    setAiContext(`Update Title: ${update.title}\nDate: ${update.date}\nUniversity: ${update.university}\nDetails: ${update.description}`);
    setIsAIOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onSearch={setSearchQuery} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Alert Section */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r shadow-sm flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
                <h4 className="text-sm font-bold text-yellow-800">Important Update</h4>
                <p className="text-sm text-yellow-700">TS EAMCET 2025 Counseling dates have been revised. Check the latest notification below.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-slate-800">
                    {selectedCategory === 'All' ? 'Latest Updates' : `${selectedCategory} Updates`}
                </h2>
                <span className="text-sm text-slate-500">Showing {filteredUpdates.length} results</span>
            </div>
            
            {filteredUpdates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredUpdates.map(update => (
                        <NewsCard 
                            key={update.id} 
                            update={update} 
                            onAskAI={handleAskAI}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                    <p className="text-slate-500">No updates found matching your criteria.</p>
                    <button 
                        onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                        className="mt-2 text-blue-600 font-medium hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
                <Sidebar 
                    onCategorySelect={setSelectedCategory} 
                    selectedCategory={selectedCategory}
                />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      
      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        onOpen={() => setIsAIOpen(true)}
        initialContext={aiContext}
      />
    </div>
  );
};

export default App;