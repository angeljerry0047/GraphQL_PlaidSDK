export const modelsSelector = (state) => {
  // TODO: ideally Portfolio description should be set in the database and returned from the API, not hardcoded here
  const getPortfolioDescription = (name) => {
    switch (name) {
      case 'Aggressive':
        return 'Stable investments with more room for volatility and high return potential.';
      case 'Moderate':
        return 'Stable investments with some volatility mixed in for potentially higher returns.';
      case 'Balanced':
        return 'Investments favor stability and consistent growth over volatility.';
      default:
        return '';
    }
  };

  // TODO: ideally strategyName should be set in the database and returned from the API, not hardcoded here
  const getStrategyName = (label) => {
    switch (label) {
      case 'SPY':
        return 'U.S. Stocks';
      case 'SPDW':
        return 'International Stocks';
      case 'SPEM':
        return 'Emerging Markets Stocks';
      case 'USIG':
        return 'U.S. Corporate Bonds';
      case 'SCHP':
        return 'U.S. Treasury Bonds';
      default:
        return '';
    }
  };

  // TODO: ideally cusip should be set in the database and returned from the API, not hardcoded here
  const getCusip = (label) => {
    switch (label) {
      case 'SPY':
        return '78462F103';
      case 'SPDW':
        return '78463X889';
      case 'SPEM':
        return '78463X509';
      case 'USIG':
        return '464288620';
      case 'SCHP':
        return '808524870';
      default:
        return '78462F103';
    }
  };

  const remapEntry = (entry) => {
    return {
      name: entry.name,
      id: entry.id,
      description: getPortfolioDescription(entry.name),
      items: entry.classes
        .reduce(
          (obj, cls) => [
            ...obj,
            ...cls.bundles.reduce((allBundles, b) => {
              const currWeight = (b.weight * cls.weight) / 100;
              return [
                ...allBundles,
                {
                  id: b.bundleId,
                  label: b.bundleName,
                  cusip: getCusip(b.bundleName),
                  weight: currWeight,
                  description: `${
                    Number.isInteger(currWeight)
                      ? currWeight
                      : currWeight.toFixed(2)
                  }% of portfolio`,
                  type: cls.name === 'Fixed Income' ? 'bond' : 'stock',
                  strategyName: getStrategyName(b.bundleName),
                },
              ];
            }, []),
          ],
          [],
        )
        .sort((a, b) => b.weight - a.weight),
      stockWeight: entry.classes.reduce(
        (sum, cls) => (cls.name === 'Equity' ? sum + cls.weight : sum),
        0,
      ),
      bondWeight: entry.classes.reduce(
        (sum, cls) => (cls.name === 'Fixed Income' ? sum + cls.weight : sum),
        0,
      ),
    };
  };
  return state.portfolio.models.reduce(
    (obj, entry) => ({ ...obj, [entry.name]: remapEntry(entry) }),
    {},
  );
};
