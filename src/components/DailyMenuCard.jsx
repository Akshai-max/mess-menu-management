import { useState } from 'react';

export default function DailyMenuCard({
  date,
  dateKey,
  dayName,
  dayNumber,
  menuData,
  MEAL_PRICES,
  MEAL_NAMES,
  dailyTotal,
  onMealSelectionChange,
  onPriceChange
}) {
  const [showPriceEditor, setShowPriceEditor] = useState(false);

  const handleMealToggle = (meal) => {
    const newValue = !menuData?.[meal];
    onMealSelectionChange(dateKey, meal, newValue);
  };

  const handlePriceChange = (meal, price) => {
    onPriceChange(dateKey, meal, price);
  };

  const getCurrentPrice = (meal) => {
    return menuData?.customPrices?.[meal] || MEAL_PRICES[meal];
  };

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className={`daily-menu-card ${isToday ? 'today' : ''}`}>
      {/* Header */}
      <div className="daily-menu-header">
        <div className="daily-menu-header-left">
          <div className="daily-menu-day-name">{dayName}</div>
          <div className="daily-menu-day-number">{dayNumber}</div>
          {isToday && (
            <div className="daily-menu-today-badge">Today</div>
          )}
        </div>
        <div className="daily-menu-header-right">
          <button
            onClick={() => setShowPriceEditor(!showPriceEditor)}
            className="daily-menu-edit-button"
            title="Edit prices"
          >
            ✏️
          </button>
        </div>
      </div>

      {/* Price Editor */}
      {showPriceEditor && (
        <div className="price-editor">
          <div className="price-editor-title">Custom Prices:</div>
          {Object.keys(MEAL_NAMES).map((meal) => (
            <div key={meal} className="price-editor-item">
              <span className="price-editor-label">{MEAL_NAMES[meal]}:</span>
              <input
                type="number"
                value={getCurrentPrice(meal)}
                onChange={(e) => handlePriceChange(meal, e.target.value)}
                className="price-editor-input"
                min="0"
                step="0.01"
              />
            </div>
          ))}
        </div>
      )}

      {/* Meals */}
      <div className="daily-menu-meals">
        {Object.keys(MEAL_NAMES).map((meal) => (
          <div key={meal} className="daily-menu-meal">
            <div className="daily-menu-meal-info">
              <input
                type="checkbox"
                checked={menuData?.[meal] || false}
                onChange={() => handleMealToggle(meal)}
                className="daily-menu-meal-checkbox"
              />
              <span className="daily-menu-meal-name">
                {MEAL_NAMES[meal]}
              </span>
            </div>
            <div className="daily-menu-meal-price">
              <span className="daily-menu-meal-price-value">
                ₹{getCurrentPrice(meal)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Total */}
      <div className="daily-total">
        <div className="daily-total-content">
          <span className="daily-total-label">Daily Total:</span>
          <span className="daily-total-value">₹{dailyTotal}</span>
        </div>
      </div>
    </div>
  );
}
