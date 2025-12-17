import connectDB from "@/config/db";
import User from "@/models/User";
import UserForm from "./userForm";
import { Container, Typography, Grid, Card, CardContent, Avatar, Box, Stack } from '@mui/material';

const page = async () => {
    await connectDB()
    const users = await User.find()
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ mb: 8 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    User Management
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Create and manage user accounts efficiently
                </Typography>
                <UserForm />
            </Box>

            <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'medium', borderLeft: 4, borderColor: 'primary.main', pl: 2 }}>
                    Existing Users
                </Typography>

                <Grid container spacing={3}>
                    {users.map((user: any) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user._id}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                                        borderColor: 'primary.light'
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: 'primary.light',
                                                width: 48,
                                                height: 48,
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {user.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                                                {user.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ID: {user._id.toString().slice(-6)}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'action.hover', p: 1, borderRadius: 1 }}>
                                        📧 {user.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {users.length === 0 && (
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
                                <Typography variant="h6" color="text.secondary">
                                    No users found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Create a new user to get started
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    )
}

export default page