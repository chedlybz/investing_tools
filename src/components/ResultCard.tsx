import React from 'react';

interface ResultCardProps {
  title: string;
  value: number;
  suffix?: string;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  value,
  suffix = '%',
  className = '',
}) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {value.toFixed(2)}
        {suffix}
      </p>
    </div>
  );
};