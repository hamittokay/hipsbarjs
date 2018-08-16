import './scss/hipsbar.scss'

import {
  createOverlay,
  createChildNodes
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
    this.dataURL = dataURL || ''
    this.overlay = overlay || false
    this.blur = blur || false
    this.position = position || 'left'
    this.width = width || 360

    this.hipsbar = null
    this.activatorNode = document.querySelector(this.activator)

    this.initHipsbar()
  }

  initNodes(data) {
    const list = document.createElement('ul')

    data.forEach(({ content, url, children }) => {
      const listItem = document.createElement('li')
      const listItemLink = document.createElement('a')

      listItemLink.innerHTML = content
      listItemLink.setAttribute('href', url)

      listItem.appendChild(listItemLink)
      list.appendChild(listItem)

      if (children) {
        createChildNodes(listItem, children)
      }
    })

    this.hipsbar.setAttribute('data-hipsbar', this.activator)
    this.hipsbar.appendChild(list)
    document.body.appendChild(this.hipsbar)
  }

  get isFullWidth() {
    return (
      this.position == 'bottom' ||
      this.position == 'top'
    )
  }

  initData() {
    if (this.dataURL) {
      fetch(this.dataURL)
        .then(res => res.json())
        .then(data => {
          this.initNodes(data)
        })
    } else {
      this.initNodes(this.data)
    }
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
    window.addEventListener('click', e => {
      this.closeHipsbar()
    })
    this.hipsbar.addEventListener('click', (e) => {
      e.stopPropagation()
    })
    this.activatorNode.addEventListener('click', (e) => {
      e.stopPropagation()
    })
  }

  closeHipsbar() {
    document.body.classList.remove('blurred--overlay')
    this.hipsbar.classList.remove('is--active')
    this.closeOverlay()
  }

  addOverlay() {
    if (this.overlay) {
      createOverlay()
    }
  }

  closeOverlay() {
    if (this.overlay) {
      document.querySelector('.hipsbar--overlay').classList.remove('is--active')
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

  initStyles() {
    if (!this.isFullWidth) {
      this.hipsbar.style.width = `${this.width}px`
    }
  }

  initHooks() {
    this.initData()
    this.initStyles()
    this.addOverlay()
    this.addActivatorListener()
    this.addCloseListener()
  }

  initHipsbar() {
    const hipsbar = document.createElement('div')
    hipsbar.classList.add('hipsbar--wrapper', `is--${this.position}`)

    this.hipsbar = hipsbar
    this.initHooks()
  }
}

window.Hipsbar = Hipsbar
