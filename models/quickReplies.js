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
   */
  addQuickReply(text){
    this.quick_replies.push({
      content_type: this.content_type, 
      title: text,
      payload: text
    });
  }

  addQuickReplies(texts){
    texts.forEach(text => this.addQuickReply(text));    
  }

  getResponse() {
    return {
      text: this.title,
      quick_replies: this.quick_replies
    };
  }
}

module.exports = QuickReplies;