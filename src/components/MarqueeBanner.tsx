import './MarqueeBanner.css';

export function MarqueeBanner() {
  const items = [
    'independent software studio',
    '✦',
    'custom web & app development',
    '✦',
    'google play closed testing',
    '✦',
    'get instant quote',
    '✦',
    '100% source code ownership',
    '✦',
  ];

  return (
    <div className="marquee-banner" role="region" aria-label="Ticker Announcements">
      <div className="marquee-banner__track">
        <div className="marquee-banner__content">
          {items.map((text, i) => (
            <span
              key={`m1-${i}`}
              className={text === '✦' ? 'marquee-banner__sparkle' : 'marquee-banner__text'}
            >
              {text}
            </span>
          ))}
        </div>
        <div className="marquee-banner__content" aria-hidden="true">
          {items.map((text, i) => (
            <span
              key={`m2-${i}`}
              className={text === '✦' ? 'marquee-banner__sparkle' : 'marquee-banner__text'}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
