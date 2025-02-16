'use client';
import rootStore from '@/stores/config/RootStore';
import { StoreContext } from '@/stores/config/StoreContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider
      value={{
        rootStore,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {/* {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
        {children}
      </QueryClientProvider>
    </StoreContext.Provider>
  );
}
