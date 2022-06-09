import { useUser } from "@auth0/nextjs-auth0";
import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { client } from "../../graphql/client";
import { UpsertAuthorDocument } from "../../graphql/generated";

const Appbar = () => {
    const { user, isLoading } = useUser();

    useEffect(() => {
        const createAuthor = async () => {
            user?.email &&
                (await client.request(UpsertAuthorDocument, {
                    where: {
                        email: user.email,
                    },
                    upsert: {
                        update: {},
                        create: {
                            name: user.name,
                            email: user.email,
                        },
                    },
                }));
        };
        createAuthor();
    });

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} disableGutters={true}>
                    {/* Logo */}
                    <Box sx={{ width: 50 }}>
                        {/* <Image src={Logo} alt="logo" priority /> */}
                        <Link href="/">
                            <Typography>Logo</Typography>
                        </Link>
                    </Box>
                    {!isLoading && (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                            {!user && (
                                <Button color="inherit" href="/api/auth/login">
                                    Login
                                </Button>
                            )}
                            {user && (
                                <>
                                    <Button color="inherit" href="/posts/create-post">
                                        Write
                                    </Button>
                                    <Button color="inherit" href="/api/auth/logout">
                                        Logout
                                    </Button>
                                    <Avatar alt={user?.name || ""} src={user?.picture || ""} />
                                </>
                            )}
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Appbar;
