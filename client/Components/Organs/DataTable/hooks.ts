import { IndexRequest } from '@server/infrastructure/index/index.request'
import React from 'react'

export type TPropsTableFilter<T> = IndexRequest & T

export const useTableFilter = <T>() => {
  const [status, setStatus] = React.useState({
    isFetching: false,
  })

  const [query, setQuery] = React.useState<TPropsTableFilter<T> | any>(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const filtersObj = {}
    for (const [key, value] of queryParams.entries()) {
      filtersObj[key] = value
    }
    return filtersObj
  })

  const existingParams = React.useMemo(
    () =>
      Object.keys(query).reduce(
        (a, c) => (query[c] ? { ...a, [c]: query[c] } : a),
        {},
      ),
    [query],
  ) as TPropsTableFilter<T>

  return {
    setQueryParams: (propsParams: TPropsTableFilter<T>) => {
      const data = {
        ...existingParams,
        ...propsParams,
      } as TPropsTableFilter<T>

      if (data.order === undefined) {
        delete data.sort
      }

      const listPropsParams = Object.keys(propsParams) as string[]

      if (
        !(
          listPropsParams.includes('page') &&
          listPropsParams.includes('per_page')
        )
      ) {
        if (
          !(
            listPropsParams.includes('sort') &&
            listPropsParams.includes('order')
          )
        ) {
          data.page = 1
        }
      }

      setQuery(data)
    },
    query: query as TPropsTableFilter<T>,
    status,
    setStatus,
  }
}
