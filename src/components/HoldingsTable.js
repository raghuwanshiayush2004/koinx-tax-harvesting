import React, { useState } from "react";

const fmtGain = (val) => {
  const sign = val >= 0 ? "+" : "-";
  return `${sign}$ ${Math.abs(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const fmtBalance = (val, coin) => {
  return `${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ${coin}`;
};

const fmtPrice = (val) =>
  `$ ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const INITIAL_SHOW = 4;

export default function HoldingsTable({ holdings, selectedHoldings, onToggle, onSelectAll }) {
  const [showAll, setShowAll] = useState(false);

  const allSelected =
    holdings.length > 0 && holdings.every((h) => selectedHoldings[h.coin]);
  const someSelected = holdings.some((h) => selectedHoldings[h.coin]);

  const displayedHoldings = showAll ? holdings : holdings.slice(0, INITIAL_SHOW);

  return (
    <div className="holdings-section">
      <h2 className="holdings-title">Holdings</h2>
      <div className="holdings-table-wrapper">
        <table className="holdings-table">
          <thead>
            <tr>
              <th className="th-check">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th className="th-asset">Asset</th>
              <th className="th-holdings">
                Holdings<br />
                <span className="th-sub">Current Market Value</span>
              </th>
              <th className="th-current">Total Current Value</th>
              <th className="th-stcg">Short-term</th>
              <th className="th-ltcg">Long-Term</th>
              <th className="th-amount">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {displayedHoldings.map((holding) => {
              const isSelected = !!selectedHoldings[holding.coin];
              const totalValue = holding.totalHoldings * holding.currentPrice;

              return (
                <tr
                  key={holding.coin}
                  className={`holdings-row ${isSelected ? "holdings-row--selected" : ""}`}
                  onClick={() => onToggle(holding.coin)}
                >
                  <td className="td-check">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(holding.coin)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="td-asset">
                    <div className="asset-info">
                      <img
                        src={holding.logo}
                        alt={holding.coinName}
                        className="asset-logo"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div>
                        <div className="asset-coin">{holding.coinName}</div>
                        <div className="asset-symbol">{holding.coin.replace(/[0-9]/g, "")}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-holdings">
                    <div className="holdings-amount">
                      {holding.totalHoldings.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 5 })}{" "}
                      {holding.coin.replace(/[0-9]/g, "")}
                    </div>
                    <div className="holdings-buy-price">
                      $ {holding.averageBuyPrice.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 5 })}/
                      {holding.coin.replace(/[0-9]/g, "")}
                    </div>
                  </td>
                  <td className="td-current-value">
                    <div>{fmtPrice(totalValue)}</div>
                    <div className="current-price-sub">{fmtPrice(holding.currentPrice)}</div>
                  </td>
                  <td className="td-stcg">
                    <div className={`gain-value ${holding.stcg.gain >= 0 ? "gain--positive" : "gain--negative"}`}>
                      {fmtGain(holding.stcg.gain)}
                    </div>
                    <div className="gain-balance">{fmtBalance(holding.stcg.balance, holding.coin.replace(/[0-9]/g, ""))}</div>
                  </td>
                  <td className="td-ltcg">
                    <div className={`gain-value ${holding.ltcg.gain >= 0 ? "gain--positive" : "gain--negative"}`}>
                      {fmtGain(holding.ltcg.gain)}
                    </div>
                    <div className="gain-balance">{fmtBalance(holding.ltcg.balance, holding.coin.replace(/[0-9]/g, ""))}</div>
                  </td>
                  <td className="td-amount">
                    {isSelected ? (
                      <span className="amount-to-sell">
                        {holding.totalHoldings.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 5 })}{" "}
                        {holding.coin.replace(/[0-9]/g, "")}
                      </span>
                    ) : (
                      <span className="amount-dash">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > INITIAL_SHOW && (
        <button
          className="view-all-btn"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "View Less ▲" : `View All (${holdings.length}) ▼`}
        </button>
      )}
    </div>
  );
}
