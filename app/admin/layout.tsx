import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
import GenreIcon from "@mui/icons-material/Note";
import BookTypeIcon from "@mui/icons-material/Style";
import FaceIcon from "@mui/icons-material/Face";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { auth } from "@/auth";
import Menu from "@/app/components/Menu";
import Link from "@/app/components/Link";
import { logout } from "@/app/actions/signin";

const MENU_WIDTH = 240;

const MENU_ITEMS = [
  { title: "Books", icon: <BookIcon />, href: "/admin/books" },
  { title: "Book Types", icon: <BookTypeIcon />, href: "/admin/book-types" },
  { title: "Customers", icon: <FaceIcon />, href: "/admin/customers" },
  { title: "Genres", icon: <GenreIcon />, href: "/admin/genres" },
  { title: "Loans", icon: <MenuBookIcon />, href: "/admin/loans" },
  { title: "Users", icon: <PeopleAltIcon />, href: "/admin/users" },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
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
        <Toolbar>
          <Typography variant="h4">Your Library!</Typography>
        </Toolbar>
        <Divider />
        <List sx={{ flex: 1 }}>
          <ListItem disablePadding>
            <Link href="/admin/loans/create">
              <Button variant="contained">Loan a book!</Button>
            </Link>
          </ListItem>
          {MENU_ITEMS.map(({ title, icon, href }) => (
            <ListItem key={title} disablePadding>
              <Link href={href}>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Toolbar>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Avatar>{(session?.user?.name || "")[0]}</Avatar>
              <Typography>{session?.user?.name}</Typography>
            </Stack>
            <Menu options={[{ label: "Sign Out", onClick: logout }]}>
              <MoreVertIcon />
            </Menu>
          </Stack>
        </Toolbar>
      </Drawer>
      <Box
        component="main"
        sx={{ float: "right", width: `calc(100% - ${MENU_WIDTH}px)`, p: 3 }}
      >
        {children}
      </Box>
    </>
  );
}
