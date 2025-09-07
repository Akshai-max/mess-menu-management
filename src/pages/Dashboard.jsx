import { useState, useMemo } from 'react';
import { useMenuData } from '../hooks/useMenuData';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import DailyMenuCard from '../components/DailyMenuCard';
import MonthlySummary from '../components/MonthlySummary';
import WeeklyChart from '../components/WeeklyChart';
import MonthSelector from '../components/MonthSelector';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const {
    menuData,
    loading,
    error,
    MEAL_PRICES,
    MEAL_NAMES,
    calculateDailyTotal,
    calculateWeeklyTotal,
    calculateMonthlyTotal,
    updateMealSelection,
    updateCustomPrice,
    loadMonthData,
    applyDefaultMealsToMonth
  } = useMenuData(currentUser);

  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Load data when month/year changes
  const handleMonthYearChange = async (newMonth, newYear) => {
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setSelectedWeek(0); // Reset to first week
    await loadMonthData(newYear, newMonth);
  };

  // Handle applying default meals to current month
  const handleApplyDefaultMeals = async (year, month, defaultMeals) => {
    await applyDefaultMealsToMonth(year, month, defaultMeals);
  };

  // Get selected month's dates
  const currentMonthDates = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    
    const dates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      dates.push({
        date: date,
        dateKey: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: day
      });
    }
    return dates;
  }, [selectedMonth, selectedYear]);

  // Group dates by weeks
  const weeklyGroups = useMemo(() => {
    const weeks = [];
    for (let i = 0; i < currentMonthDates.length; i += 7) {
      weeks.push(currentMonthDates.slice(i, i + 7));
    }
    return weeks;
  }, [currentMonthDates]);

  const currentWeek = weeklyGroups[selectedWeek] || [];

  if (loading) {
    return (
      <div className="dashboard-container">
        <Navigation />
        <div className="flex items-center justify-center" style={{ height: '16rem' }}>
          <div className="text-lg text-secondary">Loading your menu data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Navigation />
        <div className="flex items-center justify-center" style={{ height: '16rem' }}>
          <div className="text-lg text-danger">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navigation />
      
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Mess Menu Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage your daily meal selections and track your monthly expenses
          </p>
        </div>

        {/* Month Selector */}
        <div className="mb-6">
          <MonthSelector
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={(month) => handleMonthYearChange(month, selectedYear)}
            onYearChange={(year) => handleMonthYearChange(selectedMonth, year)}
            onMonthChangeComplete={() => setSelectedWeek(0)} // Reset to first week when month changes
            onApplyDefaultMeals={handleApplyDefaultMeals}
          />
        </div>

        {/* Monthly Summary */}
        <div className="mb-8">
          <MonthlySummary 
            monthlyTotal={calculateMonthlyTotal(selectedYear, selectedMonth)}
            weeklyTotal={selectedWeek !== -1 ? calculateWeeklyTotal(currentWeek[0]?.dateKey) : 0}
            dailyTotal={selectedWeek !== -1 ? calculateDailyTotal(menuData[currentWeek[0]?.dateKey]) : 0}
          />
        </div>

        {/* Weekly Chart - Only show in weekly view */}
        {selectedWeek !== -1 && (
          <div className="mb-8">
            <WeeklyChart 
              weeklyData={currentWeek.map(day => ({
                date: day.dateKey,
                dayName: day.dayName,
                total: calculateDailyTotal(menuData[day.dateKey])
              }))}
            />
          </div>
        )}

        {/* Week Navigation - Only show in weekly view */}
        {selectedWeek !== -1 && (
          <div className="week-navigation">
            <div className="week-navigation-header">
              <h2 className="week-navigation-title">Weekly Menu</h2>
              <div className="week-navigation-controls">
                <button
                  onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
                  disabled={selectedWeek === 0}
                  className="week-nav-button"
                >
                  Previous
                </button>
                <span className="week-nav-info">
                  Week {selectedWeek + 1} of {weeklyGroups.length}
                </span>
                <button
                  onClick={() => setSelectedWeek(Math.min(weeklyGroups.length - 1, selectedWeek + 1))}
                  disabled={selectedWeek === weeklyGroups.length - 1}
                  className="week-nav-button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Menu Cards - Weekly View */}
        {selectedWeek !== -1 && (
          <div className="daily-menu-grid">
            {currentWeek.map((day) => (
              <DailyMenuCard
                key={day.dateKey}
                date={day.date}
                dateKey={day.dateKey}
                dayName={day.dayName}
                dayNumber={day.dayNumber}
                menuData={menuData[day.dateKey]}
                MEAL_PRICES={MEAL_PRICES}
                MEAL_NAMES={MEAL_NAMES}
                dailyTotal={calculateDailyTotal(menuData[day.dateKey])}
                onMealSelectionChange={updateMealSelection}
                onPriceChange={updateCustomPrice}
              />
            ))}
          </div>
        )}

        {/* All Days View Toggle */}
        <div className="mt-8">
          <button
            onClick={() => {
              console.log('Button clicked, current selectedWeek:', selectedWeek);
              setSelectedWeek(selectedWeek === -1 ? 0 : -1);
            }}
            className="view-all-button"
          >
            {selectedWeek === -1 ? 'Back to Weekly View' : 'View All Days of the Month'}
          </button>
        </div>

        {/* All Days Grid (when selectedWeek is -1) */}
        {selectedWeek === -1 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              All Days of {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="daily-menu-grid">
              {currentMonthDates.map((day) => (
                <DailyMenuCard
                  key={day.dateKey}
                  date={day.date}
                  dateKey={day.dateKey}
                  dayName={day.dayName}
                  dayNumber={day.dayNumber}
                  menuData={menuData[day.dateKey]}
                  MEAL_PRICES={MEAL_PRICES}
                  MEAL_NAMES={MEAL_NAMES}
                  dailyTotal={calculateDailyTotal(menuData[day.dateKey])}
                  onMealSelectionChange={updateMealSelection}
                  onPriceChange={updateCustomPrice}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
