import moment from 'moment';

export const calculatePortfolio = (user, portfolio, answers) => {
  let h = 0;
  //Calculate the User's Age
  const dob = moment(user.dateOfBirth, 'MM-DD-YYYY');
  const age = moment().diff(dob, 'years');

  if (answers.timeHorizon === 4) {
    //Less than one year
    if (answers.investmentObjective === 4) {
      h = 3.5;
    } else {
      h = 0.5;
    }
  } else if (answers.timeHorizon === 3) {
    //1-3 years
    if (answers.investmentObjective === 4) {
      h = 4.0;
    } else {
      h = 2.0;
    }
  } else if (answers.timeHorizon === 2) {
    //3-5 Years
    if (answers.investmentObjective === 4) {
      h = 6.5;
    } else {
      h = 4.0;
    }
  } else if (answers.timeHorizon === 1) {
    //5-10 Years
    if (answers.investmentObjective === 4) {
      h = 9.5;
    } else {
      h = 7.25;
    }
  } else {
    //Over 10 Years
    if (answers.investmentObjective === 4) {
      h = 14.5;
    } else {
      h = 11.0;
    }
  }

  if (age >= 70) {
    h = Math.min(h, 3.0);
  } else if (age >= 18 && age <= 49) {
    h = h + 2.0;
  }

  if (answers.annualIncomeUSD === 4) {
    h = Math.max(0, h - 2);
  } else if (answers.annualIncomeUSD <= 1) {
    h = h + 2.0;
  }
  console.log('Portfolio Score: ', h);

  if (h >= 5) {
    console.log('Portfolio Risk: Aggressive');
    return 'Aggressive';
  } else if (h >= 2.5) {
    console.log('Portfolio Risk: Moderate');
    return 'Moderate';
  } else {
    console.log('Portfolio Risk: Balanced');
    return 'Balanced';
  }
};
