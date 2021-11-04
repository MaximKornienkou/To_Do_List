import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOList/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        removeTask: {
            description: "callback",
        }
    },
    args: {
        removeTask: action("Remove task"),
        changeTaskTitle: action("Change title"),
        changeTaskStatus: action("Change status"),
    }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {id: v1(), title: "JS", isDone: true},
};
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {id: v1(), title: "CSS", isDone: false},
};


