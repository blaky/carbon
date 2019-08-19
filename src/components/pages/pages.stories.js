import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { Pages, Page } from './pages.component';
import DialogFullScreen from '../dialog-full-screen';
import Heading from '../heading/heading';
import Button from '../button';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';
import classic from '../../style/themes/classic';

Page.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /page\.js(?!spec)/
);

Pages.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /pages(?!spec)/
);

const store = new Store({
  open: false,
  slideIndex: 0,
  slideHistory: [],
  previousSlideHistoryPointer: 0
});

const handleSlide = (ev, pageIndex) => {
  action('slide')(ev);
  const newSlideHistory = [...store.get('slideHistory'), store.get('slideIndex')];

  store.set({
    slideHistory: newSlideHistory,
    slideIndex: (pageIndex || 0),
    previousSlideHistoryPointer: newSlideHistory.length
  });
};

const handlePreviousSlide = (ev) => {
  ev.preventDefault();
  action('previous-slide')(ev);
  const previouHistoryPointer = store.get('previousSlideHistoryPointer');
  const pointer = (previouHistoryPointer - 1) > 0 ? (previouHistoryPointer - 1) : 0;

  store.set({
    slideIndex: pointer,
    previousSlideHistoryPointer: pointer
  });
};

const handleOpen = () => {
  action('open')();
  store.set({ open: true });
};

const handleCancel = () => {
  action('cancel')();
  store.set({ open: false });
};

const CustomState = (props) => {
  return (
    <State store={ store }>
      { props.children }
    </State>
  );
};

CustomState.propTypes = {
  children: PropTypes.node
};

const DialogState = props => new CustomState(props);
const PageState = props => new CustomState(props);

storiesOf('Pages', module)
  .add('classic', () => {
    return (
      <ThemeProvider theme={ classic }>
        <div>
          <Button onClick={ handleOpen }>Open Preview</Button>
          <DialogState>
            <DialogFullScreen
              open={ store.get('open') }
              onCancel={ handleCancel }
            >
              <PageState>
                <Pages
                  slideIndex={ store.get('slideIndex') }
                >
                  <Page title={ <Heading title='My First Page' /> }>
                    <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                      Go to second page
                    </Button>
                    <Button onClick={ (ev) => { handleSlide(ev, 2); } }>
                      Go to third page
                    </Button>
                  </Page>

                  <Page title={ <Heading title='My Second Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                    <Button onClick={ (ev) => { handleSlide(ev, 0); } }>
                      Go to first page
                    </Button>
                    <Button onClick={ (ev) => { handleSlide(ev, 2); } }>
                      Go to third page
                    </Button>
                  </Page>

                  <Page title={ <Heading title='My Third Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                    <Button onClick={ (ev) => { handleSlide(ev, 0); } }>
                      Go to first page
                    </Button>
                    <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                      Go to second page
                    </Button>
                  </Page>
                </Pages>
              </PageState>
            </DialogFullScreen>
          </DialogState>
        </div>
      </ThemeProvider>
    );
  }, {
    info: {
      text: <p>Allows to slide to different pages in a full screen dialog.</p>,
      propTablesExclude: [Button, DialogFullScreen, DialogState, PageState, State]
    }
  })
  .add('default', () => {
    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <DialogState>
          <DialogFullScreen
            open={ store.get('open') }
            onCancel={ handleCancel }
          >
            <PageState>
              <Pages
                slideIndex={ store.get('slideIndex') }
              >
                <Page title={ <Heading title='My First Page' /> }>
                  <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                    Go to second page
                  </Button>
                  <Button onClick={ (ev) => { handleSlide(ev, 2); } }>
                    Go to third page
                  </Button>
                </Page>

                <Page title={ <Heading title='My Second Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                  <Button onClick={ (ev) => { handleSlide(ev, 0); } }>
                    Go to first page
                  </Button>
                  <Button onClick={ (ev) => { handleSlide(ev, 2); } }>
                    Go to third page
                  </Button>
                </Page>

                <Page title={ <Heading title='My Third Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                  <Button onClick={ (ev) => { handleSlide(ev, 0); } }>
                    Go to first page
                  </Button>
                  <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                    Go to second page
                  </Button>
                </Page>
              </Pages>
            </PageState>
          </DialogFullScreen>
        </DialogState>
      </div>
    );
  }, {
    info: {
      text: <p>Allows to slide to different pages in a full screen dialog.</p>,
      propTablesExclude: [Button, DialogFullScreen, DialogState, PageState, State]
    }
  });
