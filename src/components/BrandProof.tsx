import './BrandProof.css';

interface BrandItem {
  name: string;
  category: string;
  badge?: string;
}

const brands: BrandItem[] = [
  { name: 'SMS Campaign Manager', category: 'Android Dual-SIM Engine' },
  { name: '24IDChat', category: 'Real-time Ephemeral Chat' },
  { name: 'TempEmailFree', category: 'Privacy Utility & OTP' },
  { name: 'Google Play Console', category: 'Closed Testing Track' },
];

export function BrandProof() {
  return (
    <section className="brand-proof section--compact" aria-label="Brands and products built">
      <div className="container">
        <div className="brand-proof__card">
          <h3 className="brand-proof__title">
            Brands, Products &amp; Platforms we've engineered
          </h3>
          <div className="brand-proof__grid">
            {brands.map((b) => (
              <div key={b.name} className="brand-proof__item">
                <span className="brand-proof__name">{b.name}</span>
                <span className="brand-proof__category">{b.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
