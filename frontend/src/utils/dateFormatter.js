const dateFormatter = (string) => {
  // example MongoDB Date String: 2023-03-13T12:36:20.992Z
  const date = string.split('T')[0].split('-').reverse().join('/');
  const time = string.split('T')[1].split(':').slice(0, 2).join(':');
  // 12:36 13/03/2023
  return `${time} ${date}`;
};

export default dateFormatter;
