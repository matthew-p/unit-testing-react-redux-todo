// jsdom setup 
// jsdom is an in-JavaScript implementation of the DOM,
// giving dom-like api without a browser
import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// define some html to be a basic document
// jsdom will consume it and act as if we're in a browser
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// set up a mock window
const win = doc.defaultView;
// using jsdom's fake dom as the document
global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

chai.use(chaiImmutable);
