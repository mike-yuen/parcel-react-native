export enum ORDER_STATUS {
  INIT = 1,
  AWAITING_PICKUP = 2,
  TRANSFERRING = 3,
  SUCCESS = 4,
  FAIL = 5, // Dying, can be revived 
  CANCELED = 6, // Died
}

export enum SUB_ORDER_STATUS {
  ACCEPTED = 1,
  COMMING_STOCK = 2,
  ARRIVED_STOCK = 3,
  TRANSFERRING_TO_RECEIVER = 4,
  PENDING = 5,
  FAIL = 6,
  SUCCESS = 7,
}

export enum SUB_ORDER_TYPE {
  FOOD = 1,
  CLOTHES = 2,
  ELECTRIC = 3,
  FRAGILE = 4,
  OTHERS = 5,
}
