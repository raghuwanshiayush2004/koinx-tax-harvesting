# KoinX - Tax Loss Harvesting Tool

A responsive React application for Tax Loss Harvesting built as part of the KoinX Frontend Intern Assignment.

## 🚀 Live Demo

[View Live App](https://koinx-tax-harvesting.vercel.app) *(update this after deploying)*



## 🛠️ Tech Stack

- **React 18** - UI framework
- **CSS3** - Custom styling (no external UI library needed)
- **Mock API** - Simulated via Promises (no backend needed)

## ✨ Features

- ✅ Pre Harvesting & After Harvesting capital gains cards
- ✅ Real-time update of After Harvesting on checkbox selection
- ✅ Short-term and Long-term gains breakdown
- ✅ "You are going to save ₹X" savings message
- ✅ Holdings table with sortable, selectable rows
- ✅ Select All / Deselect All checkbox in table header
- ✅ Amount to Sell auto-fills on row selection
- ✅ View All / View Less toggle for holdings
- ✅ Loading state with spinner
- ✅ Error state with retry button
- ✅ Fully mobile responsive
- ✅ Dark themed UI matching KoinX design

## 📦 Setup Instructions

### Prerequisites
- Node.js >= 16
- npm >= 8

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/koinx-tax-harvesting.git

# Navigate into project
cd koinx-tax-harvesting

# Install dependencies
npm install

# Start development server
npm start
```

App runs at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

## 📁 Folder Structure

```
koinx-tax-harvesting/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CapitalGainsCard.js   # Pre & After Harvesting cards
│   │   ├── Disclaimer.js         # Collapsible disclaimer banner
│   │   └── HoldingsTable.js      # Holdings table with checkboxes
│   ├── data/
│   │   └── mockData.js           # Mock API responses + fetch functions
│   ├── App.js                    # Main app logic & state
│   ├── App.css                   # All styles
│   └── index.js                  # React entry point
├── package.json
└── README.md
```

## 🔌 API Mocking

APIs are mocked using **Promises with setTimeout** inside `src/data/mockData.js`:

```js
export const fetchCapitalGains = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockCapitalGains), 800));

export const fetchHoldings = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockHoldings), 1000));
```

## 📐 Business Logic

### Pre-Harvesting
- Directly uses Capital Gains API data
- Net STCG = stcg.profits - stcg.losses
- Net LTCG = ltcg.profits - ltcg.losses
- Realised Capital Gains = Net STCG + Net LTCG

### After-Harvesting
- Starts with Pre-Harvesting values
- For each **selected holding**:
  - If `stcg.gain > 0` → add to stcg.profits
  - If `stcg.gain < 0` → add |value| to stcg.losses
  - Same logic for ltcg
- Shows savings message if: Pre-Realised > Post-Realised

## 💡 Assumptions

- All crypto values shown in USD ($)
- Savings shown in INR (₹) as per assignment
- Duplicate coin entries (ETH, ETH2 etc.) treated as separate holdings
- "Amount to Sell" = totalHoldings when row is selected

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click Deploy ✅
