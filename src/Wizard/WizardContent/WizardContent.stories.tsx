import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { Typography } from "@mui/material";
import WizardContent from "./WizardContent";
import { WizardContentProps } from "./WizardContent.types";

const meta: Meta<typeof WizardContent> = {
  component: WizardContent,
  title: "Wizard/WizardContent"
};
export default meta;

const lipsum = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet libero vestibulum lacus eleifend sollicitudin. Mauris nisi purus, fermentum ac sagittis sit amet, commodo sed sapien. Suspendisse consectetur massa vel sodales laoreet. Phasellus maximus vitae augue et posuere. Pellentesque dictum, lorem ac imperdiet fringilla, ipsum massa euismod libero, nec fermentum ligula sapien et mi. Nulla dignissim quis erat quis tincidunt. Ut aliquam pulvinar leo id pharetra. Proin efficitur varius semper. Aliquam erat volutpat. Phasellus vehicula lacus sed lacus tincidunt, eleifend congue massa dapibus. Nulla ultrices odio nec diam congue, a accumsan tellus dapibus. Suspendisse potenti. Aenean ut gravida erat, a tincidunt nisl. In vitae ligula risus.",
  "Curabitur id auctor elit. Sed congue lacinia orci vel egestas. Sed aliquet felis felis. Praesent mollis, velit non euismod posuere, nunc massa pellentesque sapien, vitae imperdiet dolor augue ac justo. Vivamus porttitor eu felis eget feugiat. Maecenas mollis tellus semper turpis pharetra, at pharetra erat faucibus. Aenean tempor, purus sit amet ornare pellentesque, neque diam maximus arcu, sed dapibus sapien nisl pretium justo. Sed fringilla luctus diam sed luctus. Sed volutpat odio nec dui hendrerit rutrum.",
  "Vivamus tempus metus eget eleifend rhoncus. Praesent varius risus enim, et tincidunt odio porta at. Etiam est tortor, volutpat in elementum at, luctus id magna. Integer suscipit urna est, nec molestie sem cursus in. Praesent fermentum libero at tortor ullamcorper bibendum. Nulla dapibus urna a neque semper, quis scelerisque dui convallis. Fusce malesuada pellentesque lacinia.",
  "Ut in ex purus. Integer volutpat diam ac neque faucibus convallis. Nam congue magna quis tortor posuere lobortis. Donec pellentesque, magna non lobortis placerat, tellus magna porttitor odio, at interdum felis massa ut justo. Aenean nibh neque, placerat suscipit libero eget, sodales fermentum nisl. Donec sapien diam, venenatis faucibus elit et, mollis mattis enim. Donec pretium nisl et suscipit suscipit.",
  "Proin sit amet commodo metus. Nunc laoreet, ante sed commodo iaculis, mi dolor convallis elit, ut pulvinar turpis velit ut turpis. Fusce sed euismod lectus. Integer mi dolor, gravida id orci cursus, euismod commodo tellus. Duis fringilla pellentesque quam fermentum placerat. Curabitur nisl magna, ultrices quis lacinia vitae, feugiat sollicitudin leo. Nam dapibus ultricies mollis. Proin vel sodales turpis, id tempor tellus. Proin blandit gravida dolor, ac blandit neque cursus non. Pellentesque vestibulum faucibus metus, in rhoncus velit pretium a. Mauris felis tortor, cursus sed dignissim blandit, consequat sit amet sapien. Nam nibh arcu, pharetra eget auctor a, varius sit amet enim. Vestibulum semper nunc urna, ut convallis mauris elementum imperdiet. Nunc est dolor, porta ut gravida in, scelerisque nec felis."
];

const Template: StoryFn<WizardContentProps> = () => {
  return (
    <WizardContent>
      {lipsum.map((paragraph, index) => (
        <Typography key={index}>{paragraph}</Typography>
      ))}
    </WizardContent>
  );
};

export const Default = {
  render: Template,
  args: {}
};
