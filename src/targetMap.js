let targetMap = new WeakMap();

let product = { price: 2, quantity: 5 };
let total = 0;
let effect = () => (total = product.price * product.quantity);

function track(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap === void 0) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (dep === void 0) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(effect);
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap === void 0) return;

  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

track(product, "quantity");
effect();
console.log(`total is : ${total}`); // 10

product.price = 3;
trigger(product, "quantity");

console.log(`total is : ${total}`); // 15
