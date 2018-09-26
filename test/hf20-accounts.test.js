import Promise from 'bluebird';
import should from 'should';
import dpay from '../src';
 const username = process.env.DPAY_USERNAME || 'guest123';
const password = process.env.DPAY_PASSWORD;
const activeWif = dpay.auth.toWif(username, password, 'active');
 describe('dpay.hf20-accounts:', () => {
  it('has generated methods', () => {
    should.exist(dpay.broadcast.claimAccount);
    should.exist(dpay.broadcast.createClaimedAccount);
  });
   it('has promise methods', () => {
    should.exist(dpay.broadcast.claimAccountAsync);
    should.exist(dpay.broadcast.createClaimedAccountAsync);
  });
   describe('claimAccount', () => {
     it('signs and verifies auth', function(done) {
      let tx = {
        'operations': [[
          'claim_account', {
            'creator': username,
            'fee': '0.000 TESTS'}]]
      }
       dpay.api.callAsync('condenser_api.get_version', []).then((result) => {
        result.should.have.property('blockchain_version');
        if(result['blockchain_version'] < '0.21.0') return done(); /* SKIP */
        result.should.have.property('blockchain_version', '0.21.0')
         dpay.broadcast._prepareTransaction(tx).then(function(tx){
          tx = dpay.auth.signTransaction(tx, [activeWif]);
          dpay.api.verifyAuthorityAsync(tx).then(
            (result) => {result.should.equal(true); done();},
            (err)    => {done(err);}
          );
        });
      });
     });
     it('claims and creates account', function(done) {
      this.skip(); // (!) need test account with enough RC
       dpay.api.callAsync('condenser_api.get_version', []).then((result) => {
        result.should.have.property('blockchain_version');
        if(result['blockchain_version'] < '0.21.0') return done(); /* SKIP */
        result.should.have.property('blockchain_version', '0.21.0')
         dpay.broadcast.claimAccountAsync(activeWif, username, '0.000 TESTS', []).then((result) => {
            let newAccountName = username + '-' + Math.floor(Math.random() * 10000);
            let keys = dpay.auth.generateKeys(
                username, password, ['posting', 'active', 'owner', 'memo']);
             dpay.broadcast.createClaimedAccountAsync(
                activeWif,
                username,
                newAccountName,
                keys['owner'],
                keys['active'],
                keys['posting'],
                keys['memo'],
                {}, []
              ).then((result) => {
                should.exist(result);
                done();
            }, (err) => {done(err)});
        }, (err) => {done(err)});
      });
    });
   });
});
