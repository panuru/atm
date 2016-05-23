export function getCardData() {
  return new Promise((resolve, reject) => {
    const randomMs = Math.round(Math.random() * 1000);

    setTimeout(() => {
      if (randomMs < 100) {
        // In about 1 in 100 cases, will fail unexplainably, just like in the real world
        reject();
      } else {
        resolve({
          pin: 1234
        });
      }
    }, randomMs);
  });
}
