import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContentState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePortfolioContent<T>(sectionKey: string, defaultData: T): ContentState<T> & { data: T } {
  const [state, setState] = useState<ContentState<T>>({
    data: defaultData,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_content')
          .select('content')
          .eq('section_key', sectionKey)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data?.content) {
          setState({
            data: data.content as T,
            isLoading: false,
            error: null
          });
        } else {
          setState({
            data: defaultData,
            isLoading: false,
            error: null
          });
        }
      } catch (error) {
        console.error(`Error loading ${sectionKey} content:`, error);
        setState({
          data: defaultData,
          isLoading: false,
          error: error as Error
        });
      }
    };

    loadContent();
  }, [sectionKey]);

  return { ...state, data: state.data ?? defaultData };
}
