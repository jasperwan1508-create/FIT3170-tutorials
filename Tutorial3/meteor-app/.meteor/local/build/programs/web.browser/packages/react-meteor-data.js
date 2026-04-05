//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


Package["core-runtime"].queue("react-meteor-data",function () {/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"react-meteor-data":{"index.ts":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/react-meteor-data/index.ts                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let React;module.link('react',{default(v){React=v}},0);module.link('./useTracker',{useTracker:"useTracker"},1);module.link('./withTracker',{withTracker:"withTracker"},2);module.link('./useFind',{useFind:"useFind"},3);module.link('./useSubscribe',{useSubscribe:"useSubscribe"},4);/* global Meteor*/ 
if (Meteor.isDevelopment) {
    const v = React.version.split('.');
    if (v[0] < 16 || v[0] == 16 && v[1] < 8) {
        console.warn('react-meteor-data 2.x requires React version >= 16.8.');
    }
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"useFind.ts":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/react-meteor-data/useFind.ts                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({useFind:()=>useFind},true);let Meteor;module.link('meteor/meteor',{Meteor(v){Meteor=v}},0);let Mongo;module.link('meteor/mongo',{Mongo(v){Mongo=v}},1);let useReducer,useMemo,useEffect;module.link('react',{useReducer(v){useReducer=v},useMemo(v){useMemo=v},useEffect(v){useEffect=v}},2);let Tracker;module.link('meteor/tracker',{Tracker(v){Tracker=v}},3);



const useFindReducer = (data, action)=>{
    switch(action.type){
        case 'refresh':
            return action.data;
        case 'addedAt':
            return [
                ...data.slice(0, action.atIndex),
                action.document,
                ...data.slice(action.atIndex)
            ];
        case 'changedAt':
            return [
                ...data.slice(0, action.atIndex),
                action.document,
                ...data.slice(action.atIndex + 1)
            ];
        case 'removedAt':
            return [
                ...data.slice(0, action.atIndex),
                ...data.slice(action.atIndex + 1)
            ];
        case 'movedTo':
            const doc = data[action.fromIndex];
            const copy = [
                ...data.slice(0, action.fromIndex),
                ...data.slice(action.fromIndex + 1)
            ];
            copy.splice(action.toIndex, 0, doc);
            return copy;
    }
};
// Check for valid Cursor or null.
// On client, we should have a Mongo.Cursor (defined in
// https://github.com/meteor/meteor/blob/devel/packages/minimongo/cursor.js and
// https://github.com/meteor/meteor/blob/devel/packages/mongo/collection.js).
// On server, however, we instead get a private Cursor type from
// https://github.com/meteor/meteor/blob/devel/packages/mongo/mongo_driver.js
// which has fields _mongo and _cursorDescription.
const checkCursor = (cursor)=>{
    if (cursor !== null && cursor !== undefined && !(cursor instanceof Mongo.Cursor) && !(cursor._mongo && cursor._cursorDescription)) {
        console.warn('Warning: useFind requires an instance of Mongo.Cursor. ' + 'Make sure you do NOT call .fetch() on your cursor.');
    }
};
// Synchronous data fetch. It uses cursor observing instead of cursor.fetch() because synchronous fetch will be deprecated.
const fetchData = (cursor)=>{
    const data = [];
    const observer = cursor.observe({
        addedAt (document, atIndex, before) {
            data.splice(atIndex, 0, document);
        }
    });
    observer.stop();
    return data;
};
const useSyncEffect = (effect, deps)=>{
    const [cleanup, timeoutId] = useMemo(()=>{
        const cleanup = effect();
        const timeoutId = setTimeout(cleanup, 1000);
        return [
            cleanup,
            timeoutId
        ];
    }, deps);
    useEffect(()=>{
        clearTimeout(timeoutId);
        return cleanup;
    }, [
        cleanup
    ]);
};
const useFindClient = (factory, deps = [])=>{
    const cursor = useMemo(()=>{
        // To avoid creating side effects in render, opt out
        // of Tracker integration altogether.
        const cursor = Tracker.nonreactive(factory);
        if (Meteor.isDevelopment) {
            checkCursor(cursor);
        }
        return cursor;
    }, deps);
    const [data, dispatch] = useReducer(useFindReducer, null, ()=>{
        if (!(cursor instanceof Mongo.Cursor)) {
            return [];
        }
        return fetchData(cursor);
    });
    useSyncEffect(()=>{
        if (!(cursor instanceof Mongo.Cursor)) {
            return;
        }
        const initialData = fetchData(cursor);
        dispatch({
            type: 'refresh',
            data: initialData
        });
        const observer = cursor.observe({
            addedAt (document, atIndex, before) {
                dispatch({
                    type: 'addedAt',
                    document,
                    atIndex
                });
            },
            changedAt (newDocument, oldDocument, atIndex) {
                dispatch({
                    type: 'changedAt',
                    document: newDocument,
                    atIndex
                });
            },
            removedAt (oldDocument, atIndex) {
                dispatch({
                    type: 'removedAt',
                    atIndex
                });
            },
            movedTo (document, fromIndex, toIndex, before) {
                dispatch({
                    type: 'movedTo',
                    fromIndex,
                    toIndex
                });
            },
            // @ts-ignore
            _suppress_initial: true
        });
        return ()=>{
            observer.stop();
        };
    }, [
        cursor
    ]);
    return cursor ? data : cursor;
};
const useFindServer = (factory, deps)=>Tracker.nonreactive(()=>{
        var _cursor_fetch;
        const cursor = factory();
        if (Meteor.isDevelopment) checkCursor(cursor);
        var _cursor_fetch1;
        return (_cursor_fetch1 = cursor === null || cursor === void 0 ? void 0 : (_cursor_fetch = cursor.fetch) === null || _cursor_fetch === void 0 ? void 0 : _cursor_fetch.call(cursor)) !== null && _cursor_fetch1 !== void 0 ? _cursor_fetch1 : null;
    });
const useFind = Meteor.isServer ? useFindServer : useFindClient;
function useFindDev(factory, deps = []) {
    function warn(expects, pos, arg, type) {
        console.warn(`Warning: useFind expected a ${expects} in it\'s ${pos} argument ` + `(${arg}), but got type of \`${type}\`.`);
    }
    if (typeof factory !== 'function') {
        warn("function", "1st", "reactiveFn", factory);
    }
    if (!deps || !Array.isArray(deps)) {
        warn("array", "2nd", "deps", typeof deps);
    }
    return useFind(factory, deps);
}
module.exportDefault(Meteor.isDevelopment ? useFindDev : useFind);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"useSubscribe.ts":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/react-meteor-data/useSubscribe.ts                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({useSubscribe:()=>useSubscribe},true);let Meteor;module.link('meteor/meteor',{Meteor(v){Meteor=v}},0);let useTracker;module.link('./useTracker',{useTracker(v){useTracker=v}},1);

const useSubscribeClient = (name, ...args)=>{
    let updateOnReady = false;
    let subscription;
    const isReady = useTracker(()=>{
        if (!name) return true;
        subscription = Meteor.subscribe(name, ...args);
        return subscription.ready();
    }, ()=>!updateOnReady);
    return ()=>{
        updateOnReady = true;
        return !isReady;
    };
};
const useSubscribeServer = (name, ...args)=>()=>false;
const useSubscribe = Meteor.isServer ? useSubscribeServer : useSubscribeClient;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"useTracker.ts":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/react-meteor-data/useTracker.ts                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({useTracker:()=>useTracker},true);let Meteor;module.link('meteor/meteor',{Meteor(v){Meteor=v}},0);let Tracker;module.link('meteor/tracker',{Tracker(v){Tracker=v}},1);let useReducer,useEffect,useRef,useMemo;module.link('react',{useReducer(v){useReducer=v},useEffect(v){useEffect=v},useRef(v){useRef=v},useMemo(v){useMemo=v}},2);


// Warns if data is a Mongo.Cursor or a POJO containing a Mongo.Cursor.
function checkCursor(data) {
    let shouldWarn = false;
    if (Package.mongo && Package.mongo.Mongo && data && typeof data === 'object') {
        if (data instanceof Package.mongo.Mongo.Cursor) {
            shouldWarn = true;
        } else if (Object.getPrototypeOf(data) === Object.prototype) {
            Object.keys(data).forEach((key)=>{
                if (data[key] instanceof Package.mongo.Mongo.Cursor) {
                    shouldWarn = true;
                }
            });
        }
    }
    if (shouldWarn) {
        console.warn('Warning: your reactive function is returning a Mongo cursor. ' + 'This value will not be reactive. You probably want to call ' + '`.fetch()` on the cursor before returning it.');
    }
}
// Used to create a forceUpdate from useReducer. Forces update by
// incrementing a number whenever the dispatch method is invoked.
const fur = (x)=>x + 1;
const useForceUpdate = ()=>useReducer(fur, 0)[1];
const useTrackerNoDeps = (reactiveFn, skipUpdate = null)=>{
    const { current: refs } = useRef({
        isMounted: false,
        trackerData: null
    });
    const forceUpdate = useForceUpdate();
    // Without deps, always dispose and recreate the computation with every render.
    if (refs.computation) {
        refs.computation.stop();
        // @ts-ignore This makes TS think ref.computation is "never" set
        delete refs.computation;
    }
    // Use Tracker.nonreactive in case we are inside a Tracker Computation.
    // This can happen if someone calls `ReactDOM.render` inside a Computation.
    // In that case, we want to opt out of the normal behavior of nested
    // Computations, where if the outer one is invalidated or stopped,
    // it stops the inner one.
    Tracker.nonreactive(()=>Tracker.autorun((c)=>{
            refs.computation = c;
            const data = reactiveFn(c);
            if (c.firstRun) {
                // Always run the reactiveFn on firstRun
                refs.trackerData = data;
            } else if (!skipUpdate || !skipUpdate(refs.trackerData, data)) {
                // For any reactive change, forceUpdate and let the next render rebuild the computation.
                forceUpdate();
            }
        }));
    // To clean up side effects in render, stop the computation immediately
    if (!refs.isMounted) {
        Meteor.defer(()=>{
            if (!refs.isMounted && refs.computation) {
                refs.computation.stop();
                delete refs.computation;
            }
        });
    }
    useEffect(()=>{
        // Let subsequent renders know we are mounted (render is committed).
        refs.isMounted = true;
        // In some cases, the useEffect hook will run before Meteor.defer, such as
        // when React.lazy is used. In those cases, we might as well leave the
        // computation alone!
        if (!refs.computation) {
            // Render is committed, but we no longer have a computation. Invoke
            // forceUpdate and let the next render recreate the computation.
            if (!skipUpdate) {
                forceUpdate();
            } else {
                Tracker.nonreactive(()=>Tracker.autorun((c)=>{
                        const data = reactiveFn(c);
                        refs.computation = c;
                        if (!skipUpdate(refs.trackerData, data)) {
                            // For any reactive change, forceUpdate and let the next render rebuild the computation.
                            forceUpdate();
                        }
                    }));
            }
        }
        // stop the computation on unmount
        return ()=>{
            var _refs_computation;
            (_refs_computation = refs.computation) === null || _refs_computation === void 0 ? void 0 : _refs_computation.stop();
            delete refs.computation;
            refs.isMounted = false;
        };
    }, []);
    return refs.trackerData;
};
const useTrackerWithDeps = (reactiveFn, deps, skipUpdate = null)=>{
    const forceUpdate = useForceUpdate();
    const { current: refs } = useRef({
        reactiveFn
    });
    // keep reactiveFn ref fresh
    refs.reactiveFn = reactiveFn;
    useMemo(()=>{
        // To jive with the lifecycle interplay between Tracker/Subscribe, run the
        // reactive function in a computation, then stop it, to force flush cycle.
        const comp = Tracker.nonreactive(()=>Tracker.autorun((c)=>{
                const data = refs.reactiveFn();
                if (c.firstRun) {
                    refs.data = data;
                } else if (!skipUpdate || !skipUpdate(refs.data, data)) {
                    refs.data = data;
                    forceUpdate();
                }
            }));
        // Stop the computation immediately to avoid creating side effects in render.
        // refers to this issues:
        // https://github.com/meteor/react-packages/issues/382
        // https://github.com/meteor/react-packages/issues/381
        if (refs.comp) refs.comp.stop();
        // In some cases, the useEffect hook will run before Meteor.defer, such as
        // when React.lazy is used. This will allow it to be stopped earlier in
        // useEffect if needed.
        refs.comp = comp;
        // To avoid creating side effects in render, stop the computation immediately
        Meteor.defer(()=>{
            if (!refs.isMounted && refs.comp) {
                refs.comp.stop();
                delete refs.comp;
            }
        });
    }, deps);
    useEffect(()=>{
        // Let subsequent renders know we are mounted (render is committed).
        refs.isMounted = true;
        if (!refs.comp) {
            refs.comp = Tracker.nonreactive(()=>Tracker.autorun((c)=>{
                    const data = refs.reactiveFn(c);
                    if (!skipUpdate || !skipUpdate(refs.data, data)) {
                        refs.data = data;
                        forceUpdate();
                    }
                }));
        }
        return ()=>{
            refs.comp.stop();
            delete refs.comp;
            refs.isMounted = false;
        };
    }, deps);
    return refs.data;
};
function useTrackerClient(reactiveFn, deps = null, skipUpdate = null) {
    if (deps === null || deps === undefined || !Array.isArray(deps)) {
        if (typeof deps === "function") {
            skipUpdate = deps;
        }
        return useTrackerNoDeps(reactiveFn, skipUpdate);
    } else {
        return useTrackerWithDeps(reactiveFn, deps, skipUpdate);
    }
}
const useTrackerServer = (reactiveFn)=>{
    return Tracker.nonreactive(reactiveFn);
};
// When rendering on the server, we don't want to use the Tracker.
// We only do the first rendering on the server so we can get the data right away
const _useTracker = Meteor.isServer ? useTrackerServer : useTrackerClient;
function useTrackerDev(reactiveFn, deps = null, skipUpdate = null) {
    function warn(expects, pos, arg, type) {
        console.warn(`Warning: useTracker expected a ${expects} in it\'s ${pos} argument ` + `(${arg}), but got type of \`${type}\`.`);
    }
    if (typeof reactiveFn !== 'function') {
        warn("function", "1st", "reactiveFn", reactiveFn);
    }
    if (deps && skipUpdate && !Array.isArray(deps) && typeof skipUpdate === "function") {
        warn("array & function", "2nd and 3rd", "deps, skipUpdate", `${typeof deps} & ${typeof skipUpdate}`);
    } else {
        if (deps && !Array.isArray(deps) && typeof deps !== "function") {
            warn("array or function", "2nd", "deps or skipUpdate", typeof deps);
        }
        if (skipUpdate && typeof skipUpdate !== "function") {
            warn("function", "3rd", "skipUpdate", typeof skipUpdate);
        }
    }
    const data = _useTracker(reactiveFn, deps, skipUpdate);
    checkCursor(data);
    return data;
}
const useTracker = Meteor.isDevelopment ? useTrackerDev : _useTracker;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"withTracker.tsx":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/react-meteor-data/withTracker.tsx                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({withTracker:()=>withTracker},true);let _object_spread;module.link("@swc/helpers/_/_object_spread",{_(v){_object_spread=v}},0);let _jsx;module.link("react/jsx-runtime",{jsx(v){_jsx=v}},1);let React,forwardRef,memo;module.link('react',{default(v){React=v},forwardRef(v){forwardRef=v},memo(v){memo=v}},2);let useTracker;module.link('./useTracker',{useTracker(v){useTracker=v}},3);let Meteor;module.link('meteor/meteor',{Meteor(v){Meteor=v}},4);




const withTracker = (options)=>{
    return (Component)=>{
        if (Meteor.isDevelopment) {
            console.warn('It appears that you are using withTracker. This approach has been deprecated and will be removed in future versions of the package. Please migrate to using hooks.');
        }
        const getMeteorData = typeof options === 'function' ? options : options.getMeteorData;
        const WithTracker = /*#__PURE__*/ forwardRef((props, ref)=>{
            const data = useTracker(()=>getMeteorData(props) || {}, options.skipUpdate);
            return /*#__PURE__*/ _jsx(Component, _object_spread({
                ref: ref
            }, props, data));
        });
        const { pure = true } = options;
        return pure ? /*#__PURE__*/ memo(WithTracker) : WithTracker;
    };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts",
    ".tsx"
  ]
});


/* Exports */
return {

}});
