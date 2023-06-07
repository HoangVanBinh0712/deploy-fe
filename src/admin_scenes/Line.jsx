import { Box } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/charts/Header";
import LineChart from "../components/charts/LineChart";


const Line = () => {

  const data =[
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
    },]

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Represent the change of components using a Line Chart" />
      <Box height="75vh">
        <LineChart dataLine={data}/>
      </Box>
    </Box>
  );
};

export default Line;
