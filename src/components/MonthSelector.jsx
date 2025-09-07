import { useState } from 'react';

export default function MonthSelector({ 
  selectedMonth, 
  selectedYear, 
  onMonthChange, 
  onYearChange, 
  onMonthChangeComplete,
  onApplyDefaultMeals
}) {
  const [showDefaultMeals, setShowDefaultMeals] = useState(false);
  const [defaultMeals, setDefaultMeals] = useState({
    morning: true,
    afternoon: false,
    evening: true
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (newMonth) => {
    onMonthChange(newMonth);
    onMonthChangeComplete();
  };

  const handleYearChange = (newYear) => {
    onYearChange(newYear);
    onMonthChangeComplete();
  };

  const handleDefaultMealToggle = (meal) => {
    setDefaultMeals(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
  };

  const applyDefaultMeals = () => {
    onApplyDefaultMeals(selectedYear, selectedMonth, defaultMeals);
    setShowDefaultMeals(false);
  };

  return (
    <div className="month-selector">
      <div className="month-selector-header">
        <h2 className="month-selector-title">Select Month & Year</h2>
        <button
          onClick={() => setShowDefaultMeals(!showDefaultMeals)}
          className="btn btn-secondary btn-sm"
        >
          Set Default Meals
        </button>
      </div>

      <div className="month-selector-controls">
        <div className="month-selector-group">
          <label className="form-label">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(parseInt(e.target.value))}
            className="form-input"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="month-selector-group">
          <label className="form-label">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(parseInt(e.target.value))}
            className="form-input"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - 2 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {showDefaultMeals && (
        <div className="default-meals-selector">
          <h3 className="default-meals-title">Set Default Meals for This Month</h3>
          <p className="default-meals-description">
            Choose which meals should be selected by default for all days in this month.
            <br />
            <strong>Note:</strong> Sundays will remain unselected by default.
          </p>
          
          <div className="default-meals-grid">
            <div className="default-meal-item">
              <label className="default-meal-label">
                <input
                  type="checkbox"
                  checked={defaultMeals.morning}
                  onChange={() => handleDefaultMealToggle('morning')}
                  className="form-checkbox"
                />
                <span className="default-meal-text">Morning (₹35)</span>
              </label>
            </div>
            
            <div className="default-meal-item">
              <label className="default-meal-label">
                <input
                  type="checkbox"
                  checked={defaultMeals.afternoon}
                  onChange={() => handleDefaultMealToggle('afternoon')}
                  className="form-checkbox"
                />
                <span className="default-meal-text">Afternoon (₹60)</span>
              </label>
            </div>
            
            <div className="default-meal-item">
              <label className="default-meal-label">
                <input
                  type="checkbox"
                  checked={defaultMeals.evening}
                  onChange={() => handleDefaultMealToggle('evening')}
                  className="form-checkbox"
                />
                <span className="default-meal-text">Evening (₹35)</span>
              </label>
            </div>
          </div>

          <div className="default-meals-actions">
            <button
              onClick={() => setShowDefaultMeals(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={applyDefaultMeals}
              className="btn btn-primary"
            >
              Apply to All Days
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
