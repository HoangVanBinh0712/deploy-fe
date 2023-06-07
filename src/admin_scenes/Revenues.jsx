import { Box, useTheme, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AddIcon from '@mui/icons-material/Add';
import Header from "../components/charts/Header";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import addIcon from '../assets/icons/add-icon.png'
import swal from "sweetalert";
import './css/drop-box-services-page.css'

const Revenues = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { getStatiticsOder } = useContext(AuthContext)

  const [keySearch, setKeySearch] = useState('PAID')
  const [listRevenue, setListRevenue] = useState([])
  const [revenueChosen, setRevenueChosen] = useState({
    id: 0,
    post: null,
    service: {
      id: 0,
      name: "",
      description: "",
      type: "",
      price: 30,
      currency: "USD",
      postDuration: 2,
      active: true,
      canSearchCV: true,
      canFilterCVSubmit: true
    },
    duration: 1,
    total: 30,
    currency: "USD",
    status: "WAIT_FOR_PAYMENT",
    createdDate: "2023-05-08 20:21:47",
    paidDate: null,
    note: null,
    paymentUrl: "",
    user: null,
  },)
  const [openInfoForm, setInfoForm] = useState(false)
  const [totalRevenue, setTotalRevenue] = useState(0)

  const getTotalRevenue = (objs) => {
    let total = 0
    if (objs.length !== 0)
      for (var i = 0; i < objs.length; i++) {
        total += objs[i]['total'];
      }
    setTotalRevenue(total)
  }
  const getListRevenues = async (keyword) => {
    try {
      const res = await getStatiticsOder(keyword)
      if (res.status === 200) {
        setListRevenue(res.data)
        getTotalRevenue(res.data)
      }
      else setListRevenue([])
    }
    catch (error) {
      swal({
        title: "Error",
        icon: "warning",
        text: error,
        dangerMode: true,
      })
    }
  }

  useEffect(() => {
    getListRevenues(keySearch)
  }, [keySearch])

  const onChangeInputSearch = (event) => setKeySearch(event.target.value)

  const onClickView = (data) => {
    setRevenueChosen({
      id: data.id,
      post: data.post,
      service: data.service,
      duration: data.duration,
      total: data.total,
      currency: data.currency,
      status: data.status,
      createdDate: data.createdDate,
      paidDate: data.paidDate,
      note: data.note,
      paymentUrl: data.paymentUrl,
      user: data.user,
    })
    setInfoForm(true)
  }

  const DropdownBox = ({ onClick1, index, service }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box className="dropdown-box"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <MoreVertIcon
          className="serListDelete"
        />
        {isOpen && (
          <Box className="dropdown-options"
            style={{ top: `${40 + (index + 1) * 40}px`, right: '0px' }}>
            <Box
              className="dropdown-option"
              onClick={() => onClick1(service)}
            >
              View
            </Box>
          </Box>
        )}
      </Box>
    )
  }
  const getPostDate = (date, isGetTime) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();
    const hour = String(myDate.getHours()).padStart(2, '0')
    const min = String(myDate.getMinutes()).padStart(2, '0')
    if (isGetTime)
      return (`${hour}:${min}${' '}${day}/${month}/${year}`)
    else return (`${day}/${month}/${year}`)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 40
    },
    {
      field: "service",
      headerName: "Service Name",
      width: 130,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { service } }) => {
        return (
          <>
            {service?.name}
          </>
        );
      },

    },
    {
      field: "description",
      headerName: "Service description",
      flex: 1,
      renderCell: ({ row: { service } }) => {
        return (
          <Box style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {service?.description}
          </Box>
        );
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      cellClassName: "name-column--cell",
      width: 100,
      renderCell: ({ row: { duration } }) => {
        return (
          <Box style={{ paddingLeft: '10px' }}>
            {`${duration} ${duration > 1 ? 'months' : 'month'}`}
          </Box>
        );
      },
    },
    {
      field: "total",
      headerName: "Price",
      width: 100,
      renderCell: ({ row: { total, currency } }) => {
        return (
          <>
            {`${total} ${currency}`}
          </>
        );
      },
    },
    {
      field: "createdDate",
      headerName: "Create Date",
      width: 130,
      renderCell: ({ row: { createdDate } }) => {
        return (
          <>
            {getPostDate(createdDate, true)}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: 'center',
      width: 200,
      renderCell: ({ row: { status, paidDate } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "PAID"
                ? colors.greenAccent[700]
                : '#f8bc6e'
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status === 'PAID' ? `Paid at: ${getPostDate(paidDate, true)}` : "Wait for payment"}
            </Typography>
          </Box>
        );
      },

    },
    {
      field: "action",
      headerName: "Others",
      headerAlign: 'center',
      align: 'center',
      width: 80,
      renderCell: (params) => {

        return (
          <>
            <DropdownBox onClick1={onClickView} index={params.rowIndex} service={params.row} />
          </>
        );
      },
    }
  ];

  return (
    <Box m="2px 20px 20px 20px">

      <div style={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
        <Box style={{ display: 'flex' }}>
          <Header title="List of Revenue" subtitle={`Total revenue: ${totalRevenue}`} />
        </Box>

        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <Select
            style={{
              border: '1px solid #fff'
            }}
            value={keySearch}
            onChange={onChangeInputSearch}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value='PAID'>Paid</MenuItem>
            <MenuItem value='WAIT_FOR_PAYMENT'>Waiting for payment</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid /* checkboxSelection */ disableRowSelectionOnClick rows={listRevenue} columns={columns} />
      </Box>
      <div className='change-service-info-form' style={openInfoForm ? { display: 'block' } : { display: 'none' }}>
        <div className='form-change-service-control'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '40px' }}>
            <div style={{ color: "#0c62ad", fontSize: '18px', fontWeight: '500' }}>{`Payment ID: ${revenueChosen.id}`}</div>
            <div><img src={addIcon} className='close-form-submit' alt=''
              onClick={() => {
                setInfoForm(false)
              }
              } /></div>
          </div>
          {revenueChosen.paidDate === null ? (
            <div style={{ width: '50%', display: 'flex', color: '#f8bc6e' }}>
              {`Waiting for payment`}
            </div>
          ) : (
            <div style={{ width: '50%', display: 'flex', color: 'rgb(80, 149, 80)' }}>
              {`Paid at: ${getPostDate(revenueChosen.paidDate, true)}`}
            </div>
          )}

          <div className="fram-info-report" style={{ marginTop: '5px' }}>
            <div className="gr-int-value">
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>Service name:</div>
                <input value={revenueChosen.service.name}
                  disabled className="input-view-post-details"
                  style={{ width: '80%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>Service type:</div>
                <input value={revenueChosen.service.type}
                  disabled className="input-view-post-details"
                  style={{ width: '80%' }}></input>
              </div>
              <p style={{ fontSize: '14px', color: '#0c62ad' }}>*Author:</p>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>User name:</div>
                <input value={revenueChosen.user?.name}
                  disabled className="input-view-post-details"
                  style={{ width: '80%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>Email:</div>
                <input value={revenueChosen.user?.email}
                  disabled className="input-view-post-details"
                  style={{ width: '80%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>Phone:</div>
                <input value={revenueChosen.user?.phone}
                  disabled className="input-view-post-details"
                  style={{ width: '80%' }}></input>
              </div>
              <p style={{ fontSize: '14px', color: '#0c62ad' }}>*Order information:</p>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>Duration:</div>
                <input value={revenueChosen.duration>1?(`${revenueChosen.duration} months`):(`${revenueChosen.duration} month`)}
                  disabled className="input-view-post-details"
                  style={{ width: '80%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>{`Total (${revenueChosen.currency}):`}</div>
                <input value={revenueChosen.total}
                  disabled className="input-view-post-details"
                  style={{ width: '80%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '20%' }}>{`Created date:`}</div>
                <div style={{ color: '#0c62ad' }}>{getPostDate(revenueChosen.createdDate, true)}</div>
              </div>
            </div>
          </div>
          {revenueChosen.paidDate === null ? (
            <div style={{ width: '100%', display: 'flex', color: '#f8bc6e', justifyContent:'end' }}>
              {`Waiting for payment`}
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', color: 'rgb(80, 149, 80)', justifyContent:'end' }}>
              {`Paid at: ${getPostDate(revenueChosen.paidDate, true)}`}
            </div>
          )}
          <div className="group-buttons flex-row "
            style={{ display: 'flex', justifyContent: 'end', marginTop: '1.2em', gap: '1em' }}>
            <div className="button btn-close al-content-btn"
              onClick={() => {
                setInfoForm(false)
              }}>
              <i className="fa fa-times" aria-hidden="true" style={{ height: '25px', width: 'auto', marginTop: '10px' }}></i>
              CLOSE
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Revenues;
