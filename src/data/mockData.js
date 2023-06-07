import { tokens } from "../theme";

export const mockDataTeam = [
  {
    id:"1",
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    emailConfirm: "jon_snow",
    dateCreated: "2022-10-10",
    role:"User",
    status: "active",
  },
  {
    id:"2",
    name: "Stark Nguyen",
    email: "starknguyen@gmail.com",
    emailConfirm: "stark_nguyen",
    dateCreated: "2022-09-10",
    role:"User",
    status: "unactive",
  },
  {
    id:"3",
    name: "Le Manh",
    email: "lemanh@gmail.com",
    emailConfirm: "manh_le",
    dateCreated: "2022-11-10",
    role:"Employer",
    status: "active",
  },
  {
    id:"4",
    name: "Quang Tran",
    email: "tranquang@gmail.com",
    emailConfirm: "tran_quang",
    dateCreated: "2022-09-11",
    role:"Employer",
    status: "active",
  },
  {
    id:"5",
    name: "Tuan Anh",
    email: "rapper@gmail.com",
    emailConfirm: "lilTuan",
    dateCreated: "2022-14-10",
    role:"User",
    status: "unactive",
  },
  {
    id:"5",
    name: "Tuan Anh",
    email: "rapper@gmail.com",
    emailConfirm: "lilTuan",
    dateCreated: "2022-14-10",
    role:"Employer",
    status: "unactive",
  },
  {
    id:"5",
    name: "Tuan Anh",
    email: "rapper@gmail.com",
    emailConfirm: "lilTuan",
    dateCreated: "2022-14-10",
    role:"User",
    status: "unactive",
  },
  {
    id:"5",
    name: "Tuan Anh",
    email: "rapper@gmail.com",
    emailConfirm: "lilTuan",
    dateCreated: "2022-14-10",
    role:"User",
    status: "unactive",
  },
  {
    id:"5",
    name: "Tuan Anh",
    email: "rapper@gmail.com",
    emailConfirm: "lilTuan",
    dateCreated: "2022-14-10",
    role:"Employer",
    status: "unactive",
  },
  {
    id:"5",
    name: "Tuan Anh",
    email: "rapper@gmail.com",
    emailConfirm: "lilTuan",
    dateCreated: "2022-14-10",
    role:"Employer",
    status: "unactive",
  }
];

export const mockHistory = [
  {
    id: "01e4dsa",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "ACTIVE",
    industry: "SALE"
  },
  {
    id: "03d5csa",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "ACTIVE",
    industry: "SALE"
  },
  {
    id: "02a2bcz",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "ACTIVE",
    industry: "SALE"
  },
  {
    id: "04x6nvx",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "PENDING",
    industry: "SALE"
  },
  {
    id: "04x6x",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "ACTIVE",
    industry: "SALE"
  },
  {
    id: "04xx",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "ACTIVE",
    industry: "SALE"
  },
  {
    id: "0xx",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "ACTIVE",
    industry: "SALE"
  },
  {
    id: "04x",
    username: "Recruiter 1",
    dateCreated: "2022-12-11",
    title:"Recruiting part time sales staff hahgagagagag",
    category: "Maketing",
    services: "Basic",
    expiration: "2022-27-11",
    status: "ACTIVE",
    industry: "SALE"
  }
];
export const mockCategory = [
  {
    id: "01",
    name: "Relax",
    dateCreated: "2022-24-01",
    description:"Chuyên mục các bài viết thư giãn tâm hồn",
  },
  {
    id: "02",
    catName: "Gaming",
    dateCreated: "2022-24-08",
    description:"Chuyên mục các bài viết lĩnh vực game",
  },
  {
    id: "03",
    catName: "Life",
    dateCreated: "2022-24-05",
    description:"Chuyên mục các bài viết về cuộc sống",
  }
];

export const mockSevices = [
  {
    id: 1,
    name: "Basic Service",
    description: "Basic service will allow employer to post a job recruitment and allow job seeker to submit their Resume to the post. ",
    type: "BASIC",
    price: '10 USD' ,
    currency: "USD",
    postDuration: '1 month',
    active: true,
    canSearchCV: false,
    canFilterCVSubmit: false
  },
  {
    id: 2,
    name: "Premiun Serivce",
    description: "Premium service will allow employer to post a job recruitment and allow job seeker to submit their Resume to the post. Beside that employer are able to search for job seeker public resume and filter resume submit to their job recruitment.",
    type: "PREMIUM",
    price: '30 USD',
    currency: "USD",
    postDuration: '2 month',
    active: true,
    canSearchCV: true,
    canFilterCVSubmit: true
  }
];

export const mockBarData = [
  {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "employee",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "1",
        y: 101,
      },
      {
        x: "2",
        y: 75,
      },
      {
        x: "3",
        y: 36,
      },
      {
        x: "4",
        y: 216,
      },
      {
        x: "5",
        y: 236,
      },
      {
        x: "6",
        y: 88,
      },
      {
        x: "7",
        y: 232,
      },
      {
        x: "8",
        y: 281,
      },
      {
        x: "9",
        y: 1,
      },
      {
        x: "10",
        y: 35,
      },
      {
        x: "11",
        y: 14,
      },
      {
        x: "12",
        y: 35,
      }
    ],
  },
  {
    id: "employer",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "1",
        y: 212,
      },
      {
        x: "2",
        y: 190,
      },
      {
        x: "3",
        y: 270,
      },
      {
        x: "4",
        y: 9,
      },
      {
        x: "5",
        y: 75,
      },
      {
        x: "6",
        y: 175,
      },
      {
        x: "7",
        y: 33,
      },
      {
        x: "8",
        y: 189,
      },
      {
        x: "9",
        y: 97,
      },
      {
        x: "10",
        y: 87,
      },
      {
        x: "11",
        y: 299,
      },
      {
        x: "12",
        y: 251,
      },
    ],
  },
  {
    id: "admin",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "1",
        y: 191,
      },
      {
        x: "2",
        y: 136,
      },
      {
        x: "3",
        y: 91,
      },
      {
        x: "4",
        y: 190,
      },
      {
        x: "5",
        y: 211,
      },
      {
        x: "6",
        y: 152,
      },
      {
        x: "7",
        y: 189,
      },
      {
        x: "8",
        y: 152,
      },
      {
        x: "9",
        y: 8,
      },
      {
        x: "10",
        y: 197,
      },
      {
        x: "11",
        y: 107,
      },
      {
        x: "12",
        y: 170,
      },
    ],
  },
];

export const mockLineData2 = [
  {
    id: "employer1",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "1",
        y: 101,
      },
      {
        x: "2",
        y: 75,
      },
      {
        x: "3",
        y: 36,
      },
      {
        x: "4",
        y: 216,
      },
      {
        x: "5",
        y: 236,
      },
      {
        x: "6",
        y: 88,
      },
      {
        x: "7",
        y: 232,
      },
      {
        x: "8",
        y: 281,
      },
      {
        x: "9",
        y: 1,
      },
      {
        x: "10",
        y: 35,
      },
      {
        x: "11",
        y: 14,
      },
      {
        x: "12",
        y: 35,
      }
    ],
  },
  {
    id: "employer2",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "1",
        y: 212,
      },
      {
        x: "2",
        y: 190,
      },
      {
        x: "3",
        y: 270,
      },
      {
        x: "4",
        y: 9,
      },
      {
        x: "5",
        y: 75,
      },
      {
        x: "6",
        y: 175,
      },
      {
        x: "7",
        y: 33,
      },
      {
        x: "8",
        y: 189,
      },
      {
        x: "9",
        y: 97,
      },
      {
        x: "10",
        y: 87,
      },
      {
        x: "11",
        y: 299,
      },
      {
        x: "12",
        y: 251,
      },
    ],
  },
  {
    id: "employer3",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "1",
        y: 191,
      },
      {
        x: "2",
        y: 136,
      },
      {
        x: "3",
        y: 91,
      },
      {
        x: "4",
        y: 190,
      },
      {
        x: "5",
        y: 211,
      },
      {
        x: "6",
        y: 152,
      },
      {
        x: "7",
        y: 189,
      },
      {
        x: "8",
        y: 152,
      },
      {
        x: "9",
        y: 8,
      },
      {
        x: "10",
        y: 197,
      },
      {
        x: "11",
        y: 107,
      },
      {
        x: "12",
        y: 170,
      },
    ],
  },
];
