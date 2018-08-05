import './scss/hipsbar.scss'

class Hipsbar {
  constructor(options) {
    const {
      activator,
      data,
      overlay,
      position,
      width,
    } = options

    this.activatorId = activator
    this.activator = document.querySelector(this.activatorId)
    this.data = data || []
    this.overlay = overlay || false
    this.position = position || 'left'
    this.width = width || 360
    this.hipsbar = null

    this.initHipsbar()
  }

  initNodes() {
    const LIST = document.createElement('ul')

    this.data.forEach(({ content, url }) => {
      const LIST_ITEM = document.createElement('li')
      const LIST_ITEM_LINK = document.createElement('a')

      LIST_ITEM_LINK.innerHTML = content
      LIST_ITEM_LINK.setAttribute('href', url)

      LIST_ITEM.appendChild(LIST_ITEM_LINK)
      LIST.appendChild(LIST_ITEM)
    })

    return LIST
  }

  isFullWidth() {
    return (
      this.position == 'bottom' ||
      this.position == 'top'
    )
  }

  addActivatorListener() {
    const el = this.activator
    el.setAttribute('data-hipsbar-activator', this.activatorId)
    el.addEventListener('click', e => {
      this.hipsbar.classList.toggle('is--active')
      e.preventDefault()
    })
  }

  addCloseListener() {
    document.addEventListener('click', e => {
      if (
          e.target !== this.hipsbar &&
          !this.hipsbar.contains(e.target) &&
          e.target !== this.activator
        ) {
        this.closeHipsbar()
      }
    })
  }

  closeHipsbar() {
    this.hipsbar.classList.remove('is--active')
  }
 
  initHipsbar() {
    const HIPSBAR = document.createElement('div')
    HIPSBAR.classList.add('hipsbar--wrapper', `is--${this.position}`)

    if (!this.isFullWidth()) {
      HIPSBAR.style.width = `${this.width}px`
    }

    const LIST = this.initNodes()
    HIPSBAR.setAttribute('data-hipsbar', this.activatorId)

    HIPSBAR.appendChild(LIST)
    document.body.appendChild(HIPSBAR)

    this.hipsbar = HIPSBAR
    this.addActivatorListener()
    this.addCloseListener()
  }
}

window.Hipsbar = Hipsbar