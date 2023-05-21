import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockSevices } from "../data/mockData";
import Header from "../components/charts/Header";
import { DeleteOutline } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Services = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    },
    {
      field: "postDuration",
      headerName: "Post Duration",
      width: 100,
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
            <MoreVertIcon
              className="serListDelete"
            //onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="Services list" subtitle="Services management" />
      <Box
        m="40px 0 0 0"
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
        <DataGrid checkboxSelection rows={mockSevices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Services;
