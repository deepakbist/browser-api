import { componentMapperInterface } from "../../types"
import ComponentLayout from "../common/Layout"

const DragAndDrop = (props: componentMapperInterface) => {
  return (
    <ComponentLayout name={props.name} mdnLink={props.mdnLink}>
      <div>This is for testing</div>
    </ComponentLayout>
  )
}

export default DragAndDrop
