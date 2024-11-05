const dragItems = [
  {
    id: 1,
    type: "move",
    value: 10,
    text: "Move ",
    suffix: " steps",
    color: "bg-blue-500",
  },
  {
    id: 2,
    type: "rotate",
    value: 15,
    text: "Turn ",
    color: "bg-blue-500",
    suffix: " degrees",
  },
  {
    id: 3,
    type: "goto",
    Xvalue: 0,
    Yvalue: 0,
    text: "Goto ",
    color: "bg-blue-500",
  },
  {
    id: 4,
    type: "repeat",
    text: "Repeat ",
    color: "bg-blue-500",
    suffix: " times",
  },
];

export default dragItems;
