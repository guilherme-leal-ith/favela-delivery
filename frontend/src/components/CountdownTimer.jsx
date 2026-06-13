import { useEffect, useState } from 'react';

export default function CountdownTimer({ seconds = 600, onExpire }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) {
      onExpire?.();
      return undefined;
    }
    const timer = setTimeout(() => setLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [left, onExpire]);

  const minutes = String(Math.floor(left / 60)).padStart(2, '0');
  const secs = String(left % 60).padStart(2, '0');
  return <span className="countdown">{minutes}:{secs}</span>;
}
