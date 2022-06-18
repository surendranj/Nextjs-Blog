import { useUser } from "@auth0/nextjs-auth0";
import { AppBar, Avatar, Box, Button, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { client } from "../../graphql/client";
import { UpsertAuthorDocument, useGetAuthorQuery } from "../../graphql/generated";

const Appbar = () => {
    const { user, isLoading } = useUser();
    const { data } = useGetAuthorQuery(client, { where: { email: user?.email || "" } });

    useEffect(() => {
        const createAuthor = async () => {
            user?.email &&
                (await client.request(UpsertAuthorDocument, {
                    where: {
                        email: user.email,
                    },
                    upsert: {
                        update: {
                            name: user.nickname,
                            email: user.email,
                            image: user.picture,
                        },
                        create: {
                            name: user.nickname,
                            email: user.email,
                            image: user.picture,
                        },
                    },
                }));
        };
        createAuthor();
    }, [user]);

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} disableGutters={true}>
                    {/* Logo */}
                    <Box sx={{ width: 50 }}>
                        {/* <Image src={Logo} alt="logo" priority /> */}
                        <Button color="inherit" href="/">
                            Home
                        </Button>
                    </Box>
                    {!isLoading && (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                            <Button color="inherit" href="/post/create-post">
                                Write
                            </Button>

                            {user ? (
                                <>
                                    <Button color="inherit" href="/api/auth/logout">
                                        Logout
                                    </Button>
                                    <Avatar alt={data?.author?.name || ""} src={data?.author?.image || ""} />
                                </>
                            ) : (
                                <Button color="inherit" href="/api/auth/login">
                                    Login
                                </Button>
                            )}
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Appbar;
