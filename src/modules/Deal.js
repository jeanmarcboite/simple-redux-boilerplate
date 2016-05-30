import Pavlicek from './Pavlicek';
import Andrews from './Andrews';


module.exports = class Deal {
    constructor(dealer, algorithm) {
        this.dealer = dealer;
        this.algorithm = new (((algorithm||'andrews').toLowerCase() == 'pavlicek') ? Pavlicek : Andrews);
    }

    /** string (BigInt) */
    __id = undefined
    /** hand notation: KQ6.QT4..  JT2.K96..  */
    __hn = undefined
    /** hands: [[1, 2, 8, 15, 17, 23],[3,4,12,14,18,21],[],[]]  */
    __hands = undefined
    /** Array[52]  */
    __owner = undefined

    get id() {
        return this.__id;
    }

    set id(v) {
        this.reset()
        console.log(`setting id to ${v}`)
        this.__id = v;
    }

    reset() {
        delete this.__id
        delete this.__owner
        delete this.__hands
        delete this.__hn
    }

    set owner(owner) {
        this.reset()
        this.__owner = owner
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

    get hands() {
        if (this.__hands == undefined) {
            if (this.__hn)
                this.__hands = this.hn2hands(this.__hn)
            else
                this.__hands = this.owner2hands(this.owner)
        }
        return this.__hands;
    }

    get hn() {
        if (this.__hn === undefined || this.__hn === '') {
            this.__hn = this.dealer.board.deck.hands2hn(this.hands);
        }
        return this.__hn;
    }

    set hn(v) {
        this.reset()
        this.__hn = v;
    }

    get seatComplete() {
        const complete = []
        for (let seat = 0; seat < this.dealer.board.seatCount; seat++) {
            complete.push(this.hands[seat].length == this.dealer.board.seatLength[seat]);
        }
        return complete;
    }

    owner2hands(owner) {
        const hands = [];
        for (let seat = 0; seat < this.dealer.board.seatCount; seat++) {
            hands.push([]);
        }
        if (owner !== undefined) {
            for (let i = 0; i < owner.length; i++) {
                if (owner[i] >= 0 && owner[i] < this.dealer.board.seatCount)
                    hands[owner[i]].push(i);
            }
        }

        return hands;
    }

    hn2hands = (hn) => (hn == undefined) ? new Array(this.dealer.board.seatCount).fill([]) : this.board.deck.hn2hands(hn)

    getOwner = (suit, face) => this.owner[this.dealer.board.deck.indexOf(suit, face)]

    setOwner = (suit, face, seat) => {
        console.log(this.seatComplete)
        if ((seat == undefined) || !this.seatComplete[seat]) {
            // we are going to change the owner, other fields must be invalidated
            this.owner = this.owner  // implicit call to reset vi set owner
            // assign to seat
            this.__owner[this.dealer.board.deck.indexOf(suit, face)] = seat;
        }
    }
}
