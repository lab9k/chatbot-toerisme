const lang = require('../util/lang');

class QuickReplies {
  /**
   *Creates an instance of QuickReply.
   * @param {String} title Text that appears before the buttons
   */
  constructor(title) {
    this.title = title;
    this.quick_replies = [];
    this.content_type = 'text';
  }

  /**
   * @param {String} text Text that appears on a button
   * @param {String} payload Data to be sent to be sent
   */
  addQuickReply(locale, translationKey){
    this.quick_replies.push({
      content_type: this.content_type, 
      title: lang.translate(locale, translationKey),
      payload: lang.translate('nl', translationKey)
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