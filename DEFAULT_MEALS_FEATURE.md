# Default Meals Feature

## 🍽️ **New Feature: Configurable Default Meals**

The application now allows users to set default meal preferences that can be applied to all days in a month. This gives users the flexibility to choose their preferred meal pattern and apply it consistently.

### ✅ **How It Works:**

1. **Default Configuration**: 
   - Morning: ✅ Checked (₹35)
   - Afternoon: ❌ Unchecked (₹60) 
   - Evening: ✅ Checked (₹35)

2. **User Customization**: Users can modify these defaults before applying them to a month

3. **Apply to Month**: The selected defaults are applied to all days in the current month

### 🎯 **How to Use:**

#### **Step 1: Set Default Meals**
1. Click the **"Set Default Meals"** button in the month selector
2. A popup will appear with three meal options:
   - ☐ Morning (₹35)
   - ☐ Afternoon (₹60) 
   - ☐ Evening (₹35)

#### **Step 2: Choose Your Preferences**
- ✅ Check the meals you want selected by default
- ❌ Uncheck the meals you don't want
- Example: Check Morning and Evening, leave Afternoon unchecked

#### **Step 3: Apply to All Days**
- Click **"Apply to All Days"** button
- All days in the current month will be updated with your preferences
- You can still manually adjust individual days afterward

### 💡 **Use Cases:**

#### **Budget-Conscious Users:**
- Select only Morning and Evening (₹70/day)
- Skip Afternoon to save ₹60/day
- Monthly savings: ~₹1,800

#### **Full Meal Users:**
- Select all three meals (₹130/day)
- Complete nutrition coverage
- Maximum convenience

#### **Flexible Users:**
- Select Morning and Evening as defaults
- Manually add Afternoon on specific days
- Best of both worlds

### 🔄 **Workflow Example:**

1. **Navigate to January 2024**
2. **Click "Set Default Meals"**
3. **Select**: Morning ✅, Afternoon ❌, Evening ✅
4. **Click "Apply to All Days"**
5. **Result**: All 31 days in January now have Morning and Evening selected
6. **Manual Override**: You can still uncheck/check individual days as needed

### 📊 **Benefits:**

- **Time Saving**: No need to manually select meals for each day
- **Consistency**: Maintains your preferred meal pattern
- **Flexibility**: Can still customize individual days
- **Budget Control**: Easy to set cost-effective defaults
- **Convenience**: One-click setup for entire months

### 🎨 **UI Features:**

- **Clean Interface**: Simple checkbox selection
- **Price Display**: Shows cost for each meal type
- **Responsive Design**: Works on all devices
- **Visual Feedback**: Clear indication of selected/unselected meals
- **Easy Access**: Prominent button in month selector

### 🔧 **Technical Details:**

- **Data Persistence**: Defaults are applied and saved to Firebase
- **Real-time Updates**: Changes reflect immediately in the UI
- **Error Handling**: Proper error messages if something goes wrong
- **Performance**: Efficient batch updates for entire months

### 📱 **Mobile Friendly:**

- Touch-optimized checkboxes
- Responsive grid layout
- Easy-to-tap buttons
- Clear visual hierarchy

---

**Perfect for users who want to set up their meal preferences once and apply them consistently across the month, while still maintaining the flexibility to make individual day adjustments!**
