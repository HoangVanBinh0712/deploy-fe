import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockHistory } from "../data/mockData";
import Header from "../components/charts/Header";
import { DeleteOutline } from "@mui/icons-material";

const Blog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Employer",
      flex: 1,
    },
    {
      field: "dateCreated",
      headerName: "Date created",
      type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "services",
      headerName: "Services",
      width: 100,
    },
    {
      field: "industry",
      headerName: "Industry",
      flex: 1,
    },
    {
      field: "expiration",
      headerName: "Expiration date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "State",
      width: 100,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "ACTIVE"
                ? colors.greenAccent[700]
                : status === "PENDING"
                ? colors.redAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {status === "UNACTIVE"}
            {status === "ACTIVE"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "zdelete",
      headerName: "Delete",
      width: 50,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="blogListDelete"
            //onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="LIST POSTS" subtitle="Manage job postings" />
      <Box
        m="20px 0 0 0"
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
        <DataGrid checkboxSelection rows={mockHistory} columns={columns} />
      </Box>
    </Box>
  );
};

export default Blog;
