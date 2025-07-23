import React from 'react';
import { FaLightbulb, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const calloutConfig = {
  NOTE: {
    icon: FaInfoCircle,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-400 dark:border-blue-600',
    textColor: 'text-blue-800 dark:text-blue-200',
  },
  TIP: {
    icon: FaLightbulb,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-400 dark:border-green-600',
    textColor: 'text-green-800 dark:text-green-200',
  },
  WARNING: {
    icon: FaExclamationTriangle,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-400 dark:border-yellow-600',
    textColor: 'text-yellow-800 dark:text-yellow-200',
  },
};

const Callout = ({ type = 'NOTE', children }) => {
  const config = calloutConfig[type] || calloutConfig.NOTE;
  const Icon = config.icon;

  return (
    <div className={`my-8 px-5 py-4 border-l-4 rounded-r-md ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Icon className={`w-5 h-5 ${config.textColor}`} />
        </div>
        <div className={`prose-p:my-0 prose-ul:my-0 prose-li:my-1 text-base ${config.textColor}`}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;