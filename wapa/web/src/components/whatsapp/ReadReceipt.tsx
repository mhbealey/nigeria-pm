import React, { useEffect, useState } from 'react';

interface ReadReceiptProps {
  status: 'sent' | 'delivered' | 'read';
  /** When true, animates through sent -> delivered -> read with delays */
  animate?: boolean;
}

const ReadReceipt: React.FC<ReadReceiptProps> = ({ status, animate = false }) => {
  const [displayStatus, setDisplayStatus] = useState<'sent' | 'delivered' | 'read'>(
    animate ? 'sent' : status
  );

  useEffect(() => {
    if (!animate) {
      setDisplayStatus(status);
      return;
    }

    // Start at 'sent', then transition through stages
    setDisplayStatus('sent');

    const stages: Array<{ status: 'sent' | 'delivered' | 'read'; delay: number }> = [];

    if (status === 'delivered' || status === 'read') {
      stages.push({ status: 'delivered', delay: 800 });
    }
    if (status === 'read') {
      stages.push({ status: 'read', delay: 1800 });
    }

    const timers = stages.map(({ status: s, delay }) =>
      setTimeout(() => setDisplayStatus(s), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [status, animate]);

  const color = displayStatus === 'read' ? '#53bdeb' : '#8696a0';

  if (displayStatus === 'sent') {
    return (
      <svg
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
        className="inline-block ml-1"
        style={{ transition: 'color 200ms ease' }}
      >
        <path
          d="M11.071 0.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178L5.45 7.134 3.839 5.116a.46.46 0 0 0-.357-.178.414.414 0 0 0-.356.153c-.178.204-.178.509 0 .712l1.916 2.446a.552.552 0 0 0 .357.178h.05a.49.49 0 0 0 .382-.178l5.24-6.884c.153-.204.128-.458-.05-.611z"
          fill={color}
        />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      className="inline-block ml-1"
      style={{ transition: 'color 200ms ease' }}
    >
      <path
        d="M11.071 0.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178L5.45 7.134 3.839 5.116a.46.46 0 0 0-.357-.178.414.414 0 0 0-.356.153c-.178.204-.178.509 0 .712l1.916 2.446a.552.552 0 0 0 .357.178h.05a.49.49 0 0 0 .382-.178l5.24-6.884c.153-.204.128-.458-.05-.611z"
        fill={color}
        style={{ transition: 'fill 200ms ease' }}
      />
      <path
        d="M14.071 0.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178L8.45 7.134l-.508-.662-.076.076L6.45 8.212l.534.688a.552.552 0 0 0 .357.178h.05a.49.49 0 0 0 .382-.178l6.24-7.635c.153-.204.128-.458-.05-.611z"
        fill={color}
        style={{ transition: 'fill 200ms ease' }}
      />
    </svg>
  );
};

export default ReadReceipt;
