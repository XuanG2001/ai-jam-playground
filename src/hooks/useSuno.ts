import { useState, useCallback } from 'react';
import { GenerateParams, GenerateResponse } from '../types';

const API_BASE_URL = '/api';

export const useSuno = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generate = useCallback(async (params: GenerateParams) => {
    try {
      setLoading(true);
      setError(null);
      setProgress(0);
      setAudioUrl(null);

      const callBackUrl = import.meta.env.VITE_SUNO_CALLBACK || null;
      
      const response = await fetch(`${API_BASE_URL}/v1/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...params,
          callBackUrl
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '生成音乐时出错');
      }

      const data: GenerateResponse = await response.json();
      setGenerationId(data.id);

      if (data.status === 'COMPLETE' && data.audio_url) {
        setAudioUrl(data.audio_url);
        setProgress(100);
      } else {
        // Start polling if not immediately complete
        await pollGenerationStatus(data.id);
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const pollGenerationStatus = useCallback(async (id: string) => {
    let retries = 0;
    const maxRetries = 120; // 10 minutes (5s interval)
    
    const poll = async () => {
      if (retries >= maxRetries) {
        setError('生成超时');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/v1/generate/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '检查生成状态时出错');
        }
        
        const data: GenerateResponse = await response.json();
        setProgress(data.progress || 0);
        
        if (data.status === 'COMPLETE' && data.audio_url) {
          setAudioUrl(data.audio_url);
          setLoading(false);
          return;
        } else if (data.status === 'FAILED') {
          setError(data.error || '生成失败');
          setLoading(false);
          return;
        }
        
        // Continue polling
        retries++;
        setTimeout(poll, 5000);
      } catch (err) {
        setError(err instanceof Error ? err.message : '检查状态时出错');
        setLoading(false);
      }
    };
    
    await poll();
  }, []);

  const extendTrack = useCallback(async (id: string) => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/v1/generate/extend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '延长音乐时出错');
      }
      
      const data: GenerateResponse = await response.json();
      setGenerationId(data.id);
      
      if (data.status === 'COMPLETE' && data.audio_url) {
        setAudioUrl(data.audio_url);
      } else {
        // Start polling if not immediately complete
        await pollGenerationStatus(data.id);
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pollGenerationStatus]);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
    setProgress(0);
    setGenerationId(null);
    setAudioUrl(null);
  }, []);

  return {
    generate,
    extendTrack,
    reset,
    error,
    loading,
    progress,
    generationId,
    audioUrl,
    setAudioUrl
  };
};

export default useSuno; 