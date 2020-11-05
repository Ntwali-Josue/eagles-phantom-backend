import { busInfo, busUpdate } from '../validations/bus.validator';

export const validateBusInfo = (req, res, next) => {
  const { error } = busInfo(req);
  if (error) {
    return res.status(400).json({
      error,
    });
  }
  return next();
};

export const validateBusUpdate = (req, res, next) => {
  const { error } = busUpdate(req);
  if (error) {
    return res.status(400).json({
      error,
    });
  }
  return next();
};
