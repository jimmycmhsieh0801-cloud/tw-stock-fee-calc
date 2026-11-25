function calcStockCost(amt, secType = "etf", discA = 2.0, discB = 6.0) {
  const a = Math.max(0, Number(amt) || 0);
  const baseFee = a * 0.001425;
  const feeA = Math.max(1, Math.floor(baseFee * (discA / 10)));
  const feeB = Math.max(20, Math.floor(baseFee * (discB / 10)));
  const taxRate = secType === "stock" ? 0.003 : secType === "etf" ? 0.001 : 0;
  const tax = Math.floor(a * taxRate);
  const totalA = feeA * 2 + tax;
  const totalB = feeB * 2 + tax;
  const saved = totalB - totalA;
  const breakEvenPct = a > 0 ? Math.round((totalA / a) * 10000) / 100 : 0;
  return { totalA, totalB, saved, breakEvenPct };
}
if (typeof document !== "undefined") {
  const ids = ["tradeAmt", "secType", "discA", "discB"];
  function render() {
    const [amt, st, da, db] = ids.map(id => document.getElementById(id).value);
    const res = calcStockCost(amt, st, da, db);
    document.getElementById("costAEl").textContent = `NT$ ${res.totalA.toLocaleString()}`;
    document.getElementById("costBEl").textContent = `NT$ ${res.totalB.toLocaleString()}`;
    document.getElementById("saveEl").textContent = `NT$ ${res.saved.toLocaleString()}`;
    document.getElementById("breakEvenEl").textContent = `+${res.breakEvenPct}%`;
  }
  ids.forEach(id => document.getElementById(id).addEventListener("input", render));
  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcStockCost };