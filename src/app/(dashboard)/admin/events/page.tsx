import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FiEye, FiPlus } from 'react-icons/fi';
import EventCard from '@/components/EventCard';

interface Event {
  id: string;
  title: string;
  coverImage?: string;
  date: string;
  slug: string;
  description?: string;
}

const EventsPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
        <h2 className="text-2xl font-semibold text-gray-800">Please login to view your events</h2>
      </div>
    );
  }

  // Mock data - replace with actual data fetching
  const events: Event[] = [
    {
      id: '1',
      title: 'John & Emily Wedding',
      coverImage: '/placeholder-wedding.jpg',
      date: '2024-06-15',
      slug: 'john-emily',
      description: 'Our beautiful wedding ceremony in Santorini'
    },
    {
      id: '2',
      title: 'Sarah & Michael Engagement',
      date: '2024-08-22',
      slug: 'sarah-michael',
      description: 'Engagement party at the beach house'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Events</h1>
          <Link 
            href="/admin/events/create"
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus /> Create New Event
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinecap="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No events yet</h3>
            <p className="mt-1 text-gray-500">Get started by creating your first wedding event.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;