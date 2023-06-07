import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/charts/Header";
import { useContext, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import addIcon from '../assets/icons/add-icon.png'
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from "../contexts/AuthContext";
import swal from "sweetalert";


const Industries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { updateIndustryByAdmin, createIndustryByAdmin, deleteIndustryByAdmin, getIndustryByAdmin } = useContext(AuthContext)

  const [industryChosen, setIndustryChosen] = useState({
    id: 0,
    name: '',
  })
  const [listIndus, setListIndus] = useState([])
  const [openInfoForm, setInfoForm] = useState(false)
  const [isUpdateService, setIsUpdateService] = useState(false)

  const getListIndus = async () => {
    const res = await getIndustryByAdmin()
    if (res.success) setListIndus(res.data)
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  useEffect(() => {
    getListIndus()
  }, [])

  const DropdownBox = ({ onClick1, onClick2, onClick3, index, indus }) => {

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
            style={{ top: `${40 + (index + 1) * 40}px`, right:'30px' }}>
            <Box
              className="dropdown-option"
              onClick={() => onClick1(indus)}
            >
              View
            </Box>
            <Box
              className="dropdown-option"
              onClick={() => onClick2(indus)}
            >
              Update
            </Box>
            <Box
              className="dropdown-option"
              onClick={() => onClick3(indus.id)}
            >
              Delete
            </Box>
          </Box>
        )}
      </Box>
    )
  }

  const onClickView = (data) => {
    setIndustryChosen({
      id: data.id,
      name: data.name,
    })
    setIsUpdateService(false)
    setInfoForm(true)
  }

  const onClickUpdate = (data) => {
    setIndustryChosen({
      id: data.id,
      name: data.name,
    })
    setIsUpdateService(true)
    setInfoForm(true)
  }

  const deleteAction = async (id) => {
    const res = await deleteIndustryByAdmin(id)
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: "Deleled industry successfully! ",
        dangerMode: true,
      })
      getListIndus()
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  const onClickDelete = (id) => {
    swal({
      title: "Are you sure you want to delete this industry?",
      icon: "warning",
      text: 'This action cannot be undo.',
      buttons: {
        cancel: "No, cancel",
        confirm: "Yes, proceed"
      },
      dangerMode: true
    }).then((isConfirmed) => {
      if (isConfirmed) deleteAction(id)
    });
  }

  const onChangeInputName = (event) => setIndustryChosen({
    ...industryChosen,
    name: event.target.value
  })

  const onClickAddIcon = () => {
    setIsUpdateService(true)
    setInfoForm(true)
  }


  const onClickCreateIndus = async () => {
    const res = await createIndustryByAdmin(industryChosen)
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: 'Created new industry successfully!',
        dangerMode: true,
      })
      getListIndus()
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  const onClickUpdateIndus = async () => {
    const res = await updateIndustryByAdmin(industryChosen)
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: 'Updated industry successfully!',
        dangerMode: true,
      })
      getListIndus()
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  const onClickSave = () => {
    if (industryChosen.id > 0) onClickUpdateIndus()
    else onClickCreateIndus()
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 60
    },
    {
      field: "name",
      headerName: "Industry Name",
      flex: 2,
      cellClassName: "name-column--cell",
      headerClassName: 'custom-header',
      renderCell: ({row:{name}}) => {
        return (
          <Box style={{paddingLeft:'40px'}}>
            {name}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <DropdownBox onClick1={onClickView} onClick2={onClickUpdate} onClick3={onClickDelete} index={params.rowIndex} indus={params.row} />
          </>
        );
      },
    }
  ];

  return (
    <Box m="0 20px 20px 20px">
      <Box style={{ display: 'flex', height: '80px' }}>
        <Header title="LIST INDUSTRIES" subtitle="Manager industry" />
        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: '40px', paddingBottom: '10px' }}>
          <IconButton onClick={() => onClickAddIcon()}>
            <AddIcon
              sx={{ fontSize: "40px", color: '#fff' }}
            />
          </IconButton>
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
            /* borderBottom: "none", */
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
        <DataGrid /* checkboxSelection */ disableRowSelectionOnClick rows={listIndus} columns={columns} />
      </Box>
      <div className='change-industry-info-form' style={openInfoForm ? { display: 'block' } : { display: 'none' }}>
        <div className='form-change-industry-control'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '40px' }}>
            <div style={{ color: "#0c62ad", fontSize: '18px', fontWeight: '500' }}>{`Industry name: ${industryChosen.id > 0 ? industryChosen.name : 'Initializing'}`}</div>
            <div><img src={addIcon} className='close-form-submit' alt=''
              onClick={() => {
                setInfoForm(false)
                setIndustryChosen({
                  id: 0,
                  name: '',
                })
              }
              } /></div>
          </div>

          <div className="fram-info-services">
            <div className="gr-int-value" style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '18px', color: colors.greenAccent[600] }}>
                {`ID: ${industryChosen.id > 0 ? industryChosen.id : 'Initializing'}`}
              </div>
            </div>
            <div className="gr-int-value">
              <div>Name:</div>
              <input type="text"
                value={industryChosen.name}
                className="input-services"
                disabled={!isUpdateService}
                onChange={onChangeInputName}>
              </input>
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
                setIndustryChosen({
                  id: 0,
                  name: '',
                })
              }}>
              <i className="fa fa-times" aria-hidden="true" style={{ height: '25px', width: 'auto', marginTop: '10px' }}></i>
              CLOSE
            </div>
          </div>
        </div>
      </div>
    </Box >
  );
};

export default Industries;
