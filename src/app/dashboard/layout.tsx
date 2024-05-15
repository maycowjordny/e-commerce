"use client"
import NavBar from "@/components/nav-menu";
import { Container } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <NavBar>
            <Container sx={{ pb: 5 }}>
                {children}
            </Container>
        </NavBar>
    )
}