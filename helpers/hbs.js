const moment = require('moment');

module.exports = {
  // format date time
  formatDate: (date, format) => moment(date).format(format),

  // strip string to given length
  truncate: (str, len) => {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' ';
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(' '));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },

  // remove html tags from string
  stripTags: (input) => input.replace(/<(?:.|\n)*?>/gm, ''),

  // display card edit icon conditionally
  editIcon: (storyUser, loggedUser, storyId, floating = true) => {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
      return !floating
        ? `<a href="/stories/edit/${storyId}"><i class="fas fa-edit fa-small"></i></a>`
        : `<a href="/stories/edit/${storyId}" class="btn btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
    } else {
      return '';
    }
  },

  //  help to select opton
  select: (selected, options) => {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      );
  },
};
