"use client";

import {
  Root as CollapsibleRoot,
  CollapsibleTrigger as RadixCollapsibleTrigger,
  CollapsibleContent as RadixCollapsibleContent,
} from "@radix-ui/react-collapsible";

function Collapsible(props) {
  return <CollapsibleRoot data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger(props) {
  return (
    <RadixCollapsibleTrigger data-slot="collapsible-trigger" {...props} />
  );
}

function CollapsibleContent(props) {
  return (
    <RadixCollapsibleContent data-slot="collapsible-content" {...props} />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
