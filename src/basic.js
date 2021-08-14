let price = 2;
let quantity = 5;
let total = 0;
let dep = new Set();

let effect = () => (total = price * quantity);

function track() {
  dep.add(effect);
}

function trigger() {
  dep.forEach((effect) => effect());
}

track();
effect();
console.log(`total is : ${total}`);

price = 3;
trigger();

console.log(`total is : ${total}`);
