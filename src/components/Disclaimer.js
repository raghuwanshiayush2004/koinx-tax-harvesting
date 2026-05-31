import React, { useState } from "react";

const disclaimerPoints = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
  "Tax-loss harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
  "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
  "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
  "Only realised losses are considered for harvesting. Unrealised losses in held-assets are not counted.",
];

export default function Disclaimer() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`disclaimer-box ${open ? "expanded" : ""}`}>
      <div className="disclaimer-header" onClick={() => setOpen(!open)}>
        <div className="disclaimer-title-row">
          <span className="disclaimer-icon">ℹ️</span>
          <span className="disclaimer-title">Important Notes & Disclaimers</span>
        </div>
        <button className="disclaimer-toggle" aria-label="toggle">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <path
              d="M2 5L7 10L12 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <ul className="disclaimer-list">
          {disclaimerPoints.map((point, i) => (
            <li key={i} className="disclaimer-item">
              • {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
