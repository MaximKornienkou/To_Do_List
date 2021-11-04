import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AppWithRedux} from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    },
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWithReduxStory.args = {
}
