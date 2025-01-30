import type { Dispatch } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useGraph } from './use-graph'
import type { dia } from '@joint/core'
import { updateGraph } from '../utils/update-graph'

function getCells<
  K extends dia.Cell.Selectors = dia.Cell.Selectors,
  T extends dia.Cell.GenericAttributes<K> = dia.Cell.GenericAttributes<K>,
>(graph: dia.Graph): dia.Cell.JSON<K, T>[] {
  return graph.getCells().map((cell) => cell.toJSON()) as dia.Cell.JSON<K, T>[]
}

/**
 * Returns graph state with getter and setter for cells
 * @returns [cells, setCells]
 */
export function useGraphCells<
  K extends dia.Cell.Selectors = dia.Cell.Selectors,
  T extends dia.Cell.GenericAttributes<K> = dia.Cell.GenericAttributes<K>,
>(): [dia.Cell.JSON<K, T>[], Dispatch<React.SetStateAction<dia.Cell.JSON<K, T>[]>>] {
  const graph = useGraph()
  const [cells, setCells] = useState<dia.Cell.JSON<K, T>[]>(() => getCells(graph))

  useEffect(() => {
    const handleCellsChange = () => {
      setCells(getCells(graph))
    }

    // TODO: we maybe should use 'change:cells' event instead of 'all'
    graph.on('all', handleCellsChange)
    return () => {
      graph.off('all')
    }
  }, [graph])

  return [
    cells,
    useCallback(
      (update: React.SetStateAction<dia.Cell.JSON<K, T>[]>) => {
        // this handles react dispatch way
        // example: setCells((previousCells) => previousCells.filter((cell) => cell.id !== '1'))
        if (typeof update === 'function') {
          setCells((previousCells) => {
            const newCells = update(previousCells)
            updateGraph(graph, newCells)
            return newCells
          })
          return
        }
        // this handles react set way
        // example: setCells([])
        updateGraph(graph, update)
      },
      [graph]
    ),
  ]
}
