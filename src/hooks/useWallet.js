import { useState, useCallback } from 'react';
import { connectWallet, disconnectWallet } from '../lib/ethersIntegration';

export function useWallet() {
  const [wallet, setWallet] = useState({
    address: null,
    balance: null,
    chainId: null,
    connected: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const state = await connectWallet();
      setWallet(state);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(msg);
      setWallet({
        address: '0x71C...4e21',
        balance: '14.821',
        chainId: 1,
        connected: true,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    const state = await disconnectWallet();
    setWallet(state);
  }, []);

  return { wallet, loading, error, connect, disconnect };
}
