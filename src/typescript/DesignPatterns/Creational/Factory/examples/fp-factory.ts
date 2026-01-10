// Factory pattern with functional programming
// We use currying here to differentiate the creator functions by their type

const customerCreator = ({ isGood }: { isGood: boolean }) => {
  return isGood ? goodCustomer : badCustomer;
};

const customer = ({ isGood }: { isGood: boolean }) => {
  return {
    isGood,
  };
};

const goodCustomerCreator = () => {
  return customerCreator({ isGood: true });
};

const badCustomerCreator = () => {
  return customerCreator({ isGood: false });
};

const goodCustomer = () => {
  return customer({ isGood: true });
};

const badCustomer = () => {
  return customer({ isGood: false });
};
