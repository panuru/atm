const getMockPromise = (data, shouldFailSometimes = true) =>
  new Promise((resolve, reject) => {
    const randomMs = Math.round(Math.random() * 1000);

    setTimeout(() => {
      if (shouldFailSometimes && randomMs < 100) {
        // In about 1 in 100 cases, it will fail unexplainably, just like a real ATM
        reject();
      } else {
        resolve(data);
      }
    }, randomMs);
  });

export function getCardData() {
  return getMockPromise({
    pin: 1234
  });
}

export function authorizeCard(card, pin) {
  const data = card.pin === pin ? {
    isAuthorized: true,
    cardHolder: 'I.C. WIENER',
    balance: 6666,
  } : {
    isAuthorized: false,
  };
  return getMockPromise(data);
}
