import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Router içindeki sayfa buraya gelecek */}
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
