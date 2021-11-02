import * as React from 'react'

type MyEventTypes =
  | React.MouseEvent<HTMLButtonElement>
  | React.TouchEvent<HTMLButtonElement>

const useLongPress = (
  onLongPress: React.EventHandler<MyEventTypes>,
  onClick: React.EventHandler<MyEventTypes>,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = React.useState(false)
  const timeout = React.useRef<NodeJS.Timeout>()
  const target = React.useRef<EventTarget>()

  const start = React.useCallback(
    (event: MyEventTypes) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        })
        target.current = event.target
      }
      timeout.current = setTimeout(() => {
        onLongPress(event)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay, shouldPreventDefault]
  )

  const clear = React.useCallback(
    (event: MyEventTypes, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current)
      shouldTriggerClick && !longPressTriggered && onClick(event)
      setLongPressTriggered(false)
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault)
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  )

  return {
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => start(e),
    onTouchStart: (e: React.TouchEvent<HTMLButtonElement>) => start(e),
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => clear(e),
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent<HTMLButtonElement>) => clear(e),
  }
}

const isTouchEvent = (event: Event): event is TouchEvent => {
  return 'touches' in event
}

const preventDefault = (event: Event) => {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}

export default useLongPress
