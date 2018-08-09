
export const createOverlay = () => {
  let overlay = document.querySelector('.hipsbar--overlay')

  if (!document.contains(overlay)) {
    const overlayNode = document.createElement('div')
    overlayNode.classList.add('hipsbar--overlay')
  
    document.body.appendChild(overlayNode)
  }
}
