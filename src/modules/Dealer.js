import _ from 'lodash'
import math from 'mathjs'
import __ from './util/lodashx';

const defaults = {
        suits: "AKQJT98765432.AKQJT98765432.AKQJT98765432.AKQJT98765432",
        suitNames: "S.H.D.C",
        seatNames: "N.E.S.W",
        seatLength: [13, 13, 13, 13]
}

export class Deck {
    constructor(config) {
        /** get the card face from index = 0..size  */
        this.cardFace = config.suits.trim().replace(/\./g, '').split('');
        /** "A42.KQ6":Array[Array[String]] = Array(Array(A, 4, 2), Array(K, Q, 6)) */
        this.suitCardFace = config.suits.trim().split('.').map(s => s.split(''))
        /** the number of cards in each suit (0 until suitCount) */
        this.suitLength = this.suitCardFace.map(s => s.length)
        this.suitIndex = __.scanLeft(this.suitLength, math.add, 0);
        /** the suit names */
        this.suitNames = config.suitNames.trim().split('.');
        /** the name of a suit */
        this.suitName = (suit) => {
            if (this.suitNames.length > suit)
                return this.suitNames(suit);
            else return `suit ${suit}`;
        }
  
        /** the index of the first card in each suit (0 to suitCount) */
        this.suitFirstCard = __.scanLeft(this.suitLength, math.add, 0);
        /** get the suit from index = 0..deckSize */
        this.cardSuit = [];
        for (let suit = 0; suit < this.suitLength.length; suit++) {
            for (let k = 0; k < this.suitLength[suit]; k++)
                this.cardSuit.push(suit);
        }
            
    }
    /** total number of cards  */
    get size() { return this.cardFace.length;}
    /** number of suits */
    get suitCount() { return this.suitLength.length;}
    /** get the index from a suit and a face */
    indexOf = (suit, face) => this.suitIndex[suit] + this.suitCardFace[suit].indexOf(face)

   /** how many suit changes between cards i and j? */
   suitSkip = (i, j) => this.cardSuit[j] - this.cardSuit[i]
    /** one hand to hand notation */
    hand2hn = (hand) => {
        const with0 = _.concat(0, hand);
        var withSuitDot = "";
        for (let i = 0; i < hand.length; i++) {
            withSuitDot += _.repeat('.', this.suitSkip(with0[i], with0[i + 1]))
                + this.cardFace[with0[i+1]];
        }

        const trailingDots = _.repeat('.', this.suitSkip((hand.length == 0) ? 0 : _.last(hand), this.size - 1))
        return (withSuitDot) + trailingDots
    }
    /** all hands to hand notation  */
    hands2hn = (hands) => {
        let hn = "";
        
        for (let seat = 0; seat < hands.length; seat++) {
            if (seat > 0)
                hn += ' ';
            hn += this.hand2hn(hands[seat]);
        }

        return hn;
    }
    /** hand notation to one hand */
    hn2hand = (hn) => {
        const hand = []
        const h = hn.split('.');
        for (let suit = 0; suit < h.length; suit++)
            for (let k = 0; k < h[suit].length; k++)
                hand.push(this.indexOf(suit, h[suit][k]))
        return hand;
    }
    /** hand notation to all hands */
    hn2hands = (hn) => hn.split(' ').map(h => this.hn2hand(h));
}

export class Board {
    // config = {names: , seats: [13, 13, 13, 13]
    constructor(config) {
        this.deck = new Deck(config);
        this.seatLength = config.seatLength
        this.seatNames = config.seatNames.trim().split('.')

        // [13, 13, 13, 13]  --> [52, 39, 26, 13, 0]
        // val cardsLeft = seatLength.scanRight(0)(_ + _)
        var cardsLeft = [0];
        for (var k = 0; k < this.seatLength.length; k++)
            cardsLeft.push(_.last(cardsLeft) + this.seatLength[k])
        cardsLeft = _.reverse(_.tail(cardsLeft))
        //this.indexMax = (cardsLeft zip seatLength) map { x => choose(x._1, x._2)}
        this.indexMax = _.map(_.zip(cardsLeft, this.seatLength), x => math.combinations(x[0], x[1]))
  // this one must be indexed with seat+1 (indexMaxProd(0) == dealsCount)
        //    val indexMaxProd = indexMax.scanRight(BigInt("1"))(_ * _)
        let maxProd = math.bignumber(1);
        this.indexMaxProd = [];
        for (k =  this.indexMax.length; k --> 0;) {
            maxProd = math.multiply(maxProd, this.indexMax[k]);
            this.indexMaxProd.push(maxProd);
        }
        this.indexMaxProd = _.reverse(this.indexMaxProd)
    }
    
    get seatCount() { return this.seatLength.length;}
    get dealCount() { return this.indexMaxProd[0];}

    checkOwner(owner) {
        if (owner.length != deck.size)
            return false;
        for (const card in owner)
            if (owner[card] == undefined || owner[card] < 0 || owner[card] >= this.seatCount)
                return false;
        return true;
    }
}

export default class Dealer {
    constructor(config = {}) {
        this.config = Object.assign(defaults, config);
        this.board = new Board(this.config); 
    }
}
