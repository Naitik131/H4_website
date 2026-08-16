import React, { useState } from 'react';
import {
  Calculator,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function MessRebateCalculator({ onToast }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ratePerDay, setRatePerDay] = useState(165); // IITB average daily mess per-diem

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    if (diffTime < 0) return 0;
    // Difference in days inclusive
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = calculateDays();
  const isValid = days >= 2;
  const totalRebateAmount = isValid ? days * ratePerDay : 0;

  return (
    <div className="glass-card" style={{ padding: '1.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--warning-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-glow)'
            }}
          >
            <Calculator size={18} color="var(--h4-gold)" />
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800 }}>
              Mess Rebate Estimator
            </h4>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Institute Rule: Minimum 2 consecutive leave days required
            </div>
          </div>
        </div>

        <span className="badge badge-gold">Official IITB Formula</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: '0.8rem' }}>Leave Start Date</label>
          <input
            type="date"
            className="form-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: '0.8rem' }}>Leave Return Date</label>
          <input
            type="date"
            className="form-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: '0.8rem' }}>Daily Mess Per-Diem (₹)</label>
          <input
            type="number"
            className="form-input"
            value={ratePerDay}
            onChange={(e) => setRatePerDay(Number(e.target.value))}
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Result Display */}
      {startDate && endDate && (
        <div
          style={{
            background: isValid ? 'var(--success-bg)' : 'var(--danger-bg)',
            border: `1px solid ${isValid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.92rem', color: isValid ? 'var(--success)' : 'var(--danger)', marginBottom: '0.15rem' }}>
              {isValid ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{isValid ? `${days} Days Eligible for Rebate` : 'Ineligible: Minimum 2 days required'}</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {isValid ? `Estimated credit to student mess bill: ₹${totalRebateAmount.toLocaleString('en-IN')}` : 'Please adjust your dates to meet the minimum policy criteria.'}
            </div>
          </div>

          {isValid && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Savings</span>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', lineHeight: 1 }}>
                ₹{totalRebateAmount}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <span>* Apply via IITB SSO at least 24h before leave departure.</span>
        <a
          href="https://asc.iitb.ac.in"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--h4-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}
        >
          <span>Apply on ASC SSO</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
