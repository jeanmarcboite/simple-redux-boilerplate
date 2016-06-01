import {assert} from 'chai';
import Deal from '../src/modules/Deal.js';
import Dealer from '../src/modules/Dealer.js';

describe('Owner', function() {
    it('should', function() {
        const dealer = new Dealer();
        const deal = new Deal(dealer);
        const owners = ([8])
        for (const owner in owners) {
            deal.owner = owners[owner];
            assert.equal(deal.id, -1);
        }
    })  
})

describe('Deal', function() {
    describe('#set ID', function() {
        it('id2owner', function() {
            const dealer = new Dealer();
            const deal = new Deal(dealer);
            deal.id = 3;
            assert.equal(deal.id, 3)
            assert.equal(deal.hn, 'AKQJT98765432... .AKQJT98765432.. ..AKQJT9876532.A ..4.KQJT98765432')
            assert.deepEqual(deal.owner, [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                           1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                           2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2,
                                           2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ])
        })
        it('owner2id', function() {
            const dealer = new Dealer();
            const deal = new Deal(dealer);
            const ids = [0, 3, 4, 5, 7, '98126349183619', '9186349815498519873', '16186843654687368468468434']
            for (const id in ids) {
                deal.id = ids[id]
                const samedeal = new Deal(dealer)
                samedeal.hn = deal.hn
                assert.equal(samedeal.id, deal.id, 'setting id')
                samedeal.owner = deal.owner
                assert.equal(samedeal.id, deal.id, 'setting owner')
                samedeal.hands = deal.hands
                assert.equal(samedeal.id, deal.id, 'setting hands')
            }
        });

    })
})
