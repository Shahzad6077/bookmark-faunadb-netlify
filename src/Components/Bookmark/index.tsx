import React, { FC, useState } from "react"
import classes from "./crud.module.css"
import { BOOKMARK_DATA, BOOKMARK_VARIENT } from "../../Types/bookmark.interface"
import CreateComp from "./Create"
import { useQuery } from "@apollo/client"
import { GET_ALL_ITEMS } from "../../Types/BookmarkQueries"
import ItemWrapper from "./ItemWrapper"
type Props = {}
interface StateType {
  error: null | string
  currVarient: BOOKMARK_VARIENT

  id?: string
  title: string
  link: string
}
const DefaultValue: StateType = {
  title: "",
  link: "",
  id: null,
  error: null,
  currVarient: "CREATE",
}
const CrudComp: FC<Props> = () => {
  const { data, loading, error } = useQuery(GET_ALL_ITEMS)

  const [state, setObjState] = useState<StateType>(DefaultValue)
  const setState = (obj: Partial<StateType>) =>
    setObjState(p => ({ ...p, ...obj }))

  const list = data?.getAllBookmarksByUser || []
  return (
    <div className={classes.crudWrapper}>
      <CreateComp
        varient={state.currVarient}
        defaultValues={{
          id: state.id,
          title: state.title,
          link: state.link,
        }}
      />
      <div className={classes.listWrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : !error ? (
          list.length === 0 ? (
            <p>Empty List</p>
          ) : (
            list?.map((data: BOOKMARK_DATA, i) => {
              return <ItemWrapper key={data.id} {...data} />
            })
          )
        ) : (
          <p className="error">{`${error.toString()}`}</p>
        )}
      </div>
    </div>
  )
}

export default CrudComp
