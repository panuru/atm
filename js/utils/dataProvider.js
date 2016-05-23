const getMockPromise = (data, shouldFailSometimes = true) =>
  new Promise((resolve, reject) => {
    const randomMs = Math.round(Math.random() * 1000);

    setTimeout(() => {
      if (shouldFailSometimes && randomMs < 50) {
        // In about 1 in 200 cases, it will fail unexplainably, just like a real ATM
        reject();
      } else {
        resolve(data);
      }
    }, randomMs + 500);
  });

export function getCardData() {
  return getMockPromise({
    pin: '1234'
  });
}

export function authorizeCard(card, pin) {
  const data = card.pin.toString() === pin.toString() ? {
    isAuthorised: true,
    type: 'Visa',
    primaryAccountNumber: '1234 5678 9012 3456',
    cardHolder: 'I.C. WIENER',
    issuer: 'The Bank Of Doom',
    expires: '2017-01-01T00:00:00'
  } : {
    isAuthorised: false,
  };
  return getMockPromise(data);
}

export function getAccountData(card) {
  // TODO check card expiration
  return getMockPromise({
    accountHolder: card.cardHolder,
    accountNumber: card.primaryAccountNumber,
    balance: 6666
  });
}

export function withdrawFromAccount(account, amount) {
  // TODO check balance, don't allow negative
  return getMockPromise({
    ...account,
    balance: account.balance - amount
  });
}
