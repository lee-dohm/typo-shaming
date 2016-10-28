/** @babel */

import TypoShamingView from './typo-shaming-view'
import { CompositeDisposable } from 'atom'

export default {

  typoShamingView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.typoShamingView = new TypoShamingView(state.typoShamingViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.typoShamingView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'typo-shaming:toggle': () => this.toggle()
    }))
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.typoShamingView.destroy()
  },

  serialize() {
    return {
      typoShamingViewState: this.typoShamingView.serialize()
    }
  },

  toggle() {
    console.log('TypoShaming was toggled!')
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    )
  }

}
