import React from 'react'
import Position from 'routes/Chess/modules/Position'

describe('(Route) Chess', () => {
    describe('Position', () => {
        let pos = null;
        beforeEach(() => {
            pos = new Position(3, 'a');
        });

        it('should have expected row', () => {
            expect(pos.row).to.equal(3);
        });

        it('should have expected column', () => {
            expect(pos.column).to.equal('a');
        });

        it('should have rowIndex 5', () => {
            expect(pos.rowIndex).to.equal(5);
        });

        it('should have columnIndex 0', () => {
            expect(pos.columnIndex).to.equal(0);
        });
    });
});
