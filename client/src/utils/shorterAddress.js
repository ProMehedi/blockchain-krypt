export const shorterAddress = (address) => {
  return address.slice(0, 6) + ' . . . ' + address.slice(-6)
}
