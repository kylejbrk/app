import { forwardRef, Fragment, Ref } from 'react'
import { DecoratedInputProps } from './DecoratedInputProps'

const getClassNames = (hasLeftDecorations: boolean, hasRightDecorations: boolean) => {
  return {
    container: `flex items-stretch position-relative bg-default border-1 border-solid border-main rounded focus-within:ring-info overflow-hidden ${
      !hasLeftDecorations && !hasRightDecorations ? 'px-2 py-1.5' : ''
    }`,
    input: `w-full border-0 focus:shadow-none bg-transparent color-text ${
      !hasLeftDecorations && hasRightDecorations ? 'pl-2' : ''
    } ${hasRightDecorations ? 'pr-2' : ''}`,
    disabled: 'bg-passive-5 cursor-not-allowed',
  }
}

/**
 * Input that can be decorated on the left and right side
 */
const DecoratedInput = forwardRef(
  (
    {
      autocomplete = false,
      className = '',
      disabled = false,
      left,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp,
      placeholder = '',
      right,
      type = 'text',
      title,
      value,
    }: DecoratedInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const hasLeftDecorations = Boolean(left?.length)
    const hasRightDecorations = Boolean(right?.length)
    const classNames = getClassNames(hasLeftDecorations, hasRightDecorations)

    return (
      <div className={`${classNames.container} ${disabled ? classNames.disabled : ''} ${className}`}>
        {left && (
          <div className="flex items-center px-2 py-1.5">
            {left.map((leftChild, index) => (
              <Fragment key={index}>{leftChild}</Fragment>
            ))}
          </div>
        )}

        <input
          autoComplete={autocomplete ? 'on' : 'off'}
          className={`${classNames.input} ${disabled ? classNames.disabled : ''}`}
          data-lpignore={type !== 'password' ? true : false}
          disabled={disabled}
          onBlur={onBlur}
          onChange={(e) => onChange && onChange((e.target as HTMLInputElement).value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          ref={ref}
          title={title}
          type={type}
          value={value}
        />

        {right && (
          <div className="flex items-center px-2 py-1.5">
            {right.map((rightChild, index) => (
              <div className={index > 0 ? 'ml-3' : ''} key={index}>
                {rightChild}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
)

export default DecoratedInput
