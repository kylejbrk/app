import { ElementIds } from '@/Constants/ElementIDs'
import { useEffect, ReactNode, useMemo, createContext, useCallback, useContext, useState } from 'react'
import { AppPaneId } from './AppPaneMetadata'

type ResponsivePaneData = {
  selectedPane: AppPaneId
  toggleAppPane: (paneId: AppPaneId) => void
}

const ResponsivePaneContext = createContext<ResponsivePaneData | undefined>(undefined)

export const useResponsiveAppPane = () => {
  const value = useContext(ResponsivePaneContext)

  if (!value) {
    throw new Error('Component must be a child of <ResponsivePaneProvider />')
  }

  return value
}

type Props = {
  children: ReactNode
}

const ResponsivePaneProvider = ({ children }: Props) => {
  const [currentSelectedPane, setCurrentSelectedPane] = useState<AppPaneId>(AppPaneId.Editor)
  const [previousSelectedPane, setPreviousSelectedPane] = useState<AppPaneId>(AppPaneId.Editor)

  const toggleAppPane = useCallback(
    (paneId: AppPaneId) => {
      if (paneId === currentSelectedPane) {
        setCurrentSelectedPane(previousSelectedPane ? previousSelectedPane : AppPaneId.Editor)
        setPreviousSelectedPane(paneId)
      } else {
        setPreviousSelectedPane(currentSelectedPane)
        setCurrentSelectedPane(paneId)
      }
    },
    [currentSelectedPane, previousSelectedPane],
  )

  useEffect(() => {
    if (previousSelectedPane) {
      const previousPaneElement = document.getElementById(ElementIds[previousSelectedPane])
      previousPaneElement?.classList.remove('selected')
    }

    const currentPaneElement = document.getElementById(ElementIds[currentSelectedPane])
    currentPaneElement?.classList.add('selected')
  }, [currentSelectedPane, previousSelectedPane])

  const contextValue = useMemo(
    () => ({
      selectedPane: currentSelectedPane,
      toggleAppPane,
    }),
    [currentSelectedPane, toggleAppPane],
  )

  return <ResponsivePaneContext.Provider value={contextValue}>{children}</ResponsivePaneContext.Provider>
}

export default ResponsivePaneProvider
