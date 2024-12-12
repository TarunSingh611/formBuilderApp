// src/models/Response.js
export class Response {
    constructor(formId, respondent = null, answers = []) {
      this.formId = formId;
      this.respondent = respondent;
      this.answers = answers; // Array of { questionId, value }
    }
  }