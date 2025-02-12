import { COLORS } from '@/app/constants/color';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isMain?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  subtitle,
  isMain,
}) => {
  return (
    <div
      className={`
      flex items-center justify-between gap-4 p-2 rounded-xl border-2 border-gray-300 max-w-5xl shadow-sm hover:shadow-md transition-all
      ${isMain ? `${COLORS.bgPurple}` : 'bg-white'}
    `}
    >
      <div className="flex items-center gap-4 flex-grow">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3
            className={`font-medium ${isMain ? 'text-white' : 'text-gray-800'}`}
          >
            {title}
          </h3>
          <p
            className={`text-sm ${
              isMain ? 'text-blue-100/80' : 'text-gray-400'
            }`}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <>
        {!isMain && (
          <button
            className={`flex px-2 py-1 ${COLORS.bgPurple} ${COLORS.hoverbgGreen} text-white rounded-lg text-sm flex items-center justify-center group font-medium transition-colors ml-auto`}
          >
            Click
            <ArrowRight
              className="ml-1 w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 text-white transition-all duration-50"
              size={10}
            />
          </button>
        )}
      </>
    </div>
  );
};

export default ServiceCard;
