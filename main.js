//Text Typer start
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
// text typer end 

// counter start

// Function to start counting when the element is in the viewport
function startCounterWhenVisible(element, callback) {
    var options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.7 // Trigger when 50% of the element is visible
    };
  
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          callback(); // Call the provided callback when the element is visible
          observer.unobserve(entry.target); // Stop observing once the callback is triggered
        }
      });
    }, options);
  
    observer.observe(element);
  }
  
  // Counter function
  function runCounter() {
    $('.counting').each(function () {
      var $this = $(this),
          countTo = $this.attr('data-count');
  
      $({ countNum: $this.text() }).animate({
        countNum: countTo
      },
  
      {
        duration: 4000,
        easing: 'linear',
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum);
        }
      });
    });
  }
  // Call the startCounterWhenVisible function with the section as the element and runCounter as the callback
  startCounterWhenVisible(document.getElementById('counter-stats'), runCounter);
  //counter end
  
//   testimonial start

//   testimonial end 

// places start 

// places end 