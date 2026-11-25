const assert = require("assert");
const { calcStockCost } = require("./app.js");
const r = calcStockCost(10000, "etf", 2.0, 6.0);
// 10000*0.001425 = 14.25 -> 2折=2元, 買賣=4元 + 稅10元 = 14元; B=20*2+10=50元
assert.strictEqual(r.totalA, 14);
assert.strictEqual(r.totalB, 50);
assert.strictEqual(r.saved, 36);
console.log("STOCK_FEE_TESTS_PASSED");