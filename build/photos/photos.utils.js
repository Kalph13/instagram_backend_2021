"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractHashtags = void 0;

var extractHashtags = function extractHashtags(caption) {
  var hashtags = caption.match(/#[\w]+/g);

  if (hashtags) {
    return hashtags.map(function (hashtag) {
      return {
        where: {
          tag: hashtag
        },
        create: {
          tag: hashtag
        }
      };
    });
  }

  return null;
};

exports.extractHashtags = extractHashtags;