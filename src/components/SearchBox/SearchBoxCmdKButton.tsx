import React from "react"

import SearchIcon from "@mui/icons-material/Search"
import { Box, Button, Chip, Modal, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

import { Coin, SearchBox } from "./SearchBox"

export type SearchBoxCmdKButtonProps = {
  trendingCoins: "loading" | Coin[]
  allCoins: "loading" | Coin[]
  onCoinSelect: (id: string) => void
}

export const SearchBoxCmdKButton = ({ allCoins, trendingCoins, onCoinSelect }: SearchBoxCmdKButtonProps) => {
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleButtonClick = () => setOpen(true)
  const handleModalClose = () => setOpen(false)
  const handleCoinSelect = (id: string) => {
    setOpen(false)
    onCoinSelect(id)
  }
  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        sx={{ bgcolor: grey[50], borderColor: grey[200], textTransform: "none" }}
        onClick={handleButtonClick}
        startIcon={<SearchIcon />}
        endIcon={
          <Box
            sx={{
              border: "1px solid rgb(224, 227, 231)",
              bgcolor: "white",
              padding: "0px 4px",
              borderRadius: "7px",
            }}
          >
            <Typography fontSize={12} fontWeight={700}>
              ⌘K
            </Typography>
          </Box>
        }
      >
        Search...
      </Button>
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
          }}
        >
          <SearchBox allCoins={allCoins} trendingCoins={trendingCoins} onCoinSelect={handleCoinSelect} />
        </Box>
      </Modal>
    </>
  )
}
