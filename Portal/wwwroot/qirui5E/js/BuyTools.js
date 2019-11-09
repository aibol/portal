function switchIt() {
  var wrapper = document.getElementById('wrapper')
  var className = wrapper.className
  if (className.indexOf('active') > -1) {
    wrapper.className = className.replace(' active', '');
  } else {
    wrapper.className += ' active';
  }
}

$(function () {
  var items = document.getElementsByClassName('clicker-item');
  var  wrapper = document.getElementById('wrapper');
  $(window).on('scroll click', function(event) {
    var target = event.target;
    if ($(target).closest('.clicker-wrapper').length) return
    if (wrapper.className.indexOf('active') > -1) {
      wrapper.className = wrapper.className.replace(' active', '');
    }
  });

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    item.addEventListener('touchstart', function (event) {
      if (this.className.indexOf('active') < 0) {
        this.className += ' active';
      }
    });
    item.addEventListener('touchend', function (event) {
      if (this.st) {
        clearTimeout(this.st);
      }
      var self = this;
      this.st = setTimeout(function () {
        self.className = self.className.replace(' active', '');
      }, 300)

    });
  }
})