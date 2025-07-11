import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { searchSimDetails, incrementCounter } from '../services/api';

export const SearchBox: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { theme } = useTheme();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobileNumber.trim()) {
      alert('Please enter a mobile number');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const searchResult = await searchSimDetails(mobileNumber);
      setResult(searchResult);
      incrementCounter();
      window.location.reload(); // Refresh to update counter
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred while searching'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div 
        className="rounded-2xl p-6 shadow-lg border"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
          boxShadow: `0 10px 25px -5px ${theme.primary}20`
        }}
      >
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number here"
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.background,
                color: theme.text
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            style={{
              backgroundColor: theme.primary,
              color: 'white'
            }}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Search size={20} />
            )}
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </form>

        {result && (
          <div className="mt-4 p-4 rounded-xl" style={{
            backgroundColor: result.success ? '#F0FDF4' : '#FEF2F2',
            borderColor: result.success ? '#10B981' : '#EF4444',
            border: '1px solid'
          }}>
            <p style={{ color: result.success ? '#065F46' : '#991B1B' }}>
              {result.success ? 'Search completed successfully!' : result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};