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
   * @param {String} text Text that appears before the buttons
   * @param {String} payload Data to be sent to be sent
   */
  addQuickReply(text, payload) {
    this.quick_replies.push({
      content_type: this.content_type,
      title: text,
      payload: payload
    });
  }

  getResponse() {
    return {
      text: this.title,
      quick_replies: this.quick_replies
    };
  }
}

module.exports = QuickReplies;
