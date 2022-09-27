export const objectToArray = data => {
  const idsArray = Object.keys(data);
  const dataArray = Object.values(data);
  return dataArray
    .map((meetup, index) => ({
      ...meetup,
      id: idsArray[index],
    }))
    .reverse();
};
