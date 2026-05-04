import React from 'react';

export const SectionDivider: React.FC = () => (
  <div className="relative py-4">
    <div
      className="h-px w-full max-w-7xl mx-auto"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(18, 78, 70, 0.2), rgba(155, 90, 50, 0.15), transparent)',
      }}
    />
  </div>
);
