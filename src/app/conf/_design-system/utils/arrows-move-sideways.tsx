export function arrowsMoveSideways(event: React.KeyboardEvent<HTMLElement>) {
  if (
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowUp" &&
    event.key !== "ArrowDown"
  ) {
    return
  }

  let repeat = 1

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    const vertical = event.currentTarget.dataset.vertical
    console.log({ vertical })
    repeat = vertical ? parseInt(vertical) : 1
  }

  let current = event.currentTarget
  for (let i = 0; i < repeat; ++i) {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      const previousElement = current.previousElementSibling
      if (previousElement) {
        current = previousElement as HTMLElement
      }
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      const nextElement = current.nextElementSibling
      if (nextElement) {
        current = nextElement as HTMLElement
      }
    }
  }

  event.preventDefault()
  current.focus()
}
