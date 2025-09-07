import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const MEAL_PRICES = {
  morning: 35,
  afternoon: 60,
  evening: 35
};

const MEAL_NAMES = {
  morning: 'Morning',
  afternoon: 'Afternoon', 
  evening: 'Night'
};

export function useMenuData(user) {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate default selections for a month using user's default meal preferences
  const generateDefaultSelections = (year, month, defaultMeals = null) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const selections = {};
    
    // Default meal preferences (can be customized by user)
    const defaultMealPrefs = defaultMeals || {
      morning: true,
      afternoon: false,
      evening: true
    };
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Apply user's default meal preferences to each day, except Sundays
      const isSunday = dayOfWeek === 0;
      
      selections[dateKey] = {
        morning: isSunday ? false : defaultMealPrefs.morning,
        afternoon: isSunday ? false : defaultMealPrefs.afternoon,
        evening: isSunday ? false : defaultMealPrefs.evening,
        customPrices: {
          morning: MEAL_PRICES.morning,
          afternoon: MEAL_PRICES.afternoon,
          evening: MEAL_PRICES.evening
        }
      };
    }
    
    return selections;
  };

  // Calculate daily total
  const calculateDailyTotal = (daySelections) => {
    if (!daySelections) return 0;
    
    let total = 0;
    Object.keys(MEAL_PRICES).forEach(meal => {
      if (daySelections[meal]) {
        total += daySelections.customPrices?.[meal] || MEAL_PRICES[meal];
      }
    });
    return total;
  };

  // Calculate weekly total (use local date keys, not ISO, to avoid timezone off-by-one)
  const calculateWeeklyTotal = (startDate) => {
    const weekDates = [];
    try {
      const [startYear, startMonth, startDay] = startDate.split('-').map(n => parseInt(n));
      const date = new Date(startYear, startMonth - 1, startDay);
      for (let i = 0; i < 7; i++) {
        const current = new Date(date);
        current.setDate(date.getDate() + i);
        const dateKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
        weekDates.push(dateKey);
      }
    } catch (_) {
      // Fallback to original behavior if parsing fails
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        weekDates.push(dateKey);
      }
    }
    
    return weekDates.reduce((total, dateKey) => {
      return total + calculateDailyTotal(menuData[dateKey]);
    }, 0);
  };

  // Calculate monthly total
  // Only sum days for the currently selected month
  const calculateMonthlyTotal = (year, month) => {
    let total = 0;
    Object.keys(menuData).forEach(dateKey => {
      // dateKey format: YYYY-MM-DD
      const [y, m] = dateKey.split('-');
      if (parseInt(y) === year && parseInt(m) === month + 1) {
        total += calculateDailyTotal(menuData[dateKey]);
      }
    });
    return total;
  };

  // Load menu data from Firestore
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadMenuData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        
        const docRef = doc(db, 'userMenus', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMenuData(data || {});
        } else {
          // Initialize with default selections for current month
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const defaultSelections = generateDefaultSelections(year, month);
          await setDoc(docRef, defaultSelections);
          setMenuData(defaultSelections);
        }
      } catch (err) {
        console.error('Error loading menu data:', err);
        setError(`Failed to load menu data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadMenuData();
  }, [user]);

  // Function to load data for a specific month
  // Ensures all days (including day 1) exist; fills missing days with defaults
  const loadMonthData = async (year, month) => {
    if (!user) return;

    try {
      setError(null);
      const docRef = doc(db, 'userMenus', user.uid);
      const docSnap = await getDoc(docRef);
      
      let allData = {};
      if (docSnap.exists()) {
        allData = docSnap.data() || {};
      }
      
      // Build complete set of date keys for this month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthSelections = generateDefaultSelections(year, month);
      const monthData = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        monthData[dateKey] = allData[dateKey] || monthSelections[dateKey];
      }

      const updatedData = { ...allData, ...monthData };
      await setDoc(docRef, updatedData);
      setMenuData(updatedData);
    } catch (err) {
      console.error('Error loading month data:', err);
      setError(`Failed to load month data: ${err.message}`);
    }
  };

  // Update meal selection
  const updateMealSelection = async (date, meal, selected) => {
    if (!user) return;

    try {
      const newMenuData = {
        ...menuData,
        [date]: {
          ...menuData[date],
          [meal]: selected
        }
      };
      
      setMenuData(newMenuData);
      
      const docRef = doc(db, 'userMenus', user.uid);
      await updateDoc(docRef, {
        [`${date}.${meal}`]: selected
      });
    } catch (err) {
      setError(err.message);
      console.error('Error updating meal selection:', err);
    }
  };

  // Update custom price
  const updateCustomPrice = async (date, meal, price) => {
    if (!user) return;

    try {
      const newMenuData = {
        ...menuData,
        [date]: {
          ...menuData[date],
          customPrices: {
            ...menuData[date]?.customPrices,
            [meal]: parseFloat(price) || MEAL_PRICES[meal]
          }
        }
      };
      
      setMenuData(newMenuData);
      
      const docRef = doc(db, 'userMenus', user.uid);
      await updateDoc(docRef, {
        [`${date}.customPrices.${meal}`]: parseFloat(price) || MEAL_PRICES[meal]
      });
    } catch (err) {
      setError(err.message);
      console.error('Error updating custom price:', err);
    }
  };

  // Function to apply default meals to a specific month
  const applyDefaultMealsToMonth = async (year, month, defaultMeals) => {
    if (!user) return;

    try {
      setError(null);
      const docRef = doc(db, 'userMenus', user.uid);
      const docSnap = await getDoc(docRef);
      
      let allData = {};
      if (docSnap.exists()) {
        allData = docSnap.data() || {};
      }
      
      // Generate new selections with default meals
      const monthSelections = generateDefaultSelections(year, month, defaultMeals);
      const updatedData = { ...allData, ...monthSelections };
      
      await setDoc(docRef, updatedData);
      setMenuData(updatedData);
    } catch (err) {
      console.error('Error applying default meals:', err);
      setError(`Failed to apply default meals: ${err.message}`);
    }
  };

  return {
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
  };
}
