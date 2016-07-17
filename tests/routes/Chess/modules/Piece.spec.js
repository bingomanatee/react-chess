import React from 'react'
import Piece from 'routes/Chess/modules/Piece';

describe('(Route) Chess', () => {
    describe('Piece', () => {
        let piece = null;
        beforeEach(() => {
            piece = new Piece('B', true, 3, 'a');
        });

        it('should have  type B', () => {
            expect(piece.type).to.equal('B');
        });

        it('should be white', () => {
            expect(piece.color).to.be.true;
        });

        it('should have expected row', () => {
            expect(piece.row).to.equal(3);
        });

        it('should have expected column', () => {
            expect(piece.column).to.equal('a');
        });

        it('should have rowIndex 5', () => {
            expect(piece.rowIndex).to.equal(5);
        });

        it('should have columnIndex 0', () => {
            expect(piece.columnIndex).to.equal(0);
        });
    });
});
