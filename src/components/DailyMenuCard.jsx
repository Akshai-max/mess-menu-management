import { useState } from 'react';
import { Pencil } from 'lucide-react';

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
  onPriceChange,
  onAmountChange,
  onAlternateToggle,
  disabled = false
}) {
  const [showPriceEditor, setShowPriceEditor] = useState(false);

  const handleMealToggle = (meal) => {
    const newValue = !menuData?.[meal];
    onMealSelectionChange(dateKey, meal, newValue);
  };

  const handlePriceChange = (meal, price) => {
    onPriceChange(dateKey, meal, price);
  };

  const handleAmountChange = (meal, amount) => {
    onAmountChange(dateKey, meal, amount);
  };

  const handleAlternateToggle = (enabled) => {
    onAlternateToggle(dateKey, enabled);
  };

  const getCurrentPrice = (meal) => {
    return menuData?.customPrices?.[meal] ?? MEAL_PRICES[meal];
  };

  const getCurrentAmount = (meal) => {
    return menuData?.quantities?.[meal] ?? 1;
  };

  const getMealLineTotal = (meal) => {
    const price = getCurrentPrice(meal);
    const qty = getCurrentAmount(meal);
    const multiplier = menuData?.useAlternatePrices ? 2 : 1;
    return price * multiplier * qty;
  };

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className={`daily-menu-card ${isToday ? 'today' : ''} ${disabled ? 'disabled' : ''}`}>
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
            onClick={() => !disabled && setShowPriceEditor(!showPriceEditor)}
            className="daily-menu-edit-button"
            title="Edit prices"
            disabled={disabled}
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>

      {/* Modal: Price & Amount Editor */}
      {showPriceEditor && !disabled && (
        <div className="modal-backdrop" onClick={() => setShowPriceEditor(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Edit Day Settings</div>
              <button className="modal-close" onClick={() => setShowPriceEditor(false)}>✖</button>
            </div>
            <div className="modal-body">
              <label className="alt-price-toggle">
                <input
                  type="checkbox"
                  checked={!!menuData?.useAlternatePrices}
                  onChange={(e) => handleAlternateToggle(e.target.checked)}
                />
                <span>Use alternate prices (double)</span>
              </label>
              <div className="price-editor-title" style={{ marginTop: '0.5rem' }}>Custom Prices & Amounts</div>
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
                    disabled={disabled}
                  />
                  <span className="price-multiply">×</span>
                  <input
                    type="number"
                    value={getCurrentAmount(meal)}
                    onChange={(e) => handleAmountChange(meal, e.target.value)}
                    className="amount-editor-input"
                    min="0"
                    step="1"
                    disabled={disabled}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPriceEditor(false)}>Close</button>
            </div>
          </div>
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
                disabled={disabled}
              />
              <span className="daily-menu-meal-name">
                {MEAL_NAMES[meal]}
              </span>
            </div>
            <div className="daily-menu-meal-price">
              <span className="daily-menu-meal-price-value">₹{getMealLineTotal(meal)}</span>
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
