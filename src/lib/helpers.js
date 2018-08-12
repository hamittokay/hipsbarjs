const ARROW_ICON = `<svg class="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="512px" height="512px"><g><path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" fill="#FFFFFF"/></g></svg>`

export const createOverlay = () => {
  let overlay = document.querySelector('.hipsbar--overlay')

  if (!document.contains(overlay)) {
    const overlayNode = document.createElement('div')
    overlayNode.classList.add('hipsbar--overlay')
  
    document.body.appendChild(overlayNode)
  }
}

export const createChildNodes = (listItem, children) => {
  listItem.classList.add('has--children')
  listItem.innerHTML += ARROW_ICON

  const childParentNode = document.createElement('ul')
  childParentNode.classList.add('child--parent-item')

  children.forEach((child, i) => {
    const childNode = document.createElement('li')
    const childNodeLink = document.createElement('a')

    childNodeLink.innerHTML = child.content
    childNodeLink.setAttribute('href', child.url)
    
    childNode.appendChild(childNodeLink)
    childParentNode.appendChild(childNode)

    if (child.children) {
      createChildNodes(childNode, child.children)
    }
  })

  listItem.querySelectorAll('a')[0]
    .addEventListener('click', e => {
      listItem.classList.toggle('is--active')
      e.preventDefault()
    })

  listItem.appendChild(childParentNode)
}
