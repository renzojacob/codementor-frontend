// composables/useMarkdown.js
import MarkdownIt from 'markdown-it'

export function useMarkdown() {
  const md = new MarkdownIt({
    breaks: true,
    html: true,
    linkify: true,
    typographer: true
  })

  const renderMarkdown = (text) => {
    if (!text) return ''
    return md.render(text)
  }

  const insertMarkdown = (syntax, textareaRef) => {
    if (!textareaRef) {
      console.error('Textarea reference is required')
      return
    }

    // textareaRef is already the DOM element when passed from template
    const textarea = textareaRef
    
    if (!textarea || typeof textarea.value === 'undefined') {
      console.error('Textarea element not found or invalid:', textarea)
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    let newText
    let newCursorPos

    if (selectedText) {
      newText = textarea.value.substring(0, start) + 
               syntax.replace('__SELECTED__', selectedText) +
               textarea.value.substring(end)
      newCursorPos = start + syntax.replace('__SELECTED__', selectedText).length
    } else {
      newText = textarea.value.substring(0, start) + 
               syntax + 
               textarea.value.substring(end)
      newCursorPos = start + syntax.length
    }
    
    textarea.value = newText
    textarea.setSelectionRange(newCursorPos, newCursorPos)
    textarea.focus()
    
    // Trigger input event for v-model
    const inputEvent = new Event('input', { bubbles: true })
    textarea.dispatchEvent(inputEvent)
    
    return newText
  }

  const markdownHelpers = {
    bold: (textareaRef) => insertMarkdown('**__SELECTED__**', textareaRef),
    italic: (textareaRef) => insertMarkdown('*__SELECTED__*', textareaRef),
    code: (textareaRef) => insertMarkdown('`__SELECTED__`', textareaRef),
    codeBlock: (textareaRef) => insertMarkdown('```\n__SELECTED__\n```', textareaRef),
    link: (textareaRef) => insertMarkdown('[__SELECTED__](url)', textareaRef),
    image: (textareaRef) => insertMarkdown('![alt](__SELECTED__)', textareaRef),
    heading: (level, textareaRef) => insertMarkdown(`${'#'.repeat(level)} __SELECTED__`, textareaRef),
    list: (ordered = false, textareaRef) => {
      const prefix = ordered ? '1. ' : '- '
      return insertMarkdown(`${prefix}__SELECTED__`, textareaRef)
    },
    blockquote: (textareaRef) => insertMarkdown('> __SELECTED__', textareaRef),
  }

  return {
    renderMarkdown,
    insertMarkdown,
    markdownHelpers,
    md
  }
}