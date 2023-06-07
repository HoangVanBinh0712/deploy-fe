import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/charts/Header";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import swal from "sweetalert";
import addIcon from '../assets/icons/add-icon.png'

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { changeReportHandleByAdmin, getReportByAdmin } = useContext(AuthContext)

  const maxDate = new Date()
  const getPostDate = (date, reverse) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();
    if (reverse)
      return (`${year}-${month}-${day}`)
    return (`${day}-${month}-${year}`)
  }

  const getPostTime = (date) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();
    const min = String(myDate.getMinutes()).padStart(2, '0');
    const hour = String(myDate.getHours()).padStart(2, '0');
    return (`${min}:${hour} ${day}-${month}-${year}`)
  }

  const defaultRp = {
    id: 4,
    name: "string",
    phone: "0329548930",
    email: "strings@gmail.com",
    reportContent: "string string string string string string string string",
    handle: false,
    date: "2023-05-14 01:58:18",
    post: {
      id: '',
      title: "",
      description: "",
      method: "",
      position: "",
      experience: "",
      gender: "",
      requirement: "",
      benifit: "",
      contact: "",
      salary: null,
      currency: "",
      location: "",
      recruit: 0,
      createDate: "2023-01-07 10:56:01",
      expirationDate: "",
      author: {
        id: '',
        email: "",
        emailConfirm: false,
        name: "",
        phone: "",
        city: {
          id: 0,
          name: ""
        },
        industry: {
          id: 0,
          name: ""
        },
        urlAvatar: null,
        urlCover: null,
        address: "",
        description: "",
        role: "",
        createDate: "2023-01-07 00:00:00",
        active: false,
        service: {
          id: 0,
          name: "Premiun Serivce",
        },
        serviceExpirationDate: "2025-01-07 00:00:00"
      },
      industry: {
        id: 0,
        name: ""
      },
      city: {
        id: 0,
        name: ""
      },
      status: "",
      viewCount: 0,
      service: {
        id: 0,
        name: "Premiun Serivce",
      },
    }
  }
  const [searchKey, setSearchKey] = useState({
    postId: '',
    handle: '',
    date: '',
  })
  const [inputPostId, setInputPostId] = useState('')
  const [inputDateReport, setInputDateReport] = useState('')
  const [isViewDetail, setIsViewDetail] = useState(false)
  const [isViewPostDetails, setIsViewPostDetails] = useState(false)
  const [reportChosen, setReportChosen] = useState(defaultRp)

  const [listRp, setListRp] = useState([])

  const createSearchPararam = (obj) => {
    let searchQuery = ''
    for (let prop in obj) {
      if (obj[prop].length > 0) {
        if (searchQuery.length === 0)
          searchQuery += `?${prop}=${obj[prop]}`
        else searchQuery += `&${prop}=${obj[prop]}`
      }
    }
    if (searchQuery.length === 0)
      searchQuery += `?limit=1000`
    else searchQuery += `&limit=1000`
    return searchQuery
  }

  const getRpList = async (keyword) => {
    try {
      const res = await getReportByAdmin(keyword)
      if (res.success) setListRp(res.data.reverse())
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
    const query = createSearchPararam(searchKey)
    getRpList(query)
  }, [searchKey])



  const DropdownBox = ({ onClick1, onClick2, index, report }) => {

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
            style={{ top: `${40 + (index + 1) * 40}px`, right: '20px' }}>
            <Box
              className="dropdown-option"
              onClick={() => onClick1(report)}
            >
              View Detail
            </Box>
            {report.handle ? (<></>) : (
              <Box
                className="dropdown-option"
                onClick={() => swal({
                  title: "Are you sure you want to change this report status?",
                  icon: "warning",
                  text: `This action will be cgange status to ${!report.handle ? "Solved" : 'Not resolve'}.`,
                  buttons: {
                    cancel: "No, cancel",
                    confirm: "Yes, proceed"
                  },
                  dangerMode: true
                }).then((isConfirmed) => {
                  if (isConfirmed) onClick2(report.id, !report.handle)
                })}
              >
                Mark as solved
              </Box>
            )}

          </Box>
        )}
      </Box>
    )
  }

  const onClickView = (data) => {
    setReportChosen(data)
    setIsViewDetail(true)
  }

  const onClicSetHandle = async (id, handle) => {
    const res = await changeReportHandleByAdmin(id, handle)
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: reportChosen.handle ? 'Report status was changed to solved successfully!' : 'Report status was changed to Not resolved successfully!',
      })
      const query = createSearchPararam(searchKey)
      getRpList(query)
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  const onChangInputPostId = (event) => {
    setInputPostId(event.target.value)
  }

  const onChangInputDate = (event) => {
    setInputDateReport(event.target.value)
  }

  const onChangeSelectReportStatus = (event) => {
    setSearchKey({
      ...searchKey,
      handle: event.target.value
    })
  }

  const onClickSearchID = () => setSearchKey({
    ...searchKey,
    postId: inputPostId
  })

  const onClickSearchIDDate = () => setSearchKey({
    ...searchKey,
    date: inputDateReport.length > 0 ? getPostDate(inputDateReport, true) : '',
  })

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "reportContent",
      headerName: "Report content",
      flex: 2,
      renderCell: ({ row: { reportContent } }) => {
        return (
          <Box dangerouslySetInnerHTML={{ __html: reportContent }} style={{whiteSpace:'nowrap', overflow:"hidden", textOverflow:'ellipsis'}}>
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Report By",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date reported",
      type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "post",
      headerName: "Post ID/ Post title",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { post } }) => {
        return (
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box style={{ color: colors.greenAccent[700], marginRight: '5px', fontSize: '16px' }}>{`${post.id} /`}</Box>
            <Box style={{ color: '#fff' }}>{post.title}</Box>
          </Box>
        );
      },
    },
    {
      field: "postBy",
      headerName: "Posted by",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { post } }) => {
        return (
          <Box style={{ display: 'flex' }}>
            <Box style={{ color: colors.greenAccent[500], textTransform: 'uppercase' }}>{post.author.name}</Box>
          </Box>
        );
      },
    },
    {
      field: "handle",
      headerName: "Processing status",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { handle, id } }) => {
        return (
          <Box
            width="80%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              handle ? colors.greenAccent[700] : '#f8bc6e'
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }} onClick={() => {
              if (!handle === true) {

                swal({
                  title: "Are you sure you want to change this report status?",
                  icon: "warning",
                  text: `This action will be cgange status to ${!reportChosen.handle ? "Solved" : 'Not resolve'}.`,
                  buttons: {
                    cancel: "No, cancel",
                    confirm: "Yes, proceed"
                  },
                  dangerMode: true
                }).then((isConfirmed) => {
                  if (isConfirmed) {
                    onClicSetHandle(id, !handle)
                    setIsViewPostDetails(false)
                  }
                })
              }
              /* setFormChange(id, title, status) */
            }}
              style={handle ? { cursor: 'default' } : { cursor: 'pointer' }}>
              {handle ? 'Solved' : "Pending solve"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: 'center',
      align: 'center',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <DropdownBox onClick1={onClickView} onClick2={onClicSetHandle} index={params.rowIndex} report={params.row} />
          </>
        );
      },
    }
  ];

  return (
    <Box m="2px 20px 20px 20px">
      <Box
        display='flex'
        justifyContent='space-between'
        padding='5px'
      >
        <Header title="LIST OF USER REPORTS" subtitle="Manager user's reports" />
        <Box
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            height='56px'
            width='50%'
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search by post ID" onChange={onChangInputPostId} />
            <IconButton type="button" sx={{ p: 2 }} onClick={() => onClickSearchID()}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            height='56px'
            width='50%'
            marginLeft='10px'
          > 
            <InputBase sx={{ ml: 2, flex: 1 }}
              placeholder="Since date"
              onChange={onChangInputDate}
              type="date"
              inputProps={{
                max: getPostDate(maxDate, true),
                placeholder:"Since date",
              }} />
              
            <IconButton type="button" sx={{ p: 2 }} onClick={() => onClickSearchIDDate()}>
              <SearchIcon />
            </IconButton>
          </Box>
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <Select
              style={{
                border: '1px solid #fff'
              }}
              value={''}
              onChange={onChangeSelectReportStatus}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                Select report status
              </MenuItem>
              <MenuItem value="true">
                Solved
              </MenuItem>
              <MenuItem value="false">
                Not resolved
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        m="0 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            /*  borderBottom: "none", */
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
        <DataGrid /* checkboxSelection */ disableRowSelectionOnClick rows={listRp} columns={columns} />
      </Box>
      <div className='change-report-info-form' style={isViewDetail ? { display: 'block' } : { display: 'none' }}>
        <div className='form-change-report-control'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '40px' }}>
            <div style={{ color: "#0c62ad", fontSize: '18px', fontWeight: '500' }}>{`Report ID: ${reportChosen.id}`}</div>
            <div><img src={addIcon} className='close-form-submit' alt=''
              onClick={() => {
                setIsViewDetail(false)
              }
              } /></div>
          </div>
          <label style={reportChosen.handle ? { color: '#3da58a' } : { color: '#f8bc6e' }}>{reportChosen.handle ? 'Solved' : '*Not resolve'}</label>
          <div className="fram-info-report">
            <div className="gr-int-value">
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
                <div>Report by:</div>
                <div style={{ color: "#0c62ad" }}>{`Report date: ${getPostDate(reportChosen.date)}`}</div>
              </div>
              <div className="report-by-form-info">
                <div>
                  <label>{`Name: ${reportChosen.name}`}</label>
                </div>
                <div>
                  <label>{`Email: ${reportChosen.email}`}</label>
                </div>
              </div>
            </div>
            <div className="gr-int-value">
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 5px 0' }}>
                <div>Post by:</div>

              </div>
              <div className="report-by-form-info">
                <div>
                  <label>{`Name: ${reportChosen.post.author.name}`}</label>
                </div>
                <div>
                  <label>{`Email: ${reportChosen.post.author.email}`}</label>
                </div>
                <div>
                  <label>{`Phone: ${reportChosen.post.author.phone}`}</label>
                </div>
                <div>
                  <label>{`Role: ${reportChosen.post.author.role}`}</label>
                </div>
                <div style={{ color: "#0c62ad" }}>
                  {`The date the post was posted: ${getPostDate(reportChosen.post.createDate)}`}
                </div>
              </div>
            </div>
            <div className="gr-int-value">
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 5px 0' }}>
                <div>Reason for reporting:</div>
                <div className="view-post-btn-form-report"
                  onClick={() => setIsViewPostDetails(true)}
                > View post details</div>
              </div>
              <div className="report-by-form-info">
                <div>
                  <label style={{ color: '#f8bc6e' }}>{`${reportChosen.reportContent}`}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="group-buttons flex-row "
            style={{ display: 'flex', justifyContent: 'end', marginTop: '1.2em', gap: '1em' }}>
            {reportChosen.handle ? (
              <div className="button al-content-btn" onClick={() => swal({
                title: "Are you sure you want to change this report status?",
                icon: "warning",
                text: `This action will be cgange status to ${!reportChosen.handle ? "Solved" : 'Not resolve'}.`,
                buttons: {
                  cancel: "No, cancel",
                  confirm: "Yes, proceed"
                },
                dangerMode: true
              }).then((isConfirmed) => {
                if (isConfirmed) {
                  onClicSetHandle(reportChosen.id, !reportChosen.handle)
                  setIsViewPostDetails(false)
                }
              })}>
                <i className="fa fa-file-text-o" aria-hidden="true" ></i>
                Change to Pending solve
              </div>
            ) : (
              <div className="button al-content-btn" onClick={() => swal({
                title: "Are you sure you want to change this report status?",
                icon: "warning",
                text: `This action will be cgange status to ${!reportChosen.handle ? "Solved" : 'Not resolve'}.`,
                buttons: {
                  cancel: "No, cancel",
                  confirm: "Yes, proceed"
                },
                dangerMode: true
              }).then((isConfirmed) => {
                if (isConfirmed) {
                  onClicSetHandle(reportChosen.id, !reportChosen.handle)
                  setIsViewPostDetails(false)
                }
              })}>
                <i className="fa fa-file-text-o" aria-hidden="true" ></i>
                Change to Solved
              </div>
            )}

            <div className="button btn-close al-content-btn"
              onClick={() => {
                setIsViewDetail(false)
              }}>
              <i className="fa fa-times" aria-hidden="true" style={{ height: '25px', width: 'auto', marginTop: '10px' }}></i>
              CLOSE
            </div>
          </div>
        </div>
      </div>

      {/* Post detail */}
      <div className='change-report-info-form' style={isViewPostDetails ? { display: 'block' } : { display: 'none' }}>
        <div className='form-change-report-control'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '40px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ color: "#0c62ad", fontSize: '18px', fontWeight: '500' }}>
                {`Post ID: ${reportChosen.post.id}  -`}
              </div>
              <div style={{ color: "#3da58a", fontSize: '18px', fontWeight: '500', textTransform: 'uppercase' }}>
                {` ${reportChosen.post.service.name}`}
              </div>
              <div style={{ color: "#6c6c6c", fontSize: '16px', paddingLeft: '40px' }}>
                {`View: ${reportChosen.post.viewCount}`}
              </div>
            </div>
            <div><img src={addIcon} className='close-form-submit' alt=''
              onClick={() => {
                setIsViewPostDetails(false)
              }
              } /></div>
          </div>
          <div className="fram-info-report" style={{ marginTop: '5px' }}>
            <div className="gr-int-value">
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '12%' }}>Post title:</div>
                <input value={reportChosen.post.title}
                  disabled className="input-view-post-details"
                  style={{ width: '38%' }}></input>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'end', color: '#0c62ad' }}>
                  {`Created time: ${getPostTime(reportChosen.post.createDate)}`}
                </div>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'start' }}>
                <div style={{ width: '12%' }}>Description:</div>
                <div
                  dangerouslySetInnerHTML={{ __html: reportChosen.post.description !== undefined ? reportChosen.post.description : "" }}
                  className="textarea-view-post-details"
                  id='desc-post-report-view'
                  style={{ width: '88%' }}></div>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'start' }}>
                <div style={{ width: '12%' }}>Requirement:</div>
                <div
                  dangerouslySetInnerHTML={{ __html: reportChosen.post.requirement !== undefined ? reportChosen.post.requirement : "" }}
                  className="textarea-view-post-details"
                  id='desc-post-report-view'
                  style={{ width: '88%' }}>

                </div>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'start' }}>
                <div style={{ width: '12%' }}>Benefit:</div>
                <div
                  dangerouslySetInnerHTML={{ __html: reportChosen.post.benifit !== undefined ? reportChosen.post.benifit : "" }}
                  className="textarea-view-post-details"
                  id='desc-post-report-view'
                  style={{ width: '88%' }}>

                </div>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '12%' }}>
                  {`Salary ${reportChosen.post.currency !== 'AGREEMENT' ? `(${reportChosen.post.currency})` : ''}:`}
                </div>
                <input
                  value={reportChosen.post.currency !== 'AGREEMENT' ? reportChosen.post.salary : reportChosen.post.currency}
                  disabled className="input-view-post-details"
                  style={{ width: '40%' }}>

                </input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '12%' }}>Method:</div>
                <input value={reportChosen.post.method}
                  disabled className="input-view-post-details"
                  style={{ width: '21%' }}></input>
                <div style={{ width: '12%', padding: '0 0 0 20px' }}>Position:</div>
                <input value={reportChosen.post.position}
                  disabled className="input-view-post-details"
                  style={{ width: '21%' }}></input>
                <div style={{ width: '12%', padding: '0 0 0 20px' }}>Experience:</div>
                <input value={reportChosen.post.experience}
                  disabled className="input-view-post-details"
                  style={{ width: '22%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '12%' }}>Recruit:</div>
                <input value={reportChosen.post.recruit}
                  disabled className="input-view-post-details"
                  style={{ width: '21%' }}></input>
                <div style={{ width: '12%', padding: '0 0 0 20px' }}>Gender:</div>
                <input value={reportChosen.post.gender}
                  disabled className="input-view-post-details"
                  style={{ width: '21%' }}></input>
                <div style={{ width: '12%', padding: '0 0 0 20px' }}>Expiration:</div>
                <input value={reportChosen.post.expiration}
                  type="date"
                  disabled className="input-view-post-details"
                  style={{ width: '22%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '12%' }}>Location:</div>
                <input value={reportChosen.post.location}
                  disabled className="input-view-post-details"
                  style={{ width: '38%' }}></input>
                <div style={{ width: '12%', padding: '0 0 0 20px' }}>Contact:</div>
                <input value={reportChosen.post.contact}
                  disabled className="input-view-post-details"
                  style={{ width: '38%' }}></input>
              </div>
              <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'end' }}>
                <div style={{ width: '12%' }}>Industry:</div>
                <input value={reportChosen.post.industry.name}
                  disabled className="input-view-post-details"
                  style={{ width: '38%' }}></input>
                <div style={{ width: '12%', padding: '0 0 0 20px' }}>City:</div>
                <input value={reportChosen.post.city.name}
                  disabled className="input-view-post-details"
                  style={{ width: '38%' }}></input>
              </div>
            </div>
          </div>
          <div className="group-buttons flex-row "
            style={{ display: 'flex', justifyContent: 'end', marginTop: '1.2em', gap: '1em' }}>
            <div className="button btn-close al-content-btn"
              onClick={() => {
                setIsViewPostDetails(false)
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

export default Reports;
