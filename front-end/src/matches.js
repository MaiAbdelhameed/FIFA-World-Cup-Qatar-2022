const matches = [
    {
      id: 1,
      name: "Japan vs. Spain",
      rows: 7,
      seats: 10,
      area:[
        [{id:0, value:1}, {id:1, value:0}],
        [{id:2, value:0}, {id:3, value:1}],
      ],
      date: "1st of December"
    },
    {
      id: 2,
      name: "Morocco vs. Croatia",
      rows: 8,
      seats: 6, //per row
      area: [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 0],
        [1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1]
      ],
      date: "17th of December"
    },
    {
      id: 3,
      name: "France vs. Argentina",
      rows: 6,
      seats: 8, //per row
      area: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0]
      ],
      date: "18th of December"
    }
  ];
  
  export default matches;
  