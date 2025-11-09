import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Calendar, User, DollarSign } from 'lucide-react';

export default function IssueDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const issue = location.state?.issue;

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Issue not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 overflow-hidden">
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
              }}
            />
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                {issue.category}
              </span>
              <span className="text-gray-500 text-sm flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{issue.date}</span>
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {issue.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-6 space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{issue.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{issue.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>${issue.amount}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {issue.description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Report Similar Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

