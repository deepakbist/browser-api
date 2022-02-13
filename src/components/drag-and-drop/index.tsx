import { Container, Grid, Typography, useTheme, Box } from "@mui/material"
import { DragEvent, useState } from "react"
import { componentMapperInterface } from "../../types"
import ComponentLayout from "../common/Layout"
import { toDoItemList, toDoItem } from "./itemList"

const DragAndDrop = (props: componentMapperInterface) => {
  const locaStorageToDos = localStorage.getItem("todos")
  let localTodos
  if (locaStorageToDos) localTodos = JSON.parse(locaStorageToDos)
  const [todos, setToDos] = useState<toDoItem[]>(localTodos || toDoItemList)
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

  return (
    <ComponentLayout name={props.name} mdnLink={props.mdnLink}>
      <Grid container spacing={2} mt={2}>
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
    </ComponentLayout>
  )
}

export default DragAndDrop
