export const utils = {
  cardColors: ['Red', 'Green', 'Blue', 'Yellow', 'Pink'],
  cardNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],

  nextCardIsValid: (card, deckTop) => {
    // console.log(card, deckTop);
    if (!deckTop.color) return true;

    if (!card.color) return false;
    if (card.color == deckTop.color) return true;
    else if (card.number == deckTop.number) return true;
    else return false;
  },
};
