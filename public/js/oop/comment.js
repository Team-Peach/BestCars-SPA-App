class Comment {
    constructor(adId, content, author) {
        this._adId = adId;
        this._content = content;
        this._author = author;
    }

    get adId() {
        return this._adId;
    }
    set adId(value) {
        this._adId = value;
    }

    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
    }

    get author() {
        return this._author;
    }
    set author(value) {
        this._author = value;
    }
}

export { Comment };