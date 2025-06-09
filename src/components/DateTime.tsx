
import React, { useState, useEffect } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { Calendar, Clock } from 'lucide-react';

export const DateTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const southAfricaTimezone = 'Africa/Johannesburg';
  const formattedDate = formatInTimeZone(currentTime, southAfricaTimezone, 'EEEE, dd MMMM yyyy');
  const formattedTime = formatInTimeZone(currentTime, southAfricaTimezone, 'HH:mm:ss');

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 text-center text-white mb-4 sm:mb-6 shadow-lg">
      <div className="flex items-center justify-center space-x-4 text-sm sm:text-base">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" />
          <span className="text-sm sm:text-lg font-semibold text-white/95 tracking-wide">{formattedDate}</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-300" />
          <span className="text-lg sm:text-2xl font-mono font-bold text-cyan-200 tracking-wider">{formattedTime}</span>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-white/80 mt-2 font-medium italic">South African Time</p>
    </div>
  );
};
