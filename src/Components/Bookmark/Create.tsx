import React, { FC, useEffect, useState } from "react"
import classes from "./crud.module.css"
import { BOOKMARK_DATA, BOOKMARK_VARIENT } from "../../Types/bookmark.interface"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import todoSchema from "./../../Validations/todo"
import { toast } from "react-hot-toast"
import { useMutation, useApolloClient } from "@apollo/client"
import { ON_CREATE, GET_ALL_ITEMS } from "./../../Types/BookmarkQueries"
import { Spinner } from "../../Utils"

type Props = {
  varient: BOOKMARK_VARIENT
  defaultValues: Omit<BOOKMARK_DATA, "userId">
}

const CreateComp: FC<Props> = ({ varient, defaultValues }) => {
  const client = useApolloClient()
  const { register, errors, handleSubmit, reset, setValue } = useForm<
    Omit<BOOKMARK_DATA, "id" | "userId">
  >({
    defaultValues: defaultValues,
    resolver: yupResolver(todoSchema),
  })
  const [onCreateItem, { loading }] = useMutation(ON_CREATE, {
    onCompleted() {
      toast("Bookmark is Added.", {
        icon: "🔥",
        style: {
          borderRadius: "10px",
          background: "var(--purple)",
          color: "#fff",
        },
      })
    },
    onError(err) {
      console.log(err)
    },
    update(cache, { data }) {
      // Query that fetches all existing to-do items
      const query = GET_ALL_ITEMS

      // Get the current to-do list
      const existingData = client.readQuery({ query })

      // Write back to the to-do list, appending the new item
      client.writeQuery({
        query,
        data: {
          getAllBookmarksByUser: [
            data.createBookmark,
            ...existingData.getAllBookmarksByUser,
          ],
        },
      })
    },
  })

  const id = defaultValues.id

  useEffect(() => {
    if (id) {
      setValue("title", defaultValues.title, { shouldValidate: true })
      setValue("link", defaultValues.link, { shouldValidate: true })
    } else {
    }
  }, [id])
  const [err, setErr] = useState<null | string>(null)

  const onSubmitForm: SubmitHandler<
    Omit<BOOKMARK_DATA, "userId">
  > = async data => {
    try {
      const { link, title } = data
      await onCreateItem({
        variables: { link, title },
      })
      reset()
    } catch (err) {
      console.log(err.body.message)
    }
  }

  return (
    <div className={classes.createView}>
      <h2>
        <span style={{ textTransform: "capitalize" }}>
          {varient.toLowerCase()}
        </span>{" "}
        Bookmark
      </h2>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <label htmlFor="p_name">Title</label>
          <input
            id="p_name"
            name="title"
            type="text"
            ref={register({ required: true })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
          <label htmlFor="p_name">Link</label>
          <input
            id="p_name"
            name="link"
            type="text"
            ref={register({ required: true })}
          />
          {errors.link && <p className="error">{errors.link.message}</p>}

          {/* <b r /> */}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
            style={{
              ...(loading && {
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
              }),
            }}
          >
            {loading ? <Spinner /> : varient}
          </button>
        </form>
        {err && <p className="error">{err}</p>}
      </div>
    </div>
  )
}

export default CreateComp
