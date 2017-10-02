import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import App from '../public/src/components/app.jsx';
import '../public/styles/styles.css';
import '../public/styles/app-styles.css';

import Exercise from '../public/src/components/forms/exercise.jsx';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('App', module)
  .add('basic', () => <App />);

storiesOf('Exercise', module)
  .add('basic', () => (
    <div class="flex flex-center">
      <Exercise />
    </div>
  )
  );
