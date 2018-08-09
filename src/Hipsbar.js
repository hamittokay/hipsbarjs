import './scss/hipsbar.scss'

import {
  createOverlay
} from './lib'

class Hipsbar {
  constructor(options) {
    const {
      activator,
      data,
      overlay,
      blur,
      position,
      width,
    } = options

    this.activator = activator
    this.data = data || []
    this.overlay = overlay || false
    this.blur = blur || false
    this.position = position || 'left'
    this.width = width || 360

    this.hipsbar = null
    this.activatorNode = document.querySelector(this.activator)
    
    this.initHipsbar()
  }

  initNodes() {
    const list = document.createElement('ul')

    this.data.forEach(({ content, url }) => {
      const listItem = document.createElement('li')
      const listItemLink = document.createElement('a')

      listItemLink.innerHTML = content
      listItemLink.setAttribute('href', url)

      listItem.appendChild(listItemLink)
      list.appendChild(listItem)
    })

    return list
  }

  isFullWidth() {
    return (
      this.position == 'bottom' ||
      this.position == 'top'
    )
  }

  addActivatorListener() {
    const el = this.activatorNode
    el.setAttribute('data-hipsbar-activator', this.activator)
    el.addEventListener('click', e => {
      this.hipsbar.classList.toggle('is--active')
      setTimeout(() => {
        this.handleOverlay()
        this.addBlur()
      }, 0)
      e.preventDefault()
    })
  }

  addCloseListener() {
    document.addEventListener('click', e => {
      if (
          e.target !== this.hipsbar &&
          !this.hipsbar.contains(e.target) &&
          e.target !== this.activatorNode
        ) {
        this.closeHipsbar()
      }
    })
  }

  closeHipsbar() {
    document.querySelector('.hipsbar--overlay').classList.remove('is--active')
    document.body.classList.remove('blurred--overlay')
    this.hipsbar.classList.remove('is--active')
  }

  addOverlay() {
    if (this.overlay) {
      createOverlay()
    }
  }

  addBlur() {
    if (this.blur) {
      document.body.classList.add('blurred--overlay')
    }
  }

  handleOverlay() {
    if (this.overlay) {
      document.querySelector('.hipsbar--overlay').classList.add('is--active')
    }
  }

  initHooks() {
    this.addOverlay()
    this.addActivatorListener()
    this.addCloseListener()
  }
 
  initHipsbar() {
    const hipsbar = document.createElement('div')
    hipsbar.classList.add('hipsbar--wrapper', `is--${this.position}`)

    if (!this.isFullWidth()) {
      hipsbar.style.width = `${this.width}px`
    }

    const list = this.initNodes()
    hipsbar.setAttribute('data-hipsbar', this.activator)

    hipsbar.appendChild(list)
    document.body.appendChild(hipsbar)

    this.hipsbar = hipsbar
    this.initHooks()
  }
}

window.Hipsbar = Hipsbar