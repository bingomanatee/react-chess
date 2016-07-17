import InfluenceManager from 'routes/Chess/modules/InfluenceManager';
import _ from 'lodash';
import Piece from 'routes/Chess/modules/Piece';
import dimensions from 'routes/Chess/modules/dimensions.json';
import util from 'util';

describe.only('(Route) Chess', () => {
    describe('InfluenceManager', () => {
        let im = null;

        beforeEach(() => {
            im = new InfluenceManager();
        });

        it('should have a piece for every square', () => {
            let indexes = [];
            for (let prop in im.placeIndex) {
                indexes.push(prop);
            }
            indexes = _.sortBy(indexes).join(',');
            expect(indexes).to.equal('1a,1b,1c,1d,1e,1f,1g,1h,' +
                '2a,2b,2c,2d,2e,2f,2g,2h,3a,3b,3c,3d,3e,3f,3g,3h,' +
                '4a,4b,4c,4d,4e,4f,4g,4h,5a,5b,5c,5d,5e,5f,5g,5h,' +
                '6a,6b,6c,6d,6e,6f,6g,6h,7a,7b,7c,7d,7e,7f,7g,7h,' +
                '8a,8b,8c,8d,8e,8f,8g,8h');
        });

        it('should have each piece at the right index', () => {
            for (let index in im.placeIndex) {
                expect(im.placeIndex[index].toString()).to.equal(index);
            }
        });

        describe('offset', () => {
            it('should get the piece in front of 4b', () => {
                let place = im.placeIndex['4b'];
                let offsetPlace = im.offset(place, -1, 0);
                expect(offsetPlace.toString()).to.equal('5b');
            })
        });

        describe('pawn move', () => {
            let pwn;
            beforeEach(() => {
                pwn = new Piece('P', true, 4, 'b');
            });

            describe('white', () => {
                it('should get the right moves', () => {
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('5b,6b');
                });

                it('should add lateral moves if available', () => {
                    im.placeIndex['5c'].piece = true;
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('5b,5c,6b');
                });

                it('should only move once if already moved', () => {
                    pwn.moved = true;
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('5b');
                });

                it('should not move if blocked', () => {
                    im.placeIndex['5b'].piece = true;
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('');
                });
            });

            describe('black', () => {
                beforeEach(() => pwn.color = false);
                it('should get the right moves', () => {
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('2b,3b');
                });

                it('should add lateral moves if available', () => {
                    im.placeIndex['3c'].piece = true;
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('2b,3b,3c');
                });

                it('should only move once if already moved', () => {
                    pwn.moved = true;
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('3b');
                });

                it('should not move if blocked', () => {
                    im.placeIndex['3b'].piece = true;
                    const moves = im.getPieceMoves(pwn);
                    const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                    expect(moveNames).to.equal('');
                });
            });
        });

        describe('king moves', () => {
            let king;
            beforeEach(() => {
                king = new Piece('K', true, 4, 'b');
            });

            it('should get the right moves', () => {
                const moves = im.getPieceMoves(king);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('3a,3b,3c,4a,4c,5a,5b,5c');
            });

            it('(has the same moves) if blocked', () => {
                im.placeIndex['3a'].piece = true;
                im.placeIndex['3b'].piece = true;
                im.placeIndex['3c'].piece = true;
                im.placeIndex['5a'].piece = true;
                im.placeIndex['5b'].piece = true;
                im.placeIndex['5c'].piece = true;
                im.placeIndex['4a'].piece = true;
                im.placeIndex['4c'].piece = true;
                const moves = im.getPieceMoves(king);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('3a,3b,3c,4a,4c,5a,5b,5c');
            });
        });

        describe('queen moves', () => {
            let queen;
            beforeEach(() => {
                queen = new Piece('Q', true, 4, 'b');
            });

            it('should get the right moves', () => {
                const moves = im.getPieceMoves(queen);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('1b,1e,2b,2d,3a,3b,3c,4a,4c,4d,4e,4f,4g,4h,5a,5b,5c,6b,6d,7b,7e,8b,8f');
            });

            it('should not move if blocked', () => {
                im.placeIndex['3a'].piece = true;
                im.placeIndex['3b'].piece = true;
                im.placeIndex['3c'].piece = true;
                im.placeIndex['5a'].piece = true;
                im.placeIndex['5b'].piece = true;
                im.placeIndex['5c'].piece = true;
                im.placeIndex['4a'].piece = true;
                im.placeIndex['4c'].piece = true;
                const moves = im.getPieceMoves(queen);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('3a,3b,3c,4a,4c,5a,5b,5c');
            });
        });

        describe('rook moves', () => {
            let rook;
            beforeEach(() => {
                rook = new Piece('R', true, 4, 'b');
            });

            it('should get the right moves', () => {
                const moves = im.getPieceMoves(rook);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('1b,2b,3b,4a,4c,4d,4e,4f,4g,4h,5b,6b,7b,8b');
            });

            it('should not move if blocked', () => {
                im.placeIndex['3a'].piece = true;
                im.placeIndex['3b'].piece = true;
                im.placeIndex['3c'].piece = true;
                im.placeIndex['5a'].piece = true;
                im.placeIndex['5b'].piece = true;
                im.placeIndex['5c'].piece = true;
                im.placeIndex['4a'].piece = true;
                im.placeIndex['4c'].piece = true;
                const moves = im.getPieceMoves(rook);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('3b,4a,4c,5b');
            });
        });

        describe('bishop moves', () => {
            let bishop;
            beforeEach(() => {
                bishop = new Piece('B', true, 4, 'b');
            });

            it('should get the right moves', () => {
                const moves = im.getPieceMoves(bishop);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('1e,2d,3a,3c,5a,5c,6d,7e,8f');
            });

            it('should not move if blocked', () => {
                im.placeIndex['3a'].piece = true;
                im.placeIndex['3b'].piece = true;
                im.placeIndex['3c'].piece = true;
                im.placeIndex['5a'].piece = true;
                im.placeIndex['5b'].piece = true;
                im.placeIndex['5c'].piece = true;
                im.placeIndex['4a'].piece = true;
                im.placeIndex['4c'].piece = true;
                const moves = im.getPieceMoves(bishop);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('3a,3c,5a,5c');
            });
        });

        describe('Workin\' on our night moves', () => {
            let knight;
            beforeEach(() => {
                knight = new Piece('N', true, 4, 'b');
            });

            it('should get the right moves', () => {
                const moves = im.getPieceMoves(knight);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('2a,2c,3d,5d,6a,6c');
            });

            it('should be able to move if blocked', () => {
                im.placeIndex['3a'].piece = true;
                im.placeIndex['3b'].piece = true;
                im.placeIndex['3c'].piece = true;
                im.placeIndex['5a'].piece = true;
                im.placeIndex['5b'].piece = true;
                im.placeIndex['5c'].piece = true;
                im.placeIndex['4a'].piece = true;
                im.placeIndex['4c'].piece = true;
                const moves = im.getPieceMoves(knight);
                const moveNames = _.sortBy(moves.map(m => m.toString())).join(',');
                expect(moveNames).to.equal('2a,2c,3d,5d,6a,6c');
            });
        });

        describe('addPiece', ()=> {
            let influenceMap = () => {
                let out = [];
                for (let place of im.placeList) {
                    out.push(place.piece ? place.piece.name : '.');
                    out.push(place.blackPower);
                    out.push(place.whitePrivilege);
                }
                return _.chunk(out, 24).map(s => _.chunk(s, 3).map(p => p.join('x')).join(',')).join(' ' + 
'~ ' +
                    '');
            };

            it('should have a blank influence at start', () => {
                expect(influenceMap()).to.equal(
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                    '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0'
                );
            });

            describe('after adding a pawn', () => {
                let pawn;
                let d2;
                let d3;
                beforeEach(() => {
                    pawn = new Piece('P', true, 2, 'd');
                    im.addPiece(pawn);
                    im.recalculate();
                    d2 = im.placeIndex['2d'];
                    d3 = im.placeIndex['3d'];
                });

                it('should have the piece at 2d', () => {
                    expect(d2.piece.id).to.equal(pawn.id);
                });

                it('should have white privilege', () => {
                    expect(d3.whitePrivilege).to.equal(1);
                });

                it('should have no black power', () => {
                    expect(d3.blackPower).to.equal(0);
                });

                describe('rook blocked', () => {
                    let rook;

                    beforeEach(() => {
                        rook = new Piece('R', true, 1, 'd');
                        im.addPiece(rook);
                        im.recalculate();
                    });


                    it('should block the rook with the pawn', () => {
                        expect(influenceMap()).to.equal(
                            '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' +
                            '' + 
'~ .x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' +
                            '' + 
'~ .x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' +
                            '' + 
'~ .x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' +
                            '' + 
'~ .x0x0,.x0x0,.x0x0,.x0x1,.x0x0,.x0x0,.x0x0,.x0x0 ' +
                            '' + 
'~ .x0x0,.x0x0,.x0x0,.x0x1,.x0x0,.x0x0,.x0x0,.x0x0 ' +
                            '' + 
'~ .x0x0,.x0x0,.x0x0,wPx0x1,.x0x0,.x0x0,.x0x0,.x0x0 ' +
                            '' + 
'~ .x0x1,.x0x1,.x0x1,wRx0x0,.x0x1,.x0x1,.x0x1,.x0x1'
                        );
                    });
                });
            });

            describe('after a row of pawns', () => {
                beforeEach(() => {
                    for (let col of dimensions.columns) {
                        let pawn = new Piece('P', true, 2, col);
                        im.addPiece(pawn, true);
                    }
                    im.recalculate();
                });

                it('should show influence', () => {
                    expect(influenceMap()).to.equal(
                        '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                        '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                        '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                        '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ ' +
                        '.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1 ' + 
'~ ' +
                        '.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1 ' + 
'~ ' +
                        'wPx0x0,wPx0x0,wPx0x0,wPx0x0,wPx0x0,wPx0x0,wPx0x0,wPx0x0 ' + 
'~ ' +
                        '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0'
                    );
                });

                describe('after the other pieces', () => {
                    beforeEach(() => {
                        im.addPiece(new Piece('R', true, 1, 'a'));
                        im.addPiece(new Piece('R', true, 1, 'h'));
                        im.addPiece(new Piece('N', true, 1, 'b'));
                        im.addPiece(new Piece('N', true, 1, 'g'));
                        im.addPiece(new Piece('B', true, 1, 'c'));
                        im.addPiece(new Piece('B', true, 1, 'f'));
                        im.addPiece(new Piece('K', true, 1, 'd'));
                        im.addPiece(new Piece('Q', true, 1, 'e'));

                        im.recalculate();
                    });

                    it('should show influence', () => {
                        expect(influenceMap()).to.equal(
                            '.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ .x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ .x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ .x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0,.x0x0 ' + 
'~ .x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1,.x0x1 ' + 
'~ .x0x2,.x0x1,.x0x2,.x0x1,.x0x1,.x0x2,.x0x1,.x0x2 ' + 
'~ wPx0x1,wPx0x1,wPx0x1,wPx0x4,wPx0x4,wPx0x1,wPx0x1,wPx0x1 ' + 
'~ wRx0x0,wNx0x1,wBx0x1,wKx0x1,wQx0x1,wBx0x1,wNx0x1,wRx0x0'
                        );
                    });
                });
            })

        });
    });
});
