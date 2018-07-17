import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import ColorPicker, { colorPickerPlugin } from 'draft-js-color-picker';


const styleMap = {
  UPPERCASE: {
    textTransform: 'uppercase',
  },
  LOWERCASE: {
    textTransform: 'lowercase',
  },
};
// Colors for fonts
const presetColors = [
  '#ff00aa',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.onChange, this.getEditorState);
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  boldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'BOLD'));
  }
  italicClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'ITALIC',
    ));
  }
  underClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'UNDERLINE',
    ));
  }
  strikeClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'STRIKETHROUGH',
    ));
  }

  toggleInlineStyle(e, inlineStyle) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  toggleBlockType(e, blockType) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  render() {
    return (<div>
      <h2>Doc Clone</h2>
      <div className="toolbar">
        <button onClick={() => this.boldClick()}>Bold</button>
        <button onClick={() => this.italicClick()}>Italic</button>
        <button onClick={() => this.underClick()}>Underline</button>
        <button onClick={() => this.strikeClick()}>StrikeThrough</button>
        <button onMouseDown={e => this.toggleInlineStyle(e, 'UPPERCASE')}>abc</button>
        <button onMouseDown={e => this.toggleInlineStyle(e, 'LOWERCASE')}>ABC</button>
        <button onMouseDown={e => this.toggleBlockType(e, 'unordered-list-item')}> Unordered List </button>
        <button onMouseDown={e => this.toggleBlockType(e, 'ordered-list-item')}> Ordered List </button>
        <button onMouseDown={e => this.toggleBlockType(e, 'header-one')}> H1 </button>
        <button onMouseDown={e => this.toggleBlockType(e, 'header-two')}> H2</button>
        <button onMouseDown={e => this.toggleBlockType(e, 'header-three')}> H3 </button>
        <button onMouseDown={e => this.toggleBlockType(e, 'header-four')}> H4 </button>
        <button onMouseDown={e => this.toggleBlockType(e, 'header-five')}> H5 </button>
        <button onMouseDown={e => this.toggleBlockType(e, 'header-six')}> H6 </button>

        <ColorPicker
          toggleColor={color => this.picker.addColor(color)}
          presetColors={presetColors}
          color={this.picker.currentColor(this.state.editorState)}
        />
        <button onClick={this.picker.removeColor}>clear</button>
      </div>
      <div className="editor">
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          customStyleFn={this.picker.customStyleFn}
          customStyleMap={styleMap}
        />
      </div>
    </div>
    );
  }
}
