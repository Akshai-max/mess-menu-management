import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeeklyChart({ weeklyData }) {
  const formatCurrency = (value) => {
    return `₹${value}`;
  };

  return (
    <div className="weekly-chart">
      <h2 className="weekly-chart-title">Weekly Spending Chart</h2>
      
      <div className="weekly-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="dayName" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(value), 'Daily Total']}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Bar 
              dataKey="total" 
              fill="#4F46E5" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="weekly-chart-note">
        Hover over bars to see exact amounts
      </div>
    </div>
  );
}
