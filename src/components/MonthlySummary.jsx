export default function MonthlySummary({ monthlyTotal, weeklyTotal, dailyTotal }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="monthly-summary">
      <h2 className="monthly-summary-title">Monthly Summary</h2>
      
      <div className="monthly-summary-grid">
        {/* Daily Total */}
        <div className="monthly-summary-item">
          <div className="monthly-summary-value daily">
            {formatCurrency(dailyTotal)}
          </div>
          <div className="monthly-summary-label">Today's Total</div>
        </div>

        {/* Weekly Total */}
        <div className="monthly-summary-item">
          <div className="monthly-summary-value weekly">
            {formatCurrency(weeklyTotal)}
          </div>
          <div className="monthly-summary-label">This Week's Total</div>
        </div>

        {/* Monthly Total */}
        <div className="monthly-summary-item">
          <div className="monthly-summary-value monthly">
            {formatCurrency(monthlyTotal)}
          </div>
          <div className="monthly-summary-label">Monthly Total</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="monthly-summary-stats">
        <div className="monthly-summary-stats-grid">
          <div className="monthly-summary-stat">
            <span className="monthly-summary-stat-label">Average Daily Cost:</span>
            <span className="monthly-summary-stat-value">
              {formatCurrency(monthlyTotal / new Date().getDate())}
            </span>
          </div>
          <div className="monthly-summary-stat">
            <span className="monthly-summary-stat-label">Days Remaining:</span>
            <span className="monthly-summary-stat-value">
              {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
