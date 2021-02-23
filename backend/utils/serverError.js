const serverError = (status = 401, title, errors) => {
    const er = new Error(title);
    er.title = title;
    er.status = status;
    er.errors = errors;
    return er;
  }

  module.exports = { serverError }
