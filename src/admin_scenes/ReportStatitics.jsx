import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Header from "../components/charts/Header";
import LineChart from "../components/charts/LineChart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import swal from "sweetalert";

const ReportStatitics = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { getReportStaAdmin } = useContext(AuthContext)

    const currentDate = new Date()
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

    const [inputYear, setInputYear] = useState('')
    const [yearGetUser, setYearGetUser] = useState(currentDate.getFullYear())
    const [staAccount, setStaccount] = useState(dataDefault)

    const formatData = (arr) => {
        const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let newData = [];
        let highMonth = new Date().getMonth()+1;
        for (let i = 12; i > 0; i--) {
            if (i > highMonth) newData.unshift({ x: m[i - 1], y: 0 });
            else {
                const obj = arr.find((item) => item.month === i);
                if (obj === undefined) {
                    newData.splice(12 - highMonth, 0, { x: m[i - 1], y: 0 });
                } else {
                    newData.splice(12 - highMonth, 0, { x: m[i - 1], y: obj.count });
                }
            }
        }
        return newData;
    };

    const getStatiticsAccount = async (year) => {
        const res = await getReportStaAdmin(year)
        if (res.status === 200) {
            const sta = formatData(res.data)
            setStaccount(sta)
        }
    }

    useEffect(() => {
        getStatiticsAccount(yearGetUser)
    }, [yearGetUser])

    const onChangeInputYear = (event) => setInputYear(event.target.value)

    const  isValidYear =(year) =>{
        var currentYear = new Date().getFullYear();
        var minYear = 2023;
        
        if (year >= minYear && year <= currentYear) {
          return {success:true,message:''};
        } 
        else {
          return {
            success:false,
            message:'This website has not been active this year!'
        };
        }
      }

    const onClickViewSta = () => {
        const checkYear = isValidYear(inputYear)
        if(checkYear.success){
            setYearGetUser(inputYear)
        }
        else swal({
            title: "Error",
            icon: "warning",
            text: checkYear.message,
            dangerMode: true,
          })
    }

    return (
        <Box m="0 20px 20px 20px">
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Header title="Report Statitics" subtitle="Statistics of user reports with employers, posts." />
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                    height='50px'
                    width='30%'
                >
                    <InputBase sx={{ ml: 2, flex: 1 }} type="number"
                        placeholder="View by year /yyyy..."
                        onChange={onChangeInputYear} />
                    <IconButton type="button" sx={{ p: 2 }} onClick={() => onClickViewSta()}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box height="75vh">
                <LineChart dataLine={[{
                    id: "Report Statitics",
                    color: tokens("dark").greenAccent[500],
                    data: staAccount
                },]} />
            </Box>
        </Box>
    );
};
export default ReportStatitics