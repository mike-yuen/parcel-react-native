export enum ORDER_STATUS {
  INIT = 1,
  TRANSFERRING = 2,
  PENDING = 3,
  SUCCESS = 4,
  FAIL = 5,
  CANCELED = 6,
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
