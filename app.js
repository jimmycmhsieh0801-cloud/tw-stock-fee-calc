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
  const copyBtn = document.getElementById("copyResultBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const [amt, st, da, db] = ids.map(id => document.getElementById(id).value);
      const res = calcStockCost(amt, st, da, db);
      const summary = `【2026 台股 ${da} 折 vs ${db} 折手續費試算】\n單筆買進金額：NT$${Number(amt).toLocaleString()}\n低手續費方案買+賣成本：NT$${res.totalA.toLocaleString()}（一般方案：NT$${res.totalB.toLocaleString()}）\n單筆來回現省：NT$${res.saved.toLocaleString()}（回本漲幅 +${res.breakEvenPct}%）\n👉 免費試算：https://jimmycmhsieh0801-cloud.github.io/tw-stock-fee-calc/`;
      const done = () => {
        copyBtn.textContent = "✓ 已複製試算摘要，快去貼上分享！";
        setTimeout(() => { copyBtn.textContent = "📋 一鍵複製試算結果分享（貼到 Line 群 / Threads 討論）"; }, 2200);
        if (typeof gtag === "function") gtag("event", "share_result_copy", { tool: "tw-stock-fee-calc" });
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summary).then(done).catch(() => {});
      }
    });
  }

  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcStockCost };