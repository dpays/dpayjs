import Promise from 'bluebird';
import should from 'should';
import dpay from '../src';

const username = process.env.DPAY_USERNAME || 'guest123';
const password = process.env.DPAY_PASSWORD;
const postingWif = password
  ? dpay.auth.toWif(username, password, 'posting')
  : '5JRaypasxMx1L97ZUX7YuC5Psb5EAbF821kkAGtBj7xCJFQcbLg';

describe('dpay.broadcast:', () => {
  it('exists', () => {
    should.exist(dpay.broadcast);
  });

  it('has generated methods', () => {
    should.exist(dpay.broadcast.vote);
    should.exist(dpay.broadcast.voteWith);
    should.exist(dpay.broadcast.comment);
    should.exist(dpay.broadcast.transfer);
  });

  it('has backing methods', () => {
    should.exist(dpay.broadcast.send);
  });

  it('has promise methods', () => {
    should.exist(dpay.broadcast.sendAsync);
    should.exist(dpay.broadcast.voteAsync);
    should.exist(dpay.broadcast.transferAsync);
  });

  describe('patching transaction with default global properties', () => {
    it('works', async () => {
      const tx = await dpay.broadcast._prepareTransaction({
        extensions: [],
        operations: [['vote', {
          voter: 'yamadapc',
          author: 'yamadapc',
          permlink: 'test-1-2-3-4-5-6-7-9',
        }]],
      });

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
      ]);
    });
  });

  describe('downvoting', () => {
    it('works', async () => {
      const tx = await dpay.broadcast.voteAsync(
        postingWif,
        username,
        'yamadapc',
        'test-1-2-3-4-5-6-7-9',
        -1000
      );
      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });
  });

  describe('voting', () => {
    beforeEach(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const tx = await dpay.broadcast.voteAsync(
        postingWif,
        username,
        'yamadapc',
        'test-1-2-3-4-5-6-7-9',
        10000
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });

    it('works with callbacks', (done) => {
      dpay.broadcast.vote(
        postingWif,
        username,
        'yamadapc',
        'test-1-2-3-4-5-6-7-9',
        5000,
        (err, tx) => {
          if (err) return done(err);
          tx.should.have.properties([
            'expiration',
            'ref_block_num',
            'ref_block_prefix',
            'extensions',
            'operations',
            'signatures',
          ]);
          done();
        }
      );
    });
  });

  describe('customJson', () => {
    before(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const tx = await dpay.broadcast.customJsonAsync(
        postingWif,
        [],
        [username],
        'follow',
        JSON.stringify([
          'follow',
          {
            follower: username,
            following: 'fabien',
            what: ['blog'],
          },
        ])
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });
  });

  describe('writeOperations', () => {
    it('receives a properly formatted error response', () => {
      const wif = dpay.auth.toWif('username', 'password', 'posting');
      return dpay.broadcast.voteAsync(wif, 'voter', 'author', 'permlink', 0).
      then(() => {
        throw new Error('writeOperation should have failed but it didn\'t');
      }, (e) => {
        should.exist(e.message);
      });
    });
  });
});
