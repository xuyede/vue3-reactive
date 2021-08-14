let product = { price: 2, quantity: 5 };
let total = 0;
let depsMap = new Map();

let effect = () => (total = product.price * product.quantity);

function track(key) {
  let dep = depsMap.get(key);
  if (dep === void 0) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(effect);
}

function trigger(key) {
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

track("quantity");
effect();
console.log(`total is : ${total}`); // 10

product.price = 3;
trigger("quantity");

console.log(`total is : ${total}`); // 15
