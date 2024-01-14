const calculateResultSum = require("./calc");
require("colors");

// import calculateResultSum from "./calc";

const total = calculateResultSum([12.1, 12.2, 13.1], 0.9);

const res = "Общая стоимость покупок: " + total + " рублей";

console.log(total > 50 ? res.red : res.green);
