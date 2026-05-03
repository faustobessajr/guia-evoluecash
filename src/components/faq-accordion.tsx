"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <Accordion className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          className="border-navy-border"
        >
          <AccordionTrigger className="text-left text-sm font-medium hover:text-brand">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-text-secondary leading-relaxed">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
