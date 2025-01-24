import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookIcon from "@mui/icons-material/Book";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FaceIcon from "@mui/icons-material/Face";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const MENU_WIDTH = 240;

const MENU_ITEMS = [
  { title: "Books", icon: <BookIcon /> },
  { title: "Loans", icon: <MenuBookIcon /> },
  { title: "Customers", icon: <FaceIcon /> },
  { title: "Users", icon: <PeopleAltIcon /> },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Drawer
        sx={{
          width: MENU_WIDTH,
          "& .MuiDrawer-paper": {
            width: MENU_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {MENU_ITEMS.map(({ title, icon }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ float: "right", width: `calc(100% - ${MENU_WIDTH}px)`, p: 3 }}
      >
        {/* TODO: add breadcrumb */}
        {children}
      </Box>
    </>
  );
}
