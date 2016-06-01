import Algorithm from './Algorithm';
import _ from 'lodash';
import math from 'mathjs';

export default class Andrews extends Algorithm {
    constructor() {
        super();
        // more Derived-specific stuff here, maybe
    }
    name = () => {
        return 'andrews';
    }

    id2owner(board, id) {
        // set the biggest seat  default owner
        const owner = new Array(board.deck.size).fill(board.seatCount - 1);
        // cards left in the deck: [0, 1, 2, .., 51]
        const cardsLeft = _.range(board.deck.size)

        // indexes corresponding to the hands (except the last one)
        // for the first hand, index range from 0 to 635013559600,
        // for the second hand, index range from 0 to 8122425444,
        // for the third hand, index range from 0 to 10400600,
        const indexes = []
        var i = math.bignumber(id).mod(board.indexMaxProd[0])

        for (var seat = 0; seat < board.seatCount - 1; seat ++) {
            var x = math.fix(math.divide(i, board.indexMaxProd[seat + 1]));
            i = math.subtract(i, math.multiply(x, board.indexMaxProd[seat + 1]));
            indexes.push(x);
        }
        
        // transform the indexes in the indexth permutation
        for (var seat = 0; seat < board.seatCount - 1; seat ++) {
            let index = indexes[seat];
            let hand = [];
            for (let card = 0; card < board.seatLength[seat]; card++) {
                let k = board.deck.size - 1;
                if (index == 0) {
                    k = board.seatLength[seat] - card - 1
                } else {
                    // find the largest K such that Choose(K,seatLength) is less than (or equal to) Nindex.
                    while (math.combinations(k, board.seatLength[seat] - card) > index) {
                        k -= 1;
                    }
                    let cards = board.seatLength[seat] - card;
                    index = index - math.combinations(k, board.seatLength[seat] - card)
                }
                hand.push(k)
            }
            for (let card in hand) {
                owner[cardsLeft[hand[card]]] = seat
                _.pullAt(cardsLeft, hand[card])
            }
        }
        return owner;
    }

    owner2id(board, _owner) {
        var id = math.bignumber(0);
        var owner = _owner;
        if (!board.checkOwner(_owner))
            return -1;
        
        //this.log.info(`owner2id ${owner}`)
        for (let seat = 0; seat < board.seatLength.length -1; seat ++) {
            const hand = []
            for (const card in owner) {
                if (owner[card] == seat) {
                    hand.push(card)
                }
            }
            //this.log.debug(`seat ${seat} hand = ${hand}`)
            var sum = math.bignumber(0)
            for (const card in hand) {
                if (hand[card] > parseInt(card)) {
                    //this.log.debug(`seat ${seat} hand[${card}] = ${hand[card]}, add ${math.combinations(hand[card], parseInt(card) + 1)}`)
                    sum = math.add(sum, math.combinations(hand[card], parseInt(card) + 1));
                }
            }

            //this.log.debug(`owner2id hand ${seat} (sum ${sum}): ${hand}`)
            id = math.add(id, math.multiply(sum, board.indexMaxProd[seat + 1]))
            owner = owner.filter(value => value != seat) 
            //this.log.debug(`owner2id [${id}] owner: ${owner}`)
        }
        //this.log.info(`owner2id id = ${id}`)
        return math.format(id, {notation: 'fixed'})
    }
}
