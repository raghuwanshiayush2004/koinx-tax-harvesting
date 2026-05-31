import React, { useState, useEffect } from "react";
import { fetchCapitalGains, fetchHoldings } from "./data/mockData";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable";
import Disclaimer from "./components/Disclaimer";
import "./App.css";

function App() {
  const [capitalGains, setCapitalGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedHoldings, setSelectedHoldings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [gainsData, holdingsData] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings(),
        ]);
        setCapitalGains(gainsData.capitalGains);
        setHoldings(holdingsData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Compute after-harvesting gains based on selected holdings
  const computeAfterHarvesting = () => {
    if (!capitalGains) return null;

    let stcgProfits = capitalGains.stcg.profits;
    let stcgLosses = capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.ltcg.profits;
    let ltcgLosses = capitalGains.ltcg.losses;

    holdings.forEach((holding) => {
      if (selectedHoldings[holding.coin]) {
        // Short-term gain
        if (holding.stcg.gain > 0) {
          stcgProfits += holding.stcg.gain;
        } else {
          stcgLosses += Math.abs(holding.stcg.gain);
        }
        // Long-term gain
        if (holding.ltcg.gain > 0) {
          ltcgProfits += holding.ltcg.gain;
        } else {
          ltcgLosses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  };

  const afterHarvestingGains = computeAfterHarvesting();

  const calcRealisedGains = (gains) => {
    if (!gains) return 0;
    const netStcg = gains.stcg.profits - gains.stcg.losses;
    const netLtcg = gains.ltcg.profits - gains.ltcg.losses;
    return netStcg + netLtcg;
  };

  const preRealised = capitalGains ? calcRealisedGains(capitalGains) : 0;
  const postRealised = afterHarvestingGains
    ? calcRealisedGains(afterHarvestingGains)
    : 0;
  const savings = preRealised - postRealised;
  const showSavings = savings > 0;

  const handleToggleHolding = (coin) => {
    setSelectedHoldings((prev) => ({ ...prev, [coin]: !prev[coin] }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const all = {};
      holdings.forEach((h) => (all[h.coin] = true));
      setSelectedHoldings(all);
    } else {
      setSelectedHoldings({});
    }
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loader-spinner"></div>
        <p>Loading your portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Tax Harvesting</h1>
          <a href="#how" className="how-it-works-link">
            How it works?
          </a>
        </div>

        {/* Disclaimer */}
        <Disclaimer />

        {/* Capital Gains Cards */}
        <div className="cards-row">
          <CapitalGainsCard
            title="Pre Harvesting"
            gains={capitalGains}
            realisedGains={preRealised}
            variant="dark"
          />
          <CapitalGainsCard
            title="After Harvesting"
            gains={afterHarvestingGains}
            realisedGains={postRealised}
            variant="blue"
            savings={showSavings ? savings : null}
          />
        </div>

        {/* Holdings Table */}
        <HoldingsTable
          holdings={holdings}
          selectedHoldings={selectedHoldings}
          onToggle={handleToggleHolding}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
}

export default App;
