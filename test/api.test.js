require('babel-polyfill');
import assert from 'assert';
import should from 'should';
import testPost from './test-post.json';
import dpay from '../src';

describe('dpay.api:', function () {
  this.timeout(30 * 1000);

  describe('setOptions', () => {
    it('works', () => {
      dpay.api.setOptions({ url: dpay.config.get('websocket') });
    });
  });

  describe('getFollowers', () => {
    describe('getting jared\'s followers', () => {
      it('works', async () => {
        const result = await dpay.api.getFollowersAsync('jared', 0, 'blog', 5);
        assert(result, 'getFollowersAsync resoved to null?');
        result.should.have.lengthOf(5);
      });

      it('the startFollower parameter has an impact on the result', async () => {
        // Get the first 5
        const result1 = await dpay.api.getFollowersAsync('jared', 0, 'blog', 5)
          result1.should.have.lengthOf(5);
        const result2 = await dpay.api.getFollowersAsync('jared', result1[result1.length - 1].follower, 'blog', 5)
          result2.should.have.lengthOf(5);
        result1.should.not.be.eql(result2);
      });

      it('clears listeners', async () => {
        dpay.api.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('getContent', () => {
    describe('getting a random post', () => {
      it('works', async () => {
        const result = await dpay.api.getContentAsync('yamadapc', 'test-1-2-3-4-5-6-7-9');
        result.should.have.properties(testPost);
      });

      it('clears listeners', async () => {
        dpay.api.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('streamBlockNumber', () => {
    it('streams dPay transactions', (done) => {
      let i = 0;
      const release = dpay.api.streamBlockNumber((err, block) => {
        should.exist(block);
        block.should.be.instanceOf(Number);
        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamBlock', () => {
    it('streams dPay blocks', (done) => {
      let i = 0;
      const release = dpay.api.streamBlock((err, block) => {
        try {
          should.exist(block);
          block.should.have.properties([
            'previous',
            'transactions',
            'timestamp',
          ]);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamTransactions', () => {
    it('streams dPay transactions', (done) => {
      let i = 0;
      const release = dpay.api.streamTransactions((err, transaction) => {
        try {
          should.exist(transaction);
          transaction.should.have.properties([
            'ref_block_num',
            'operations',
            'extensions',
          ]);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamOperations', () => {
    it('streams dPay operations', (done) => {
      let i = 0;
      const release = dpay.api.streamOperations((err, operation) => {
        try {
          should.exist(operation);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('useApiOptions', () => {
    it('works ok with the prod instances', async() => {
      dpay.api.setOptions({ useAppbaseApi: true, url: dpay.config.get('uri') });

      const result = await dpay.api.getContentAsync('yamadapc', 'test-1-2-3-4-5-6-7-9');
      dpay.api.setOptions({ useAppbaseApi: false, url: dpay.config.get('uri') });

      result.should.have.properties(testPost);
    });
  });

});
