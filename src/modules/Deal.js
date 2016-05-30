import Pavlicek from './Pavlicek';
import Andrews from './Andrews';


module.exports = class Deal {
    constructor(dealer, algorithm) {
        this.dealer = dealer;
        this.algorithm = new (((algorithm||'andrews').toLowerCase() == 'pavlicek') ? Pavlicek : Andrews);
    }

    /** string (BigInt) */
    __id = undefined
    /** hand notation: KQ6.QT4..  */
    __hn = undefined
    /** Array[52]  */
    __owner = undefined

    get id() {
        return this.__id;
    }

    set id(v) {
        this.__id = v;
        delete this.__owner
        delete this.__hn
    }

    get owner() {
        if (this.__owner === undefined) {
            if (this.__id !== undefined) {
                this.__owner = this.algorithm.id2owner(this.dealer.board, this.__id);
            } else {
               this.__owner = new Array(this.dealer.board.deck.size).fill(undefined); 
            }
        }

        return this.__owner
    }

    get hn() {
        if (this.__hn === undefined || this.__hn === '') {
            this.__hn = this.dealer.board.deck.hands2hn(this.owner2hands(this.owner));
        }
        return this.__hn;
    }

    set hn(v) {
        delete this.__id
        delete this.__owner
        this.__hn = v;
    }

    owner2hands(owner) {
        const hands = [];
        for (let seat = 0; seat < this.dealer.board.seatCount; seat++) {
            hands.push([]);
        }
        if (owner !== undefined) {
            this.__owner = new Array(this.dealer.board.deck.size).fill(this.dealer.board.seatCount - 1); 
            for (let i = 0; i < owner.length; i++) {
                if (owner[i] >= 0 && owner[i] < this.dealer.board.seatCount)
                    hands[owner[i]].push(i);
            }
        }

        return hands;
    }

    getOwner = (suit, face) => this.owner[this.dealer.board.deck.indexOf(suit, face)]

    setOwner = (suit, face, seat) => {
        // get owner
        this.owner
        // we are going to change the owner, the id will not be valid any more
        delete this.__id
        this.__owner[this.dealer.board.deck.indexOf(suit, face)] = seat;
        this.__hn = this.dealer.board.deck.hands2hn(this.owner2hands(this.__owner));
        delete this.__id
    }
}
