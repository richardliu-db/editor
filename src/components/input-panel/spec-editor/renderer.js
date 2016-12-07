import React from 'react';
// import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';
import { MODES, LAYOUT } from '../../../constants';
import MonacoEditor from 'react-monaco-editor';

// import 'brace/mode/json';
// import 'brace/theme/github';

import './index.css'

const schema = require('../../../../schema/vega.schema.json');

export default class Editor extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  state = {
    height: window.innerHeight - LAYOUT.HeaderHeight
  }

  setHeight (width, height) {
    if (!height) {
      return;
    }
    this.setState({height});
  }

  handleEditorChange (spec) {
    if (this.props.mode === MODES.Vega) {
      this.props.updateVegaSpec(spec);
    } else if (this.props.mode === MODES.VegaLite) {
      this.props.updateVegaLiteSpec(spec);
    }
  }

  editorWillMount (monaco) {
    console.log('editor will mount');
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			validate: true,
			allowComments: true,
			schemas: [{
					uri: "./js/vega-schema.json",
					schema: schema,
					fileMatch: ['*']
			}]
		});
  }

  render () {
    return (
        <div style={{width: '100%'}}>
          <MonacoEditor
            width={'100%'}
            height={this.state.height}
            language='json'
            key={JSON.stringify(Object.assign({}, this.state, {mode: this.props.mode, selectedExample: this.props.selectedExample}))}
            defaultValue={this.props.value}
            onChange={this.handleEditorChange.bind(this)}
						editorWillMount={this.editorWillMount.bind(this)}
          />
          <ReactResizeDetector handleHeight onResize={this.setHeight.bind(this)} />
        </div>
    );
  };
};