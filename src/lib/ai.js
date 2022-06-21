/**
 * Basic implementation of an AI Opponent in the Color Card Game
 */

import _ from 'lodash';

export const aiOpponent = {
  getNextCard(cards, deckTop) {
    const filteredCard = _.find(
      cards,
      (o) => o.color == deckTop.color || o.number == deckTop.number
    );
    console.log('filteredCard', filteredCard);
    if (!filteredCard) {
      // card not found
      return false;
    }
    return filteredCard;
  },
};
