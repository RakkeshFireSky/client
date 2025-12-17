'use client'
import { createUser } from './action'
import { Box, Button, Container, Grid, Paper, TextField, Typography, Snackbar, Alert } from '@mui/material'
import { useState, useRef } from 'react'
import { z } from 'zod'

const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address")
})

const UserForm = () => {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState<{ msg: string; severity: 'success' | 'error' }>({
        msg: '',
        severity: 'success'
    })
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
    // ref to form why -> to reset the form after submission
    const formRef = useRef<HTMLFormElement>(null)

    const handleFormAction = async (formData: FormData) => {
        const name = formData.get('name')
        const email = formData.get('email')

        // Validate form data
        const result = userSchema.safeParse({ name, email })

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors
            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0]
            })
            return
        }

        // Clear errors if validation passes
        setErrors({})

        try {
            await createUser(formData)
            setStatus({ msg: 'User created successfully!', severity: 'success' })
            formRef.current?.reset()
        } catch (error) {
            setStatus({ msg: 'Failed to create user. Please try again.', severity: 'error' })
        } finally {
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Create New User
                </Typography>
                <Box component="form" ref={formRef} action={handleFormAction} noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                variant="outlined"
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                variant="outlined"
                                required
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={status.severity} sx={{ width: '100%' }}>
                    {status.msg}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default UserForm