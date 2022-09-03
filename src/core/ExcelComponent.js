import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.usubscribers = []
    this.prepare()
  }
  
  // Настраивает наш компонент до init
  prepare() {}
  
  toHTML() {
    return ''
  }
  
  // Уведомляем слушателей события
  $emit(event, ...args) {
    const unsub = this.emitter.emit(event, ...args)
    this.usubscribers.push(unsub)
  }
  
  // Подписываемся на событие event
  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }
  
  // Инициализируем компонент
  // Добавляем DOM-слушатели
  init() {
    this.initDOMListeners()
  }
  
  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.usubscribers.forEach(unsub => unsub())
  }
}