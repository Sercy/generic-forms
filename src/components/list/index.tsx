import { Fragment } from "react"

export const List = ({ data }: { data: Array<Record<string, any>> }) => (
  <>
    {data.map((items, itemsIndex) => (
      <Fragment key={itemsIndex}>
        {Object.entries(items).map(([key, value], entryIndex) => (
          <Fragment key={entryIndex}>
            {key} - {value}
          </Fragment>
        ))}
      </Fragment>
    ))}
  </>
)