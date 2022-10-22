const spreadNumberIntoEqualParts = (
  number: number,
  parts: number,
  startsAt: number = 1
) => {
  let equalParts = [];

  let currentParts = parts;

  for (let i = 0; i < parts; i++) {
    if (startsAt > parts) startsAt = 1;

    const equalNumber = Math.ceil(number / currentParts);
    equalParts[startsAt - 1] = equalNumber;
    number -= equalNumber;
    currentParts--;
    startsAt++;
  }

  return equalParts;
};

export default spreadNumberIntoEqualParts;
