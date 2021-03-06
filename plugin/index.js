class plugin {
  constructor(settings) {
    this.width = settings.width;
    this.height = settings.height;
  }
  
  setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  getCookie(cname) {
    var name = cname + "=",
    ca = document.cookie.split(';');
	
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  init() {
    var gdpr = this.getCookie('gdpr');
    if (gdpr != '') {
      return 'GDPR: ' + gdpr;
    }
    else {
      window.addEventListener('DOMContentLoaded', function() {
        this.create();
      }.bind(this));
      return 'Plugin init';
    }
  }
  
  create() {
    document.body.style.cssText = "overflow-y: hidden;";
    this.box = document.createElement('div');
    this.box.id = 'box';
    this.top = (window.innerHeight - this.height) / 2;
    this.left = (window.innerWidth - this.width) / 2;
    this.box.style.cssText = 'width: ' + this.width + 'px; height: ' + this.height + 'px; background-color: black; position: absolute; top: ' + this.top + 'px; left: ' + this.left + 'px; display: flex; justify-content: center; align-items: flex-end;';
    document.body.appendChild(this.box);
    var options = ['Cancel', 'Accept'];
    for (let i = 0; i < options.length; i++) {
      this.option = document.createElement('button');
      this.option.id = options[i];
      this.option.innerHTML = options[i];
      this.option.style.cssText = 'padding: 10px 15px; margin: 0px 0px 10px 10px;';
      this.option.addEventListener('click', function(e) {
        this.setCookie('gdpr', e.target.id);
        console.log('GDPR: ' + e.target.id);
        this.destroy();
      }.bind(this));
      this.box.appendChild(this.option);
    }
  }
  
  destroy() {
    document.body.removeChild(this.box);
    document.body.style.cssText = "overflow-y: auto;";
  }
}
