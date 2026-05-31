import React from "react";

const fmt = (val) => {
  if (val === null || val === undefined) return "—";
  const abs = Math.abs(val);
  const sign = val < 0 ? "-" : "";
  return `${sign}$ ${abs.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const fmtRealised = (val) => {
  const abs = Math.abs(val);
  const sign = val < 0 ? "- " : "";
  return `${sign}$${abs.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export default function CapitalGainsCard({ title, gains, realisedGains, variant, savings }) {
  const isBlue = variant === "blue";

  const netStcg = gains ? gains.stcg.profits - gains.stcg.losses : 0;
  const netLtcg = gains ? gains.ltcg.profits - gains.ltcg.losses : 0;

  return (
    <div className={`gains-card ${isBlue ? "gains-card--blue" : "gains-card--dark"}`}>
      <h2 className="gains-card__title">{title}</h2>

      <div className="gains-card__table">
        <div className="gains-card__header-row">
          <span></span>
          <span className="gains-col-label">Short-term</span>
          <span className="gains-col-label">Long-term</span>
        </div>

        <div className="gains-card__row">
          <span className="gains-row-label">Profits</span>
          <span className={`gains-value ${isBlue ? "" : "gains-value--neutral"}`}>
            {fmt(gains?.stcg.profits)}
          </span>
          <span className={`gains-value ${isBlue ? "" : "gains-value--neutral"}`}>
            {fmt(gains?.ltcg.profits)}
          </span>
        </div>

        <div className="gains-card__row">
          <span className="gains-row-label">Losses</span>
          <span className="gains-value gains-value--red">
            -{fmt(gains?.stcg.losses).replace("-", "").trim()}
          </span>
          <span className="gains-value gains-value--red">
            -{fmt(gains?.ltcg.losses).replace("-", "").trim()}
          </span>
        </div>

        <div className="gains-card__row">
          <span className="gains-row-label">Net Capital Gains</span>
          <span className={`gains-value ${netStcg < 0 ? "gains-value--red" : "gains-value--neutral"}`}>
            {fmt(netStcg)}
          </span>
          <span className={`gains-value ${netLtcg < 0 ? "gains-value--red" : "gains-value--neutral"}`}>
            {fmt(netLtcg)}
          </span>
        </div>
      </div>

      <div className="gains-card__divider" />

      {isBlue ? (
        <div className="gains-card__realised-blue">
          <span className="gains-realised-label">Effective Capital Gains:</span>
          <span className="gains-realised-value-blue">
            {realisedGains < 0 ? "– " : ""}${Math.abs(realisedGains).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>
      ) : (
        <div className="gains-card__realised">
          <span className="gains-realised-label">Realised Capital Gains:</span>
          <span className="gains-realised-value">{fmtRealised(realisedGains)}</span>
        </div>
      )}

      {isBlue && savings !== null && savings !== undefined && (
        <div className="gains-savings-row">
          <span className="savings-rocket">🚀</span>
          <span className="savings-text">
            You are going to save upto:{" "}
            <strong>
              ₹{savings.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
