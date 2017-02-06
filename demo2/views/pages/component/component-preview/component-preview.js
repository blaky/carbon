// React
import React from 'react';

// App Components
import ComponentCodeBuilder from './../../../../utils/component-code-builder';
import PageContentArea from './../../../common/page-content-area';
import SimpleHeading from './../../../../components/simple-heading';
import Code from './../../../../components/code';
import Fields from './fields';

/**
 * Simple, site wrapped content area that loads a heading
 *
 * @param {object} props
 * @param {String} props.title
 * @return {PageContentArea}
 */
class ComponentPreview extends React.Component {
  componentDidMount() {
    this.renderDemo();
  }

  componentDidUpdate() {
    this.renderDemo();
  }

  render() {
    return (
      <PageContentArea
        title='Preview'
        link={ `https://github.com/Sage/carbon/tree/master/src/components/${this.props.definition.get('key')}` }
      >
        <div className= { `component-preview component-preview--${this.props.definition.get('key')}` }>
          <div className='component-preview__component-wrapper'>
            <div ref='demo' />
          </div>

          <SimpleHeading title="Code"></SimpleHeading>

          <div className='component-preview__interaction'>
            <Fields name={ this.props.name } definition={ this.props.definition } />
            { this.renderCode() }
          </div>
        </div>
      </PageContentArea>
    );
  }

  renderCode = () => {
    var code = this.compileCode();
    return <Code>{ code.toString() }</Code>
  }

  renderDemo = () => {
    let code = this.compileCode(true);
    ReactDOM.render(code.toComponent(), this.refs.demo);
  }

  compileCode = (withEvents) => {
    return new ComponentCodeBuilder(this.props.definition, withEvents);
  }
};

export default ComponentPreview;
