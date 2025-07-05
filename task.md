# Sample plan for the project


## sample colors palletes you can use 


| Section              | Recommended Palettes                      | Usage Suggestions                                                          |
| -------------------- | ----------------------------------------- | -------------------------------------------------------------------------- |
| **Dashboard**        | 🟣 Noir Lavender, 🔷 Sapphire Drift       | Dark backgrounds with readable contrast for charts + data cards            |
| **Transactions**     | 🌿 Pine Fog, 🟪 Mauve Satin               | Soothing tones for viewing/editing financial data                          |
| **Budgets**          | 🧡 Amber Frost, 💗 Velvet Sunset          | Warm tones for budget limits and highlights ("Over Budget" warnings etc.)  |
| **Buttons/CTA**      | 💙 Sapphire Drift, 🍃 Ivory Mint          | Medium tones for active buttons, light tone for hover states               |
| **Chart Colors**     | 🎨 Any Mediums: C46C45, 2C5DA9, 5F4B8B    | Use medium tones for bar/pie slices, light tone for tooltips or background |
| **Cards and Modals** | 🌸 Crimson Smoke (light), 🌼 Golden Bloom | Light tone for background, dark tone for text/heading                      |



# Color Palette Collection

## 1. Mauve Satin
- **2B2B2B** (Dark charcoal)
- **A593E0** (Light purple)
- **DCD6F7** (Very light lavender)

## 2. Ivory Mint
- **FFFFFF** (White)
- **D1F0E0** (Light mint green)
- **96C7B9** (Medium mint green)

## 3. Velvet Teal
- **1B4242** (Dark teal)
- **4FBDBA** (Medium teal)
- **CDEED6** (Light mint)

## 4. Amber Frost
- **402E32** (Dark brown)
- **C46C45** (Orange/amber)
- **FFE6D6** (Light cream)

## 5. Noir Lavender
- **0D0D0D** (Almost black)
- **5F4B8B** (Medium purple)
- **CBBBF6** (Light lavender)

## 6. Crimson Smoke
- **3B0A0A** (Dark burgundy)
- **8A2B2B** (Medium red)
- **F2C9C9** (Light pink)

## 7. Pine Fog
- **1F2A24** (Dark forest green)
- **5B7768** (Medium sage green)
- **DAE3D7** (Light sage)

## 8. Velvet Sunset
- **3F1D38** (Deep purple)
- **AF5279** (Medium pink)
- **FFD6A5** (Light peach)

## 9. Golden Bloom
- **4D3F29** (Dark brown)
- **C49A6C** (Golden brown)
- **FFF3D1** (Light cream)

## 10. Sapphire Drift
- **0A0F3C** (Dark navy)
- **2C5DA9** (Medium blue)
- **C8DAF9** (Light blue)







# 💰 Personal Finance Visualizer

A personal finance tracking web application using **Next.js**, **React**, **shadcn/ui**, **Recharts**, and **MongoDB**, built with a **stage-wise development approach** focusing on clean code, data visuals, and easy deployability.

---

## 🔧 Common Setup (Before Stage 1)

### ✅ Tech Stack:
- **Frontend**: Next.js (App Router), TailwindCSS, shadcn/ui  
- **Charts**: Recharts  
- **Backend**: Next.js API routes *(or optional Express API)*  
- **Database**: MongoDB *(via Mongoose or MongoDB Driver)*  
- **Hosting**: Vercel (Frontend), MongoDB Atlas (Database)

---

## 🟢 Stage 1: Basic Transaction Tracking (MVP)

### 🗂 Features:
- Add transaction *(form with amount, date, description)*
- View transaction list *(table or card format)*
- Edit/Delete transaction
- Monthly expense chart *(bar chart via Recharts)*
- Basic client-side form validation *(amount > 0, date required, etc.)*

### 📁 Sample Folder Structure:
/app
/transactions
/components
/charts
/api/transactions.js
/lib/db.js


### 🧱 UI Components (shadcn/ui):
`Input`, `Button`, `Card`, `Dialog`, `Table`, `Alert`, `Label`, `Form`, `DatePicker`

### 📊 Chart (Recharts):
- **Bar Chart**: Expenses per month *(group by month from date)*

---

## 🟡 Stage 2: Categories

### ➕ Additions:
- Predefined categories *(Food, Travel, Bills, Entertainment, etc.)*
- Category selection in Add/Edit form
- **Pie chart**: Category-wise breakdown
- **Dashboard page** with:
  - Total expenses
  - Category breakdown
  - Recent transactions

### 🧠 Logic:
- MongoDB Schema updates *(add category field)*
- Group transactions by category *(for pie chart)*
- Reusable `<SummaryCard />` component

---

## 🔴 Stage 3: Budgeting

### ➕ Additions:
- Budget input for each category *(stored per month)*
- Budget vs Actual chart *(bar or stacked bar)*
- **Insights**:  
  _e.g., “You spent 80% of your Travel budget”_

### 🧠 Logic:
- Create a new `budgets` collection or embed budgets in user data
- Compare actual spend to budget *(per category)*
- Display warnings or tips if budget is exceeded

---

## ✅ Evaluation Criteria Alignment

| Criteria                 | What You Should Do                                                                 |
|--------------------------|------------------------------------------------------------------------------------|
| **Feature Implementation (40%)** | Complete all 3 stages, correctly implement CRUD, charts, insights               |
| **Code Quality (30%)**           | Use proper folder structure, reusable components, clean state management (React hooks or Zustand), no console logs, well-commented code |
| **UI/UX Design (30%)**           | Responsive design, loading & empty/error states, consistent theme, readable charts |

---

## 📤 Submission Requirements

| Item                | Action                                                                                  |
|---------------------|------------------------------------------------------------------------------------------|
| **GitHub Repository** | Public, clean commits, meaningful commit messages                                       |
| **Live Deployment URL** | Deploy on Vercel (connect GitHub repo)                                                |
| **README**          | Clear README with:  
  – Project overview  
  – Tech stack  
  – Setup instructions  
  – Screenshots or demo GIF  
  – Stages implemented |

