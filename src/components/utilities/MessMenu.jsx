import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Clock,
  Sparkles,
  Star,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  AlertCircle,
  Calendar,
  Send
} from 'lucide-react';
import { MESS_MENU_DATA, MESS_TIMINGS, MESS_RULES } from '../../data/messMenuData';

export default function MessMenu({ onToast }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Current Day Determination
  const [selectedDay, setSelectedDay] = useState(() => {
    const todayIndex = new Date().getDay(); // 0 is Sunday
    return todayIndex === 0 ? 'Sunday' : daysOfWeek[todayIndex - 1];
  });

  // Current Meal Determination
  const getCurrentMealKey = () => {
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    if (currentHour >= MESS_TIMINGS.breakfast.startHour && currentHour < MESS_TIMINGS.breakfast.endHour) return 'breakfast';
    if (currentHour >= MESS_TIMINGS.lunch.startHour && currentHour < MESS_TIMINGS.lunch.endHour) return 'lunch';
    if (currentHour >= MESS_TIMINGS.tiffin.startHour && currentHour < MESS_TIMINGS.tiffin.endHour) return 'tiffin';
    if (currentHour >= MESS_TIMINGS.dinner.startHour && currentHour < MESS_TIMINGS.dinner.endHour) return 'dinner';
    return null;
  };

  const [activeMealKey, setActiveMealKey] = useState(getCurrentMealKey() || 'dinner');

  // Rating & Feedback State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [ratedMeals, setRatedMeals] = useState([]);

  const dayMenu = MESS_MENU_DATA[selectedDay] || MESS_MENU_DATA['Monday'];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (onToast) {
      onToast(`⭐ Thank you! Your ${rating}-star rating for ${selectedDay} ${activeMealKey} has been recorded for the Mess Committee.`);
    }
    setRatedMeals([...ratedMeals, `${selectedDay}-${activeMealKey}`]);
    setFeedbackComment('');
  };

  const isCurrentDay = () => {
    const todayIndex = new Date().getDay();
    const todayStr = todayIndex === 0 ? 'Sunday' : daysOfWeek[todayIndex - 1];
    return todayStr === selectedDay;
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header & Mess Location Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--h4-gold)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Sparkles size={15} />
            <span>Dr. Pramod Chaudhari Dining Hall</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Weekly Mess Menu & Timings
          </h3>
        </div>

        {/* Live Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--bg-subtle)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-card)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Serving Today: {isCurrentDay() ? 'Live Schedule' : 'Viewing Schedule'}
          </span>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="tabs-header" style={{ marginBottom: '2rem' }}>
        {daysOfWeek.map((day) => {
          const todayIndex = new Date().getDay();
          const todayStr = todayIndex === 0 ? 'Sunday' : daysOfWeek[todayIndex - 1];
          const isToday = day === todayStr;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`tab-btn ${selectedDay === day ? 'active' : ''}`}
              style={{ position: 'relative' }}
            >
              <span>{day.substring(0, 3)}</span>
              {isToday && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--h4-flame)'
                  }}
                ></span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4 Meal Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {Object.entries(MESS_TIMINGS).map(([mealKey, timing]) => {
          const mealContent = dayMenu[mealKey];
          const isNow = isCurrentDay() && getCurrentMealKey() === mealKey;

          return (
            <div
              key={mealKey}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
                background: isNow ? 'linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, var(--bg-card) 100%)' : 'var(--bg-subtle)',
                border: isNow ? '2px solid var(--h4-gold)' : '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                position: 'relative'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {timing.label}
                </h4>
                {isNow && (
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    🔥 Live Now
                  </span>
                )}
              </div>

              {/* Timing */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <Clock size={14} />
                <span>{timing.time}</span>
              </div>

              {/* Items List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {mealContent?.items?.map((item, iIdx) => (
                  <li
                    key={iIdx}
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      lineHeight: 1.4
                    }}
                  >
                    <span style={{ color: 'var(--h4-gold)', fontSize: '0.9rem', lineHeight: 1 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Special Highlight */}
              {mealContent?.special && (
                <div
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-glow)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.6rem 0.85rem',
                    fontSize: '0.8rem',
                    color: 'var(--h4-gold)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Sparkles size={14} />
                  <span>Chef's Special: {mealContent.special}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Row: Feedback Widget & Rebate Rules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Rating & Feedback Box */}
        <div className="glass-card" style={{ padding: '1.75rem', background: 'var(--bg-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <MessageSquare size={18} color="var(--h4-gold)" />
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700 }}>
              Rate Today's Meal & Mess Feedback
            </h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Your feedback directly impacts menu revisions by the Mess Secretary & Warden.
          </p>

          <form onSubmit={handleFeedbackSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginRight: '0.5rem' }}>
                Your Rating:
              </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.2rem',
                    color: (hoverRating || rating) >= star ? 'var(--h4-gold)' : 'var(--text-muted)'
                  }}
                >
                  <Star size={22} fill={(hoverRating || rating) >= star ? 'var(--h4-gold)' : 'none'} />
                </button>
              ))}
            </div>

            <textarea
              className="form-textarea"
              rows={2}
              placeholder="Any compliments, suggestions, or quality notes for the caterer..."
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              style={{ marginBottom: '1rem' }}
            ></textarea>

            <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              <Send size={14} />
              <span>Submit Meal Rating</span>
            </button>
          </form>
        </div>

        {/* Mess Guidelines & Rebate Rules */}
        <div className="glass-card" style={{ padding: '1.75rem', background: 'var(--bg-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Utensils size={18} color="var(--h4-gold)" />
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700 }}>
              Mess Etiquette & Rebate Policy
            </h4>
          </div>
          <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {MESS_RULES.map((rule, rIdx) => (
              <li key={rIdx}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
