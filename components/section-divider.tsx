import React from 'react';

export const SectionDivider: React.FC = () => (
  <div className="relative py-4">
    <div
      className="h-px w-full max-w-7xl mx-auto"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15), transparent)',
      }}
    />
  </div>
);
