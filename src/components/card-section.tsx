import { h } from '@stencil/core';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function CardSection(props) {
  return (
    <div class="demo-section">
      {props.cards?.map((card: any, index: any) => (
        <div class="cards" key={index}>
          {card.title_h3 && <h3 {...card.$?.title_h3}>{card.title_h3}</h3>}
          {card.description && <p {...card.$?.description}>{card.description}</p>}
          <div class="card-cta">
            {card.call_to_action.title && card.call_to_action.href && (
              <a {...card.call_to_action.$?.href} href={card.call_to_action.href} class="btn primary-btn">
                {card.call_to_action.title}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
