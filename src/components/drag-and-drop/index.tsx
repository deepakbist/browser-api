import {
  Container,
  Grid,
  Typography,
  useTheme,
  Box,
  Divider,
  Stack,
} from "@mui/material"
import { DragEvent, useState } from "react"
import { componentMapperInterface } from "../../types"
import ComponentLayout from "../common/Layout"
import { toDoItemList, toDoItem } from "./itemList"

const allowedImagesTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/svg",
  "image/svg+xml",
]
const allowedDocTypes = ["application/pdf", "text/plain"]

const DragAndDrop = (props: componentMapperInterface) => {
  const locaStorageToDos = localStorage.getItem("todos")
  let localTodos
  if (locaStorageToDos) localTodos = JSON.parse(locaStorageToDos)
  const [todos, setToDos] = useState<toDoItem[]>(localTodos || toDoItemList)
  const [files, setFiles] = useState<Files[]>([])
  const theme = useTheme()
  const key: string = "dragDemo"

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLDivElement).id
    if (target) {
      event.dataTransfer?.setData(key, target)
      event.dataTransfer.effectAllowed = "move"
    }
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const id = event.dataTransfer.getData(key)
    if (id) {
      let toDoId: string
      if (id.startsWith("complete")) {
        toDoId = id.slice(9)
      } else {
        toDoId = id.slice(5)
      }
      const updatedToDos: toDoItem[] =
        todos?.map((toDo) =>
          toDo.id === toDoId
            ? { ...toDo, completeStatus: !toDo.completeStatus }
            : toDo
        ) || []
      localStorage.setItem("todos", JSON.stringify(updatedToDos))
      setToDos(updatedToDos)
    }
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault()
    let receivedFiles: Files[] = []
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === "file") {
          const file: Files | null = event.dataTransfer.items[i].getAsFile()
          if (file && files.every(({ name }) => name !== file.name)) {
            try {
              file.preview = URL.createObjectURL(file)
            } catch (err) {
              console.log("error in creating url of file", err)
            }
            receivedFiles.push(file)
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file: Files | null = event.dataTransfer.files[i]
        if (file && files.every(({ name }) => name !== file.name)) {
          try {
            file.preview = URL.createObjectURL(file)
          } catch (err) {
            console.log("error in creating url of file", err)
          }
          receivedFiles.push(file)
        }
      }
    }
    const updatedFiles = files.concat(receivedFiles)
    setFiles(updatedFiles)
  }

  const handleFileDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  return (
    <ComponentLayout name={props.name} mdnLink={props.mdnLink}>
      <Grid container spacing={2} mt={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <Container>
            <Typography align="center" variant="h6">
              To Do
            </Typography>
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{
                padding: 4,
                border: "2px solid grey",
                borderStyle: "dotted",
              }}
            >
              {todos
                .filter((item: toDoItem) => !item.completeStatus)
                .map((item) => (
                  <Box
                    key={item.id}
                    draggable
                    id={`todo-${item.id}`}
                    onDragStart={handleDragStart}
                    sx={{
                      background: theme.palette.info.light,
                      border: "2px solid ",
                      mb: 1,
                      p: 1,
                      cursor: "pointer",
                    }}
                  >
                    <Typography>{item.name}</Typography>
                  </Box>
                ))}
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container>
            <Typography align="center" variant="h6">
              Completed
            </Typography>
            <Box
              sx={{
                padding: 4,
                border: "2px solid grey",
                borderStyle: "dotted",
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {todos
                .filter((item: toDoItem) => item.completeStatus)
                .map((item) => (
                  <Box
                    key={item.id}
                    draggable
                    id={`complete-${item.id}`}
                    onDragStart={handleDragStart}
                    sx={{
                      background: theme.palette.info.dark,
                      border: "2px solid ",
                      mb: 1,
                      p: 1,
                      cursor: "pointer",
                    }}
                  >
                    <Typography>{item.name}</Typography>
                  </Box>
                ))}
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Divider />
      <Box
        id="drop-zone"
        onDrop={handleFileDrop}
        onDragOver={handleFileDragOver}
        sx={{
          width: "100%",
          height: "15rem",
          background: theme.palette.grey[100],
          mt: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid grey",
          borderStyle: "dashed",
        }}
      >
        <Typography color={theme.palette.grey[800]}>
          Drag and Drop your files here
        </Typography>
      </Box>

      {files.length > 0
        ? files.map((file) => (
            <Box key={file.name} sx={{ m: 2 }}>
              <Stack direction="row" alignItems="center">
                <Box sx={{ mr: 2 }}>
                  {file.preview ? (
                    allowedImagesTypes.includes(file.type) ? (
                      <img
                        style={{ maxWidth: 200 }}
                        src={file.preview}
                        alt="preview"
                      />
                    ) : allowedDocTypes.includes(file.type) ? (
                      <iframe
                        title={file.name}
                        src={file.preview}
                        frameBorder="0"
                        scrolling="no"
                        height="100%"
                        width="100%"
                      ></iframe>
                    ) : (
                      <Typography color={theme.palette.error.dark}>
                        No preview Available
                      </Typography>
                    )
                  ) : null}
                </Box>

                <Typography sx={{ mr: 1 }}>
                  <b>Type: </b>
                  {file.type}{" "}
                </Typography>
                <Typography>
                  {" "}
                  <b>Name: </b>
                  {file.name}
                </Typography>
              </Stack>
              <Divider sx={{ m: 2 }} />
            </Box>
          ))
        : null}
    </ComponentLayout>
  )
}

export default DragAndDrop

interface Files extends File {
  preview?: string
}
