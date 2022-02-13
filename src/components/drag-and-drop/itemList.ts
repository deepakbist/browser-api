export interface toDoItem {
  name: string
  id: string
  completeStatus: boolean
}

export const toDoItemList: toDoItem[] = [
  {
    name: "Item 1",
    id: "1",
    completeStatus: false,
  },
  {
    name: "Item 2",
    id: "2",
    completeStatus: true,
  },
  {
    name: "Item 3",
    id: "3",
    completeStatus: true,
  },
  {
    name: "Item 4",
    id: "4",
    completeStatus: true,
  },
  {
    name: "Item 5",
    id: "5",
    completeStatus: false,
  },
  {
    name: "Item 6",
    id: "6",
    completeStatus: false,
  },
]
