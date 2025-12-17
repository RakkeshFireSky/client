'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      router.push('/users')
    }
  }, [router, loading])

  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {loading && <CircularProgress />}
    </Box>

  )
}
