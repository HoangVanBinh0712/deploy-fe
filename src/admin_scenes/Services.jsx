import { Box, useTheme, IconButton } from "@mui/material";
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

const Services = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { getServiceByAdmin, putServiceByAdmin, createServiceByAdmin } = useContext(AuthContext)

  const [keySearch, setKeySearch] = useState('')
  const [listService, setListService] = useState([])
  const [serviceChosen, setServiceChosen] = useState({
    id: 0,
    name: '',
    description: '',
    type: '',
    price: '',
    currency: '',
    postDuration: '',
    active: '',
    canSearchCV: '',
    canFilterCVSubmit: '',
  })
  const [openInfoForm, setInfoForm] = useState(false)
  const [isUpdateService, setIsUpdateService] = useState(false)

  const getListServices = async (keyword) => {
    try {
      const res = await getServiceByAdmin(keyword)
      if (res.success) {
        setListService(res.data)
      }
      else setListService([])
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
    const key = keySearch.length > 0 ? `?active=${keySearch}` : ''
    getListServices(key)
  }, [keySearch])

  const onChangeInputSearch = (event) => setKeySearch(event.target.value)

  const onClickView = (data) => {
    setServiceChosen({
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      price: data.price,
      currency: data.currency,
      postDuration: data.postDuration,
      active: data.active,
      canSearchCV: data.canSearchCV,
      canFilterCVSubmit: data.canFilterCVSubmit,
    })
    setIsUpdateService(false)
    setInfoForm(true)
  }

  const onClickUpdate = (data) => {
    setServiceChosen({
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      price: data.price,
      currency: data.currency,
      postDuration: data.postDuration,
      active: data.active,
      canSearchCV: data.canSearchCV,
      canFilterCVSubmit: data.canFilterCVSubmit,
    })
    setIsUpdateService(true)
    setInfoForm(true)
  }

  const DropdownBox = ({ onClick1, onClick2, index, service }) => {

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
            style={{ top: `${40 + (index + 1) * 40}px` }}>
            <Box
              className="dropdown-option"
              onClick={() => onClick1(service)}
            >
              View
            </Box>
            <Box
              className="dropdown-option"
              onClick={() => onClick2(service)}
            >
              Update
            </Box>
          </Box>
        )}
      </Box>
    )
  }

  const onChangInputName = (event) => {
    setServiceChosen({
      ...serviceChosen,
      name: event.target.value
    })
  }

  const onChangInputType = (event) => {
    setServiceChosen({
      ...serviceChosen,
      type: event.target.value
    })
  }

  const onChangInputDesc = (event) => {
    setServiceChosen({
      ...serviceChosen,
      description: event.target.value
    })
  }

  const onChangInputPrice = (event) => {
    setServiceChosen({
      ...serviceChosen,
      price: event.target.value
    })
  }

  const onChangInputCur = (event) => {
    setServiceChosen({
      ...serviceChosen,
      currency: event.target.value
    })
  }

  const onChangInputDuration = (event) => {
    setServiceChosen({
      ...serviceChosen,
      postDuration: event.target.value
    })
  }

  const onChangActiveCkeckbox = (event) => {
    setServiceChosen({
      ...serviceChosen,
      active: event.target.checked

    })
  }

  const onChangSeachCvCkeckbox = (event) => setServiceChosen({
    ...serviceChosen,
    canSearchCV: event.target.checked
  })

  const onChangFilterCkeckbox = (event) => setServiceChosen({
    ...serviceChosen,
    canFilterCVSubmit: event.target.checked
  })

  const onClickCreateService = async () => {
    const res = await createServiceByAdmin(serviceChosen)
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: 'Created new service successfully!',
        dangerMode: true,
      })
      const key = keySearch.length > 0 ? `?active=${keySearch}` : ''
      getListServices(key)
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  const onClickUpdateService = async () => {
    const res = await putServiceByAdmin(serviceChosen)
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: 'Updated service successfully!',
        dangerMode: true,
      })
      const key = keySearch.length > 0 ? `?active=${keySearch}` : ''
      getListServices(key)
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  const onClickSave = () => {
    if (serviceChosen.id > 0) onClickUpdateService()
    else onClickCreateService()
  }

  const onClickAddIcon = () => {
    setIsUpdateService(true)
    setInfoForm(true)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 40
    },
    {
      field: "name",
      headerName: "Service Name",
      width: 130,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      cellClassName: "name-column--cell",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: ({ row: { price, currency } }) => {
        return (
          <>
            {`${price} ${currency}`}
          </>
        );
      },
    },
    {
      field: "postDuration",
      headerName: "Post Duration",
      width: 100,
      renderCell: ({ row: { postDuration } }) => {
        return (
          <>
            {`${postDuration} ${postDuration > 1 ? 'months' : 'month'}`}
          </>
        );
      },
    },
    {
      field: "canSearchCV",
      headerName: "Search CV",
      width: 100,

    },
    {
      field: "canFilterCVSubmit",
      headerName: "Filter for CV",
      width: 100,
    },
    {
      field: "action",
      headerName: "Others",
      width: 80,
      renderCell: (params) => {

        return (
          <>
            <DropdownBox onClick1={onClickView} onClick2={onClickUpdate} index={params.rowIndex} service={params.row} />
          </>
        );
      },
    }
  ];

  return (
    <Box m="2px 20px 20px 20px">

      <div style={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
        <Box style={{ display: 'flex' }}>
          <Header title="Services list" subtitle="Services management" />
          <Box style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
            <IconButton onClick={() => onClickAddIcon()}>
              <AddIcon
                sx={{ fontSize: "40px", color: '#fff' }}
              />
            </IconButton>
          </Box>
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
            <MenuItem value="">
              Select service type
            </MenuItem>
            <MenuItem value='true'>Active</MenuItem>
            <MenuItem value='false'>Unactive</MenuItem>
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
        <DataGrid /* checkboxSelection */ disableRowSelectionOnClick rows={listService} columns={columns} />
      </Box>
      <div className='change-service-info-form' style={openInfoForm ? { display: 'block' } : { display: 'none' }}>
        <div className='form-change-service-control'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
            <div style={{ color: "#0c62ad", fontSize: '18px', fontWeight: '500' }}>{`Service name: ${serviceChosen.name}`}</div>
            <div><img src={addIcon} className='close-form-submit' alt=''
              onClick={() => {
                setInfoForm(false)
                setServiceChosen({
                  id: 0,
                  name: '',
                  description: '',
                  type: '',
                  price: '',
                  currency: '',
                  postDuration: '',
                  active: '',
                  canSearchCV: '',
                  canFilterCVSubmit: '',
                })
              }
              } /></div>
          </div>

          <div className="fram-info-services">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
              <div className="gr-int-value">
                <div>Name:</div>
                <input type="text"
                  value={serviceChosen.name}
                  className="input-services"
                  disabled={!isUpdateService}
                  onChange={onChangInputName}></input>
              </div>
              <div className="gr-int-value">
                <div>Type:</div>
                <select defaultValue={serviceChosen.description}
                  className="input-services"
                  disabled={!isUpdateService}
                  onChange={onChangInputType}>
                  <option value=''>Chose type</option>
                  <option value='BASIC'>Basic</option>
                  <option value='PREMIUM'>Premium</option>
                </select>
              </div>
            </div>
            <div className="gr-int-value">
              <div>Description:</div>
              <textarea value={serviceChosen.description}
                className="input-services"
                disabled={!isUpdateService}
                onChange={onChangInputDesc}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
              <div className="gr-int-value">
                <div>Price:</div>
                <input type="number" value={serviceChosen.price}
                  className="input-services"
                  disabled={!isUpdateService}
                  onChange={onChangInputPrice}></input>
              </div>
              <div className="gr-int-value">
                <div>Currency:</div>
                <select defaultValue={serviceChosen.description}
                  className="input-services"
                  disabled={!isUpdateService}
                  onChange={onChangInputCur}>
                  <option value=''>Chose currency</option>
                  <option value='USD'>USD</option>
                  <option value='VND'>VND</option>
                </select>
              </div>
            </div>
            <div className="gr-int-value">
              <div>Post duration (month):</div>
              <input type="number" value={serviceChosen.postDuration}
                className="input-services"
                disabled={!isUpdateService}
                style={{ width: '50%' }}
                onChange={onChangInputDuration}></input>
            </div>
            <div className="row" style={{ justifyContent: 'flex-start', marginBottom: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                <input
                  className="inp-radio-add-post-page"
                  type="checkbox"
                  name="active"
                  style={{ width: '15%' }}
                  disabled={!isUpdateService}
                  checked={serviceChosen.active}
                  onChange={onChangActiveCkeckbox}
                />
                <label htmlFor="currency1" style={{ width: '120px', marginLeft: '5px', }}>Active</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                <input
                  checked={serviceChosen.canSearchCV}
                  className="inp-radio-add-post-page"
                  type="checkbox"
                  name="searchCv"
                  style={{ width: '15%' }}
                  disabled={!isUpdateService}
                  onChange={onChangSeachCvCkeckbox}
                />
                <label htmlFor="currency2" style={{ width: '120px', marginLeft: '5px', }}>Search CV</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                <input
                  checked={serviceChosen.canFilterCVSubmit}
                  className="inp-radio-add-post-page"
                  type="checkbox"
                  name="filterCv"
                  style={{ width: '15%' }}
                  disabled={!isUpdateService}
                  onChange={onChangFilterCkeckbox}
                />
                <label htmlFor="currency3" style={{ width: '160px', marginLeft: '5px', }}>Filter CV submit</label>
              </div>
            </div>

          </div>
          <div className="group-buttons flex-row "
            style={{ display: 'flex', justifyContent: 'end', marginTop: '1.2em', gap: '1em' }}>
            {isUpdateService ? (
              <div className="button al-content-btn" onClick={() => onClickSave()}>
                <i className="fa fa-file-text-o" aria-hidden="true" ></i>
                SAVE
              </div>
            ) : (
              <div className="button al-content-btn" onClick={() => setIsUpdateService(true)}>
                <i className="fa fa-file-text-o" aria-hidden="true" ></i>
                Edit
              </div>
            )}

            <div className="button btn-close al-content-btn"
              onClick={() => {
                setInfoForm(false)
                setServiceChosen({
                  id: 0,
                  name: '',
                  description: '',
                  type: '',
                  price: '',
                  currency: '',
                  postDuration: '',
                  active: '',
                  canSearchCV: '',
                  canFilterCVSubmit: '',
                })
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

export default Services;
