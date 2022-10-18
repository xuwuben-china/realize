function generatorToAsync(generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments); //gen困难悠参数
    return new Promise((resolve, reject) => {
      function go(key, arg) {
        try {
          res = gen[key](arg); //这里可能会执行reject状态的promise
        } catch (error) {
          return reject(error); //报错直接reject
        }
      }
      const { value, done } = res;
      if (done) {
        return resolve(value);
      } else {
        return Promise.resolve(value).then(
          (val) => go("next", val),
          (err) => go("throw", err)
        );
      }
      go("next");
    });
  };
}
