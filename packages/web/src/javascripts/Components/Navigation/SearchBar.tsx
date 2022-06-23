import { ItemListController } from '@/Controllers/ItemList/ItemListController'
import { KeyboardKey } from '@/Services/IOService'
import { observer } from 'mobx-react-lite'
import { useRef, KeyboardEventHandler, useCallback, useState } from 'react'
import Icon from '../Icon/Icon'
import DecoratedInput from '@/Components/Input/DecoratedInput'

type Props = {
  itemListController: ItemListController
}

const SearchBar = ({ itemListController }: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { noteFilterText, setNoteFilterText, clearFilterText, onFilterEnter } = itemListController

  const [, setFocusedSearch] = useState(false)

  const onNoteFilterTextChange = useCallback(
    (text: string) => {
      setNoteFilterText(text)
    },
    [setNoteFilterText],
  )

  const onSearchFocused = useCallback(() => setFocusedSearch(true), [])
  const onSearchBlurred = useCallback(() => setFocusedSearch(false), [])

  const onNoteFilterKeyUp: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === KeyboardKey.Enter) {
        onFilterEnter()
      }
    },
    [onFilterEnter],
  )

  const onClearSearch = useCallback(() => {
    clearFilterText()
    searchInputRef.current?.focus()
  }, [clearFilterText])

  return (
    <div role="search">
      <DecoratedInput
        autocomplete={false}
        title="Searches notes and files in the currently selected tag"
        className="rounded-full bg-clip-padding placeholder:color-passive-0 px-1"
        placeholder="Search"
        value={noteFilterText}
        ref={searchInputRef}
        onBlur={onSearchBlurred}
        onChange={onNoteFilterTextChange}
        onFocus={onSearchFocused}
        onKeyUp={onNoteFilterKeyUp}
        left={[<Icon type="search" className="flex-shrink-0 color-passive-1 mr-1 w-4.5 h-4.5" />]}
        right={[
          noteFilterText && (
            <button
              onClick={onClearSearch}
              className="flex items-center bg-neutral color-neutral-contrast w-4.5 h-4.5 border-0 rounded-full"
            >
              <Icon type="close" className="sn-icon--mid" />
            </button>
          ),
        ]}
      />
    </div>
  )
}

export default observer(SearchBar)
