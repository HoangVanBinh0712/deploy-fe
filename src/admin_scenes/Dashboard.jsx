import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockHistory } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ArticleIcon from '@mui/icons-material/Article'; import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../components/charts/Header";
import LineChart from "../components/charts/LineChart";
import StatBox from "../components/charts/StatBox";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);  
  const { getListPostAdmin, getUserStaAdmin, getCountAllPost } = useContext(AuthContext)

  const dataDefault = [
    {
      x: "January",
      y: 0,
    },
    {
      x: "February",
      y: 0,
    },
    {
      x: "March",
      y: 0,
    },
    {
      x: "April",
      y: 0,
    },
    {
      x: "May",
      y: 0,
    },
    {
      x: "June",
      y: 0,
    },
    {
      x: "July",
      y: 0,
    },
    {
      x: "August",
      y: 0,
    },
    {
      x: "September",
      y: 0,
    },
    {
      x: "October",
      y: 0,
    },
    {
      x: "November",
      y: 0,
    },
    {
      x: "December",
      y: 0,
    }
  ]

  const [staAccount, setStaccount] = useState(dataDefault)
  const [listPostThisMonth, setListPostThisMonth] = useState([])
  const [listPostLastMonth, setListPostLastMonth] = useState([])
  const [countAllPost, setCountAllPost] = useState(0)

  const formatData = (arr) => {
    const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newData = [];
    let highMonth = 1;
    for (let i = 1; i < 12; i++) {
      const obj = arr.find((item) => item.month === i);
      if (obj !== undefined) {
        highMonth = obj.month;
      }
    }
    for (let i = 12; i > 0; i--) {
      if (i > highMonth) newData.unshift({ x: m[i - 1], y: 0 });
      else {
        const obj = arr.find((item) => item.month === i);
        if (obj === undefined) {
          newData.splice(12 - highMonth, 0, { x: m[i - 1], y: 0 });
        } else {
          newData.splice(12 - highMonth, 0, { x: m[i - 1], y: obj.value });
        }
      }
    }
    return newData;
  };

  const getStatiticsAccount = async (year) => {
    const res = await getUserStaAdmin(year)
    if (res.status === 200) {
      const sta = formatData(res.data)
      setStaccount(sta)
    }
  }

  const getAllPost = async (date) => {
    const res = await getListPostAdmin(`?startDate=${date}&limit=1000`)
    if (res.success) {
      setListPostThisMonth(res.data.reverse())
    }
  }

  const getAllPostLastMonth = async (date) => {
    const res = await getListPostAdmin(`?startDate=${date}&limit=1000`)
    if (res.success) {
      setListPostLastMonth(res.data)
    }
  }

  const getCountAllPostByAdmin = async () => {
    const res = await getCountAllPost()
    if(res.success)setCountAllPost(res.data)
  }

  const getPostDate = (date, reflect) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();
    if (reflect) return (`${year}-${month}-${day}`)
    return (`${day}/${month}/${year}`)
  }



  useEffect(() => {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - 1)
    getAllPost(getPostDate(currentDate, true))
    currentDate.setMonth(currentDate.getMonth() - 1)
    getAllPostLastMonth(getPostDate(currentDate, true))
    getStatiticsAccount(currentDate.getFullYear())
    getCountAllPostByAdmin()
  }, [])

  const getPtvalue = (v1, v2) => {
    if (v2 === 0||v1===0) return 0
    else return v2 / v1
  }


  return (
    <Box m="0 20px 20px 20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to the dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >

        {/* ROW 1 */}
        <Box
          gridColumn="span 5"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={listPostThisMonth.length}
            subtitle="Post created is this month"
            progress={getPtvalue(listPostThisMonth.length, listPostLastMonth.length)}
            increase={`+${(getPtvalue(listPostThisMonth.length, countAllPost) * 100).toFixed(1)}% increase`}
            icon={
              <ArticleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Users"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          height="360px"
        >
          <Box
            mt="25px"
            p="0 1.6em"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Number of accounts created by month
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              </Typography>
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          <Box height="300px" m="-20px 0 0 0">
            {/*<BarChart isDashboard={true} /> error is here*/}
            <LineChart dataLine={[{
              id: "user account",
              color: tokens("dark").greenAccent[500],
              data: staAccount
            },]} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="360px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              New Posts
            </Typography>
          </Box>
          {listPostThisMonth.length > 0 ? (<>
            {listPostThisMonth.map((post, i) => (
              <Box
                key={`${post.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`2px solid ${colors.primary[500]}`}
                p="10px"
              >
                <Box
                  overflow="hidden"
                  whiteSpace="nowrap"
                  paddingX="2px"
                  textOverflow="ellipsis"
                  width="50%"
                >
                  <Typography
                    color={colors.greenAccent[500]}
                    textOverflow="ellipsis"
                  >
                    {post.title}
                  </Typography>
                </Box>
                <Box
                  color={colors.grey[100]}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  fontSize="12px"
                  paddingX="4px"
                  width="20%"
                >
                  {getPostDate(post.createDate, false)}
                </Box>
                <Box
                  display='flex'
                  color={colors.blueAccent[500]}
                  paddingLeft='2px'
                  justifyContent='center'
                  width="20%"
                >
                  {post.industry.name}
                </Box>
              </Box>
            ))}
          </>) : (<>No articles have been created this month.</>)}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
