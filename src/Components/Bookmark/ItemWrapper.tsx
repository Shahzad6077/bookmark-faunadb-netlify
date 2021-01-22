import React, { FC, useState } from "react"
import { BOOKMARK_DATA } from "../../Types/bookmark.interface"

import classes from "./crud.module.css"
import Item from "./Item"
import toast from "react-hot-toast"
import { useMutation } from "@apollo/client"
import { ON_DELETE } from "../../Types/BookmarkQueries"
import { Spinner } from "./../../Utils"
type Props = {} & BOOKMARK_DATA

const ItemWrapper: FC<Props> = ({ id, title, userId, link, ts }) => {
  const [onDelete, { loading: deleteLoading }] = useMutation(ON_DELETE, {
    onCompleted() {
      toast("Bookmark is Deleted.", {
        icon: "🚀",
        style: {
          borderRadius: "10px",
          background: "var(--purple)",
          color: "#fff",
        },
      })
    },
    onError(err) {
      console.log(err)
      toast(`${err.message}..`, {
        style: {
          borderRadius: "10px",
          background: "var(--purple)",
          color: "#fff",
        },
      })
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          getAllTodosById(existingListRefs, { readField }) {
            return existingListRefs.filter(
              itemRef => data.deleteTodo.id !== readField("id", itemRef)
            )
          },
        },
      })
    },
  })

  return (
    <Item
      key={id}
      data={{
        id: id,
        title: title,
        userId: userId,
        link: link,
      }}
      actions={
        <div className={classes.actions}>
          <button
            className="primary-btn t-bg warning-clr"
            type="button"
            onClick={() => onDelete({ variables: { bookmarId: id } })}
          >
            {deleteLoading ? <Spinner /> : `delete`}
          </button>
        </div>
      }
      activeId={"null"}
    />
  )
}

export default ItemWrapper
