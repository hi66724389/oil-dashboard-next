'use client';

import React, { ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';

export const ClientProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};
