import { useState, useEffect } from 'preact/hooks';

const CHANNEL_NAME = 'bga-ext-options-sync';

export function useSyncedState<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);

    const handleMessage = (event: MessageEvent) => {
      if (event.data.key === key) {
        setState(event.data.value);
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [key]);

  const syncedSetState = (value: T) => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ key, value });
    channel.close();
    setState(value);
  };

  return [state, syncedSetState];
}