let targetMap = new WeakMap();
let activeEffect = null;
let product = reactive({ price: 2, quantity: 5 });
let total = 0;

function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      let result = Reflect.set(target, key, value, receiver);
      if (result && oldValue != value) {
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}

function track(target, key) {
  if (activeEffect) {
    console.log(111);
    let depsMap = targetMap.get(target);
    if (depsMap === void 0) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (dep === void 0) {
      depsMap.set(key, (dep = new Set()));
    }

    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap === void 0) return;

  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

effect(() => (total = product.price * product.quantity));
console.log(`total is : ${total}`); // 10
product.price = 3;

console.log(`total is : ${total}`); // 15
