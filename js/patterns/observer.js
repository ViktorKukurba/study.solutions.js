
/**
* @constructor
*/
function Observer() {
    this.observers = [];
};

Observer.prototype.add = function (obj) {
    return this.observers.push(obj);
};

Observer.prototype.get = function (index) {
    if (index > -1 && index < this.observers.length) {
        return this.observers[index];
    }
};

Observer.prototype.count = function () {
    return this.observers.length;
};

Observer.prototype.remove = function (index) {
    this.observers.slice(index, 1);
};

Observer.prototype.indexOf = function (obj) {
    /** @type {number} */
    var index = -1;
    for (/** @type {number} */var i = 0; i < this.length; i++) {
        if (this.observers === obj) {
            index = i;
            break;
        }
    }
    return index;
};

Observer.prototype.insert = function (obj, index) {
    this.observers.splice(index, 0, obj);
};

Observer.prototype.empty = function () {
    this.observers = [];
};

function FootballMatch(title) {
    var title_ = title;
    this.subscribers = new Observer();

    function init() {
        var input = document.getElementsByTagName('body')[0].appendChild(document.createElement('input'));
        var button = document.getElementsByTagName('body')[0].appendChild(document.createElement('button'));
        button.innerHTML = 'Notify';
        button.onclick = function(evt) {
            if (input.value) {
                self_.notify({ name: title_, time: (new Date()).toString(), message: input.value });
            }
        };
    }

    self_ = this;
    init();
};

FootballMatch.prototype.addSubscriber = function (observer) {
    this.subscribers.add(observer);
};

FootballMatch.prototype.removeSubscriber = function (observer) {
    this.subscribers.remove(this.subscribers.indexOf(observer));
};

FootballMatch.prototype.notify = function (context) {
    for (var i = 0; i < this.subscribers.count(); i++) {
        this.subscribers.get(i).Update(context);
    }
};

/**
* A observer.
* @interface
*/
function FootballMatchObserver() {
    this.Update = function() {
    };
}

/**
* @constructor
* @implements {FootballMatchObserver}
* @param {string} name. Name of magazine
*/
function SportOnlineMagazine(name) {

    function init(parameters) {
        /** @type{Element} */
        var magazine = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
        /** @type{Element} */
        var title = magazine.appendChild(document.createElement('H2'));
        title.innerHTML = name + '(SportOnlineMagazine)';
        line = magazine.appendChild(document.createElement('ul'));
    }
    
    /**
    * Update magazine
    * @this {SportOnlineMagazine}
    * @param {Object} context. Notification object
    */
    this.Update = function (context) {
        /** @type{Element} */
        var li = line.appendChild(document.createElement('li'));
        li.innerHTML = 'Event: ' + context['name'] + 'Time: ' + context['time']+ context['message'];
    };
    /** @type{Element} */
    var line;
    init();
}

/**
* @constructor
* @implements {FootballMatchObserver}
* @param {string} name. Name of oline source.
*/
function FootballOnline(name) {

    function init(parameters) {
        /** @type{Element} */
        var video = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
        if (name) {
            var title = video.appendChild(document.createElement('H2'));
            title.innerHTML = name + '(FootballOnline)';
        }
        news = video.appendChild(document.createElement('div'));
    }
    /**
    * @this {FootballOnline}
    * @param {Object} context. Notification object
    */
    this.Update = function (context) {
        news.innerHTML = 'Event: ' + context['name'] + 'Time: ' + context['time'] + context['message'];
    };
    /** @type{Element} */
    var news;
    init();
}

window.onload = function() {
    /** @type {FootballMatch}*/
    var fm = new FootballMatch('Football');
    fm.addSubscriber(new FootballOnline('LiveScore'));
    fm.addSubscriber(new FootballOnline('LiveGol'));
    fm.addSubscriber(new SportOnlineMagazine('LiveSport')); 
};
