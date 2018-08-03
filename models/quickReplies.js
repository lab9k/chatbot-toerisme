const lang = require('../util/lang');

class QuickReplies {
  /**
   *Creates an instance of QuickReply.
   * @param {String} title Text that appears before the buttons
   */
  constructor(title) {
    this.title = title;
    this.quick_replies = [];
  }

  /**
   * @param {String} locale Locale for text displayed on button
   * @param {String} translateKeyword Keyword for translation
   */
  addQuickReply(locale, translateKeyword){
    this.quick_replies.push({
      content_type: 'text', 
      title: lang.translate(locale, translateKeyword),
      payload: lang.translate('nl', translateKeyword)
    });
  }

  addQuickReplies(...texts){
    texts.forEach(text => this.addQuickReply(text.locale, text.key));    
  }

  getResponse() {
    return {
      text: this.title,
      quick_replies: this.quick_replies
    };
  }
}

module.exports = QuickReplies;