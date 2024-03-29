import { h } from '@stencil/core';
import { Action } from "../typescript/action";

type AdditionalParam = {
  title_h3: {};
  description: {};
}

type Data = {
  title_h3: string;
  description: string;
  call_to_action: Action;
  $: AdditionalParam;
}

type CardProps = {
  cards: [Data];
  key: string;
}

export default function CardSection(props: CardProps) {
  return (
    <div class="demo-section">
      {props.cards?.map((card, index: number) => (
        <div class="cards" key={`card-${index}`}>
          {card.title_h3 && <h3 {...card.$?.title_h3}>{card.title_h3}</h3>}
          {card.description && <p {...card.$?.description}>{card.description}</p>}
          <div class="card-cta">
            {card.call_to_action.title && card.call_to_action.href && (
              <a {...card.call_to_action.$?.href as {}} href={card.call_to_action.href} class="btn primary-btn">
                {card.call_to_action.title}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
