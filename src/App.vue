<template>
  <div id="app">
    <h2 align="center">Color Card Game</h2>
    <button v-if="gameState == 0" @click="startGame()">Start Game</button>
    <button v-if="gameState != 0" @click="resetGame()">Reset Game</button>
    <!-- <button :disabled="playerTurn" v-if="gameState == 1" @click="cpuPlay()"> 
      CPU play
    </button> -->
    <div style="margin-top: 10px;">{{ playerTurn ? 'Your' : "CPU's" }} turn</div>
    <div style="margin-top: 10px;">CPU card count: {{ cpuCards.length }}</div>

    <p><b>Pile</b></p>
    <div style="display: flex;justify-content: center;">
      <ColorCard
        class="card"
        :color="deckTop.color"
        :number="deckTop.number"
      />
    </div>

    <!-- Player's Deck -->
    <p><b>Your deck</b> <br> <button @click="playerDrawCard()">Draw a card</button></p>
    <div class="deck">
      <ColorCard
        class="card"
        v-for="(card, index) of playerCards"
        :key="index"
        :color="card.color"
        :number="card.number"
        @click="chooseCard(card)"
      />
    </div>
  </div>
</template>

<script>
import ColorCard from './components/ColorCard.vue';
import { utils } from './lib/utils';
import { aiOpponent } from './lib/ai';
import _ from 'lodash';
import swal from 'sweetalert';

export default {
  name: 'App',
  components: {
    ColorCard,
  },
  data() {
    return {
      gameState: 0, //0: not started, 1: started,2: finished
      cardsInDeck: 20,
      playerCards: [],
      cpuCards: [],
      cpuChosenCard: {},
      playerChosenCard: {},
      playerTurn: true,
      deckTop: {}, //representing top card of the deck
    };
  },
  methods: {
    drawRandomCard() {
      return {
        color:
          utils.cardColors[Math.floor(Math.random() * utils.cardColors.length)],
        number:
          utils.cardNumbers[
            Math.floor(Math.random() * utils.cardNumbers.length)
          ],
      };
    },
    initDeck() {
      let tempCards = [];
      for (let i = 0; i < this.cardsInDeck; i++) {
        tempCards.push(this.drawRandomCard());
        // console.log(this.drawRandomCard());
      }
      this.playerCards = tempCards;
    },
    initDeckCPU() {
      let tempCards = [];
      for (let i = 0; i < this.cardsInDeck; i++) {
        tempCards.push(this.drawRandomCard());
        // console.log(this.drawRandomCard());
      }
      this.cpuCards = tempCards;
      console.log(tempCards);
    },
    playerDrawCard(){
        this.playerCards.push(this.drawRandomCard());
    },
    chooseCard(card) {
      if (!this.playerTurn) {
        // swal("This is CPU's turn","","warning");
        return;
      }

      // check valid card
      if (!utils.nextCardIsValid(card, this.deckTop)) {
        // swal('Invalid card', '', 'warning');
        return;
      }
      this.playerChosenCard = card;
      this.deckTop = card;
      // remove card from deck
      _.remove(
        this.playerCards,
        (o) => o.color == card.color && o.number == card.number
      );

      if (this.playerCards.length == 0 && this.cpuCards.length > 0) {
        swal('CPU wins!', '', 'warning');
        this.gameState = 2;
        return;
      }

      this.playerTurn = false;

      setTimeout(() => {
        this.cpuPlay();
        
      }, 1000);
    },
    cpuPlay() {
      // select a card based on AI algorithm
      let card = aiOpponent.getNextCard(this.cpuCards, this.deckTop);
      if (!card) {
        this.cpuCards.push(this.drawRandomCard());
        swal('Picked a new card from deck', '', 'warning');
        this.playerTurn = true;
        return;
      } else this.cpuChosenCard = card;

      this.deckTop = card;

      // remove card from deck
      _.remove(
        this.cpuCards,
        (o) => o.color == card.color && o.number == card.number
      );

      if (this.cpuCards.length == 0 && this.playerCards.length > 0) {
        swal('CPU wins!', '', 'warning');
        this.gameState = 2;
        return;
      }

      this.playerTurn = true;
    },
    startGame() {
      this.initDeck();
      this.initDeckCPU();
      this.gameState = 1;
    },
    resetGame() {
      location.reload();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.deck {
  display: flex;
  min-height: 100px;
  max-height: 400px;
  overflow-x: auto;
  overflow-y: scroll;
  border: 1px solid;
  flex-wrap: wrap;
}
.card {
  width: 100px;
  height: 150px;
  margin: 0.5rem;
  padding: 0.5rem;
}
</style>
