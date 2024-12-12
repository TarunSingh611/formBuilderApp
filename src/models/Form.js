// src/models/Form.js
export class Form {
    constructor(title, description, questions = [], creator = null) {
      this.title = title;
      this.description = description;
      this.questions = questions;
      this.creator = creator;
      this.isPublished = false;
      this.responseCount = 0;
    }
  }
  
  // Question model
  export class Question {
    constructor(type, title, options = [], required = false, imageUrl = null) {
      this.type = type; // 'text', 'checkbox', 'grid'
      this.title = title;
      this.options = options;
      this.required = required;
      this.imageUrl = imageUrl;
    }
  }