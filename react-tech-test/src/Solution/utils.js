export const calculateProfit = ({
  soldPrice,
  costToBusiness,
  quantitySold,
}) => {
  const profit = soldPrice - costToBusiness;
  const taxRate = 0.08;

  // variables for above tax threshold
  let underThreshold = 10 * profit;
  let overQuantitySold = quantitySold - 10;
  const tax = overQuantitySold * taxRate * profit;
  let itemProfit = overQuantitySold * profit - tax;

  if (quantitySold <= 10) {
    const totalProfit = (quantitySold * profit).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return `£${totalProfit}`;
  } else if (quantitySold > 10) {
    const totalProfit = (itemProfit + underThreshold).toLocaleString(
      undefined,
      { maximumFractionDigits: 2 }
    );

    return `£${totalProfit}`;
  }
};
