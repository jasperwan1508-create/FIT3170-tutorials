Package["core-runtime"].queue("null",function () {/* Imports for global scope */

MongoInternals = Package.mongo.MongoInternals;
Mongo = Package.mongo.Mongo;
CollectionExtensions = Package.mongo.CollectionExtensions;
ReactiveVar = Package['reactive-var'].ReactiveVar;
ECMAScript = Package.ecmascript.ECMAScript;
Meteor = Package.meteor.Meteor;
global = Package.meteor.global;
meteorEnv = Package.meteor.meteorEnv;
EmitterPromise = Package.meteor.EmitterPromise;
WebApp = Package.webapp.WebApp;
WebAppInternals = Package.webapp.WebAppInternals;
main = Package.webapp.main;
DDP = Package['ddp-client'].DDP;
DDPServer = Package['ddp-server'].DDPServer;
LaunchScreen = Package['launch-screen'].LaunchScreen;
meteorInstall = Package.modules.meteorInstall;
Promise = Package.promise.Promise;
Autoupdate = Package.autoupdate.Autoupdate;

var require = meteorInstall({"imports":{"api":{"links.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/links.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({LinksCollection:()=>LinksCollection},true);let Mongo;module.link('meteor/mongo',{Mongo(v){Mongo=v}},0);
const LinksCollection = new Mongo.Collection('links');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!module.wrapAsync(async function (module, __reifyWaitForDeps__, __reifyAsyncResult__) {"use strict"; try {let Meteor;module.link("meteor/meteor",{Meteor(v){Meteor=v}},0);let LinksCollection;module.link("/imports/api/links",{LinksCollection(v){LinksCollection=v}},1);let Random;module.link("meteor/random",{Random(v){Random=v}},2);let Mongo;module.link('meteor/mongo',{Mongo(v){Mongo=v}},3);if (__reifyWaitForDeps__()) (await __reifyWaitForDeps__())();function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}




// Define a MongoDB collection — Meteor creates it automatically
const Receipts = new Mongo.Collection('receipts');
Meteor.startup(()=>_async_to_generator(function*() {
        // Clear collection each run so we start fresh
        yield Receipts.removeAsync({});
        // INSERT
        const id = yield Receipts.insertAsync({
            store: 'Woolworths',
            total: 42.50,
            date: new Date()
        });
        console.log('Inserted ID:', id);
        // FIND
        const all = yield Receipts.find().fetchAsync();
        console.log('All receipts:', all);
        // UPDATE
        yield Receipts.updateAsync(id, {
            $set: {
                total: 99.99
            }
        });
        const updated = yield Receipts.findOneAsync(id);
        console.log('Updated receipt:', updated);
        // DELETE
        yield Receipts.removeAsync(id);
        const afterDelete = yield Receipts.find().fetchAsync();
        console.log('After delete:', afterDelete);
    })());
//*/
__reifyAsyncResult__();} catch (_reifyError) { __reifyAsyncResult__(_reifyError); }}, { self: this, async: false });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts",
    ".mjs",
    ".jsx"
  ]
});


/* Exports */
return {
  require: require,
  eagerModulePaths: [
    "/server/main.js"
  ]
}});

//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvbGlua3MuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIk1vbmdvIiwiTGlua3NDb2xsZWN0aW9uIiwiQ29sbGVjdGlvbiIsIlJlY2VpcHRzIiwiTWV0ZW9yIiwic3RhcnR1cCIsInJlbW92ZUFzeW5jIiwiaWQiLCJpbnNlcnRBc3luYyIsInN0b3JlIiwidG90YWwiLCJkYXRlIiwiRGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJhbGwiLCJmaW5kIiwiZmV0Y2hBc3luYyIsInVwZGF0ZUFzeW5jIiwiJHNldCIsInVwZGF0ZWQiLCJmaW5kT25lQXN5bmMiLCJhZnRlckRlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxLQUFLLFFBQVEsZUFBZTtBQUVyQyxPQUFPLE1BQU1DLGtCQUFrQixJQUFJRCxNQUFNRSxVQUFVLENBQUMsRUFBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGdEI7QUFDYztBQUNkO0FBQ0Y7QUFHckMsZ0VBQWdFO0FBQ2hFLE1BQU1DLFdBQVcsSUFBSUgsTUFBTUUsVUFBVSxDQUFDO0FBR3RDRSxPQUFPQyxPQUFPLENBQUM7UUFHYiw4Q0FBOEM7UUFDOUMsTUFBTUYsU0FBU0csV0FBVyxDQUFDLENBQUM7UUFHNUIsU0FBUztRQUNULE1BQU1DLEtBQUssTUFBTUosU0FBU0ssV0FBVyxDQUFDO1lBQ3BDQyxPQUFPO1lBQ1BDLE9BQU87WUFDUEMsTUFBTSxJQUFJQztRQUNaO1FBQ0FDLFFBQVFDLEdBQUcsQ0FBQyxnQkFBZ0JQO1FBRzVCLE9BQU87UUFDUCxNQUFNUSxNQUFNLE1BQU1aLFNBQVNhLElBQUksR0FBR0MsVUFBVTtRQUM1Q0osUUFBUUMsR0FBRyxDQUFDLGlCQUFpQkM7UUFHN0IsU0FBUztRQUNULE1BQU1aLFNBQVNlLFdBQVcsQ0FBQ1gsSUFBSTtZQUFFWSxNQUFNO2dCQUFFVCxPQUFPO1lBQU07UUFBRTtRQUN4RCxNQUFNVSxVQUFVLE1BQU1qQixTQUFTa0IsWUFBWSxDQUFDZDtRQUM1Q00sUUFBUUMsR0FBRyxDQUFDLG9CQUFvQk07UUFHaEMsU0FBUztRQUNULE1BQU1qQixTQUFTRyxXQUFXLENBQUNDO1FBQzNCLE1BQU1lLGNBQWMsTUFBTW5CLFNBQVNhLElBQUksR0FBR0MsVUFBVTtRQUNwREosUUFBUUMsR0FBRyxDQUFDLGlCQUFpQlE7SUFHL0IiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcclxuXHJcbmV4cG9ydCBjb25zdCBMaW5rc0NvbGxlY3Rpb24gPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignbGlua3MnKTtcclxuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcclxuaW1wb3J0IHsgTGlua3NDb2xsZWN0aW9uIH0gZnJvbSBcIi9pbXBvcnRzL2FwaS9saW5rc1wiO1xyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwibWV0ZW9yL3JhbmRvbVwiO1xyXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XHJcblxyXG5cclxuLy8gRGVmaW5lIGEgTW9uZ29EQiBjb2xsZWN0aW9uIOKAlCBNZXRlb3IgY3JlYXRlcyBpdCBhdXRvbWF0aWNhbGx5XHJcbmNvbnN0IFJlY2VpcHRzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3JlY2VpcHRzJyk7XHJcblxyXG5cclxuTWV0ZW9yLnN0YXJ0dXAoYXN5bmMgKCkgPT4ge1xyXG5cclxuXHJcbiAgLy8gQ2xlYXIgY29sbGVjdGlvbiBlYWNoIHJ1biBzbyB3ZSBzdGFydCBmcmVzaFxyXG4gIGF3YWl0IFJlY2VpcHRzLnJlbW92ZUFzeW5jKHt9KTtcclxuXHJcblxyXG4gIC8vIElOU0VSVFxyXG4gIGNvbnN0IGlkID0gYXdhaXQgUmVjZWlwdHMuaW5zZXJ0QXN5bmMoe1xyXG4gICAgc3RvcmU6ICdXb29sd29ydGhzJyxcclxuICAgIHRvdGFsOiA0Mi41MCxcclxuICAgIGRhdGU6IG5ldyBEYXRlKClcclxuICB9KTtcclxuICBjb25zb2xlLmxvZygnSW5zZXJ0ZWQgSUQ6JywgaWQpO1xyXG5cclxuXHJcbiAgLy8gRklORFxyXG4gIGNvbnN0IGFsbCA9IGF3YWl0IFJlY2VpcHRzLmZpbmQoKS5mZXRjaEFzeW5jKCk7XHJcbiAgY29uc29sZS5sb2coJ0FsbCByZWNlaXB0czonLCBhbGwpO1xyXG5cclxuXHJcbiAgLy8gVVBEQVRFXHJcbiAgYXdhaXQgUmVjZWlwdHMudXBkYXRlQXN5bmMoaWQsIHsgJHNldDogeyB0b3RhbDogOTkuOTkgfSB9KTtcclxuICBjb25zdCB1cGRhdGVkID0gYXdhaXQgUmVjZWlwdHMuZmluZE9uZUFzeW5jKGlkKTtcclxuICBjb25zb2xlLmxvZygnVXBkYXRlZCByZWNlaXB0OicsIHVwZGF0ZWQpO1xyXG5cclxuXHJcbiAgLy8gREVMRVRFXHJcbiAgYXdhaXQgUmVjZWlwdHMucmVtb3ZlQXN5bmMoaWQpO1xyXG4gIGNvbnN0IGFmdGVyRGVsZXRlID0gYXdhaXQgUmVjZWlwdHMuZmluZCgpLmZldGNoQXN5bmMoKTtcclxuICBjb25zb2xlLmxvZygnQWZ0ZXIgZGVsZXRlOicsIGFmdGVyRGVsZXRlKTtcclxuXHJcblxyXG59KTsiXX0=
